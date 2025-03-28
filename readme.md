# Olvass el!
__Globális leírás a projektről, megjegyzések:__

- A frontendhez hozzáadtam egy `config.json` fájlt, ami tartalmazza a backend linkjét. Ez azért fontos, mert fejlesztői környezetben, localhoston más a link mint éles domainen. **Ha bármilyen kérést akarunk intézni a backend felé, azt olyan módon kell megtenni, ahogy a `Registration.jsx` fájlba** írtam példaként. 

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

## ToDo:
### Egy-két plusz ami még jó lenne ha működne: 
Frontend:
- Betti: Dc szerver, insta, fb csoport kép feltöltése, bio megírása, discordon csatornák.
- Videó, amikor jó az idő!!!

#### Teszterek amiket észrevettek:
- Darkmodeba világos marad pl a navbár színei, zavaro a rosszabb szemű felhasználóknak.

Backend:
- o.O

AI:
- RÁKÓCZI FERENCBŐL A MÁSODIK KELL!!! (II. Rákóczi Ferenc)
- új emberek megírása: József Attila, Kosztolányi Dezső, Madách Imre, Bolyai Farkas, Pólya György, Horthy Miklós, Eötvös Lóránd, Hunyadi János, Kossuth Lajos, Mátyás király, Rákóczi Ferenc, Zrinyi Miklós, Klein Gyula, + amik még hiányoznak: Kölcsey Ferenc, Minervához bővebb infó az oldalrol pl, Neumann, Szecshenyi

Továbbfejlesztési lehetőség:
- Logoutnál küld egy kérést egy backend endpointra, a backend azt a tokent blacklistre rakja (amig le nem jár, decrypttoken.exp)
- Pontgyűjtési rendszer vagy jutalmak beépítése a tanulási folyamat ösztönzésére
- Discord profil hozzákötése a webes fiókhoz.
- RSS feed, posztokat facebookrol, instárol innen onnan összegzi egy oldalon
- Chat beszélgetések mentése localsotrage vagy adatbázisba, onnan lekérdezni a chat "topic"okat
- Email cím csere rendszer. (cím váltás esetén szükséges megerősítő email, addig várakozó státuszba kell rakni stb..)
- Server side slowmode (/forum -> message)

- 🟨 Partnerségek iskolákkal és egyetemekkel (krétával)

- ✅ Discord integráció, fórum chat discord-web crossplatform
- ✅ Backend blacklist a fórumra (csúnya szavakat ne engedjen ki) - HTTP/1.1 406 Not Acceptable
- ✅ Email spam elleni védelem, egy féle timeout rendszer, pl ha az ember 2x gyorsan kattint egy gombra, ne lehessen új emailt lekérni, pl csak fél perc múlva - DONE
