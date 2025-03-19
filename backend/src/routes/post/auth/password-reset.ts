// ez az endpoint kapja meg az új jelszavakat és menti azt 
import { Database } from "bun:sqlite";
import { decryptRSA } from "../../../modules/crypt";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const body = await req.json() as { password: string; code: string; };

        const errorMessages = [];

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 2) {
            errorMessages.push("Invalid body object!");
        }

        if (!body.password || typeof (body.password) !== "string") {
            errorMessages.push("Invalid field: password");
        }

        if (!body.code || typeof (body.code) !== "string") {
            errorMessages.push("Invalid field: code");
        }

        if (errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, { status: 400 })
        }

        const query = db.query("SELECT id FROM credentials WHERE mgmtToken = ?;");

        const isValidToken = await query.get(body.code) as { id: number; };

        if (!isValidToken) {
            return Response.json({
                "message": ["Your code is invalid", "Request a new mail!"]
            }, { status: 400 });
        }

        const password = decryptRSA(body.password);

        if (!/^(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]).{8,}$/u.test(password)) {
            return Response.json({
                "message": ["Weak password", "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%?&)"]
            }, { status: 400 });
        }

        const passHash = await Bun.password.hash(password, {
            algorithm: "argon2id",
            memoryCost: 19456,
            timeCost: 2
        });

        db.run("UPDATE credentials SET passHash = ?, isActive = 1, mgmtToken = ? WHERE id = ?;", [passHash, null, isValidToken.id]);

        return Response.json({
            "message": ["Password updated!"]
        });

    } catch (error) {
        return Response.json({
            "message": ["Internal server error"]
        }, { status: 500 })
    }
}