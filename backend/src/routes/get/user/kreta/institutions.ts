import { Database } from "bun:sqlite";

export const handleRequest = async (req : Request,  db : Database) => {
    try {
        const response = await fetch("https://kretaglobalapi.e-kreta.hu/intezmenyek/kreta/publikus");

        if(!response.ok) {
            return Response.json({
                "message": "External gateway error"
            }, {status: 503})
        }
        
        return Response.json(await response.json());
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, {status: 500})
    }
};
