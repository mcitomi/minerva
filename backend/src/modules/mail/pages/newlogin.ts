export default (username: string, ip: string, time: number, device: string) => {
    return `
    <!DOCTYPE html>
    <html lang="hu">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Regisztráció megerősítése</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');

            body {
                font-family: 'Lora', serif;            
                margin: 0;
                padding: 20px;
                text-align: center;
                background: linear-gradient(to right, #ffbd59, #d3eefd, #a7d5fb, #83b8e3, #699fcb, #46789a, #263557, #002333);
            }
            
            .container {
                max-width: 600px;
                margin: auto;
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }

            h1 {
                font-family: 'Pacifico', cursive;
                text-decoration: underline gold 8px;
            }

            h3 {
                margin-top: 50px;
            }

            .button {
                font-family: 'Pacifico', cursive;
                display: inline-block;
                padding: 5px 15px;
                margin: 10px 0 30px 0;
                background-color: #ffc107;
                color: black;
                text-decoration: none;
                border-radius: 5px;
                font-size: 20px;
            }

            .us {
                margin-top: 20px;
                font-style: italic;
                text-align: end;
            }

            .footer {
                margin-top: 50px;
                color: grey;
            }

            @media (max-width: 600px) {
                .container {
                    padding: 10px;
                }

                .button {
                    font-size: 18px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Bejelentkezés új eszközről</h1>
            <h3>Kedves ${username}!</h3>
            <h4>Rendszerünk új bejelentkezést érzékelt az Ön fiókjába!</h4>
            <p>- Bejelentkezés időpontja: ${new Date(time * 1000).toLocaleString("hu-HU", {timeZone: 'Europe/Budapest'})}</p>
            <p>- Eszköz: ${device} böngésző.</p>
            <p>- IP címe: ${ip}</p>
            <p>Amennyiben nem Ön jelentkezett be a fiókjába, vegye fel velünk a kapcsolatot emailben vagy a hivatalos Discord szerverünkön!</p>
            <p class="us">Üdvözlettel,<br>A MInerva csapata</p>
            <div class="footer">
                <p>Ez az e-mail egy automatikus üzenet, ezért kérjük, ne válaszoljon rá! Kérdéseivel keressen minket a weboldalon feltüntetett e-mail címen!</p>
            </div>
        </div>
    </body>
    </html>
    `;
}