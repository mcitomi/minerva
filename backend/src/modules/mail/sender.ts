import { mail_application_password } from "../../../config.json";
import { createTransport } from "nodemailer";

export function sendMail(targets: string[], subject: string, text: string, html: string) {
    // mail antispam: email hash alapján, max perceknként lehessen pl emilt küldeni
    try {
        var transporter = createTransport({
            service: 'gmail',
            auth: {
                user: 'eduminervahu@gmail.com',
                pass: mail_application_password
            }
        });
    
        transporter.sendMail({from: 'no-reply@edu-minerva.hu', to: targets.toString(), subject: subject, text: text, html: html}, function(error, info){
            if (error) {
              return `Error: ${error}`;
            } else {
              return `Email sent: ${info.response}`;
            }
        });
    } catch (error) {
        return `Error: Application crash! ${error}`;
    }
}