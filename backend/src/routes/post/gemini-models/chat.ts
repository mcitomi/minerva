// Külső modulok
import { Database } from "bun:sqlite";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, type Content } from "@google/generative-ai";

// jwt hitelesítéshez sükséges saját modulok, fájlok
import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";

// gemini ai-hoz szükséges saját modulok, fájlok
import { gemini_api_key } from "../../../../config.json";
import { systeminstructions } from "./system-instructions.json";
import { modelTunings } from "../../../modules/model-tuning/loader";
import { type ModelJson } from "../../../types/model";

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

        async function callGemini(message: string, history: Content[], personName: string) {
            let tune: Content[], identity: string;

            const requestedModel = modelTunings.find(person => person.name == personName);
            
            if(!requestedModel || !requestedModel.path) {
                throw new Error("person not found in modelTunings");
            }

            const modelTune = await import(requestedModel.path) as ModelJson;
            tune = modelTune.tune;
            identity = modelTune.identity;
            
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
        // console.log(error);

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

        if(error.message.includes("person not found")) {
            return Response.json({
                "message": ["Person not found!", "Acceptable person names:", modelTunings.map(x => x.name)]
            }, { status: 404 })
        }

        return Response.json({
            "message": ["Internal server error"]
        }, { status: 500 })
    }
};
