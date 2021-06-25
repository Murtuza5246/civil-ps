import React, { useState, useEffect } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import classes from "./scrolTop.module.css";

const ScrollTopArrow = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <FaArrowCircleUp
      className={classes.scrollTop}
      onClick={scrollTop}
      style={{
        height: 40,
        display: showScroll ? "flex" : "none",
        color: "#005086",
      }}
    />
  );
};

export default ScrollTopArrow;
