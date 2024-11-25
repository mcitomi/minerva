import fs from "node:fs";
import { Database } from "bun:sqlite";
import { join } from "node:path";
import { type Endpoint, type File } from "./types/router";

export class RequestHandler {
    private endpoints: Endpoint[] = [];
    private db: Database;

    constructor(db: Database) {
        this.db = db;
    }

    public async listener(req: Request) {
        const requestPath = (new URL(req.url).pathname).toLowerCase();
        const routeName = requestPath.endsWith("/") ? requestPath.slice(0, -1) : requestPath;

        const endpoint = this.endpoints.find(endpoint => endpoint.name.toLowerCase() === routeName && endpoint.type.toUpperCase() === req.method.toUpperCase());

        if (endpoint) {
            const file: File = await import(endpoint.route);
            return await file.handleRequest(req, this.db);
        } else {
            return Response.json({
                "message" : "Invalid endpoint or wrong method"
            }, { status: 404 });
        }
    }

    public register() {
        fs.readdirSync(join(import.meta.dir, "routes")).map((method: string) => {
            if (!method.endsWith('.ts')) {
                fs.readdirSync(join(import.meta.dir, "routes", method)).map((fileName: string) => {
                    scanSubFolders(fileName, join(import.meta.dir, "routes", method), method, this.endpoints);
                });
            }
        });

        function scanSubFolders(item: string, path: string, method: string, endpoints: Endpoint[]) {
            fs.stat(join(path, item), (err, stats) => {
                if (err) {
                    console.error(`Endpoint register error: ${err}`);
                } else {
                    if (stats.isDirectory()) {
                        fs.readdirSync(join(path, item)).map((file: string) => {
                            scanSubFolders(file, join(path, item), method, endpoints);
                        });
                    } else if (stats.isFile()) {
                        const route = join(path, item);
                        const name = route.slice(route.indexOf(method) + method.length).split('.')[0].replaceAll('\\', "/");
                        const type = method;
                        console.info(`📜 ${method}\t${name} loaded!`);
                        endpoints.push({ route, name, type });
                    }
                }
            });
        }
    }
}
