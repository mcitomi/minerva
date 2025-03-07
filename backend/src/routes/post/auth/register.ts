import { Database } from "bun:sqlite";
import { decryptRSA, encryptRSA, hashHmac } from "../../../modules/crypt";
import { randomUUID } from "node:crypto";
import { type Body, type RawBody } from "../../../types/register";
import { sendMail } from "../../../modules/mail/sender";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const rawBody = await req.json() as RawBody;

        let body = JSON.parse(decryptRSA(rawBody.encryptedData)) as Body;

        const errorMessages = [];

        if(!body || typeof(body) !== "object" || Object.keys(body).length !== 4) {
            errorMessages.push("Invalid body object!");
        }

        if(!body.email || typeof(body.email) !== "string") {
            errorMessages.push("Invalid field: email");
        }
        
        if(!body.name || typeof(body.name) !== "string") {
            errorMessages.push("Invalid field: name");
        }

        if(!body.password || typeof(body.password) !== "string") {
            errorMessages.push("Invalid field: password");
        }

        if(!body.passwordre || typeof(body.passwordre) !== "string") {
            errorMessages.push("Invalid field: passwordre");
        }

        if(body.password !== body.passwordre) {
            errorMessages.push("Passwords do not match");
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
            errorMessages.push("Invalid email address format");
        }

        if(!/^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[@$!%*?&]).{8,}$/u.test(body.password)) {
            errorMessages.push("Weak password");
        }

        if(errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, {status: 400})
        }

        const passHash = await Bun.password.hash(body.password, {
            algorithm: "argon2id",  // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
            memoryCost: 19456,
            timeCost: 2
        });

        const userMgmtToken = Bun.randomUUIDv7("base64");     // ez lesz a kód amit kap emailben, amivel megerősíti regisztrációját

        const encryptedMail = encryptRSA(body.email);
        const hashedMail = hashHmac(body.email);
        
        // const verifyUrl = `http://${new URL(req.url).host}/auth/verify-mail/link?mtoken=${userMgmtToken}`;
        const verifyUrl = `${rawBody.verifyUrl}/verify-account?mtoken=${userMgmtToken}`;

        db.run("INSERT INTO credentials (email, emailHash, passHash, mgmtToken) VALUES (?, ?, ?, ?);", [encryptedMail, hashedMail, passHash, userMgmtToken]);

        const mailResponse = sendMail([body.email], "Minerva regisztráció", "Erősítse meg email címét", `
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify</title>
            </head>
            <body style="font-family: Arial, sans-serif; color: black; width: 100%;">
                <h2>Üdv ${body.name}!</h2>
                <a href="${verifyUrl}">Regisztráció megerősítése</a>
                <br/>
                <small>${verifyUrl}</small>
            </body>
            </html>
        `);

        if(mailResponse?.includes("Error")){
            return new Response(`{"message" : "${mailResponse}"}`, {
                status: 500,
            });
        }

        return Response.json({
            "message": ["User successfully registered"]
        }, {status: 201});
        
    } catch (error) {
        console.log(error);
        
        if(error.message.includes("UNIQUE constraint failed")) {
            return Response.json({
                "message": ["Mail already registered!"]
            }, {status: 409})
        }
        
        return Response.json({
            "message": [error.message]
        }, {status: 500})
    }
};
