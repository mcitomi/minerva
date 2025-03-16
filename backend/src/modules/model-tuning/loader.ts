import { join } from "node:path";
import { readdirSync, readFileSync } from "node:fs";

import { type ModelJson } from "../../types/model";

export const modelTunings = [] as { name: string; path: string; }[];

export async function modelLoader() {
    try {
        const dir = readdirSync(join(import.meta.dir, "persons"));

        for (const file of dir) {
            try {
                const modelPath = join(import.meta.dir, "persons", file);
                const model = await JSON.parse(readFileSync(modelPath, {encoding: "utf-8"})) as ModelJson;
                if(!model.name) {
                    throw new Error("Name not found!");
                }
                if(!model.identity) {
                    throw new Error("Identity not found!");
                }
                modelTunings.push({name: model.name, path: modelPath});
                console.info(`${!model.tune.length ? "⚠️ " : "🤖"} ModelFile: ${model.name} loaded${!model.tune.length ? " But tune is empty" : ""}!`);
            } catch (error) {
                console.error(`🛑 Unable to load model: ${file}:`, error.message);
            }
        }
    } catch (err) {
        console.error(`Model loader error`);
    }
} 