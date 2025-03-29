// Külső modulok
import { Database } from "bun:sqlite";

// titkosításhoz szükséges modulok
import { encryptRSA } from "../../../modules/crypt";

// jwt hitelesítéshez sükséges saját modulok, fájlok
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

// tiltott szavak listája
import { dirtywords } from "../../../blacklist.json";

export const handleRequest = async (req: Request, db: Database) => {
    const allowedFields = ["name", "email", "institution", "country", "language", "classroom"];
    try {
        //#region - jwt auth
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return Response.json({
                "message": "Authorization required"
            }, { status: 403 })
        }

        const jwToken = authHeader.split(" ")[1];

        if (!jwToken) {
            return Response.json({
                "message": "Authorization required"
            }, { status: 403 })
        }

        const jwtPayload: Payload = verifyToken(jwToken);

        //#endregion

        const body = await req.json() as {
            name: string;
            email: string;
            institution: string | null;
            country: string | null;
            language: string | null;
            classroom: string | null;
        };

        const errorMessages = [];

        if (!body || typeof (body) !== "object") {
            errorMessages.push("Invalid body object!");
        }

        if(Object.keys(body).some(field => !allowedFields.includes(field))) {
            errorMessages.push("Body has an invalid field object!");
        }

        if (errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, { status: 400 });
        }

        if(dirtywords.some(word => body.name.toLowerCase().includes(word.toLowerCase()))) {
            return Response.json({
                "message": ["Do not use dirty name!"]
            }, {status: 406});
        }

        if(/[@:#%=+!$&*()?<>]/.test(body.name)) {
            return Response.json({
                "message": ["Do not use illagal name!"]
            }, {status: 406});
        }

        db.run(`
            INSERT INTO profileDetails (credentialsId, country, lang, institution, class) 
            VALUES (?, ?, ?, ?, ?) 
            ON CONFLICT(credentialsId) DO UPDATE SET country = excluded.country, lang = excluded.lang, institution = excluded.institution, class = excluded.class;
            `, 
            [jwtPayload._id, body.country, body.language, encryptRSA(body.institution), body.classroom]
        );

        db.run(`
            UPDATE credentials SET username = ? WHERE id = ?
            `,
            [encryptRSA(body.name), jwtPayload._id]
        );

        return Response.json({
            "message": ["Successful updated"]
        });

    } catch (error) {
        console.log(error);

        if (error.message.includes("token")) {
            return Response.json({
                "message": [error.message]
            }, { status: 401 })
        }

        return Response.json({
            "message": ["Internal server error"]
        }, { status: 500 })
    }
};
