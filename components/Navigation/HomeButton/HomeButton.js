import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import { Link } from "@material-ui/core";
import GetAppIcon from "@material-ui/icons/GetApp";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  //   exampleWrapper: {
  //     position: "relative",
  //     marginTop: theme.spacing(1),
  //     height: 200,
  //   },
  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      bottom: theme.spacing(1),
      right: theme.spacing(1),
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      top: theme.spacing(1),
      left: theme.spacing(1),
    },
  },
}));

export default function SpeedDials(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <div
      //    className={classes.exampleWrapper}
      >
        <SpeedDial
          //   classes={{ color: "none", backgroundColor: "none" }}
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          //   hidden={true}
          icon={<GetAppIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          direction={"down"}
        >
          <SpeedDialAction
            icon={
              <HomeIcon
                onClick={() => props.onCLickHome()}
                style={{ position: "relative", bottom: "2px" }}
                // fontSize="15px"
              />
            }
            tooltipTitle={"Statements"}
            onClick={handleClose}
          />
          <SpeedDialAction
            icon={
              <Link>
                <PeopleIcon
                  onClick={() => props.onCLickHome()}
                  style={{ position: "relative", bottom: "2px" }}
                />
              </Link>
            }
            tooltipTitle={"Statements"}
            onClick={handleClose}
          />
        </SpeedDial>
      </div>
    </div>
  );
}
