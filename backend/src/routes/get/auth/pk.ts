import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const headers = {
    "Access-Control-Allow-Origin": "*",  // Engedélyezi a minden domain-ről való hozzáférést
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",  // Engedélyezett HTTP metódusok
    "Access-Control-Allow-Headers": "Content-Type",  // Engedélyezett fejlécek
};

export const handleRequest = (req: Request, db: Database) => {
    try {
        const publicKey = readFileSync(join(process.cwd(), "secrets", "public_key.pem"));
        const base64encodedKey = publicKey.toString("base64");

        return Response.json({
            "encodedKey": base64encodedKey
        }, {headers});
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
