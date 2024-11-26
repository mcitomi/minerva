This project was created using `bun init` in bun v1.1.xx. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

# Backend API 

| **HTTP Method**|**Path**| **Request Body**| **Headers**| **Comments**|
|----------------|--------|-----------------|------------|-------------|
| GET            | `/test/ping`| None  | None | Ellenőrizhetjük hogy él-e a backend |

## Szerver:

A Bun futtatókörnyezetbe épített `Bun.Serve` funkciót hasznátam egy gyors és egyszerű HTTP szerver létrehozásához.
Hasonlóan az Expresshez, ez is egy megadott porton fut és fogad kéréseket.
Bun esetében nem szükséges json vagy bodyparser middleware, ezeket alapból tudja.
Egyszerre kezelünk websocket és http kéréseket is.

## Backend router felépítés:

A http kérések kezelésére egy requesthandlert használunk, ez futtatja a megfelelő modulokat a kérések kiszolgálásához.

Az src/routes mappában helyezkednek el az API elérési pontok, amik a routes mappában találhatóak metódus szerint csoportosítva.

Pl.: az src/routes/get/test/ping.ts endpont az interneten egy get kéréssel lesz elérhető, a `http(s)://<host>/test/ping` linken.

