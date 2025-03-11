import { Database } from "bun:sqlite";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const verifyToken = new URLSearchParams(new URL(req.url).search).get("code");

        const query = db.query("UPDATE credentials SET mgmtToken = NULL, isActive = 1 WHERE mgmtToken = ?;");

        const linkQuery = await query.run(verifyToken);

        if (linkQuery.changes == 1) {
            return Response.json({
                "message": "Registration successfull"
            });
        } else {
            return Response.json({
                "message": "Registration failed"
            }, { status: 400 });
        }
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
