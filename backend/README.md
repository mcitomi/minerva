This project was created using `bun init` in bun v1.2.xx. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Backend API 

| **HTTP Method**|**Path**| **Request Body**| **Headers**| **Comments**|
|----------------|--------|-----------------|------------|-------------|
| GET            | `/test/ping`| None  | None | Ellenőrizhetjük hogy él-e a backend |
| GET            | `/auth/pk` | None | None | Publikus kulcs lekérése az RSA titkosításhoz.
| POST           | `/auth/register`| **RSA encrypted body:** encryptedData : (name, email, password, passwordre) | None | Regisztráció RSA-OAEP-el és a public key-el titkosítva, base64 kódolású szöveget vár, benne a fent említett mezőkkel.

## Szerver:

A Bun futtatókörnyezetbe épített `Bun.Serve` funkciót hasznátam egy gyors és egyszerű HTTP szerver létrehozásához.
Hasonlóan az Expresshez, ez is egy megadott porton fut és fogad kéréseket.
Bun esetében nem szükséges json vagy bodyparser middleware, ezeket alapból tudja.
Egyszerre kezelünk websocket és http kéréseket is.

## Backend router felépítés:

A http kérések kezelésére egy requesthandlert használunk, ez futtatja a megfelelő modulokat a kérések kiszolgálásához.

Az src/routes mappában helyezkednek el az API elérési pontok, amik a routes mappában találhatóak metódus szerint csoportosítva.

Pl.: az src/routes/get/test/ping.ts endpont az interneten egy get kéréssel lesz elérhető, a `http(s)://<host>/test/ping` linken.

## Adatbázis felépítése

### credentials

| **id**            | **emailHash**    | **email**     | **passHash**   | **name**  | **timeCreated**  | **isActive** | **failedAttempts** | **lastLogin** | **role**   | **resetToken** | **twofaSecret** |
|-------------------|------------------|---------------|----------------|----------|-----------------|--------------|--------------------|---------------|-----------|----------------|-----------------|
| INTEGER AUTOINCREMENT | TEXT UNIQUE      | TEXT          | TEXT           | TEXT     | INTEGER          | NUMERIC      | INTEGER            | INTEGER       | TEXT      | TEXT           | TEXT            |



## Tiktoksítás:

Az adatok titkosításához több eszközt használok. 
- RSA kulcsok. Az RSA alapú titkosítást arra használjuk, hogy frontenden titkosítjuk az adatot, majd backenden feldolgozzuk és eltároljuk a titkosított adatot. RSA-3072 kulcsokat használunk a projekthez SHA-512 algoritmussal.
(A githubra feltett kulcsok teszt kulcsok és értékek)

- AES titkosítást használunk adatbázisba, olyan adatok titkosítására mint uuid, refreshtoken stb

- A jelszavak titkosítására Argon2 hash metódust használunk, ez jelenleg az egyik legmodernebb megoldás, és jelenlegpraktikus is, mert a Bun beépítetten támogatja.

#### Notes:

RSA public-priv kulcs használata frontendről érkező adatok titkosítására, frontenden titkosítjuk privát kulcssal, backenden decodeoljuk. (pl ilyen a login információk, email, password stb)

AES: refresh_token, uuid tárolása adatbázisban (olyan adatok, amiket csak backend használ pl adatbázisba tárol)