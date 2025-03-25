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
                "message": ["Authorization required"]
            }, { status: 403 })
        }

        const jwToken = authHeader.split(" ")[1];

        if (!jwToken) {
            return Response.json({
                "message": ["Authorization required"]
            }, { status: 403 })
        }

        const jwtPayload: Payload = verifyToken(jwToken);

        //#endregion

        const userMgmtToken = Bun.randomUUIDv7("base64url");

        db.run("UPDATE credentials SET mgmtToken = ?, isActive = 2 WHERE id = ?;", [userMgmtToken, jwtPayload._id]);

        return Response.json({
            "message": ["Successfully deactivated"]
        });

    } catch (error) {
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
