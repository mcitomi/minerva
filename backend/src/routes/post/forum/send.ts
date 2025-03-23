import { Database } from "bun:sqlite";
// jwt
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";
// long polling-hoz "event" meghívó
import { messageTriggers } from "../../get/forum/new";

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

        const timeSent = Math.floor(Date.now() / 1000);
        db.run("INSERT INTO forumMessages (message, timeSent, credentialsId) VALUES (?, ?, ?);", [body.message, timeSent, jwtPayload._id]);

        messageTriggers.forEach(callback => callback(jwtPayload._id, body.message, timeSent));

        messageTriggers.length = 0; // töröljük a tömb elemeit, triggereket

        return Response.json({
            "message" : ["Sent!"]
        });

    } catch (error) {
        // console.log(error);
        
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
