import { Database } from "bun:sqlite";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

import { verifyToken } from "../../../modules/auth/jwt";
import { type Payload } from "../../../types/jwt";
import { decryptRSA } from "../../../modules/crypt";
import { gemini_api_key } from "../../../../config.json";

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

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite",
        });

        async function callGemini(message: string) {
            const chatSession = model.startChat({
                generationConfig,
                history: [

                ],
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

        const body = await req.json() as {message: string, history: string[], person: string};

        const errorMessages = [];

        if(!body || typeof(body) !== "object" || Object.keys(body).length !== 2) {
            errorMessages.push("Invalid body object!");
        }

        if(!body.message || typeof(body.message) !== "string") {
            errorMessages.push("Invalid field: message");
        }

        if(!body.person || typeof(body.person) !== "string") {
            errorMessages.push("Invalid field: person");
        }

        if(!body.history || typeof(body.history) !== "object") {
            errorMessages.push("Invalid field: history");
        }
        
        if(errorMessages.length !== 0) {
            return Response.json({
                "message": errorMessages
            }, {status: 400})
        }

        const geminiResponse = await callGemini(body.message);

        return Response.json({
            "model" : `${geminiResponse}`
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
