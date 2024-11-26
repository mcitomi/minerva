import { API_URL } from "../../config.json";

async function apiExample() {
    const request = await fetch(API_URL + "/auth/registration", {   // az API_URL után írjuk az adott endpointot, ami a backend fogad. (Ez nem változik) Az endpointot a backend adja meg, rossz endpoint esetén 404-es státusszal visszatér.
        method: "post",
        header: {
            "Content-Type": "application/json"
        },
        body: ""
    });
}

export default () => {
    return <h1>Regisztráció</h1>;
}