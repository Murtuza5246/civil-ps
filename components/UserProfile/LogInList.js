import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import TimeAgo from "react-timeago";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FolderList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <img
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
              src={props.flag}
              alt="flag"
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.city}
          secondary={<TimeAgo date={props.time} />}
        />
      </ListItem>
    </List>
  );
}
