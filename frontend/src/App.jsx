import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, NotFound } from "./pages/index.js"

export default () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
                {/* Ide a többi oldalt */}
                <Route path="*" element={<NotFound></NotFound>}></Route>
            </Routes>
        </Router>
    );
}