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
- Betti: Passwordreset page (két password input: password és password megerősítés, után elküldés backendre)
- Profil adatok lekérése és megjelenítése mikor betölt az oldal, kitöltése módosítás gomb után és feltöltése, profilkép feltöltés a /my-profile oldalon. ---> félig kész
- Endpointok levédése legalább annyival, hogy ha nincs valid token akkor visszadob a login oldalra (profil oldalnál már csak) (window.location.href = "/login").
- Betti: Login, Register és AI oldalakon a kapott hibaüzeneteket lemagyarosítani. pl: (régebbi useless alerteket kommenteld ki)
  ```
  if((await response.json()).message.includes("Too Many Request")) {
      alert("Túl sok kérés... Próbáld újra később.");
  }
  ```
- Ha valamelyik authorizationt igénylő fetch 401 vagy 403-as státusz kóddal tér vissza (azaz invalid a token) irányítsa át az embert a /login fülre (window.location.href = "/login"), és így kap egy új érvényes tokent.
- Amikor megnyitunk egy AI chatet, az küldjön valami üdvöző üzenetet (egy fetch kérés a backedn felé egyből oldal betöltődés után valami szöveggel pl "szia")
- Bug: A bejelentkezett Navbar lenyíló menüje sötét módban összeolvad a szöveggel, mert a felirat is szürke/sötét mint a háttér
- Dizájn ötlet: A bejelentkezés/register/adataim formokat kicsit lekerekíteni, kicsit bután néz ki sötét módban (https://imgur.com/42UVX60) ---> ???
- Dizájn ötlet 2: Sima javascript alertek helyett felugró bootstrap modal komponens letrehozasa, es abban megjeleniteni az adatokat (a komponensnek átadjuk az adatokat amiket meg kell jelenitsen) ---> ne modal legyen, van jobb ötletem!
 #### Teszterek amiket észrevettek:
- Telefonon nem reszponziv, főleg a rólunk rész
- text area lehetne a chateknél
- legördülő beszélgess fülön belül az emberek nevei bx el van csúszva
- támogass gomb valahova vezessen - revolut link https://www.revolut.me/mcitomi/
- linkek lent (dc, insta stb)
- email -> support@edu-minerva.hu
- fiók adatok (a forráskódban hagytam commentet rá)
- szendvics menű színe legyen más, nem látható telefonon
- jobb visszajelzés reg, login stb után

Backend:
- password reset flow befejezése
- /profile update, kép feltöltés, adat mentés megírása
- HA nincs aktiválva a profil, és loginnál rányom az elfelejtettem a jelszavam gombra, akkor azzal az emaillel egyben be is aktiválja a fiókot / megerősiti a reg-et.
