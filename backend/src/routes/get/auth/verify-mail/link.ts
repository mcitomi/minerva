import { Database } from "bun:sqlite";
import { sendMail } from "../../../../modules/mail/sender";
import emailSuccessful from "../../../../modules/mail/pages/successful";
import { decryptRSA } from "../../../../modules/crypt";

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const verifyToken = new URLSearchParams(new URL(req.url).search).get("code");

        const query = db.query("UPDATE credentials SET mgmtToken = NULL, isActive = 1 WHERE mgmtToken = ? RETURNING isActive, email, username;");

        const linkQuery = await query.get(verifyToken) as {isActive: number, email: string, username: string};

        if (linkQuery || linkQuery?.isActive == 1) {
            const mailResponse = sendMail([decryptRSA(linkQuery.email)], "MInerva: Sikeres regisztráció!", "Regisztrációját sikeresen véglegesítette!", emailSuccessful(decryptRSA(linkQuery.username)));

            if(mailResponse?.includes("Error"))  {
                return Response.json({
                    "message": "Registration successful, but failed to send email"
                }, {status: 202});
            }

            return Response.json({
                "message": "Registration successful"
            });
        } else {
            return Response.json({
                "message": "Registration failed"
            }, { status: 400 });
        }
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, { status: 500 });
    }
};
