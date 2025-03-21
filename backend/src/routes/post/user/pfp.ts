// Külső modulok
import { Database } from "bun:sqlite";

// jwt hitelesítéshez sükséges saját modulok, fájlok
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

export const handleRequest = async (req: Request, db: Database) => {
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

        const body = await req.json() as { pfpBase64: string; };

        const errorMessages = [];

        if(!body || typeof(body) !== "object" || Object.keys(body).length !== 1) {
            errorMessages.push("Invalid body object!");
        }

        if(Object.keys(body)[0] !== "pfpBase64") {
            errorMessages.push("Invalid field: pfpBase64");
        }

        if(errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, {status: 400})
        }

        db.run("INSERT INTO profileDetails (credentialsId, pictureBase64Url) VALUES (?, ?) ON CONFLICT(credentialsId) DO UPDATE SET pictureBase64Url = excluded.pictureBase64Url;", [jwtPayload._id, body.pfpBase64]);
        
        return Response.json({
            "message" : ["Successful upload"]
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
