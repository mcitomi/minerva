import { Database } from "bun:sqlite";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const verifyToken = new URLSearchParams(new URL(req.url).search).get("code");
        const redirectUrl = new URLSearchParams(new URL(req.url).search).get("redirect");

        db.run("UPDATE credentials SET mgmtToken = NULL, isActive = 1 WHERE mgmtToken = ?;", [verifyToken]);
        
       return Response.redirect(`${atob(redirectUrl)}/login`);
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
