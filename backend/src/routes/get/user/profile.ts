import { Database } from "bun:sqlite";
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";
import { decryptRSA } from "../../../modules/crypt";
import { type UserInfo } from "../../../types/profile";

export const handleRequest = async (req : Request,  db : Database) => {
    try {
        const authHeader = req.headers.get("authorization");
        if(!authHeader) {
            return Response.json({
                "message": "Authorization required"
            }, {status: 403})
        }

        const jwToken = authHeader.split(" ")[1];

        if(!jwToken) {
            return Response.json({
                "message": "Authorization required"
            }, {status: 403})
        }

        const jwtPayload: Payload = verifyToken(jwToken);
        
        const userQuery = db.query(`
            SELECT email, username, timeCreated, failedAttempts, lastLogin, role, country, institution, lang, class, profileDetails.pictureBase64Url FROM credentials 
            LEFT JOIN profileDetails ON profileDetails.credentialsId = credentials.id
            WHERE credentials.id = ?;`
        );
        
        const userInfo = await userQuery.get(jwtPayload._id) as UserInfo;   
        
        if(!userInfo || !userInfo.email) {
            return Response.json({
                "message": "User not found"
            }, {status: 404})
        }

        return Response.json({
            "message": "Success",
            "user" : {
                "name" : decryptRSA(userInfo.username),
                "email" : decryptRSA(userInfo.email),
                "timeCreated" : userInfo.timeCreated,
                "failedAttempts" : userInfo.failedAttempts,
                "lastLogin" : userInfo.lastLogin,
                "role" : userInfo.role,
                "country" : userInfo.country,
                "pictureUrl" : userInfo.pictureBase64Url,
                "institution" : userInfo.institution ? decryptRSA(userInfo.institution) : null,
                "language" : userInfo.lang,
                "classroom" : userInfo.class
            }
        });

    } catch (error) {
    //  console.log(error);

        if(error.message.includes("token")) {
            return Response.json({
                "message": error.message
            }, {status: 401})
        }
        
        return Response.json({
            "message": "Internal server error"
        }, {status: 500})
    }
};
