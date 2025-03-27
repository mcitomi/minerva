import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

export default function ForumAlert() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("forumAccepted")) {
      setIsVisible(true);
    }
  }, []);

  const acceptForum = () => {
    sessionStorage.setItem("forumAccepted", "true");
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
          background: "rgba(0, 0, 0, 0.9)", 
          color: "#fff",
          padding: "15px 20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", 
          display: "flex",
          alignItems: "center",
          gap: "15px",
          maxWidth: "80%",
          zIndex: "1000",
        }}
      >
        <p style={{ margin: 0 }}>Psszt..! A fórumon minden felhasználó láthatja a felhasználóneved, profilképed és az üzeneted, csevegj tudatosan.</p>
        <Button variant="warning" onClick={acceptForum} >Elfogadom</Button>
      </div>
    )
  );
}




