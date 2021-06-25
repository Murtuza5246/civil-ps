import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import classes from "./profile.module.css";
import { useMediaQuery } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import Rating from "../../Rating/Rating";

import axios from "../../axios/axios";
import SideNoteBadge from "../../qAndA/SideNoteBadge";
import { useSelector } from "react-redux";
import { apiDomain } from "../../../apiPath";

const styles = (theme) => ({
  root: {
    margin: 0,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [details, setDetails] = React.useState(null);
  const [rating, setRating] = React.useState([]);
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const [other, setOther] = React.useState(null);
  const matches = useMediaQuery("(max-width:500px)");
  const handleClickOpen = () => {
    setOpen(true);
    userDetailsLoader();
  };

  const userDetailsLoader = () => {
    axios
      .get("/user/identifier/details/" + props.uploaderId)
      .then((result) => {
        setDetails(result.data.StatementUploaded.length);
        setOther(result.data.userDetails);
        setRating(result.data.userDetails.rating);
      })
      .catch();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.indivisualBox}>
      <img
        onClick={handleClickOpen}
        className={classes.identifierProfile}
        src={
          props.uploaderId !== ""
            ? `${apiDomain}/image/profile/${props.uploaderId}`
            : "/public/hider.png"
        }
        alt="iProfile"
      ></img>

      <Dialog
        fullScreen={matches}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Identifier Preview
        </DialogTitle>
        <DialogContent dividers>
          <Grid container>
            <Grid item xs={6} lg={2} md={2} xl={2}>
              <img
                onClick={handleClickOpen}
                className={classes.identifierProfile}
                src={
                  props.uploaderId !== ""
                    ? `${apiDomain}/image/profile/${props.uploaderId}`
                    : "/public/hider.png"
                }
                alt="iProfile"
              ></img>{" "}
            </Grid>
            <Grid item xs={6} lg={8} md={8} xl={8}>
              <p>
                <strong>
                  Name:{"  "}
                  <Link href={"/user/details/" + props.uploaderId}>
                    <a className={classes.nameTagHandler}>
                      {props.name.substr(0, 18)}
                      {props.name.length > 18 && "..."}
                    </a>
                  </Link>
                </strong>
                {other
                  ? other.authType === "Admin" && (
                      <SideNoteBadge title="Admin" />
                    )
                  : null}
                {(verifiedUsers.filter(
                  (item) => item.userId === (other ? other._id : "322")
                ).length === 1 ||
                  (other ? other.authType : null) === "Admin") && (
                  <i
                    style={{ color: "blue" }}
                    className="fas fa-check-circle"
                  ></i>
                )}
              </p>
              <p>
                <strong>Working in:{"  "}</strong>
                {props.working}
              </p>
              <Rating
                id={props.uploaderId}
                rating={rating}
                reLoadMe={() => userDetailsLoader()}
              />
            </Grid>
            <Grid item xs={12} lg={12} md={12} xl={12}>
              {" "}
              <hr />
            </Grid>

            <Grid item xs={12} lg={12} md={12} xl={12}>
              <p>
                Total <strong>{details}</strong> Statement
                {details > 1 ? "s" : ""} Uploaded{" "}
              </p>
            </Grid>
            <Grid item xs={12} lg={12} md={12} xl={12}>
              <p>
                View full details{" "}
                <Link href={"/identifier/details/" + props.uploaderId}>
                  <a>here</a>
                </Link>
              </p>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
