import { ClassSharp } from "@material-ui/icons";
import React from "react";
import ReactLoading from "react-loading";
import { Section, Article } from "./generic";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loadingDiv}>
      <Article>
        <ReactLoading type={"bubbles"} color="#f2f4c0" />
      </Article>
    </div>
  );
};

export default Loading;
