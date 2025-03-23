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
- Mikor regisztrál a felhasználó történjen valami, legalább írja mit kell tenni, változzon a kijelző stb valami visszajelés, loginnál szintén nem történik semmi. -> Tájékoztatni az usert hogy nézze meg az emaileket stb!! ---> oldal váltás van jelenleg
- Jelszó change-re csak egy gomb, ami elküld a backendnek egy jelszó-visszaállítás requestet. Fiók deaktiválásra szintén.
- Betti: Login, Register és AI oldalakon a kapott hibaüzeneteket lemagyarosítani frontenden, és alertben jelenjenek meg. pl: (régebbi useless alerteket kommenteld ki)!!!
  ```
  // react states:
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  // ellenőrzések, minden esetre üzenetre külön (backendről jövő üzenetek)
  if((await response.json()).message.includes("Too Many Request")) {
      setErrorMessage("Túl sok kérés... Próbáld újra később.");
      setShowErrorAlert(true);
  }

  // beszúrás az oldalba
  {showErrorAlert && <ErrorAlert title={"Sikertelen bejelentkezés!"} text={errorMessage} />}
  ```
- !! -> Ha valamelyik authorizationt igénylő fetch 401 vagy 403-as státusz kóddal tér vissza (azaz invalid a token) irányítsa át az embert a /login fülre (navigate react router modul), és így kap egy új érvényes tokent. pl fórumon, profilon
- !! -> Amikor megnyitunk egy AI chatet, az küldjön valami üdvöző üzenetet (egy fetch kérés a backedn felé egyből oldal betöltődés után valami szöveggel pl "szia")
- Dizájn ötlet: A bejelentkezés/register/adataim formokat kicsit lekerekíteni, kicsit bután néz ki sötét módban (https://imgur.com/42UVX60) ---> ???
- Betti: Dc szerver, insta, fb csoport kép feltöltése, bio megírása, discordon csatornák.
- Videó, amikor jó az idő!!!
- Alert, figyelemfelhhívás hogy "ai generált tartalom" vagy stb
- Figyelemfelhívás, hogy pl "ha a fórumon chatelsz a felhasználóneved és profilképed mások is láthatják" ilyesmik
- Adatvédelmi tájékoztató oldal. + szöveg (chatgpt) - máté adta példa: https://t3.chat/privacy-policy
- cookie popup figyelmeztetés

#### Teszterek amiket észrevettek:
- Telefonon nem reszponziv, főleg a rólunk rész
- Darkmodeba világos marad pl a navbár színei, zavaro a rosszabb szemű felhasználóknak.
- tenyleg nem reszponzív a chat része, kilóg a képből vagy az input, vagy az új üzenet (https://imgur.com/IbvhioS)

Backend:
- profile deaktiválás endpoint

AI:
- RÁKÓCZI FERENCBŐL A MÁSODIK KELL!!! (II. Rákóczi Ferenc)
- új emberek megírása: Arany János, Babits Mihály, József Attila, Kosztolányi Dezső, Madách Imre, Bolyai Farkas, Pólya György, Túrán Pál, Horthy Miklós, Eötvös Lóránd, Hunyadi János, Kossuth Lajos, Mátyás király, Rákóczi Ferenc, Zrinyi Miklós, Klein Gyula,  + amik még hiányoznak: Kölcsey Ferenc, Minervához bővebb infó az oldalrol pl, Neumann, Szecshenyi

Továbbfejlesztési lehetőség:
- Logoutnál küld egy kérést egy backend endpointra, a backend azt a tokent blacklistre rakja (amig le nem jár, decrypttoken.exp)
- Pontgyűjtési rendszer vagy jutalmak beépítése a tanulási folyamat ösztönzésére
- Partnerségek iskolákkal és egyetemekkel (krétával)
- ✅ Email spam elleni védelem, egy féle timeout rendszer, pl ha az ember 2x gyorsan kattint egy gombra, ne lehessen új emailt lekérni, pl csak fél perc múlva - DONE
- Discord integráció, fórum chat discord-web crossplatform
- Discord profil hozzákötése a webes fiókhoz (well csináltam mar ilyet, iagazbol ctrlc ctrlv meg van írva)
- RSS feed, posztokat facebookrol, instárol innen onnan összegzi egy oldalon
- Chat beszélgetések mentése localsotrage vagy adatbázisba, onnan lekérdezni a chat "topic"okat
- Email cím csere rendszer. (cím váltás esetén szükséges megerősítő email, addig várakozó státuszba kell rakni stb..)
- Jobb UI a fórumnak
- Backend blacklist a fórumra (csúnya szavakat ne engedjen ki) - HTTP/1.1 406 Not Acceptable
- Server side slowmode (/profil)
