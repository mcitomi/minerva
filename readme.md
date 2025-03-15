# Olvass el!
__Globális leírás a projektről, megjegyzések:__

- A frontendhez hozzáadtam egy `config.json` fájlt, ami tartalmazza a backend linkjét. Ez azért fontos, mert fejlesztői környezetben, localhoston más a link mint éles domainen. **Ha bármilyen kérést akarunk intézni a backend felé, azt olyan módon kell megtenni, ahogy a `Registration.jsx` fájlba** írtam példaként. 

- Későbbi config adatokat is írjuk bele a config.json-be, ilyen például a port, esetleg egyéb érzékeny adatok.

- **Adatok / elemek amiket le kell kérni majd a backendről:**
    - Navigációs menü elemei, accounttól / bejelentkezéstől függ majd milyen menüpontok jelenhetnek meg, ezért ezeket le kell majd kérni és úgy megjeleníteni.
    - Felhasználó neve, profilképe, adatai, személyes beállításai (pl sötétmód) , chatjei, előzményei, barát/osztály lista stb, *(hitelesítés minden kérésnél/weboldal megnyitáskor- ezt megcsinálom ~Tomi)*.
    - Egyéb ötletekre írok még endpointot.

## Project futtatása
### Frontend:
- Frontend mappába navigálva, futtassuk a következőket:
- `npm i` ~ feltelepíti a függőségeket
- `npm start` ~ elindítja a react-scripts-el a frontendet

### Backend:
- Backend mappába, futtassuk a következőket:
- `bun i` ~ feltelepíti a függőségeket
- `bun .` ~ elindítja a backend szervert az alapvető Bun futtatókörnyezettel

**A szerver endpointok a backend mappában a readme-ben felsorolva és részletezve megtalálhatóak**


### Egy-két plusz ami még jó lenne ha működne: ToDo:
Frontend:
- Mikor regisztrál a felhasználó történjen valami, legalább írja mit kell tenni, változzon a kijelző stb valami visszajelés, loginnál szintén.
- Ha az oldal alján vagy, és váltasz egy másik oldalra, annak is az alját fogja megjeleníteni és nem ugrik felülre
- Passwordreset page (két password input: password és password megerősítés, után elküldés backendre)
- Profil adatok lekérése, kitöltése és feltöltése, profilkép feltöltés a /my-profile oldalon. 
- Endpointok levédése legalább annyival, hogy ha nincs valid token akkor visszadob a login oldalra (profil oldalnál már csak)
- Betti: Login, Register és AI oldalakon a kapott hibaüzeneteket lemagyarosítani. pl:
  ```
  if((await response.json()).message.includes("Too Many Request")) {
      alert("Túl sok kérés... Próbáld újra később.");
  }
  ```
- Ha valamelyik authorizationt igénylő fetch 401 vagy 403-as státusz kóddal tér vissza (azaz invalid a token) irányítsa át az embert a /login fülre (window.location.href = "/login"), és így kap egy új érvényes tokent.

Backend:
- password reset flow befejezése
- /profile update, kép feltöltés, adat mentés megírása
- HA nincs aktiválva a profil, és loginnál rányom az elfelejtettem a jelszavam gombra, akkor azzal az emaillel egyben be is aktiválja a fiókot / megerősiti a reg-et.
