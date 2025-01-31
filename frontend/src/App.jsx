import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Login, Registration, Shop ,NotFound } from "./pages/router.js";
import MainNavbar from "./components/MainNavbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export default () => {
    return (
        <Router>
            <MainNavbar></MainNavbar>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/registration" element={<Registration></Registration>}></Route>
                <Route path="/shop" element={<Shop></Shop>}></Route>
                {/* Ide a többi oldalt */}
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </Router>
    );
}