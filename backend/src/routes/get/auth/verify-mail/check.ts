import { Database } from "bun:sqlite";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const verifyToken = new URLSearchParams(new URL(req.url).search).get("code");

        const query = db.query("SELECT * FROM credentials WHERE mgmtToken = ?;");

        const isValidToken = await query.get(verifyToken);

        if (isValidToken) {
            return Response.json({
                "message": "Your code is valid"
            });
        } else {
            return Response.json({
                "message": "Your code is invalid"
            }, { status: 400 });
        }
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
