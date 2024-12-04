import { Database } from "bun:sqlite";
import { decryptRSA, encryptRSA } from "../../../modules/crypt";


export const handleRequest = async (req : Request,  db : Database) => {
    const body = await req.json()

    let decodedBody = decryptRSA(body.encryptedData);

    console.log(decodedBody);

    return Response.json({
        "message" : "ok"
    })
};
