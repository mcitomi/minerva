import { Database } from "bun:sqlite";
// jwt
import { decryptRSA, hashHmac } from "../../../modules/crypt";
import { generateToken } from "../../../modules/auth/jwt";
// types
import { type Body, type RawBody, type AccountQuery } from "../../../types/login";
// email rendszer
import { sendMail } from "../../../modules/mail/sender";
import emailReactivate from "../../../modules/mail/pages/reactivate";
import emailNewLogin from "../../../modules/mail/pages/newlogin";

// https://www.quora.com/How-do-you-write-a-JavaScript-code-to-detect-the-name-of-the-device-Im-using
function detectDevice(userAgent: string) {
    let deviceType = "Desktop";
    if (/mobile/i.test(userAgent)) deviceType = "Mobile";
    if (/tablet/i.test(userAgent)) deviceType = "Tablet";

    let os = "";
    if (/Windows NT 10.0/.test(userAgent)) os = "Windows 10 / Windows 11";
    else if (/Windows NT 6.1/.test(userAgent)) os = "Windows 7";
    else if (/Mac OS X/.test(userAgent)) os = "macOS";
    else if (/Android/.test(userAgent)) os = "Android";
    else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";
    else if (/Linux/.test(userAgent)) os = "Linux";

    let browser = "";
    if (/Chrome/.test(userAgent)) browser = "Chrome";
    else if (/Firefox/.test(userAgent)) browser = "Firefox";
    else if (/Safari/.test(userAgent) && !/Chrome/.test(userAgent)) browser = "Safari";
    else if (/Edge/.test(userAgent)) browser = "Edge";

    return { deviceType, os, browser };
}

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const rawBody = await req.json() as RawBody;

        let body = JSON.parse(decryptRSA(rawBody.encryptedData)) as Body;

        const errorMessages = [];

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 2) {
            errorMessages.push("Invalid body object!");
        }

        if (!body.email || typeof (body.email) !== "string") {
            errorMessages.push("Invalid field: email");
        }

        if (!body.password || typeof (body.password) !== "string") {
            errorMessages.push("Invalid field: password");
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            errorMessages.push("Invalid email address format");
        }

        if (errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, { status: 400 })
        }

        const hashedMail = hashHmac(body.email);

        const accountQuery = db.query("SELECT id, passHash, isActive, username, mgmtToken FROM credentials WHERE emailHash = ?");

        const accountInfo = await accountQuery.get(hashedMail) as AccountQuery;

        if (!accountInfo || !accountInfo.passHash) {
            return Response.json({
                "message": ["Invalid email or password!"]
            }, { status: 401 });
        }

        const isValidPassword = await Bun.password.verify(body.password, accountInfo.passHash);

        if (!isValidPassword) {
            db.run("UPDATE credentials SET failedAttempts = COALESCE(failedAttempts, 0) + 1 WHERE id = ?;", [accountInfo.id]);

            return Response.json({
                "message": ["Invalid email or password!"]
            }, { status: 401 });
        }

        if (accountInfo.isActive !== 1) {
            if (accountInfo.isActive == 2 && accountInfo.mgmtToken != null) {
                const verifyUrl = `${new URL(req.url).origin}/user/reactivate?code=${accountInfo.mgmtToken}&redirect=${btoa(rawBody.verifyUrl)}`;
                sendMail([body.email], "MInerva fiók aktiválás", `Erősítse meg email címét a következő linken: ${verifyUrl}`, emailReactivate(decryptRSA(accountInfo.username), verifyUrl));
            }
            return Response.json({
                "message": ["Your account is inactive! Please verify your email."]
            }, { status: 403 });
        }

        const loginTime = Math.floor(Date.now() / 1000);

        const device = detectDevice(req.headers.get("User-Agent"));

        sendMail([body.email], "Bejelentkezés új eszközről", `Rendszerünk új bejelentkezést érzékelt!`, emailNewLogin(decryptRSA(accountInfo.username), req.headers.get("CF-Connecting-IP"), loginTime, `${device.deviceType} ${device.os}, ${device.browser}`));

        db.run("UPDATE credentials SET failedAttempts = 0, lastLogin = ?, mgmtToken = null WHERE id = ?;", [loginTime, accountInfo.id]);

        const token = generateToken({ _id: accountInfo.id }, 7776000);   // 172800 mp. = 2 nap, 7776000 mp. = 90 nap

        return Response.json({
            "message": ["User successfully logged in"],
            "jwt": token
        }, { status: 200 });

    } catch (error) {
        return Response.json({
            "message": ["Something went wrong!"]
        }, { status: 500 })
    }
};
