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
import Link from "next/link";
import { Grid } from "@material-ui/core";
import classes from "./followers.module.css";
import { useSelector } from "react-redux";
import SideNoteBadge from "../qAndA/SideNoteBadge";
import { apiDomain } from "../../apiPath";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
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
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const verifiedUsers = useSelector((state) => state.user.verifiedUsers);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    window.history.pushState(
      null,
      null,
      `/user/details/${props.userId}/?open=true`
    );
    setOpen(true);
  };
  const handleClose = () => {
    window.history.pushState(null, null, `/user/details/${props.userId}`);
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.followersLength}>
        <h5>{props.followers ? props.followers.length : "Loading..."}</h5>
        <Button
          className={classes.likeButton}
          color="primary"
          onClick={handleClickOpen}
          disabled={props.disability}
        >
          Rated people
        </Button>
      </div>
      <Dialog
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Who rated
        </DialogTitle>
        <DialogContent dividers>
          {props.followers.map((items) => (
            <div key={items.userId}>
              <Grid container>
                <Grid item xs={3} md={3} lg={2} xl={3}>
                  <img
                    className={classes.likesImage}
                    src={
                      items.userId
                        ? `${apiDomain}/image/profile/${items.userId}`
                        : "/hider.png"
                    }
                    alt="image_profile"
                  />
                </Grid>
                <Grid item xs={9} md={9} lg={10} xl={9}>
                  <div className={classes.nameAlignMent}>
                    <h6>
                      <strong>
                        <Link href={"/user/details/" + items.userId}>
                          <a className={classes.nameTagHandler}>
                            {" "}
                            {items.name.substr(0, 18)}
                            {items.name.length > 18 && "..."}
                          </a>
                        </Link>
                      </strong>
                      {items.authType === "Admin" && (
                        <SideNoteBadge
                          title="Admin"
                          component={<i className="fas fa-check-circle"></i>}
                        />
                      )}
                      {items.authType === "Professor" && (
                        <SideNoteBadge
                          title="Professor"
                          component={
                            <i
                              // style={{ color: "blue" }}
                              className="fas fa-user-tie"
                            ></i>
                          }
                        />
                      )}
                      {verifiedUsers.filter(
                        (item) => item.userId === items.userId
                      ).length === 1 && (
                        <i
                          style={{ color: "blue" }}
                          className="fas fa-check-circle"
                        ></i>
                      )}
                    </h6>
                  </div>
                </Grid>
              </Grid>
              <hr />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
