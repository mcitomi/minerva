// flow: gomb -> email -> link/gomb (mgmt code) -> link, ami megnyitásával lekéri az uj passwordot
import { Database } from "bun:sqlite";
import { hashHmac } from "../../../modules/crypt";
import emailForgotpass from "../../../modules/mail/pages/forgotpassword";

export const handleRequest = async (req: Request, db: Database) => {
    const body = await req.json() as {email: string, verifyUrl: string};

    const query = db.query("SELECT email, username, id FROM credentials WHERE emailHash = ?;");    
    const userValues = query.get(hashHmac(body.email)) as {id: number, email: string, username: string};

    if(!userValues|| !userValues?.email) {
        return Response.json({
            "message": "Email address not found!"
        }, {status: 404});
    }

    const mgmtToken = Bun.randomUUIDv7("base64url");

    const verifyUrl = `${body.verifyUrl}/reset-password`;

    

};