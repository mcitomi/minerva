import { Database } from "bun:sqlite";
export const handleRequest = (req : Request,  db : Database) => {
    return new Response("Szia világ!");
};
