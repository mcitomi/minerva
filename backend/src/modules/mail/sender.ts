import { mail_application_password } from "../../../config.json";
import { createTransport } from "nodemailer";

const mailBlacklist = [] as { mail: string; lastMessage: number; }[];

function removeFromBlacklist(targets: string[]) {
    mailBlacklist.map(address => {
        if(targets.includes(address.mail)) {
            mailBlacklist.splice(mailBlacklist.indexOf(address), 1);
        }
    })
}

export function sendMail(targets: string[], subject: string, text: string, html: string) {
    try {
        if(mailBlacklist.some(address => {return (targets.includes(address.mail) && (address.lastMessage + 10) > Math.floor(Date.now() / 1000))})) {
            return "Error: Spamming! Try again in 10 seconds"
        }
        
        removeFromBlacklist(targets);

        var transporter = createTransport({
            service: 'gmail',
            auth: {
                user: 'eduminervahu@gmail.com',
                pass: mail_application_password
            }
        });

        targets.map(address => mailBlacklist.push({mail: address, lastMessage: Math.floor(Date.now() / 1000)}));

        transporter.sendMail({ from: 'no-reply@edu-minerva.hu', to: targets.toString(), subject: subject, text: text, html: html }, function (error, info) {
            if (error) {
                return `Error: ${error}`;
            } else {
                return `Email sent: ${info.response}`;
            }
        });
        return `Email sent:`;
    } catch (error) {
        return `Error: Application crash! ${error}`;
    }
}