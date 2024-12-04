import { RequestHandler } from "./router";
import { Database } from "bun:sqlite";
import { port } from "../config.json";

const db: Database = new Database("database.sqlite", { create: true });
const requesthandler: RequestHandler = new RequestHandler(db);

requesthandler.register();

const server = Bun.serve({
    development: true,
    port: port,
    fetch(r: Request) {
        if (server.upgrade(r)) {
            return;     // ha az adott kérés ws, kilépünk ebből metódusból.
        }

        return requesthandler.listener(r);
    },
    websocket: {    // https://bun.sh/docs/api/websockets
        open(ws) {
            ws.send(`Welcome!`);
        },
        message(ws, msg) {
            ws.send(`You said: ${msg}`);
        }
    }
});

console.info(`🌐 REST backend server started on port ${port}`);
