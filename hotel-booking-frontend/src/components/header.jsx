/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleMediaQueryChange = (event) => {
    if (event.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");

    // Add the event listener using addEventListener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Initial call to the callback
    handleMediaQueryChange(mediaQuery);

    // Remove the event listener when the component unmounts
    return () => {
      // Remove the event listener using removeEventListener
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
      <img src={require("../assets/logo.png")} className="Logo" alt="logo"  />
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/addroom">Rent Your Room</a>
          <a href="/">Your Bookings</a>
          <a href="/">About</a>
          <a href="/">Your Profile</a>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="Burger">
        🍔
      </button>
    </header>
  );
}
