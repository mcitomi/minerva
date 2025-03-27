import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Login, Registration, NotFound, MyProfile, MInerva, Ady, Arany, Babits, Jozsef, Kosztolanyi, Kolcsey, Madach, Petofi, BolyaiFarkas, BolyaiJanos, Eotvos, Erdos, Klein, Neumann, Polya, Turan, Horthy, Hunyadi, Kossuth, Matyas, Rakoczi, Szechenyi, Saint, Zrinyi, VerifyPage, Forum, Privacy } from "./pages/router.js";
import { useLocation } from 'react-router-dom';

import MainNavbar from "./components/MainNavbar.jsx";
import SupportUs from "./components/SupportUs.jsx";
import Footer from "./components/Footer.jsx";
import LoggedNavbar from "./components/LoggedNavbar.jsx";
import Up from "./components/Up.jsx";


import "./styles/mode.css"

import "bootstrap/dist/css/bootstrap.min.css";
import PasswordReset from "./pages/PasswordReset.jsx";

function Top() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

export default () => {
    //Állapota egy névtelen függvény:
    const [isDarkMode, setIsDarkMode] = useState(() => {
        //A localStorage-ból kiszedjük a módot (amit mentettünk):
        const savedMode = localStorage.getItem("mode");
        //Ha sötét, akkor igazat ad vissza, különben hamisat:
        return savedMode === "dark";
    });

    const [isLogged, setIsLogged] = useState(() => {
        return !!localStorage.getItem("token");
    });

    useEffect(() => {   // futás után megvizsgáljuk a változót
        if (isDarkMode) {
            document.body.className = "dark";
        } else {
            document.body.className = "light";
        }
    }, [isDarkMode]); // akkor fusson le ha valtozik az isDarkMode valtozo

    //Function a sötét és világos mód váltására:
    function toggleMode() {
        //Ha sötét módban vagyunk:
        if (isDarkMode) {
            //Átállítjuk hamisra:
            setIsDarkMode(false);
            //LocalStorage-ba világos módot mentünk:
            localStorage.setItem("mode", "light");
            //A body-ra új osztály rakunk, mégpedig a világosat:
            document.body.className = "light";
        }
        //Ha világos módban vagyunk:
        else {
            //Átállítjuk igazra:
            setIsDarkMode(true);
            //LocalStorage-ba sötét módot mentünk:
            localStorage.setItem("mode", "dark");
            //A body-ra új osztályt rakunk, mégpedig a sötétet:
            document.body.className = "dark";
        }
    };

    const handleLoginSuccess = (token) => {
        setIsLogged(true);
        localStorage.setItem("token", token);
    };

    const handleLogout = () => {
        setIsLogged(false);
        localStorage.removeItem("token");
    }
    
    return (
        <Router>
            {isLogged ? (<LoggedNavbar toggleMode={toggleMode} isDarkMode={isDarkMode} handleLogout={handleLogout}></LoggedNavbar>) : (<MainNavbar toggleMode={toggleMode} isDarkMode={isDarkMode}></MainNavbar>)}
            <Up></Up>
            <Top></Top>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}></Login>}></Route>
                <Route path="/registration" element={<Registration></Registration>}></Route>
                <Route path="/my-profile" element={<MyProfile handleLogout={handleLogout}></MyProfile>}></Route>
                <Route path="/minerva" element={<MInerva></MInerva>}></Route>
                <Route path="/ady-endre" element={<Ady></Ady>}></Route>
                <Route path="/arany-janos" element={<Arany></Arany>}></Route>
                <Route path="/babits-mihaly" element={<Babits></Babits>}></Route>
                <Route path="/jozsef-attila" element={<Jozsef></Jozsef>}></Route>
                <Route path="/kosztolanyi-dezso" element={<Kosztolanyi></Kosztolanyi>}></Route>
                <Route path="/kolcsey-ferenc" element={<Kolcsey></Kolcsey>}></Route>
                <Route path="/madach-imre" element={<Madach></Madach>}></Route>
                <Route path="/petofi-sandor" element={<Petofi></Petofi>}></Route>
                <Route path="/bolyai-farkas" element={<BolyaiFarkas></BolyaiFarkas>}></Route>
                <Route path="/bolyai-janos" element={<BolyaiJanos></BolyaiJanos>}></Route>
                <Route path="/eotvos-lorand" element={<Eotvos></Eotvos>}></Route>
                <Route path="/erdos-pal" element={<Erdos></Erdos>}></Route>
                <Route path="/klein-gyula" element={<Klein></Klein>}></Route>
                <Route path="/neumann-janos" element={<Neumann></Neumann>}></Route>
                <Route path="/polya-gyorgy" element={<Polya></Polya>}></Route>
                <Route path="/turan-pal" element={<Turan></Turan>}></Route>
                <Route path="/horthy-miklos" element={<Horthy></Horthy>}></Route>
                <Route path="/hunyadi-janos" element={<Hunyadi></Hunyadi>}></Route>
                <Route path="/kossuth-lajos" element={<Kossuth></Kossuth>}></Route>
                <Route path="/matyas-kiraly" element={<Matyas></Matyas>}></Route>
                <Route path="/rakoczi-ferenc" element={<Rakoczi></Rakoczi>}></Route>
                <Route path="/szechenyi-istvan" element={<Szechenyi></Szechenyi>}></Route>
                <Route path="/szent-istvan" element={<Saint></Saint>}></Route>
                <Route path="/zrinyi-miklos" element={<Zrinyi></Zrinyi>}></Route>
                <Route path="/verify-account" element={<VerifyPage/>}></Route>
                <Route path="/reset-password" element={<PasswordReset/>}></Route>
                <Route path="/forum" element={<Forum></Forum>}></Route>
                <Route path="/privacy" element={<Privacy></Privacy>}></Route>
                {/* Ide a többi oldalt */}
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
            <SupportUs></SupportUs>
            <Footer></Footer>
        </Router>
    );
}