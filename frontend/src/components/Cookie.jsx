import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function CookiePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookieAccepted")) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.9)", // Fekete, átlátszó háttér
          color: "#fff",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Árnyék
          display: "flex",
          alignItems: "center",
          gap: "15px",
          maxWidth: "80%",
          zIndex: "1000",
        }}
      >
        <p style={{ margin: 0 }}>Ez a weboldal sütiket használ a jobb felhasználói élmény érdekében, az oldal további használatával ezt automatikusan elfogadja.</p>
        <Button variant="warning" onClick={acceptCookies} >Elfogadom</Button>
      </div>
    )
  );
}




