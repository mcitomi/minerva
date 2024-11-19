import { RequestHandler } from "./router";
import { Database } from "bun:sqlite";
import { port } from "../config.json";

const db : Database = new Database("database.sqlite", { create: true });
const requesthandler : RequestHandler = new RequestHandler(db);

requesthandler.register();

Bun.serve({
    development: true,
    port : port,
    fetch(r : Request) : Response | Promise<Response> {
        return requesthandler.listener(r);
    }
});