import { Database } from "bun:sqlite";
import sharp from "sharp";

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

        const placeholders = body.profileIds.map(() => '?').join(',');  // annyi ?-et illeszt a lekérdezésbe, ahány adatot kapunk frontendről.

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

        // kis kérés optimalizálás: minden képet 128x128as felbontásban küldünk ki mint a dc.
        return Response.json(
            await Promise.all(  // a Promise.all megvár minden promise-t a blokkon belül, mert a .map nem várja meg az await dolgokat valamiért 
                rawUsers.map(async userObject => {
                    if (userObject.isActive == 1 && userObject.pictureBase64Url) {
                        try {
                            const imageBuffer = Buffer.from(userObject.pictureBase64Url.split(",")[1], "base64");

                            // const imageFormatFromBase64MIME = userObject.pictureBase64Url.split(";")[0].split("/")[1];

                            const resizedPictureBase64 = (await sharp(imageBuffer, { animated: true })
                                .resize(128, 128)
                                .toFormat("gif")    // minden képet gif-ben konvertálunk, mert az mindent tud kezelni
                                .toBuffer())
                                .toString("base64");

                            return {
                                userId: userObject.userId,
                                username: decryptRSA(userObject.username),
                                pictureBase64Url: "data:image/gif;base64," + resizedPictureBase64   
                                // a base64 headert manuálisan visszarakjuk, mert valamiért a sharp nem ismeri fel magától a mime formátumot
                            };

                        } catch (e) {
                            return {
                                userId: userObject.userId,
                                username: decryptRSA(userObject.username),
                                pictureBase64Url: userObject.pictureBase64Url
                            };
                        }
                    }

                    return {
                        userId: userObject.isActive == 1 ? userObject.userId : null,
                        username: userObject.isActive == 1 ? decryptRSA(userObject.username) : null,
                        pictureBase64Url: null
                    };
                })
            )
        );
    } catch (error) {
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
