import React from "react";
import { Grid } from "@material-ui/core";
import classes from "./Sidedrawer.module.css";
import SideBarItems from "../../sideNavbar/sideBarItem/SideBarItems";
import Level from "../../sideNavbar/level/Level";
import { apiDomain } from "../../../apiPath";

const Sidedrawer = (props) => {
  return (
    <div>
      {/* <Backdrop show={props.open} clicked={props.closed} /> */}
      <div>
        <div className={classes.sideDrawerHandler}>
          {/* <div className={attachedClasses.join(" ")}> */}
          <Grid container>
            <Grid item xs={6}>
              <div className={classes.Logo}>
                <img
                  style={{ width: "100px", height: "100px" }}
                  src={`${apiDomain}/websiteLogo/logo_final.png`}
                  alt="logo"
                />
              </div>
            </Grid>
            <Grid item xs={6}>
              {
                <img
                  className={classes.profileImageHandle}
                  src={
                    props.details
                      ? `${apiDomain}/image/profile/${props.details}`
                      : "/hider.png"
                  }
                  alt="myProfile"
                  onClick={props.handleClickOpen}
                />
              }
              <div className={classes.navBarLevelTag}>
                <Level />
              </div>
            </Grid>
          </Grid>
          {props.name && props.details && (
            <p>
              <strong>{props.name}</strong>
            </p>
          )}
          {props.name !== undefined + " " + undefined && props.details ? (
            <p style={{ color: "grey" }}>{props.email}</p>
          ) : null}
        </div>

        <hr style={{ width: "100%" }} />
        <nav>
          <div className={classes.sideNavForMobileHandler}>
            {" "}
            <SideBarItems onClick={props.onClick} />
          </div>

          {/* <NavigationItems isAuth={props.isAuth} onClick={props.closed} /> */}
        </nav>
      </div>
    </div>
  );
};

export default Sidedrawer;
