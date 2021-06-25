import { Card } from "@material-ui/core";
import React from "react";

const Instagram = (props) => {
  return (
    <iframe
      width="320"
      src={
        props.instagram
          ? `${props.instagram}embed`
          : `https://www.instagram.com/p/CBz4znQDiZB/embed`
      }
      // src={`${props.InstaUrl}/embed`}
      height="400"
      frameborder="0"
      scrolling="no"
      allowtransparency="true"
    ></iframe>
  );
};

export default Instagram;
