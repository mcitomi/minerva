import { Database } from "bun:sqlite";

export const handleRequest = async (req : Request,  db : Database) => {
    try {
        const userId = new URL(req.url).searchParams.get("u");

        if(!userId) {
            return Response.json({
                "message": "Invalid request"
            }, {status: 400})
        }

        const userQuery = db.query(`
            SELECT isActive, profileDetails.pfpBase64Urlx128 FROM credentials 
            LEFT JOIN profileDetails ON profileDetails.credentialsId = credentials.id
            WHERE credentials.id = ?;`
        );

        const pfp = await userQuery.get(userId) as { pfpBase64Urlx128: string | null, isActive: number };
        
        if(pfp && pfp.isActive == 1 && pfp.pfpBase64Urlx128) {
            return new Response(
                new Blob([Buffer.from(pfp.pfpBase64Urlx128.replace(/^data:[^;]+;base64,/, ''), "base64")]), 
                {
                headers: {
                    "Content-Type": "image/gif"
                }
            });
        } else {
            return Response.json({
                "message": "Unable to get profile picture"
            }, {status: 404})
        }

    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, {status: 500})
    }
};
