import React from "react";
import classes from "./allCatchUpMain.module.css";
import DoneAllIcon from "@material-ui/icons/DoneAll";

const AllCatchUp = () => {
  return (
    <div className={classes.allCatchUpMain}>
      <DoneAllIcon fontSize="large" style={{ fontSize: "100px" }} />
      <p>All done</p>
    </div>
  );
};

export default AllCatchUp;
