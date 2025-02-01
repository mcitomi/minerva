import { Database } from "bun:sqlite";
import { decryptRSA, encryptRSA, hashHmac } from "../../../modules/crypt";
import { randomUUID } from "node:crypto";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const encodedBody = await req.json();

        let body = JSON.parse(decryptRSA(encodedBody.encryptedData));

        

        const passHash = await Bun.password.hash(body.password, {
            algorithm: "argon2id",  // https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#argon2id
            memoryCost: 19456,
            timeCost: 2
        });

        const userMgmtToken = randomUUID();     // ez lesz a kód amit kap emailben, amivel megerősíti regisztrációját

        const encryptedMail = encryptRSA(body.email);
        const hashedMail = hashHmac(body.email);

        db.run("INSERT INTO credentials (email, emailHash, passHash, mgmtToken) VALUES (?, ?, ?, ?);", [encryptedMail, hashedMail, passHash, userMgmtToken]);

        return Response.json({
            "message": "ok"
        });
        
    } catch (error) {
        if(error.message.includes("UNIQUE constraint failed")) {
            return Response.json({
                "message": "Mail already registered!"
            }, {status: 409})
        }
        
        return Response.json({
            "message": "Server error"
        }, {status: 500})
    }
};
