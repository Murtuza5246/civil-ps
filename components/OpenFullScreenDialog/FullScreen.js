import React, { useEffect } from "react";
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
import SavedIndivisuals from "../savedStatements/indivisualRecent/SavedIndivisual";
import classes1 from "./fullscreen.module.css";
import MetaTags from "react-meta-tags";
import Spinner from "../UI/Spinner/Spinner";
import MailIcon from "@material-ui/icons/Mail";
import Link from "next/link";
import { Badge } from "@material-ui/core";

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

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    if (getParameterByName("open")) {
      setOpen(getParameterByName("open"));
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
  useEffect(() => {
    setItems(props.newItem);
  }, [props.newItem]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let data = null;

  data = items.map((items, index) => (
    <List key={items._id + Math.random(0, 1000) + Math.random(5, 9)}>
      <ListItem>
        <SavedIndivisuals
          loading={props.loading}
          indexItem={index}
          newItem={items}
          functionToRemove={() => props.functionToRemove(index)}
        />
      </ListItem>
    </List>
  ));

  return (
    <div className={classes1.myWidthClass}>
      <div className={classes1.adjustmentArea}>
        <Badge badgeContent={props.newItem.length} color="primary">
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            <Link href="/saved-statements?open=true">
              <a
                onClick={
                  props.onClick ? () => props.onClick("right", false) : null
                }
              >
                Saved Statements
              </a>
            </Link>
          </Button>
        </Badge>
        <Dialog
          fullScreen
          open={open}
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
                {props.appBarHeading}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                close
              </Button>
            </Toolbar>
          </AppBar>

          {data}
          {props.newItem.length === 0 && (
            <List>
              <ListItem>
                <div className={classes1.mtITagHandler}>
                  <i className="fas fa-user-graduate"></i>
                  <p>
                    {"  "}
                    {props.message}
                    {"  "}
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
  );
}
