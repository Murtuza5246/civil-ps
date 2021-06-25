import { CircularProgress, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import classes from "./postFooter.module.css";
import axios from "../../../axios/axios";
import { useSelector } from "react-redux";

const PostFooter = (props) => {
  const [color, setColor] = useState("black");
  const userId = useSelector((state) => state.user.userId);
  useEffect(() => {
    if (
      props.likes.filter((item) => item.userId === props.userId).length !== 0 &&
      userId
    ) {
      setColor("blue");
    }
    if (
      props.likes.filter((item) => item.userId === props.userId).length === 0 &&
      userId
    ) {
      setColor("black");
    }
    if (!userId) {
      setColor("grey");
    }
  }, [props.likes, userId]);
  return (
    <div className={classes.postFooterMain}>
      <hr style={{ width: "90%", margin: "auto" }} />
      <Grid container>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          {props.likeLoading ? (
            <button className={classes.buttonInPostFooter}>
              <CircularProgress size={15} />
            </button>
          ) : (
            <button
              className={
                userId
                  ? classes.buttonInPostFooter
                  : classes.buttonInPostFooterDisabled
              }
              onClick={() => props.onCommentsRaisers()}
              style={{
                color: color,
              }}
              disabled={!userId}
            >
              <ThumbUpAltIcon />
              Like {" " + props.likes.length === 0 ? null : props.likes.length}
            </button>
          )}
        </Grid>
        <Grid item xs={6} md={6} lg={6} xl={6}>
          {" "}
          <button
            className={classes.buttonInPostFooter}
            onClick={props.commentButtonClick}
            disabled={!userId}
          >
            <ChatIcon />
            Comment
          </button>
        </Grid>
      </Grid>
      <hr style={{ width: "90%", margin: "auto" }} />
    </div>
  );
};

export default PostFooter;
