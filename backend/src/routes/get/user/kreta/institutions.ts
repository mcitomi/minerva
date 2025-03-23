import { Database } from "bun:sqlite";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const handleRequest = async (req : Request,  db : Database) => {
    try {
        // const response = await fetch("https://kretaglobalapi.e-kreta.hu/intezmenyek/kreta/publikus");    

        // A kréta api sajnos csak magyarországról érhető el, ezért a szervergépünk (srockholm) nem éri el
        // így egy előre letöltött json fájlból tudunk dolgozni.

        // if(!response.ok) {
        //     return Response.json({
        //         "message": "External gateway error"
        //     }, {status: 503})
        // }
        
        return Response.json(JSON.parse(readFileSync(join(import.meta.dir, "kretapublikus.json"), "utf-8")));
    } catch (error) {
        return Response.json({
            "message": "Internal server error"
        }, {status: 500})
    }
};
