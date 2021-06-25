import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Sidenav.module.css";
import SideBarItems from "./sideBarItem/SideBarItems";
import * as actionCreator from "../../redux/actions/index";
import Link from "next/link";

import Level from "./level/Level";
import { apiDomain } from "../../apiPath";

class Sidenav extends Component {
  render() {
    let userName = null;
    if (this.props.fName !== "") {
      userName = (
        <div>
          <h5 style={{ color: "white" }} className={classes.sideNavName}>
            {this.props.fName + " " + this.props.lName}
          </h5>
        </div>
      );
    }
    if (this.props.fName === null) {
      userName = (
        <div
          style={{
            textDecoration: "none",
            width: "90px",
            margin: "auto",
            color: "black",
          }}
        >
          <Link href="/login">
            <a style={{ color: "black", fontSize: "1.4rem" }}> LogIn</a>
          </Link>
        </div>
      );
    }

    return (
      <div className={classes.sidenav}>
        <div className={classes.nestedDivForManage}>
          <div className={classes.imageManagerDiv}>
            {
              <img
                src={
                  this.props.userId
                    ? `${apiDomain}/image/profile/${this.props.userId}`
                    : "/hider.png"
                }
                alt="myProfile"
                onClick={this.handleClickOpen}
              />
            }
            <span className={classes.sideNavName}>{userName}</span>
            <Level />

            <hr style={{ width: "80%" }}></hr>
          </div>
          <div className={classes.SideBarItems}>
            <SideBarItems />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    fName: state.user.fName,
    lName: state.user.lName,
    profileImage: state.statement.profileImage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actionCreator.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);
