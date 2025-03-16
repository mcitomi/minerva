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
- Profil adatok lekérése és megjelenítése mikor betölt az oldal, kitöltése módosítás gomb után és feltöltése, profilkép feltöltés a /my-profile oldalon. ---> félig kész
- Profil adatoknál felvehető hogy milyen intézménybe / iskolába jár az ember egy legördülő menübe. (https://kretaglobalapi.e-kreta.hu/intezmenyek/kreta/publikus)jelszó input helyett: egy lenyitható search menü, ahonnan kiválasztható a krétás intézmény. (kb semmi nehezet nem kell hozzá frontenden írni azon kívül hogy kicserélni az input boxot, de nagyot dob az oldalon ithink). Pl a lakcím, város felvétele is useless.. Ország, nyelv, iskola, osztály felvétele tán hasznosabb
- !! -> Endpointok levédése legalább annyival, hogy ha nincs valid token akkor visszadob a login oldalra (profil oldalnál már csak) (window.location.href = "/login").
- Betti: Login, Register és AI oldalakon a kapott hibaüzeneteket lemagyarosítani. pl: (régebbi useless alerteket kommenteld ki)
  ```
  if((await response.json()).message.includes("Too Many Request")) {
      alert("Túl sok kérés... Próbáld újra később.");
  }
  ```
- !! -> Ha valamelyik authorizationt igénylő fetch 401 vagy 403-as státusz kóddal tér vissza (azaz invalid a token) irányítsa át az embert a /login fülre (window.location.href = "/login"), és így kap egy új érvényes tokent.
- !! -> Amikor megnyitunk egy AI chatet, az küldjön valami üdvöző üzenetet (egy fetch kérés a backedn felé egyből oldal betöltődés után valami szöveggel pl "szia")
- Bug: A bejelentkezett Navbar lenyíló menüje sötét módban összeolvad a szöveggel, mert a felirat is szürke/sötét mint a háttér
- Dizájn ötlet: A bejelentkezés/register/adataim formokat kicsit lekerekíteni, kicsit bután néz ki sötét módban (https://imgur.com/42UVX60) ---> ???
- Dizájn ötlet 2: Sima javascript alertek helyett felugró bootstrap modal komponens letrehozasa, es abban megjeleniteni az adatokat (a komponensnek átadjuk az adatokat amiket meg kell jelenitsen) ---> ne modal legyen, van jobb ötletem!
- Fórum oldal kinézet (ugyan az mint a chat kb, csak itt az emberek egymás írását látják)
- Bankkártya gomb helyett inkább támogatás, és átirányít https://buymeacoffee.com/eduminerva (a közös emailre van csinálva)
  
#### Teszterek amiket észrevettek:
- Telefonon nem reszponziv, főleg a rólunk rész
- text area lehetne a chateknél
- legördülő beszélgess fülön belül az emberek nevei bx el van csúszva ---> ennek színei folyamatban
- támogass gomb valahova vezessen - revolut link https://www.revolut.me/mcitomi/
- linkek lent (dc, insta stb) -> Custom discord link: https://dc.edu-minerva.hu/
- email -> support@edu-minerva.hu
- fiók adatok (a forráskódban hagytam commentet rá)
- szendvics menű színe legyen más, nem látható telefonon
- jobb visszajelzés reg, login stb után

Backend:
- /profile update, kép feltöltés, adat mentés megírása - adatbázis módosítás, kréta intézmény mentésre.
- Fórum GET messages (utosó 100 mondjuk) POST új üzenet

AI:
- új emberek megírása: Ady Endre, Arany János, Babits Mihály, József Attila, Kosztolányi Dezső, Madách Imre, Bolyai Farkas, Erdős Pál, Lovász László, Pólya György, Szemerédi Endre, Túrán Pál, Horthy Miklós, Hunyadi János, Kossuth Lajos, Mátyás király, Rákóczi Ferenc, Zrinyi Miklós + amik még hiányoznak: Bolyai János, Kölcsey Ferenc, Minervához bővebb infó az oldalrol pl, Neumann, Szecshenyi

Továbbfejlesztési lehetőség:
- Logoutnál küld egy kérést egy backend endpointra, a backend azt a tokent blacklistre rakja (amig le nem jár, decrypttoken.exp)
- Pontgyűjtési rendszer vagy jutalmak beépítése a tanulási folyamat ösztönzésére
- Partnerségek iskolákkal és egyetemekkel (krétával)
- Email spam elleni védelem, egy féle timeout rendszer, pl ha az ember 2x gyorsan kattint egy gombra, ne lehessen új emailt lekérni, pl csak fél perc múlva
