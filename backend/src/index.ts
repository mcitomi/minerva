// Külső modulok
import { Database } from "bun:sqlite";

//konfigurációs fájl, saját modulok
import { port } from "../config.json";

import { RequestHandler } from "./router";
import { modelLoader } from "./modules/model-tuning/loader";
import { DiscordClient } from "./modules/discord";

// Modulok, Adatbázis deklarálás
const db: Database = new Database("database.sqlite", { create: true });
const requesthandler: RequestHandler = new RequestHandler(db);

// Adatbázis táblák létrehozása
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
    pictureBase64Url TEXT,
    pfpBase64Urlx128 TEXT,
    lang TEXT,
    institution TEXT,
    class TEXT,
    credentialsId INTEGER UNIQUE,
    FOREIGN KEY (credentialsId) REFERENCES credentials(id) ON DELETE CASCADE
);`);

db.run(`CREATE TABLE IF NOT EXISTS forumMessages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT,
    timeSent INTEGER,
    credentialsId INTEGER,
    FOREIGN KEY (credentialsId) REFERENCES credentials(id)
);`);

db.run(`CREATE TABLE IF NOT EXISTS discordCache (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    messageId TEXT
);`);

// db.run(`CREATE TABLE IF NOT EXISTS sessions (    // továbbfejlesztési lehetőség: session kezelés
//     id TEXT PRIMARY KEY,
//     userId INTEGER NOT NULL,
//     refreshToken TEXT NOT NULL,
//     expiresAt DATETIME NOT NULL
// );`);

// Modulok futtatása, elemek betöltése
requesthandler.register();
modelLoader();
DiscordClient(db);

// Bun szerver létrehozása
Bun.serve({
    development: true,
    port: port,
    idleTimeout: 255,   // másodperc, miután szakítjuk a kapcsolatot (polling beállítás) 255 a max (4.25 perc)
    fetch(r: Request) {
        return requesthandler.listener(r);
    }
});

console.info(`🌐 REST backend server started on port ${port}`);
