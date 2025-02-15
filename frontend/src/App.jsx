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