import { Database } from "bun:sqlite";
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

import { decryptRSA } from "../../../modules/crypt";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return Response.json({
                "message": "Authorization required"
            }, { status: 403 })
        }

        const jwToken = authHeader.split(" ")[1];

        if (!jwToken) {
            return Response.json({
                "message": "Authorization required"
            }, { status: 403 })
        }

        const jwtPayload: Payload = verifyToken(jwToken);

        const body = await req.json() as {
            profileIds: number[]
        }

        const errorMessages = [];

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 1) {
            errorMessages.push("Invalid body object!");
        }

        if (!body.profileIds || typeof (body.profileIds) !== "object") {
            errorMessages.push("Invalid field: profileIds");
        }

        if (errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, { status: 400 })
        }

        const placeholders = body.profileIds.map(() => '?').join(',');

        const query = db.query(`
            SELECT credentials.id AS userId, pictureBase64Url, isActive, username FROM credentials
            LEFT JOIN profileDetails ON profileDetails.credentialsId = credentials.id
            WHERE credentials.id IN (${placeholders});`
        );
        
        const rawUsers = query.all(...body.profileIds) as {
            isActive: number;
            userId: number;
            pictureBase64Url: string | null;
            username: string;
        }[];

        return Response.json(rawUsers.map(userObject => {
            return {
                userId : userObject.isActive == 1 ? userObject.userId : null,
                username: userObject.isActive == 1 ? decryptRSA(userObject.username) : null,
                pictureBase64Url: userObject.isActive == 1 && userObject.pictureBase64Url ? userObject.pictureBase64Url : null
            }
        }));
    } catch (error) {
        console.log(error);
        
        if (error.message.includes("token")) {
            return Response.json({
                "message": [error.message]
            }, { status: 401 })
        }

        return Response.json({
            "message": ["Internal server error"]
        }, { status: 500 });
    }
};
