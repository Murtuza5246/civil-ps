import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SaveIcon from "@material-ui/icons/Save";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../axios/axios";
import classes1 from "./SpeedDial.module.css";
import SearchIcon from "@material-ui/icons/Search";

//icons
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { WhatsappShareButton } from "react-share";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Backdrop, Badge, IconButton, useMediaQuery } from "@material-ui/core";
import ReplayIcon from "@material-ui/icons/Replay";
import CreateIcon from "@material-ui/icons/Create";
const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  exampleWrapper: {
    position: "relative",
    marginTop: theme.spacing(3),
    height: 380,
  },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

export default function SpeedDials(props) {
  const router = useRouter();

  const classes = useStyles();
  const [direction] = React.useState("up");
  const [open, setOpen] = React.useState(false);
  const [savedItems, setSavedItems] = React.useState(0);
  const [pendingItems, setPendingItems] = React.useState(0);
  const [statementsUploaded, setStatementsUploaded] = React.useState(0);

  const [showScroll, setShowScroll] = React.useState(true);
  const [divWidth, setDivWidth] = React.useState(100);
  const userId = useSelector((state) => state.user.userId);
  const composeHandler = useSelector((state) => state.user.composeHandler);
  const authType = useSelector((state) => state.user.authType);
  const width = useMediaQuery("(min-width:500px)");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const savedStatements = () => {
    handleClose();
  };

  useEffect(() => {
    setDivWidth(document.getElementById("myDiv").offsetHeight);
    window.addEventListener("scroll", checkScrollTop);
    return function cleanup() {
      window.removeEventListener("scroll", checkScrollTop);
    };
  });
  const checkScrollTop = () => {
    if (showScroll && window.pageYOffset > divWidth - 500) {
      setShowScroll(false);
    } else if (!showScroll && window.pageYOffset <= divWidth - 500) {
      setShowScroll(true);
    }
  };
  useEffect(() => {
    if (userId) {
      axios
        .get("/user/savedStatemnets/" + userId)
        .then((result) => {
          setSavedItems(result.data.savedStatements);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (authType === "Admin") {
      axios
        .get("/statements/pending")
        .then((result) => {
          setPendingItems(result.data);
        })
        .catch((err) => {});
    }
    if (authType === "Admin" || authType === "Identifier") {
      axios
        .get("/user/identifier/details/" + userId)
        .then((result) => {
          setStatementsUploaded(result.data.StatementUploaded);
        })
        .catch();
    }
  }, [authType, userId]);
  const searchModalClick = () => {
    props.searchModal();
    handleClose();
    return;
  };

  return (
    <div className={classes.root}>
      <div className={classes.exampleWrapper}>
        {/* <div className={classes1.CreateIconDiv}>
          <IconButton className={classes1.CreateIcon}>
            <CreateIcon />
          </IconButton>
        </div> */}
        <SpeedDial
          ariaLabel="SpeedDial example"
          // className={classes.speedDial}
          className={width ? classes1.speedDialLoggedIn : classes.speedDial}
          // hidden={!width ? false : !showScroll}
          hidden={!showScroll}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={direction}
        >
          {userId && (
            <SpeedDialAction
              icon={
                <Link href="/saved-statements?open=true">
                  <Badge badgeContent={savedItems.length} color="primary">
                    <SaveIcon className={classes1.link} />
                  </Badge>
                </Link>
              }
              tooltipTitle={"save"}
              onClick={savedStatements}
            />
          )}
          {authType === "Admin" && (
            <SpeedDialAction
              icon={
                <Link href="/new/pending/statements?open=true">
                  <Badge badgeContent={pendingItems.length} color="primary">
                    <PlaylistAddCheckIcon className={classes1.link} />
                  </Badge>
                </Link>
              }
              tooltipTitle={"Pending"}
              onClick={handleClose}
            />
          )}
          {/* <SpeedDialAction
            icon={<PrintIcon />}
            tooltipTitle={"save"}
            onClick={handleClose}
          /> */}
          {composeHandler && (
            <SpeedDialAction
              icon={
                <Link href="/compose">
                  <Badge
                    badgeContent={statementsUploaded.length}
                    color="primary"
                  >
                    <AddCircleIcon className={classes1.link} />
                  </Badge>
                </Link>
              }
              tooltipTitle={"compose"}
              onClick={handleClose}
            />
          )}

          {router.pathname === "/statements" && (
            <SpeedDialAction
              icon={
                <SearchIcon
                  className={classes1.link}
                  onClick={searchModalClick}
                />
              }
              tooltipTitle={"Filter"}
              onClick={handleClose}
            />
          )}

          <SpeedDialAction
            icon={<FavoriteIcon className={classes1.link} />}
            tooltipTitle={"Donate"}
            onClick={() =>
              window.open(
                "https://pages.razorpay.com/pl_FuFLxwTIE9HYQQ/view",
                "_blank"
              )
            }
          />

          <SpeedDialAction
            icon={
              <WhatsappShareButton
                url={"https://civil.problemspotter.com/statements"}
              >
                <ShareIcon className={classes1.link} />
              </WhatsappShareButton>
            }
            tooltipTitle={"Share"}
            onClick={handleClose}
          />
          {router.pathname === "/statements" && (
            <SpeedDialAction
              icon={
                <ReplayIcon className={classes1.link} onClick={props.reload} />
              }
              tooltipTitle={"Coming soon..."}
              onClick={handleClose}
            />
          )}
        </SpeedDial>
      </div>
    </div>
  );
}
