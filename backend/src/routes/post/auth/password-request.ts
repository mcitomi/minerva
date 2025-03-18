// flow: gomb -> email -> link/gomb (mgmt code) -> link, ami megnyitásával lekéri az uj passwordot
// Erre az endpointora a kérés a login oldalról jön. -> küldünk egy emailt az embernek, olyan kóddal mint az email megerősítésnél, az megnyitja a /reset-password oldalt, és onnan új kérés az új jelszavakkal, amit mentünk db.
import { Database } from "bun:sqlite";
import { hashHmac, decryptRSA } from "../../../modules/crypt";
import emailForgotpass from "../../../modules/mail/pages/forgotpassword";
import { sendMail } from "../../../modules/mail/sender";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const body = await req.json() as { email: string, verifyUrl: string };

        const errorMessages = [];

        if(!body || typeof(body) !== "object" || Object.keys(body).length !== 2) {
            errorMessages.push("Invalid body object!");
        }

        if(!body.verifyUrl || typeof(body.verifyUrl ) !== "string") {
            errorMessages.push("Invalid field in rawBody: verifyUrl");
        }

        if(!body.email || typeof(body.email ) !== "string") {
            errorMessages.push("Invalid field in rawBody: email");
        }

        if(errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, {status: 400})
        }

        const query = db.query("SELECT email, username, id FROM credentials WHERE emailHash = ?;");
        const userValues = query.get(hashHmac(body.email)) as { id: number, email: string, username: string };

        if (!userValues || !userValues?.email) {
            return Response.json({
                "message": ["Email address not found!"]
            }, { status: 404 });
        }

        const mgmtToken = Bun.randomUUIDv7("base64url");

        const verifyUrl = `${body.verifyUrl}/reset-password?code=${mgmtToken}`;

        db.run("UPDATE credentials SET mgmtToken = ? WHERE id = ?;", [mgmtToken, userValues.id]);

        const mailResponse = sendMail([decryptRSA(userValues.email)], "MInerva - Jelszó visszaállítás", `Visszaállító link ${verifyUrl}`, emailForgotpass(decryptRSA(userValues.username), verifyUrl));

        if(mailResponse?.includes("Error")){
            return Response.json({
                    "message" : [mailResponse]
                }, {status: 500}
            );
        }
        
        return Response.json({
            "message" : ["Email sent!"]
        }
    );

    } catch (error) {
        console.log(error);
        return Response.json({
            "message": ["Internal server error"]
        }, {status: 500})
    }
};