import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import PeopleIcon from "@material-ui/icons/People";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import { Button, useMediaQuery } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const width = useMediaQuery("(min-width:500px)");

  if (!width) {
    return (
      <div style={{ justifyContent: "space-around" }}>
        <Button
          onClick={() => {
            setValue(0);
            props.activityHandle(0);
          }}
        >
          <EditIcon />
        </Button>
        <Button
          onClick={() => {
            setValue(1);
            props.activityHandle(1);
          }}
        >
          <PeopleIcon />
        </Button>
        <Button
          onClick={() => {
            setValue(2);
            props.activityHandle(2);
          }}
        >
          <StarIcon />
        </Button>
      </div>
    );
  }
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        props.activityHandle(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Q&A" icon={<EditIcon />} />
      <BottomNavigationAction label="Statement" icon={<PeopleIcon />} />
      <BottomNavigationAction label="Rating & Following" icon={<StarIcon />} />
    </BottomNavigation>
  );
}
