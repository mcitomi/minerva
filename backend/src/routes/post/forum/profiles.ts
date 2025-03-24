import { Database } from "bun:sqlite";
import sharp from "sharp";

import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

import { decryptRSA } from "../../../modules/crypt";

type UserObject = {
    isActive: number;
    userId: number;
    pictureBase64Url: string | null;
    pfpBase64Urlx128: string | null;
    username: string;
}

async function generateAnOptimalizedPfp(userObject: UserObject, db: Database) {
    const imageBuffer = Buffer.from(userObject.pictureBase64Url.split(",")[1], "base64");

    const resizedPictureBase64 = "data:image/gif;base64," + (await sharp(imageBuffer, { animated: true })
    // a base64 headert manuálisan visszarakjuk, mert valamiért a sharp nem ismeri fel magától a mime formátumot
        .resize(128, 128)
        .toFormat("gif")    // minden képet gif-ben konvertálunk, mert az mindent tud kezelni
        .toBuffer())
        .toString("base64");

    db.run("UPDATE profileDetails SET pfpBase64Urlx128 = ? WHERE credentialsId = ?", [resizedPictureBase64, userObject.userId]);
}

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
            SELECT credentials.id AS userId, pictureBase64Url, pfpBase64Urlx128, isActive, username FROM credentials
            LEFT JOIN profileDetails ON profileDetails.credentialsId = credentials.id
            WHERE credentials.id IN (${placeholders});`
        );

        const rawUsers = query.all(...body.profileIds) as UserObject[];

        // kis kérés optimalizálás: minden képet 128x128as felbontásban küldünk ki mint a dc.
        // -> túl sok idő mire át konvertálunk mindig minden képet.
        return Response.json(
            rawUsers.map(userObject => {
                if (userObject.isActive == 1 && userObject.pfpBase64Urlx128) {  // ha van optimalizált változat, azt küldjük ki
                    return {
                        userId: userObject.userId,
                        username: decryptRSA(userObject.username),
                        pictureBase64Url: userObject.pfpBase64Urlx128
                    };
                }

                if (userObject.isActive == 1 && userObject.pictureBase64Url) {  // ha nincs optimalizált, de van nagy kép, akkor azt küldjük ki
                    generateAnOptimalizedPfp(userObject, db);                       // és készítünk egy optimalizált képet, hogy legközelebb már azt küldjük ki

                    return {
                        userId: userObject.userId,
                        username: decryptRSA(userObject.username),
                        pictureBase64Url: userObject.pictureBase64Url
                    };
                }

                return {
                    userId: userObject.isActive == 1 ? userObject.userId : null,
                    username: userObject.isActive == 1 ? decryptRSA(userObject.username) : null,
                    pictureBase64Url: null
                };
            })
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
