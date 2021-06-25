import React, { Component } from "react";

import Link from "next/link";
import MenuListComposition from "../DropDown/DropDown";
import classes from "./Nav.module.css";
import Button from "@material-ui/core/Button";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SaveIcon from "@material-ui/icons/Save";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { emphasize, Grid } from "@material-ui/core";
import { Tooltip } from "@material-ui/core";
import * as actionCreator from "../../../redux/actions/index";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "../../axios/axios";
import { connect } from "react-redux";
import LinearProgressWithLabel from "./ProgressBar";
import { withSnackbar } from "notistack";
import SwipableDrawerRight from "../SideDrawer/DrawerToggle/SwipableDrawerRight";
import HomeIcon from "@material-ui/icons/Home";
import TimeAgo from "react-timeago";
import LogicPushNotification from "../../cookieNoti/Logic/LogicPushNotification";
import { apiDomain } from "../../../apiPath";

class NavigationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      userDetails: "",
      statementImage: "",
      profileImage: "",
      profileImageUpload: null,
      showSideDrawer: false,
      imageSize: 1,
      imageSize1: 0,
      loading: false,
      uploadPercentage: 0,
      progressBar: false,
      offline: false,
    };
  }
  componentDidMount() {
    this.userDetailsLoader();
    this.fetchingVerificationDetails();
    this.props.onAuthCheckStart();
    // setTimeout(() => {
    //   this.userDetailsLoader();
    // }, 2000);
  }
  fetchingVerificationDetails() {
    axios
      .get("/verify/verification/users")
      .then((result) => {
        let data = result.data.data;
        this.props.onVerifiedUserLoader(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ profileImage: nextProps.profileImage });
  }

  userDetailsLoader = () => {
    if (this.props.userId) {
      // setTimeout(() => {
      axios
        .get("/user/details/" + this.props.userId)
        .then((result) => {
          this.setState({
            profileImage: result.data.userDetails[0].profileImage,
          });
          this.setState({ userDetails: result.data.userDetails[0] });
          this.props.onAuthTypeHandler(result.data.userDetails[0].authType);

          this.props.onProfileToStatements(
            result.data.userDetails[0].profileImage
          );
        })
        .catch((err) => {
          this.setState({ userDetails: "" });
          console.log(err);
        });
      // }, 800);
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!this.props.profileImage) this.userDetailsLoader();
  }
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpendHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  afterPhotoUploadHandler = () => {
    setTimeout(
      () =>
        axios
          .get("/user/details/" + this.props.userId)
          .then((result) => {
            this.setState({
              profileImage: result.data.userDetails[0].profileImage,
            });
          })
          .catch((err) => {
            this.props.enqueueSnackbar("something went wrong");
          }),
      1000
    );
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ imageSize: 1 });
    this.setState({ imageSize1: 0 });
    this.setState({ profileImageUpload: null });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
    this.userDetailsLoader();
  };

  onFilesHandler = (e) => {
    this.setState({ imageSize: e.target.files[0].size / (1024 * 1024) });
    this.setState({ imageSize1: e.target.files[0].size / (1024 * 1024) });

    this.setState({ profileImageUpload: e.target.files[0] });
  };

  onProfileImageChangeHandler = (variant) => {
    const formData = new FormData();
    formData.append("profileImage", this.state.profileImageUpload);
    if (this.state.imageSize < 0.51) {
      this.setState({ loading: true });
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let percent = Math.floor((loaded * 100) / total);

          if (percent < 100) {
            this.setState({ uploadPercentage: percent });
          }
        },
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + this.props.token,
        },
      };
      this.setState({ progressBar: true });
      axios
        .patch("/user/profile/" + this.props.userId, formData, options)
        .then((result) => {
          this.setState({ loading: false });
          this.props.enqueueSnackbar("Photo Updated!!", { variant });
          this.setState({ profileImageUpload: null });
          this.setState({ uploadPercentage: 100 });
          setTimeout(() => {
            this.setState({ progressBar: false });
          }, 1000);

          this.afterPhotoUploadHandler();
        })
        .catch((err) => {
          this.setState({ loading: false });
          this.setState({ uploadPercentage: 0 });
          this.props.enqueueSnackbar("Something Went wrong");
        });
    } else {
      this.props.enqueueSnackbar("You should upload photo less than 0.5 MB");
    }
    setTimeout(() => {
      this.userDetailsLoader();
    }, 200);
  };
  scrollTop() {
    if (
      window.location.href === "http://localhost:3000/statements" ||
      window.location.href === "https://civil.problemspotter.com/statements"
    ) {
      const container = document.querySelector("#myDiv");
      container.scrollTo({
        top: 0,

        behavior: "smooth",
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    if (
      window.location.href === "http://localhost:3000/qanda" ||
      window.location.href === "https://civil.problemspotter.com/qanda"
    ) {
      const container = document.querySelector("#myDiv");
      container.scrollTo({
        top: 0,

        behavior: "smooth",
      });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }
  render() {
    let userData = (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {this.props.userId && this.state.profileImage !== "" ? (
          <div>
            <Grid container>
              <Grid item xs={4} md={4} lg={4} xl={4}>
                <div className={classes.profileImage}>
                  {this.props.profileImage !== "" &&
                    this.props.userId !== "" && (
                      <img
                        src={
                          this.props.userId
                            ? `${apiDomain}/image/profile/${this.props.userId}`
                            : "hider.png"
                        }
                        alt="profile"
                        onClick={this.handleClickOpen}
                      />
                    )}
                  <div className={classes.inputHandler}>
                    <div className={classes.root}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="icon-button-file"
                        type="file"
                        onChange={(e) => this.onFilesHandler(e)}
                      />
                      <div className={classes.labelHandler}>
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                          >
                            <PhotoCamera />
                          </IconButton>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={8} md={8} lg={8} xl={8}>
                <DialogTitle id="alert-dialog-title">
                  <h4>
                    <strong>{this.state.userDetails.fName}</strong>
                    {"  "}
                    <strong>{this.state.userDetails.lName}</strong>
                  </h4>
                  <p style={{ fontSize: "10px" }}>
                    {this.state.userDetails.email}
                  </p>
                </DialogTitle>
              </Grid>
            </Grid>
            <DialogContent>
              <p>
                {this.state.profileImageUpload &&
                  this.state.profileImageUpload.name}
              </p>
              {this.state.progressBar && (
                <LinearProgressWithLabel value={this.state.uploadPercentage} />
              )}
              <p style={{ color: "red" }}>
                {this.state.imageSize1 > 0.5 &&
                  "Photo should be less than 0.5MB"}
              </p>
              <div>
                <p style={{ color: "grey" }}>
                  <em>
                    since{" "}
                    {<TimeAgo date={this.state.userDetails.creationDate} />}
                  </em>
                </p>
              </div>
              <hr />
              <DialogContentText id="alert-dialog-description">
                For FullDetails:
                <Link
                  href={`/user/details/${
                    this.state.userDetails.fName +
                    "-" +
                    this.state.userDetails.lName
                  }/${this.state.userDetails._id}`}
                >
                  <a onClick={this.handleClose}>Click here</a>
                </Link>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={() => this.onProfileImageChangeHandler("success")}
                disabled={
                  this.state.imageSize > 0.51 ||
                  this.state.loading ||
                  !this.state.profileImageUpload
                }
              >
                Save
              </Button>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </div>
        ) : (
          <div className={classes.notLoggedInStyle}>
            <DialogContentText id="alert-dialog-description">
              You{"'"}er Not Logged In
            </DialogContentText>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
            {/* <h5 style={{ margin: "10px" }}></h5> */}
            <Link href="/login">
              {" "}
              <a>LogIn</a>
            </Link>
          </div>
        )}
      </Dialog>
    );

    // if (!this.props.userId) {
    //   userData = (
    //     <Dialog
    //       open={this.state.open}
    //       onClose={this.handleClose}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description"
    //     >

    //     </Dialog>
    //   );
    // }
    return (
      <div className={classes.Nav}>
        <LogicPushNotification />
        <div className={classes.DivItem0}>
          <img src="/LOGO.png" alt="logo" />
          <h2>
            <Link href="/">
              <a
                className={`${classes.NavLinkClass} ${classes.headingHandlerNav}`}
              >
                {" "}
                Problemspotter{" "}
              </a>
            </Link>
          </h2>
        </div>
        <div className={classes.drawerPosition1}>
          <div className={classes.drawerPosition2}>
            {/* <HomeButton onClickHome={() => this.scrollTop()} /> */}
            <Link href="/statements">
              <a
                className={classes.NavLinkClass}
                activeClassName={classes.active}
                exact
              >
                <HomeIcon
                  onClickHome={() => this.scrollTop()}
                  style={{ position: "relative", bottom: "0px" }}
                  // fontSize="15px"
                />
              </a>
            </Link>
          </div>
          <div className={classes.drawerPosition}>
            <SwipableDrawerRight
              email={this.state.userDetails.email}
              name={
                this.state.userDetails.fName &&
                this.state.userDetails.fName +
                  " " +
                  this.state.userDetails.lName
              }
              details={this.props.userId}
              handleClickOpen={this.handleClickOpen}
              userDetails={this.state.profileImage}
              // open={this.state.showSideDrawer}

              isAuth={this.props.isAuthenticated}
            />
          </div>
        </div>
        <div className={classes.DivItem01}>
          <div className={classes.DivItem1}>
            <Tooltip title="Statements Home" interactive>
              <Link href="/statements">
                <a
                  onClick={() => this.scrollTop()}
                  className={classes.NavLinkClass}
                  activeClassName={classes.active}
                  exact
                >
                  <HomeIcon
                    style={{ position: "relative", bottom: "2px" }}
                    fontSize="small"
                  />
                  Home
                </a>
              </Link>
            </Tooltip>
          </div>
          <div className={classes.DivItem2}>
            <Tooltip title="Q&A Section" interactive>
              <Link href="/qanda">
                <a
                  onClick={() => this.scrollTop()}
                  className={classes.NavLinkClass}
                  activeClassName={classes.active}
                  exact
                >
                  <WhatshotIcon
                    fontSize="small"
                    style={{ position: "relative", bottom: "2px" }}
                  />
                  Q&A
                </a>
              </Link>
            </Tooltip>
          </div>
          <div className={classes.DivItem3}>
            <MenuListComposition />
          </div>
          {/*TODO: DD  */}
          {this.state.profileImage !== "" && (
            <div className={classes.userProfileImage}>
              {this.props.profileImage !== "" && this.props.profileImage && (
                <img
                  src={
                    this.props.userId
                      ? `${apiDomain}/image/profile/${this.props.userId}`
                      : "hider.png"
                  }
                  alt="myProfile"
                  onClick={this.handleClickOpen}
                />
              )}
              <div>{userData}</div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.user.userId,
    authType: state.user.authType,
    profileImage: state.statement.profileImage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onProfileToStatements: (image) => dispatch(actionCreator.statement(image)),
    onAuthCheckStart: () => dispatch(actionCreator.authCheckStatus()),
    onAuthTypeHandler: (authType) =>
      dispatch(actionCreator.authTypeChecker(authType)),
    onVerifiedUserLoader: (data) =>
      dispatch(actionCreator.userVerificationDetailsLoader(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(NavigationItem));
