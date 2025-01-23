import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const handleRequest = (req: Request, db: Database) => {
    try {
        const publicKey = readFileSync(join(process.cwd(), "secrets", "public_key.pem"));
        const base64encodedKey = publicKey.toString("base64");

        return Response.json({
            "encodedKey": base64encodedKey
        });
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
