import React, { Component } from "react";
import axios from "../axios/axios";
import SideNav from "../sideNavbar/Sidenav";
import { Grid } from "@material-ui/core";
import classes from "./identifierDetails.module.css";
import Table from "./Table/Table";
import { CircularProgress } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Rating from "../Rating/Rating";
import draftToHtml from "draftjs-to-html";
import { Markup } from "interweave";
import { apiDomain } from "../../apiPath";

class IdentifierDetails extends Component {
  state = {
    details: null,
    StatementUploaded: [],
    rating: [],
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.reloadMe();
  }
  reloadMe() {
    axios
      .get("/user/identifier/details/" + this.props.userId)
      .then((result) => {
        this.setState({ details: result.data });
        this.setState({ rating: result.data.userDetails.rating });

        this.setState({ StatementUploaded: result.data.StatementUploaded });
      })
      .catch();
  }
  checkTheParse(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }
  render() {
    let spinner = null;

    if (!this.state.details) {
      spinner = (
        <Backdrop className={classes.backdrop} open={!this.state.details}>
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }
    if (this.state.details) {
      spinner = (
        <div>
          <Grid container>
            <Grid item md={1} lg={2} xl={2}>
              <SideNav />
            </Grid>
            <Grid item md={11} lg={10} xl={10}>
              <div className={classes.mainDiv}>
                {this.state.details ? (
                  <Grid container>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <div className={classes.headingHandler}>
                        <h1>IDENTIFIER DETAILS</h1>
                      </div>
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <div className={classes.imageHandlingDiv}>
                        <img
                          src={
                            this.state.details
                              ? `${apiDomain}/image/profile/${this.state.details.userDetails._id}`
                              : "hider.png"
                          }
                          alt="profile"
                        />
                        <h4>
                          {this.state.details &&
                            this.state.details.userDetails.fName +
                              " " +
                              this.state.details.userDetails.lName}
                        </h4>
                        <Rating
                          rating={this.state.rating}
                          id={this.props.userId}
                          reLoadMe={() => this.reloadMe()}
                        />
                        <hr />
                        {this.checkTheParse(
                          this.state.details.userDetails.about
                        ) && (
                          <main>
                            <h6>About</h6>
                            <p>
                              <Markup
                                content={draftToHtml(
                                  JSON.parse(
                                    this.state.details.userDetails.about
                                  )
                                )}
                              />
                            </p>
                            <hr />
                          </main>
                        )}
                      </div>
                    </Grid>

                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      {this.state.details &&
                        this.state.details.userDetails.authType ===
                          "Identifier" && (
                          <div className={classes.workingInfo}>
                            <h6>Working info</h6>
                            <p></p>
                            <hr />
                          </div>
                        )}
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}></Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}></Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      {" "}
                      {this.state.details && (
                        <div className={classes.imageHandlingDiv}>
                          <h5>Statements uploaded</h5>
                        </div>
                      )}
                    </Grid>
                    <Grid item xs={12} lg={12} md={12} xl={12}>
                      <Table data={this.state.StatementUploaded} />
                    </Grid>
                  </Grid>
                ) : (
                  <CircularProgress disableShrink />
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      );
    }
    return <div>{spinner}</div>;
  }
}

export default IdentifierDetails;
