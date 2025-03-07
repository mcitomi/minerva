import { Database } from "bun:sqlite";

export const handleRequest = (req: Request, db: Database) => {
    try {
       const verifyToken = new URLSearchParams(new URL(req.url).search).get("mtoken")

       console.log(verifyToken);

       console.log("linkelve");
       

        return Response.json({
            "message" : "k"
        });
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
