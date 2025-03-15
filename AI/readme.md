### Adat finomhangolás:

Az adatokat kérdés-válasz formában gyűjtöttük ki, pl:
```json
{"text":"Mikor és hol született Petőfi Sándor?"},
{"text":"1823. január 1-jén született Kiskőrösön."},
```

Ezek után, a `converter.ts` modullal átalakítjuk a következő formátumba:
```json
{
    "role": "user",
    "parts": [
        {
            "text": "Mikor és hol született Petőfi Sándor?"
        }
    ]
},
{
    "role": "model",
    "parts": [
        {
            "text": "1823. január 1-jén született Kiskőrösön."
        }
    ]
}
```
Így már a Gemini AI is könnyen értelmezni tudja az adatokat.

### Converter használata:
Ebben az `AI` mappában nyitunk egy parancssort, és futtatjuk ezt a parancsot:
```cli
bun converter.ts <json file neve>
```
A kimeneti fájl meg fog jelenni a mappában `<json file neve>-CONVERTED.json` néven.