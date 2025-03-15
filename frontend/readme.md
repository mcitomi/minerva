### Csatlakozás a backendhez:

Az frontend/src mappában található config.json fájlban van elmentve a backend elérési útja. 

config.json:
```json
{
    "API_URL" : "http://localhost:3030"
}
```

Ha a backendet a saját gépünkön futtatjuk akkor azt a  `http://localhost:3030`-as url címen tudjuk elérni, de ha nem szeretnénk futtatni a backendet, csaktalkozhatunk a nyilvános API szerverünkhüz, ami a `https://api.edu-minerva.hu` címen fut, ekkor csak egyszerűen írjuk át a konfigurációs fájlt.

### Frontend: Fetch hívások elérése:

Amelyik fájlban fetch kérést szeretnénk végrehajtani, ott be kell importálnunk a config.json fájlt, és a `${CONFIG.API_URL}/elérési-pont` címen elérhetjük a kívánt forrást.

Az importálás mindig relatív elérési utat használ, ami azt jelenti, hogy az adott fájltól számítva kell navigálni. A példában a `../config.json` előbb fellép egy mappát, és abból hívja be a configot. Két mappát például a következőképpen léphetünk feljebb: `../../config.json`.

Példa az AI.jsx komponensből:

```js
import CONFIG from "../config.json";

const response = await fetch(
    `${CONFIG.API_URL}/gemini-models/chat`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            message: question,
            person: personName,
            history: newHistory
        })
    }
);
```
Így mindig elérhetjük az aktuálisan válaszotott backendet.