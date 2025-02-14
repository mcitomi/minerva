import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Login, Registration, NotFound, MyProfile, MInerva } from "./pages/router.js";

import MainNavbar from "./components/MainNavbar.jsx";
import SupportUs from "./components/SupportUs.jsx";
import Footer from "./components/Footer.jsx";

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

    //Névtelen függvény, amely módosítja a módot:
    const toggleMode = () => {
        setIsDarkMode((prevMode) => {
            //Megfordítjuk a módot (pl.: sötétből világos, világosból sötét):
            const newMode = !prevMode;
            //Ha sötét, akkor legyen világos, ha világos, akkor legyen sötét:
            localStorage.setItem("mode", newMode ? "dark" : "light");
            return newMode;
        });
    };

    //A body osztályát módosítjuk:
    useEffect(() => {
        document.body.className = isDarkMode ? "dark" : "light";
        //Ha az isDarkMode értéke megváltozik, akkor újra lefut:
    }, [isDarkMode]);

    /*
        Az első paraméter egy függvény, amely az effect-ket tartalmazza, míg a második paraméter egy tömb (dependency array), amelyben megadhatjuk azokat a változókat, amelyeket figyelni szeretnénk.
        useEffect(setup, dependencies?)

        Különböző effect-ek végrehajtására jó pl.: API hívások végrehajtása, osztályok eltávolítása és hozzáadása ( => Amire használtam - Joci).

        Forrás: https://react.dev/reference/react/useEffect
    */

    return (
        <Router>
            <MainNavbar toggleMode={toggleMode} isDarkMode={isDarkMode}></MainNavbar>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/registration" element={<Registration></Registration>}></Route>
                <Route path="/myprofile" element={<MyProfile></MyProfile>}></Route>
                <Route path="/minerva" element={<MInerva></MInerva>}></Route>
                {/* Ide a többi oldalt */}
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
            <SupportUs></SupportUs>
            <Footer></Footer>
        </Router>
    );
}