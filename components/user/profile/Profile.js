import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./profile.module.css";

class Profile extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className={classes.myWidthClassCompose}>
        <div className={classes.flexComponent}></div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
