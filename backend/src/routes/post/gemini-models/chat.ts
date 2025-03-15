import { Database } from "bun:sqlite";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type Content } from "@google/generative-ai";

import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";
import { decryptRSA } from "../../../modules/crypt";
import { gemini_api_key } from "../../../../config.json";

import { systeminstructions } from "./system-instructions.json";

import PETOFI from "./persons/petofi.json";
import BOLYAI from "./persons/bolyai.json";
import KOLCSEY from "./persons/kolcsey.json";
import MINERVA from "./persons/minerva.json";
import NEUMANN from "./persons/neumann.json";
import SAINT from "./persons/saint.json";
import SZECSHENYI from "./persons/szechenyi.json";
// továbbfejlesztési lehetőség:
// írni egy modult ami scanneli a persons mappát json fájlokat kutatva, és a json fájlokba megadni a person nevét enum helyett, és eből a modulból ki exportáljuk
// az emberek neveit, és egy adott kérésnél már mindig az előre betöltött és megkeresett infókkal szolgálunk

enum Persons {
    Petofi = "petofi_sandor",
    Bolyai = "bolyai_janos",
    Kolcsey = "kolcsey_ferenc",
    Minerva = "minerva",
    Neumann = "neumann_janos",
    Saint = "szent_istvan",
    Szecshenyi = "szechenyi_istvan"
}

export const handleRequest = async (req: Request, db: Database) => {
    try {
        const genAI = new GoogleGenerativeAI(gemini_api_key);

        const generationConfig = {
            temperature: 0.5,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        const model = genAI.getGenerativeModel({    // https://ai.google.dev/gemini-api/docs/models/gemini#gemini-2.0-flash-lite
            // model: "gemini-2.0-flash-lite",  // 30 RPM, de "lite"- nem használ internetet
            model: "gemini-2.0-flash",  // 15RPM, de tud keresni és pontosabb 
        });

        async function callGemini(message: string, history: Content[], person: string) {
            let tune: Content[], identity: string;

            switch (person) {
                case Persons.Petofi:
                    tune = PETOFI.tune;
                    identity = PETOFI.identity;
                    break;

                case Persons.Bolyai:
                    tune = BOLYAI.tune;
                    identity = BOLYAI.identity;
                    break;

                case Persons.Kolcsey:
                    tune = KOLCSEY.tune;
                    identity = KOLCSEY.identity;
                    break;
                case Persons.Minerva:
                    tune = MINERVA.tune;
                    identity = MINERVA.identity;
                    break;

                case Persons.Neumann:
                    tune = NEUMANN.tune;
                    identity = NEUMANN.identity;
                    break;

                case Persons.Saint:
                    tune = SAINT.tune;
                    identity = SAINT.identity;
                    break;

                case Persons.Szecshenyi:
                    tune = SZECSHENYI.tune;
                    identity = SZECSHENYI.identity;
                    break;

                default:
                    tune = MINERVA.tune;
                    identity = MINERVA.identity;
                    break;
            }

            const chatSession = model.startChat({
                generationConfig,
                history: [...tune, ...history.slice(0, -1)],
                systemInstruction: {
                    role: "system",
                    parts: [{ "text": `${identity} ${systeminstructions}` }]
                }
            });

            const result = await chatSession.sendMessage(message);
            
            return result.response.text();
        }

        //#region - jwt auth
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

        //#endregion

        const body = await req.json() as { message: string, history: Content[], person: string };

        const errorMessages = [];

        if (!body || typeof (body) !== "object" || Object.keys(body).length !== 3) {
            errorMessages.push("Invalid body object!");
        }

        if (!body.message || typeof (body.message) !== "string") {
            errorMessages.push("Invalid field: message");
        }

        if (!body.person || typeof (body.person) !== "string") {
            errorMessages.push("Invalid field: person");
        }

        if (!body.history || typeof (body.history) !== "object") {
            errorMessages.push("Invalid field: history");
        }

        if (errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, { status: 400 })
        }

        const geminiResponse = await callGemini(body.message, body.history, body.person);

        return Response.json({
            "model": `${geminiResponse}`
        });

    } catch (error) {
        console.log(error);

        if (error.message.includes("token")) {
            return Response.json({
                "message": [error.message]
            }, { status: 401 })
        }

        if (error.message.includes("Too Many Req")) {
            return Response.json({
                "message": ["Too Many Requests", "Try again later"]
            }, { status: 429 })
        }

        return Response.json({
            "message": ["Internal server error"]
        }, { status: 500 })
    }
};
