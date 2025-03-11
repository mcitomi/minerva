import { Database } from "bun:sqlite";
import { decryptRSA, encryptRSA, hashHmac } from "../../../modules/crypt";
import { generateToken } from "../../../modules/auth/jwt";
import { type Body, type RawBody, type AccountQuery } from "../../../types/login";

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

        const accountQuery = db.query("SELECT id, passHash, isActive FROM credentials WHERE emailHash = ?");

        const accountInfo = await accountQuery.get(hashedMail) as AccountQuery;

        if(!accountInfo || !accountInfo.passHash) {
            return Response.json({
                "message": ["Invalid email or password!"]
            }, {status: 401});
        }

        const isValidPassword = await Bun.password.verify(body.password, accountInfo.passHash);
        
        if(!isValidPassword) {
            return Response.json({
                "message": ["Invalid email or password!"]
            }, {status: 401});
        }

        if(accountInfo.isActive !== 1) {
            return Response.json({
                "message": ["Your account is inactive! Please verify your email."]
            }, {status: 403});
        }

        const token = generateToken({ _id: accountInfo.id }, 7200);

        return Response.json({
            "message": ["User successfully logged in"],
            "jwt" : token
        }, {status: 201});
        
    } catch (error) {
        console.log(error);
        
        return Response.json({
            "message": [error.message]
        }, {status: 500})
    }
};
