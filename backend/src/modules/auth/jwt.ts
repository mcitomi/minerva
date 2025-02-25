import { createHmac } from "node:crypto";

export function generateToken(payload, secret, expiresIn) {
    const header = { alg: 'HS256', typ: 'JWT' };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const signature = createHmac("SHA256", secret).update(`${encodedHeader}.${encodedPayload}`).digest("base64");
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

function verifyToken(token, secret) {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    // const expectedSignature = Bun.base64Encode(Bun.hash.hmac('sha256', secret, `${encodedHeader}.${encodedPayload}`));
    const expectedSignature = createHmac("SHA256", secret).update(`${encodedHeader}.${encodedPayload}`).digest("base64");

    if (signature !== expectedSignature) {
        throw new Error('Érvénytelen token');
    }

    const payload = JSON.parse(atob(encodedPayload));
    return payload;
}