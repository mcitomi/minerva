import { RequestHandler } from "./router";
import { Database } from "bun:sqlite";
import { port } from "../config.json";

const db: Database = new Database("database.sqlite", { create: true });
const requesthandler: RequestHandler = new RequestHandler(db);

db.run(`CREATE TABLE IF NOT EXISTS credentials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emailHash TEXT UNIQUE,
    email TEXT,
    username TEXT,
    passHash TEXT,
    timeCreated INTEGER DEFAULT (strftime('%s', 'now')),
    isActive NUMERIC DEFAULT FALSE,
    failedAttempts INTEGER DEFAULT 0,
    lastLogin INTEGER,
    role TEXT DEFAULT 'user',
    mgmtToken TEXT,
    twofaSecret TEXT
);`);

db.run(`CREATE TABLE IF NOT EXISTS profileDetails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    country TEXT,
    postCode TEXT,
    settlement TEXT,
    address TEXT,
    pictureUrl TEXT,
    credentialsId INTEGER UNIQUE,
    FOREIGN KEY (credentialsId) REFERENCES credentials(id) ON DELETE CASCADE
);`);

// db.run(`CREATE TABLE IF NOT EXISTS sessions (    // továbbfejlesztési lehetőség: session kezelés
//     id TEXT PRIMARY KEY,
//     userId INTEGER NOT NULL,
//     refreshToken TEXT NOT NULL,
//     expiresAt DATETIME NOT NULL
// );`);

requesthandler.register();

const server = Bun.serve({
    development: true,
    port: port,
    fetch(r: Request) {
        // if (server.upgrade(r)) {
        //     return;     // ha az adott kérés ws, kilépünk ebből metódusból.
        // }

        return requesthandler.listener(r);
    },
    // websocket: {    // https://bun.sh/docs/api/websockets
    //     open(ws) {
    //         ws.send(`Welcome!`);
    //         ws.subscribe("chat1");
    //     },
    //     message(ws, msg) {
    //         ws.send(`You said: ${msg}`);
    //     },
    //     close(ws, code, reason) {
    //         ws.unsubscribe("chat1");
    //         server.publish("chat1", "bro leaved")
    //     },
    // }
});

// setInterval(() => {
//     server.publish("chat1", "asd")
// }, 5000);

console.info(`🌐 REST backend server started on port ${port}`);
