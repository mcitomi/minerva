import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Login, Registration, NotFound, MyProfile, MInerva, Petofi, Kolcsey, Bolyai, Neumann, Saint, Szechenyi, VerifyPage } from "./pages/router.js";

import MainNavbar from "./components/MainNavbar.jsx";
import SupportUs from "./components/SupportUs.jsx";
import Footer from "./components/Footer.jsx";
import LoggedNavbar from "./components/LoggedNavbar.jsx";
import Up from "./components/Up.jsx";

import "./styles/mode.css"

import "bootstrap/dist/css/bootstrap.min.css";

export default () => {
    //Állapota egy névtelen függvény:
    const [isDarkMode, setIsDarkMode] = useState(() => {
        //A localStorage-ból kiszedjük a módot (amit mentettünk):
        const savedMode = localStorage.getItem("mode");
        //Ha sötét, akkor igazat ad vissza, különben hamisat:
        return savedMode === "dark";
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

    return (
        <Router>
            <MainNavbar toggleMode={toggleMode} isDarkMode={isDarkMode}></MainNavbar>
            {/*<LoggedNavbar toggleMode={toggleMode} isDarkMode={isDarkMode}></LoggedNavbar>*/}
            <Up></Up>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/registration" element={<Registration></Registration>}></Route>
                <Route path="/my-profile" element={<MyProfile></MyProfile>}></Route>
                <Route path="/minerva" element={<MInerva></MInerva>}></Route>
                <Route path="/petofi-sandor" element={<Petofi></Petofi>}></Route>
                <Route path="/kolcsey-ferenc" element={<Kolcsey></Kolcsey>}></Route>
                <Route path="/bolyai-janos" element={<Bolyai></Bolyai>}></Route>
                <Route path="/neumann-janos" element={<Neumann></Neumann>}></Route>
                <Route path="/szent-istvan" element={<Saint></Saint>}></Route>
                <Route path="/szechenyi-istvan" element={<Szechenyi></Szechenyi>}></Route>
                <Route path="/verify-account" element={<VerifyPage/>}></Route>
                {/* Ide a többi oldalt */}
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
            <SupportUs></SupportUs>
            <Footer></Footer>
        </Router>
    );
}