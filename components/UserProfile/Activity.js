import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Navigation from "./ActivityNavigation";
import NavigationItem from "./ActivityNavigationItems";
import { Card } from "@material-ui/core";

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
  const [open, setOpen] = React.useState(false);
  const [activityClick, setActivityClick] = useState(1);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const activityHandle = (value) => {
    setActivityClick(value + 1);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Activity
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Activities
        </DialogTitle>
        <DialogContent dividers>
          <Navigation activityHandle={(value) => activityHandle(value)} />
          <hr />
          {activityClick === 1 && (
            <Card style={{ padding: "20px" }}>
              <h4>Activities in QandA section</h4>
              <NavigationItem
                text={props.name}
                activityData={props.data.filter(
                  (item) => item.action === "question"
                )}
              />
            </Card>
          )}
          {activityClick === 2 && (
            <Card style={{ padding: "20px" }}>
              <h4>Activities in Statement section</h4>
              <NavigationItem
                text={props.name}
                activityData={props.data.filter(
                  (item) => item.action === "statement"
                )}
              />
            </Card>
          )}
          {activityClick === 3 && (
            <Card style={{ padding: "20px" }}>
              <h4>Activities in Rating & follow section</h4>
              <NavigationItem
                text={props.name}
                activityData={props.data.filter(
                  (item) =>
                    item.action === "rating" || item.action === "follower"
                )}
              />
            </Card>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
