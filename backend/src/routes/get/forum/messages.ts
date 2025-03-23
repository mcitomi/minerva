import { Database } from "bun:sqlite";
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

export const handleRequest = (req: Request, db: Database) => {
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

        const query = db.query(`
            SELECT credentials.id AS userId, message, timeSent, isActive FROM credentials
            INNER JOIN forumMessages ON forumMessages.credentialsId = credentials.id;`
        );

        const rawMessages = query.all() as {
            userId: number,
            username: string;
            message: string;
            timeSent: number;
            isActive: number;
        }[];

        return Response.json(rawMessages.map(messageObject => {
            return {
                userId : messageObject.isActive == 1 ? messageObject.userId : null,
                message: messageObject.message,
                timeSent: messageObject.timeSent,
                yourMessage: messageObject.userId == jwtPayload._id
            }
        }));
    } catch (error) {
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
