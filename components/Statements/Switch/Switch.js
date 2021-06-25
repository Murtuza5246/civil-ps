import React, { Component, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Menu } from "semantic-ui-react";

const Switch = (props) => {
  const [activeItem, setActiveItem] = useState("General");
  const authType = useSelector((state) => state.user.authType);
  const composeHandler = useSelector((state) => state.user.composeHandler);

  const handleItemClick = (e, { name }) => {
    props.switchChangeHandler(name);
    setActiveItem(name);
    window.history.pushState(null, null, `?tab=${name}`);
  };
  useEffect(() => {
    if (getParameterByName("tab")) {
      if (!composeHandler && getParameterByName("tab") === "Identifier") {
        setActiveItem("General");
        props.switchChangeHandler("General");
      } else {
        setActiveItem(getParameterByName("tab"));
        props.switchChangeHandler(getParameterByName("tab"));
      }
    }
    if (getParameterByName("posts") && composeHandler) {
      setActiveItem("Identifier");
      props.switchChangeHandler("Identifier");
    }
    if (getParameterByName("learnerPost")) {
      setActiveItem("Learner");
      props.switchChangeHandler("Learner");
    }
  }, [composeHandler]);
  useEffect(() => {
    if (
      authType === "Identifier" &&
      !getParameterByName("posts") &&
      !getParameterByName("tab") &&
      !getParameterByName("learnerPost")
    ) {
      setActiveItem("Identifier");
      props.switchChangeHandler("Identifier");
    }
    if (
      authType === "Professor" &&
      !getParameterByName("posts") &&
      !getParameterByName("tab") &&
      !getParameterByName("learnerPost")
    ) {
      setActiveItem("Learner");
      props.switchChangeHandler("Learner");
    }
  }, [authType]);
  const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    if (
      decodeURIComponent(results[2].replace(/\+/g, " ")) === "Identifier" ||
      decodeURIComponent(results[2].replace(/\+/g, " ")) === "General" ||
      decodeURIComponent(results[2].replace(/\+/g, " ")) === "Learner" ||
      decodeURIComponent(results[2].replace(/\+/g, " ")) === "Live"
    ) {
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    } else {
      return "General";
    }
  };

  return (
    <Menu tabular>
      <Menu.Item
        name={"General"}
        active={activeItem === "General"}
        onClick={handleItemClick}
      />
      {composeHandler && (
        <Menu.Item
          name="Identifier"
          active={activeItem === "Identifier"}
          onClick={handleItemClick}
        />
      )}
      <Menu.Item
        name="Learner"
        active={activeItem === "Learner"}
        onClick={handleItemClick}
      />
      <Menu.Item
        name={"Live"}
        active={activeItem === "Live"}
        onClick={handleItemClick}
      />
    </Menu>
  );
};

export default Switch;
