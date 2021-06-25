import React, { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Badge from "@material-ui/core/Badge";
import Link from "next/link";
import axios from "../../axios/axios";
import { Button, CircularProgress, IconButton } from "@material-ui/core";
import { InputGroup, InputGroupAddon } from "reactstrap";
import { useSnackbar } from "notistack";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import classes1 from "./comments.module.css";
import SideNoteBadge from "../../qAndA/SideNoteBadge";
import TextEditor from "../../qAndA/TextEditor/TextEditor";
import draftToHtml from "draftjs-to-html";
import { Tooltip } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import { Markup } from "interweave";
import CommentSection from "../../indivisualStatement/commentSection/commentSection";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

export default function SwipeableTemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    bottom: false,
  });
  const [open, setOpen] = useState({
    bottom: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, ["bottom"]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: "bottom" === "top" || "bottom" === "bottom",
      })}
      role="presentation"
      style={{ margin: "20px", height: "75vh" }}
    >
      <div>
        <h5 style={{ color: "grey" }}>
          {props.question.substr(0, 50) + "...."}
        </h5>
      </div>

      <CommentSection
        id={props.id}
        comments={props.comments}
        name={props.name}
        userId={props.userId}
      />
    </div>
  );

  return (
    <div className={classes1.SwipeableDrawerHandler}>
      <React.Fragment key={"bottom"}>
        <div style={{ display: "flex" }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleDrawer(true)}
          >
            <ion-icon
              style={{ fontSize: "20px" }}
              name="people-circle-outline"
            ></ion-icon>
            Discussions
            <Badge color="secondary" badgeContent={props.comNumber}>
              <SupervisedUserCircleIcon />
            </Badge>
          </Button>{" "}
        </div>
        <SwipeableDrawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
        >
          <div className={classes1.buttonCloseDiv}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </div>
          <div
            style={{ marginTop: "50px" }}
            className={classes1.swipableCommentDiv}
          >
            {list("bottom")}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}
