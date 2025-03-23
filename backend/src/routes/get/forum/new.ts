import { Database } from "bun:sqlite";
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

export const messageTriggers: Function[] = [];
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

        return new Promise((resolve) => {   // "Ígéret" átadása, varkozás hogy legyen új msg.
            const callback = (userId: number, message: string, timeSent: number) => {
                resolve(Response.json({
                    "userId": userId,
                    "message": message,
                    "timeSent": timeSent,
                    "yourMessage": jwtPayload._id === userId
                }));
            };

            messageTriggers.push(callback); // hozzáadjuk a kliens "kérelmét" a várolistához

            setTimeout(() => {  // Ha 250 másodperc után nincs új üzenet, visszatérünk egy 204-es kóddal (no content) - mert a Bun js engine maximum várakozási ideje 255 másodperc
                const index = messageTriggers.indexOf(callback);
                if (index !== -1) messageTriggers.splice(index, 1);
                resolve(Response.json({ "message": ["No new messages"] }, { status: 204 }));
            }, 250000); 
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
