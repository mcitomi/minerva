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
- Mikor regisztrál a felhasználó történjen valami, legalább írja mit kell tenni, változzon a kijelző stb valami visszajelés.
- Navigáció megjelenítése bejelentkezett usereknek
- JWT token kezelése frontenden
- AI beszélgetős endpoint fetchek
- Passwordreset page (két password input: password és password megerősítés, után elküldés backendre)
- Profil adatok lekérése, kitöltése és feltöltése, profilkép feltöltés a /my-profile oldalon
- Endpointok levédése legalább annyival, hogy ha nincs valid token akkor visszadob a login oldalra
- 

Backend:
- AI endpointok kezelese, gemini api kezelés
- Adatmodellek betöltése, külön profilba szervezés, szemelyiseg beállítás
- password reset flow befejezése
