import { Database } from "bun:sqlite";

export const handleRequest = async (req: Request, db: Database) => {
    try {
       const verifyToken = new URLSearchParams(new URL(req.url).search).get("mtoken");

       const query = db.query("SELECT * FROM credentials WHERE mgmtToken = ?;");

        const isValidToken = (await query.get(verifyToken));

        console.log(isValidToken);
        
       

        return Response.json({
            "message" : "delete"
        });
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
