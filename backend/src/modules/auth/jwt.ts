import { createHmac } from "node:crypto";
import { jwt_sec } from "../../../secrets/jwt_secret.json";
import { type Payload } from "../../types/jwt";

export function generateToken(payload: Payload, expiresIn: number) { 
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");

    if (expiresIn) {
        payload.exp = Math.floor(Date.now() / 1000) + expiresIn;    // másodpercben megadva
    }

    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");

    const signature = createHmac("SHA256", jwt_sec).update(`${encodedHeader}.${encodedPayload}`).digest("base64url");
   
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export function verifyToken(token) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    const expectedSignature = createHmac("SHA256", jwt_sec).update(`${encodedHeader}.${encodedPayload}`).digest("base64url");

    if (signature !== expectedSignature) {
        // hibás aláírás (eltérő secret vagy kódolás)
        throw new Error('Invalid token');
    }

    const payload: Payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8"));

    if(payload.exp && Math.floor(Date.now() / 1000) >= payload.exp) {
        // a token lejart
        throw new Error("Expired token");
    }

    return payload;
}