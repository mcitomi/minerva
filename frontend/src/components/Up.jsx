import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "../styles/up.css";
import "../styles/main.css";

export default () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        setIsVisible(window.scrollY > 300);
    }

    const scrollToTop = () => {
        const scrollStep = -window.scrollY / 15;
        const scrollInterval = requestAnimationFrame(function step() {
            if (window.scrollY > 0) {
                window.scrollBy(0, scrollStep);
                requestAnimationFrame(step);
            }
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <>
        {isVisible && (
            <Button className="scroll-to-top" onClick={scrollToTop} variant="warning" style={{fontFamily: 'Pacifico', fontSize: "20px"}}>Fel!</Button>
        )}
        </>
    );
}