// Futtatás: bun converter.ts <json file neve>
import FS from "node:fs";

try {
    const inputFile = process.argv[2];

    function convertFile(tune: { text: string; }[]) {
        const newFormat = [];

        for (let index = tune.length - 1; index > -1; index--) {
            newFormat.unshift({ role: (index % 2 == 0 ? "user" : "model"), parts: [{ text: tune[index].text }] });
        }
        return newFormat;
    }

    const file = FS.readFileSync(inputFile, "utf-8");

    const converted = convertFile(JSON.parse(file));

    FS.writeFileSync(`${inputFile}-CONVERTED.json`, JSON.stringify(converted, null, 4));

    console.log(`${inputFile} átalakítva`);
} catch (error) {
    if(error?.message.includes("no such file")) {
        console.error("Ilyen file nem található");
    } else {
        console.error("Ismeretlen hiba történt");
    }
}

