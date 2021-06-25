import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "../axios/axios";
import FullScreen from "../OpenFullScreenDialog/FullScreen";
import Sidenav from "../sideNavbar/Sidenav";
import { Grid } from "@material-ui/core";
// import { Redirect } from "react-router";
import MetaTags from "react-meta-tags";
import { withSnackbar } from "notistack";

class RecentStatement extends Component {
  state = {
    savedStatements: [],
    loading: -1,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchArraysItems();
  }
  fetchArraysItems() {
    // setTimeout(() => {
    if (this.props.userId) {
      axios
        .get("/user/savedStatemnets/" + this.props.userId)
        .then((result) => {
          this.setState({ loading: false });
          this.setState({ savedStatements: result.data.savedStatements });
        })
        .catch((err) => {
          console.log(err);
          this.props.enqueueSnackbar(err.message);
        });
    } else {
      this.props.enqueueSnackbar("UserId is slow");
    }
    // }, 1000);
  }
  removeItemFromArray(arrayIndex, variant) {
    this.setState({ loading: arrayIndex });

    axios
      .patch("/user/statement/remove/" + this.props.userId, {
        _id: this.state.savedStatements[arrayIndex]._id,
      })
      .then((result) => {
        this.props.enqueueSnackbar("Deleted", { variant });
        this.fetchArraysItems();
        this.setState({ loading: -1 });
      })
      .catch((err) => {
        this.setState({ loading: -1 });
        this.props.enqueueSnackbar("Not deleted");
      });
  }

  render() {
    let redirect = null;
    if (!this.props.userId) {
      // return (redirect = <Redirect to="/statements" />);
    }
    return (
      <div>
        <Grid container>
          <Grid item md={2} lg={2} xl={2}>
            <Sidenav />
          </Grid>
          <Grid item md={10} lg={10} xl={10}>
            {redirect}

            <FullScreen
              newItem={this.state.savedStatements}
              message="You dont have any saved statement"
              functionToRemove={(index) =>
                this.removeItemFromArray(index, "success")
              }
              appBarHeading="Saved Statements"
              loading={this.state.loading}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    userId: state.user.userId,
  };
}

export default connect(mapStateToProps)(withSnackbar(RecentStatement));
