# Backend API 

| **HTTP Method**|**Path**| **Request Body**| **Headers**| **Comments**|
|----------------|--------|-----------------|------------|-------------|
| GET            | `/auth/pk` | None | None | Publikus kulcs lekérése az RSA titkosításhoz.
| POST           | `/auth/register`| **RSA encrypted body:** encryptedData : (name: string;, email: string;, password: string;, passwordre: string;) | None | Regisztráció RSA-OAEP-el és a public key-el titkosítva, base64 kódolású szöveget vár, benne a fent említett mezőkkel, json formátumban.
| POST | `/auth/login` | **RSA encrypted body:** encryptedData : (email: string;, password: string;) | None | Lekérhetjük az access tokent, amivel hitelesíthetjük a felhasználót. A kérés felépítése RSA titkosított, a /register-hez hasonlóan.
| GET | `/auth/verify-mail/check?code=VERIFYCODE` | None | None | Ellenőrizzük hogy az adott kód él-e még.
| GET | `/auth/verify-mail/link?code=VERIFYCODE` | None | None | Ezt a végpointot meghívva vissza igazolhatjuk az adott kódhoz tartozó account regisztrációját.
| GET | `/auth/verify-mail/remove?code=VERIFYCODE` | None | None | Ezt a végpointot meghívva törölhetjük az adott kódhoz tartozó regisztráció adatait.
| GET | `/user/profile` | None | Authorization: Bearer [token] | Lekérhetjük a felhasználó profil adatait.
| GET | `/user/kreta/institutions` | None | None | Kréta intzmények lekérése a hivatalos kréta APIról.
| POST | `/gemini-models/chat` | message: string;, person: string;, history: Content[]; | Authorization: Bearer [token] | Kérdezhetünk az AI profiloktól.
| POST | `/auth/password-reset` | password: string;, code: string; | None | Felhasználó jelszó visszaállítása.
| POST | `/auth/password-request` | email: string;, verifyUrl: string; | None | Felhasználó jelszó visszaállítási email kérése az adott címre. 
| POST | `/user/pfp` | pfpBase64: string; | Authorization: Bearer [token] | Felhasználó profilképének base64 kódolású blob-ja, vagy null.
| POST | `/user/details` | name: string; email: string; institution: string vagy null; country: string vagy null; language: string vagy null; classroom: string vagy null; | Authorization: Bearer [token] | Profil adatok frissítése.
| POST | `/forum/profiles` | profileIds: number[]; | Authorization: Bearer [token] | A body-ban átadott profilok nevének és profilképének lekérése.
| POST | `/forum/send` | message: string; | Authorization: Bearer [token] | Üzenet küldése a fórumra.
| GET | `/forum/messages` | None | Authorization: Bearer [token] | Üzenetelőzmények lekérése.
| GET | `/forum/new` | None | Authorization: Bearer [token] | Új üzenet lekérése. *Long polling request:* Amennyiben új üzenet érkezik, azt ezen a végponton kérhetjük le, amíg nem érkezik üzenet, a kérés *polling* állapotban lesz, egészen 90 másodpercig, majd ez után 204 HTTP kóddal visszatér. Ekkor új kérést intézhetünk a végpont felé.
| POST | `/user/deactivate` | None | Authorization: Bearer [token] | A tokenhez kapcsolódó felhasználói fiók deaktiválása.
| GET | `/user/reactivate?code=VERIFYCODE&redirect=TARGET_SITE` | None | None | Az emilben kapott linkkel újra aktiválhatja a fiókját. A link tartalmazza a fiók egyedi megerősítőkódját, és a cél oldal linkjét.
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

### `credentials` tábla

| **id** | **emailHash** | **email** | **username** | **passHash** | **timeCreated** | **isActive** | **failedAttempts** | **lastLogin** | **role** | **mgmtToken** | **twofaSecret** |
|--------|--------------|-----------|--------------|--------------|----------------|-------------|------------------|------------|------|------------|-------------|
| INTEGER AUTOINCREMENT | TEXT UNIQUE | TEXT | TEXT | TEXT | INTEGER (strftime('%s', 'now')) | NUMERIC DEFAULT FALSE | INTEGER DEFAULT 0 | INTEGER | TEXT DEFAULT 'user' | TEXT | TEXT |

### `profileDetails` tábla

| **id** | **country** | **pictureBase64Url** | **pfpBase64Urlx128** | **lang** | **institution** | **class** | **credentialsId** |
|--- | --- | --- | --- | --- | --- | --- | --- |
| INTEGER AUTOINCREMENT | TEXT | TEXT | TEXT | TEXT | TEXT | TEXT | INTEGER UNIQUE |

A két tábla között ON DELETE CASCADE kapcsolat van, a profileDetails.credentialsId kapcsolódik a credentials.id-hez.

### `forumMessages` tábla
| **id** | **message** | **timeSent** | **credentialsId** |
|--------|----------|------------|-------------|
| INTEGER AUTOINCREMENT | TEXT | INTEGER | INTEGER UNIQUE |

A forumMessages.credentialsId kapcsolódik a credentials.id-hez.

## Tiktoksítás:

Az adatok titkosításához több eszközt használok. 
- RSA kulcsok. Az RSA alapú titkosítást arra használjuk, hogy frontenden titkosítjuk az adatot, majd backenden feldolgozzuk és eltároljuk a titkosított adatot. RSA-3072 kulcsokat használunk a projekthez SHA-512 algoritmussal.
(A githubra feltett kulcsok teszt kulcsok és értékek)

- A jelszavak titkosítására Argon2 hash metódust használunk, ez jelenleg az egyik legmodernebb megoldás, és jelenlegpraktikus is, mert a Bun beépítetten támogatja.

#### Notes:

RSA public-priv kulcs használata frontendről érkező adatok titkosítására, frontenden titkosítjuk privát kulcssal, backenden decodeoljuk. (pl ilyen a login információk, email, password stb)
Gemini API információk: https://ai.google.dev/gemini-api/docs/models/gemini
