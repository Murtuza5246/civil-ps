import React from "react";
import classes from "./notfound.module.css";

function PageNotFound() {
  return (
    <div className={classes.MainDiv}>
      <a href="/statements">
        <img
          src="https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
          alt="Not Found"
        />
      </a>
      <h1>The page you're looking for isn't available.</h1>
      Please check the URL or <a href="/statements">Click here </a>to explore
      more
    </div>
  );
}

export default PageNotFound;
