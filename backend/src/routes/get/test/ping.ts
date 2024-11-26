import { Database } from "bun:sqlite";
export const handleRequest = (req : Request,  db : Database) => {
    return new Response(`[${(new Date).toISOString()}] - Pong! (づ￣ 3￣)づ`);
};
