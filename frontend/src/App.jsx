import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, About, Login, Registration ,NotFound } from "./pages/index.js"

export default () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/registration" element={<Registration></Registration>}></Route>
                {/* Ide a többi oldalt */}
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </Router>
    );
}