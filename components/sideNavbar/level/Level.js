import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actionCreator from "../../../redux/actions/index";
import classes from "./level.module.css";

const Level = () => {
  const authType = useSelector((state) => state.user.authType);
  const userId = useSelector((state) => state.user.userId);
  const level = useSelector((state) => state.user.level);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      authType === "Identifier" ||
      authType === "Admin" ||
      authType === "Professor"
    ) {
      return;
    } else if (authType === "Student") {
      if (userId) return dispatch(actionCreator.userLevelCheck(userId));
    } else {
      return;
    }
  }, [authType, userId]);

  let levelBadge = null;
  if (level === 0 && authType === "Student") {
    levelBadge = <span>Joined</span>;
  } else if (level === 1 && authType === "Student") {
    levelBadge = <span>Learner</span>;
  } else if (level > 1 && level <= 10 && authType === "Student") {
    levelBadge = <span>Member</span>;
  } else if (level > 10 && level <= 50 && authType === "Student") {
    levelBadge = <span>Utilizer</span>;
  } else if (level > 50 && level <= 100 && authType === "Student") {
    levelBadge = <span>Hard-worker</span>;
  } else if (level > 100 && level <= 500 && authType === "Student") {
    levelBadge = <span>Smart-worker</span>;
  } else if (level > 500 && level <= 1100 && authType === "Student") {
    levelBadge = <span>Smart engineer</span>;
  } else if (level > 1100 && level <= 2000 && authType === "Student") {
    levelBadge = <span>Problem solver</span>;
  } else if (level > 2000 && level <= 3000 && authType === "Student") {
    levelBadge = <span>Live Book</span>;
  } else if (level > 3000 && level <= 5000 && authType === "Student") {
    levelBadge = <span>Unbeatable</span>;
  } else if (level > 5000 && level <= 10000 && authType === "Student") {
    levelBadge = <span>Unstoppable</span>;
  } else if (level > 10000 && level <= 15000 && authType === "Student") {
    levelBadge = <span>Can do anything</span>;
  } else if (level > 15000 && level <= 25000 && authType === "Student") {
    levelBadge = <span>Gold of engineer</span>;
  } else if (level > 25000 && authType === "Student") {
    levelBadge = <span>Identifier</span>;
  } else if (authType === "Identifier") {
    levelBadge = <span>Identifier</span>;
  } else if (authType === "Professor") {
    levelBadge = <span>Professor</span>;
  } else if (authType === "Admin") {
    levelBadge = <span>Admin</span>;
  }
  if (userId && authType) {
    return (
      <div>
        <span className={classes.levelMainDiv}>{levelBadge}</span>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default Level;
