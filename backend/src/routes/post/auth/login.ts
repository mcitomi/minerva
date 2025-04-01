import { Database } from "bun:sqlite";
import { decryptRSA, hashHmac } from "../../../modules/crypt";
import { generateToken } from "../../../modules/auth/jwt";
import { type Body, type RawBody, type AccountQuery } from "../../../types/login";
import { sendMail } from "../../../modules/mail/sender";
import emailReactivate from "../../../modules/mail/pages/reactivate";
import emailNewLogin from "../../../modules/mail/pages/newlogin";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const rawBody = await req.json() as RawBody;

        let body = JSON.parse(decryptRSA(rawBody.encryptedData)) as Body;

        const errorMessages = [];

        if(!body || typeof(body) !== "object" || Object.keys(body).length !== 2) {
            errorMessages.push("Invalid body object!");
        }

        if(!body.email || typeof(body.email) !== "string") {
            errorMessages.push("Invalid field: email");
        }

        if(!body.password || typeof(body.password) !== "string") {
            errorMessages.push("Invalid field: password");
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            errorMessages.push("Invalid email address format");
        }

        if(errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, {status: 400})
        }

        const hashedMail = hashHmac(body.email);

        const accountQuery = db.query("SELECT id, passHash, isActive, username, mgmtToken FROM credentials WHERE emailHash = ?");

        const accountInfo = await accountQuery.get(hashedMail) as AccountQuery;

        if(!accountInfo || !accountInfo.passHash) {
            return Response.json({
                "message": ["Invalid email or password!"]
            }, {status: 401});
        }

        const isValidPassword = await Bun.password.verify(body.password, accountInfo.passHash);
        
        if(!isValidPassword) {
            db.run("UPDATE credentials SET failedAttempts = COALESCE(failedAttempts, 0) + 1 WHERE id = ?;", [accountInfo.id]);

            return Response.json({
                "message": ["Invalid email or password!"]
            }, {status: 401});
        }

        if(accountInfo.isActive !== 1) {
            if(accountInfo.isActive == 2 && accountInfo.mgmtToken != null) {
                const verifyUrl = `${new URL(req.url).origin}/user/reactivate?code=${accountInfo.mgmtToken}&redirect=${btoa(rawBody.verifyUrl)}`;
                sendMail([body.email], "MInerva fiók aktiválás", `Erősítse meg email címét a következő linken: ${verifyUrl}`, emailReactivate(decryptRSA(accountInfo.username), verifyUrl));
            }
            return Response.json({
                "message": ["Your account is inactive! Please verify your email."]
            }, {status: 403});
        }

        const loginTime = Math.floor(Date.now() / 1000);

        sendMail([body.email], "Bejelentkezés új eszközről", `Rendszerünk új bejelentkezést érzékelt!`, emailNewLogin(decryptRSA(accountInfo.username), req.headers.get("CF-Connecting-IP"), loginTime));

        db.run("UPDATE credentials SET failedAttempts = 0, lastLogin = ?, mgmtToken = null WHERE id = ?;", [loginTime, accountInfo.id]);

        const token = generateToken({ _id: accountInfo.id }, 7776000);   // 172800 mp. = 2 nap, 7776000 mp. = 90 nap

        return Response.json({
            "message": ["User successfully logged in"],
            "jwt" : token
        }, {status: 200});
        
    } catch (error) {
        return Response.json({
            "message": ["Something went wrong!"]
        }, {status: 500})
    }
};
