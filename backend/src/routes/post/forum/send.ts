import { Database } from "bun:sqlite";
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

export const handleRequest = async (req: Request, db: Database) => {
    try {
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

        const body = await req.json() as {
            message: string;
        };

        const errorMessages = [];

        if(!body || typeof(body) !== "object" || Object.keys(body).length !== 1) {
            errorMessages.push("Invalid body object!");
        }

        if(!body.message || typeof(body.message) !== "string") {
            errorMessages.push("Invalid field: message");
        }

        if(errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, {status: 400});
        }

        db.run("INSERT INTO forumMessages (message, timeSent, credentialsId) VALUES (?, ?, ?);", [body.message, Math.floor(Date.now() / 1000), jwtPayload._id]);

        return Response.json({
            "message" : ["Sent!"]
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
        }, { status: 500 });
    }
};
