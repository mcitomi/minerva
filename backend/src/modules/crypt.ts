import { readFileSync } from "node:fs";
import { join } from "node:path";
import { privateDecrypt, constants, publicEncrypt, createHmac } from "node:crypto";
import { secret} from "../../secrets/sha_config.json";

export function decryptRSA(encyrptedData: string) { // Az RSA titkosítású base64 kódolású adatból utf8 kódolású textet adunk vissza
    try {
        const privateKey = readFileSync(join(process.cwd(), "secrets", "private_key.pem"), "utf-8");

        const bufferData = Buffer.from(encyrptedData, "base64");    // Bufferré alakítjuk a base64 kodolású stringet

        const decryptedData = privateDecrypt(
            {
                key: privateKey,
                padding: constants.RSA_PKCS1_OAEP_PADDING,    // padding: mivel frontenden a JSEncrypt ilyen paddingot használ itt is át kell állítani
                oaepHash: "sha512"
            }, new Uint8Array(bufferData)      // A privateDecrypt függvény egy UintArrayt kér bemeneti értéknek, ezért a Buffert átalakítom. A buffer mérete mindig 256bájt lesz, mert az RSA-2048 mindig ekkora adattal tér vissza.
        );

        return decryptedData.toString("utf-8");     // A base64 kódolású adatot utf8 szöveggé alakírtjuk és visszatérünk vele.
    } catch (error) {
        // console.error(error);
        return undefined;
    }
}

export function encryptRSA(text: string) {  // A publikus kulccsal lekódoljuk a szöveget, maximum 374 karakter (RSA-3072) és base64 kódolásban visszaadjuk
    try {
        const publicKey = readFileSync(join(process.cwd(), "secrets", "public_key.pem"), "utf-8");

        const encryptedData = publicEncrypt(
            {
                key: publicKey,
                padding: constants.RSA_PKCS1_OAEP_PADDING,    // Mivel a frontend is ilyen paddingot használ, backenden is ezzel kódolunk, így használhatjuk ugyan azt a functiont decryptre
                oaepHash: "sha512"
            },
            new Uint8Array(Buffer.from(text))
        );

        return encryptedData.toString("base64");
    } catch (error) {
        // console.error(error);
        return undefined;
    }
}

export function hashHmac(text: string) {    // generál egy hasht, sha512-vel, ahhoz egy fix secret keyel. így azonos bemenet esetén, azonos a hash, és ellenőrizhető valami egyedisége az adatbázisban
    const salt = Array.from(Buffer.from(text)).toString().replaceAll(',','');   // a megadott szövegkből készít egy sót, azonos szövegnél azonos a só, más szövegnél viszont más.
    return createHmac("sha512", secret).update(salt + text).digest("base64");  
}