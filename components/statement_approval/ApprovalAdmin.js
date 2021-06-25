import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import axios from "../axios/axios";
import Sidenav from "../sideNavbar/Sidenav";
import { Grid } from "@material-ui/core";
import ListItemPrivate from "../ListItem-Approval/ListItem-Private";
import classes1 from "./approval.module.css";
// import { Redirect } from "react-router";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [statement, setStatement] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const onFetchingData = () => {
    axios
      .get("/statements/pending")
      .then((result) => {
        setStatement(result.data);
      })
      .catch((err) => {
        enqueueSnackbar(err.message);
      });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    onFetchingData();
    if (getParameterByName("open")) {
      setModalOpen(getParameterByName("open"));
    }
  }, []);

  const getParameterByName = (name, url) => {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  const canApprove = useSelector((state) => state.user.canApprove);
  let redirect = null;
  if (!canApprove) {
    redirect = router.push("/statements");
  }
  return (
    <div>
      {redirect}
      <Grid container>
        <Grid md={2} lg={2} xl={2}>
          <Sidenav />
        </Grid>
        <Grid md={10} lg={10} xl={10}>
          <div className={classes1.myWidthClass}>
            <div className={classes1.adjustmentArea}>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Pending StateMents
              </Button>
              <Dialog
                fullScreen
                open={open || modalOpen}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <AppBar className={classes.appBar}>
                  <Toolbar>
                    <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                      Pending Statement
                    </Typography>
                    <Button autoFocus color="inherit" onClick={handleClose}>
                      close
                    </Button>
                  </Toolbar>
                </AppBar>

                {statement.map((items) => (
                  <div>
                    <List key={items._id}>
                      <ListItem>
                        <ListItemPrivate
                          newItem={items}
                          email={items.email}
                          name={items.identifier}
                          onReloading={onFetchingData}
                          details={items}
                        />
                      </ListItem>
                    </List>
                    {/* <hr
                style={{
                  border: "none",
                  borderBottom: "2px solid #3f51b5",
                  marginBottom: "-10px",
                }}
              /> */}
                  </div>
                ))}
                {statement.length === 0 && (
                  <List>
                    <ListItem>
                      <div className={classes1.mtITagHandler}>
                        <i className="fas fa-user-graduate"></i>
                        <p>
                          {"  "}No any Statements are pending for action we
                          appreciate your work!! {"  "}
                        </p>
                        <i className="fas fa-user-graduate"></i>
                      </div>
                    </ListItem>
                    <Divider />
                  </List>
                )}
              </Dialog>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
