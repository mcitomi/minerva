import { Database } from "bun:sqlite";

export const handleRequest = (req: Request, db: Database) => {
    try {
       const verifyToken = new URLSearchParams(new URL(req.url).search).get("mtoken")

       console.log(verifyToken);

       console.log("remove mail");
       

        return Response.json({
            "message" : "delete"
        });
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
