import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";

export default () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home></Home>}></Route>
            </Routes>
        </Router>
    );
}