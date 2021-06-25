import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./AppRoved.module.css";
import { Grid } from "@material-ui/core";
import Sidenav from "../sideNavbar/Sidenav";
// import { Redirect } from "react-router-dom";
import IndivisualApprovedState from "./indivisualApprovedState/indivisualApprovedState";
import axios from "../axios/axios";
import Footer from "../Footer/Footer";

class ApprovedStatements extends Component {
  state = {
    approved: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get("/statements/admin/approved/" + this.props.email)
      .then((result) => {
        this.setState({ approved: result.data });
      })
      .catch();
  }
  render() {
    let data = null;
    if (this.props.canApprove) {
      data = (
        <Grid container>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <h3>My Approved Statements</h3>
            <hr className={classes.hrHandle} />
          </Grid>
          <IndivisualApprovedState Approved={this.state.approved} />
        </Grid>
      );
    }
    if (!this.props.canApprove) {
      // data = <Redirect to="/statements" />;
    }
    return (
      <div>
        <Grid container>
          <Grid item md={2} lg={2} xl={2}>
            <Sidenav />
          </Grid>
          <Grid item md={10} lg={10} xl={10}>
            <div className={classes.myWidthClass}>
              <div className={classes.nestedDivComponent}>{data}</div>
            </div>
          </Grid>
        </Grid>
        <Footer />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.user.email,
    canApprove: state.user.canApprove,
  };
}

export default connect(mapStateToProps)(ApprovedStatements);
