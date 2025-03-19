import { Database } from "bun:sqlite";
import { decryptRSA, encryptRSA, hashHmac } from "../../../modules/crypt";
import { type Body, type RawBody } from "../../../types/register";
import { sendMail } from "../../../modules/mail/sender";
import emailConfirmation from "../../../modules/mail/pages/confirmation";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const rawBody = await req.json() as RawBody;

        let body = JSON.parse(decryptRSA(rawBody.encryptedData)) as Body;

        const errorMessages = [];

        if(!rawBody || typeof(rawBody) !== "object" || Object.keys(rawBody).length !== 2) {
            errorMessages.push("Invalid rawBody object!");
        }

        if(!rawBody.verifyUrl || typeof(rawBody.verifyUrl ) !== "string") {
            errorMessages.push("Invalid field in rawBody: verifyUrl");
        }

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

        if(!/^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]).{8,}$/u.test(body.password)) {
            errorMessages.push("Weak password");
            errorMessages.push("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%?&)");
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

        const userMgmtToken = Bun.randomUUIDv7("base64url");     // ez lesz a kód amit kap emailben, amivel megerősíti regisztrációját

        const encryptedMail = encryptRSA(body.email);
        const encryptedName = encryptRSA(body.name);
        const hashedMail = hashHmac(body.email);
        
        const verifyUrl = `${rawBody.verifyUrl}/verify-account?code=${userMgmtToken}`;

        db.run("INSERT INTO credentials (email, username, emailHash, passHash, mgmtToken) VALUES (?, ?, ?, ?, ?);", [encryptedMail, encryptedName, hashedMail, passHash, userMgmtToken]);

        const mailResponse = sendMail([body.email], "MInerva regisztráció", `Erősítse meg email címét a következő linken: ${verifyUrl}`, emailConfirmation(body.name, verifyUrl));

        if(mailResponse?.includes("Error")){
            return Response.json({
                    "message" : [mailResponse]
                }, {status: 500}
            );
        }

        return Response.json({
            "message": ["User successfully registered"]
        }, {status: 201});
        
    } catch (error) {
        // console.log(error);
        
        if(error.message.includes("UNIQUE constraint failed")) {
            return Response.json({
                "message": ["Mail already registered!"]
            }, {status: 409})
        }
        
        return Response.json({
            "message": ["Internal server error"]
        }, {status: 500})
    }
};
