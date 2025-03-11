import { Database } from "bun:sqlite";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const verifyToken = new URLSearchParams(new URL(req.url).search).get("code")

        const query = db.query("DELETE FROM credentials WHERE mgmtToken = ?;");

        const deleteResults = await query.run(verifyToken);

        if(deleteResults.changes == 1) {
            return Response.json({
                "message": "Registration successfully deleted"
            });
        } else {
            return Response.json({
                "message": "Registration already deleted"
            }, { status: 400 });
        }
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
