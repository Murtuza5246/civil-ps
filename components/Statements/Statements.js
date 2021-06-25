import React, { Component } from "react";
import classes from "./State.module.css";
import axios from "../axios/axios";
import { connect } from "react-redux";
import * as actionCreator from "../../redux/actions/index";
import Sidenav from "../sideNavbar/Sidenav";
import { Grid } from "@material-ui/core";
import PlusButton from "../PlusButton/PlusButton";
import { withSnackbar } from "notistack";
import MetaTags from "react-meta-tags";
import Footer from "../Footer/Footer";
import SearchBar from "./searchBar/SearchBar";

import CookieConsent from "../cookieNoti/CookieNotification";
import AddToHomescreen from "react-add-to-homescreen";
import Loading from "./loading/Loading";
import { Pagination } from "@material-ui/lab";
import Events from "./Events/Events";

import { SearchLogic } from "./SearchLogic";
import StatementsPlaceholder from "./StatementsSkeliton";

import Switch from "./Switch/Switch";
import IdentifierMain from "./Identifier/IdentifierMain";
import LearnerMain from "./learner/LearnerMain";
import General from "./General/General";
import LiveSection from "./live/Live";
import { apiDomain } from "../../apiPath";

class Statements extends Component {
  state = {
    border: true,
    statements: [],
    first: 1,
    statement: null,
    last: 10,
    loading: false,
    arrayOfUser: [],
    Empty: null,
    searchValue: "",
    searchIsEmpty: false,
    saveButtonIndex: -1,
    searchLoading: false,
    firstValue: 0,
    secondValue: 15,
    pageCountNumber: 0,
    defaultPage: 1,
    recentStatements: [],
    maxUploaderCount: [],
    switch: "General",
    searchUser: "",
    searchUserLearner: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.statementsFromRedux.length === 0) {
      if (this.props.data.length === 0) {
        this.setState({ Empty: "Apply" });
      }
      this.setState({ loading: false });
      if (this.props.data.length > 5) {
        this.props.onRecentStatementsUpdate(
          this.props.data.slice(
            this.props.data.length - 5,
            this.props.data.length
          )
        );
        this.setState({
          recentStatements: this.props.data.slice(
            this.props.data.length - 5,
            this.props.data.length
          ),
        });
      } else {
        this.props.onRecentStatementsUpdate(this.props.data.slice(0, 4));
        this.setState({ recentStatements: this.props.data.slice(0, 4) });
      }
      this.shuffle(this.props.data.reverse());
    } else {
      this.setState({ recentStatements: this.props.recentStatements });
      this.setState({ statements: this.props.statementsFromRedux });
      this.setState({ maxUploaderCount: this.props.statementsFromRedux });
      this.setState({
        pageCountNumber:
          Math.round(this.props.statementsFromRedux.length / 15) <
          this.props.statementsFromRedux.length / 15
            ? Math.round(this.props.statementsFromRedux.length / 15) + 1
            : Math.round(this.props.statementsFromRedux.length / 15),
      });
    }

    if (!this.props.userId) {
      this.props.onAuthCheckStart();
      this.userDetailsLoader();
    }
    if (this.getParameterByName("searchValue")) {
      this.setState({ searchValue: this.getParameterByName("searchValue") });
    }
    if (this.getParameterByName("page")) {
      this.setState({ defaultPage: this.getParameterByName("page") });
      this.setState({
        firstValue: Number(this.getParameterByName("page")) * 15 - 15,
      });
      this.setState({
        secondValue: Number(this.getParameterByName("page")) * 15,
      });
    }
  }
  pageNumberChange(event, number) {
    event.preventDefault();
    window.history.pushState(null, null, `?page=${number}`);
    if (this.getParameterByName("page")) {
      this.setState({ defaultPage: this.getParameterByName("page") });
    }
    var element = document.getElementById("searchBar");
    element.scrollIntoView();
    window.scrollTo(0, 0);

    this.setState({ firstValue: number * 15 - 15 });
    this.setState({ secondValue: number * 15 });
  }
  getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  userDetailsLoader = () => {
    if (this.props.userId) {
      setTimeout(() => {
        axios
          .get("/user/details/" + this.props.userId)
          .then((result) => {
            this.setState({
              profileImage: result.data.userDetails.profileImage,
            });
            this.setState({ userDetails: result.data.userDetails });
            this.props.onAuthTypeHandler(result.data.userDetails.authType);

            this.props.onProfileToStatements(
              result.data.userDetails.profileImage
            );
          })
          .catch((err) => {
            this.setState({ userDetails: "" });
            console.log(err);
          });
      }, 800);
    }
  };
  searchUserChangeHandler(e) {
    let { value } = e.target;

    this.setState({ searchUser: value });
  }

  searchChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  searchUserInLearnerChangeHandler(e) {
    let { value } = e.target;

    this.setState({ searchUserLearner: value });
  }
  searchFieldsHandler(fields) {
    if (fields.length > 0) {
      this.setState({ searchIsEmpty: false });
      this.setState({ loading: false });
      this.setState({ searchLoading: true });
      // let finalOutPut = JSON.stringify(arrayOfSearch);
      axios
        .post("/statements/getSearchedFields", fields)
        .then((result) => {
          this.setState({ searchLoading: false });
          let searchData = [];
          result.data.forEach((item) => {
            if (item.approved) {
              searchData.push(item);
            }
          });
          this.setState({ statements: searchData });
          if (searchData.length === 0) {
            this.setState({ searchIsEmpty: true });
            this.setState({ loading: false });
          }
          if (searchData.length !== 0) {
            this.setState({ searchIsEmpty: false });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ searchLoading: false });
          this.props.enqueueSnackbar("Failed");
          this.setState({ searchIsEmpty: false });
        });
    } else if (fields.length === 0) {
      this.setState({ searchLoading: true });
      axios
        .get("/statements/userStatements/approved")
        .then((res) => {
          if (res.data.length === 0) {
            this.setState({ searchLoading: false });
            this.setState({ searchIsEmpty: false });
            this.onFetchinfStatementsNew();
          }
          this.setState({ searchLoading: false });
          this.setState({ statements: res.data });
        })
        .catch((err) => {
          this.setState({ searchLoading: false });
          this.setState({ searchIsEmpty: false });
        });
    } else {
      axios
        .get("/statements/userStatements/approved")
        .then((res) => {
          if (res.data.length === 0) {
            this.setState({ Empty: "Apply" });
            this.setState({ searchLoading: false });
            this.setState({ searchIsEmpty: false });
          }
          this.setState({ searchLoading: false });
          this.setState({ statements: res.data });
        })
        .catch((err) => {
          this.setState({ searchLoading: false });
          this.setState({ searchIsEmpty: false });
        });
    }
  }
  shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.props.onStatementsToRedux(array);
    this.setState({ maxUploaderCount: array });

    this.setState({ statements: array });
    this.setState({
      pageCountNumber:
        Math.round(array.length / 15) < array.length / 15
          ? Math.round(array.length / 15) + 1
          : Math.round(array.length / 15),
    });
  }
  onFetchinfStatementsNew() {
    this.setState({ loading: true });
    this.setState({ searchIsEmpty: false });
    axios
      .get("/statements/userStatements/approved")
      .then((res) => {
        if (res.data.length === 0) {
          this.setState({ Empty: "Apply" });
        }
        this.setState({ loading: false });
        if (res.data.length > 5) {
          this.props.onRecentStatementsUpdate(
            res.data.slice(res.data.length - 5, res.data.length)
          );
          this.setState({
            recentStatements: res.data.slice(
              res.data.length - 5,
              res.data.length
            ),
          });
        } else {
          this.props.onRecentStatementsUpdate(res.data.slice(0, 4));
          this.setState({ recentStatements: res.data.slice(0, 4) });
        }
        this.shuffle(res.data.reverse());
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  switchChangeHandler = (name) => {
    this.setState({ switch: name });

    return;
  };
  onsaveClickButton = (index) => {
    this.setState({ saveButtonIndex: index });

    const audio = new Audio("/click.mp3");
    const tick = new Audio("/tick.mp3");

    axios
      .patch("/user/statement/save/" + this.props.userId, {
        _id: this.state.statements[index]._id,
        title: this.state.statements[index].title,
      })
      .then((result) => {
        if (result.data.message === "Saved") {
          audio.play();
          this.props.enqueueSnackbar(result.data.message, {
            variant: "success",
          });
        } else {
          tick.play();
          this.props.enqueueSnackbar(result.data.message);
        }
        this.setState({ saveButtonIndex: -1 });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ saveButtonIndex: -1 });
        this.props.enqueueSnackbar(err.message);
        console.log(err);
      });
  };
  scrollToTopHandler() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`);
  };

  render() {
    let statementsFields = SearchLogic(
      this.state.statements,
      this.state.searchValue
    );
    let spinner = null;
    if (
      this.state.statements.length === 0 &&
      this.state.loading &&
      this.state.switch === "General"
    ) {
      spinner = (
        <StatementsPlaceholder className={classes.placeholderDivManage} />
      );
    }
    if (this.state.Empty === "Apply" && this.state.switch === "General") {
      spinner = (
        <div className={classes.blackingBackground}>
          <div className={classes.spinnerHandler}>
            {/* <Spinner /> */}
            <h3>Nothing to show</h3>
          </div>
        </div>
      );
    }
    if (this.state.switch === "Identifier" && this.props.composeHandler) {
      spinner = <IdentifierMain searchUser={this.state.searchUser} />;
    }
    if (this.state.switch === "Learner") {
      spinner = <LearnerMain searchUser={this.state.searchUserLearner} />;
    }
    if (this.state.switch === "Live") {
      spinner = <LiveSection />;
    }

    if (this.state.statements.length !== 0 && this.state.switch === "General") {
      spinner = (
        <General
          statementsFields={statementsFields ? statementsFields : []}
          saveButtonIndex={this.state.saveButtonIndex}
          onsaveClickButton={this.onsaveClickButton}
          userId={this.props.userId}
          firstValue={this.state.firstValue}
          secondValue={this.state.secondValue}
        />
      );
    }

    if (
      statementsFields.length === 0 &&
      this.state.searchValue !== "" &&
      this.state.switch === "General"
    ) {
      spinner = (
        <div className={classes.noFoundData}>
          {" "}
          <img
            src="https://media.giphy.com/media/lnPZrx9J2FUvviL1mv/giphy.gif"
            alt="not found"
          ></img>
          <p style={{ color: "grey" }}>Sorry, We can't find what you need.</p>
        </div>
      );
    }
    let searchFieldLoader = null;
    if (
      this.state.searchIsEmpty &&
      this.state.statements.length === 0 &&
      this.state.switch === "General"
    ) {
      searchFieldLoader = (
        <div className={classes.noFoundData}>
          {" "}
          <img
            src="https://media.giphy.com/media/lnPZrx9J2FUvviL1mv/giphy.gif"
            alt="not found"
          ></img>
          <p style={{ color: "grey" }}>Sorry, We can't find what you need.</p>
        </div>
      );
    }

    return (
      <div className={classes.mobileScreenHandler}>
        {this.state.searchLoading && <Loading />}

        <MetaTags>
          <title>{"Problemspotter - Statements by industrial experts"}</title>
          <meta
            id="meta-description"
            name="description"
            content={"Statemnets by industrial person and approved by experts"}
          />
          <meta
            id="og-title"
            property="og:title"
            content={
              "Construction site problems , Educational website for civil engineering students , Learn the current scenario of construction site,What kind of problems they are facing"
            }
          />
          <meta
            id="og-image"
            property="og:image"
            content={
              `${apiDomain}/websiteLogo/newlogo.jpg`
            }
          />
        </MetaTags>

        <Grid container>
          <Grid item lg={2} md={2} xl={2}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6}>
            <PlusButton
              reload={() => this.onFetchinfStatementsNew()}
              searchFieldsHandler={(fields) => this.searchFieldsHandler(fields)}
              scrollToTopHandler={this.scrollToTopHandler}
            />

            <div id="myDiv" className={classes.myWidthClass}>
              <div className={classes.insidehandler}>
                <div className={classes.searchBarHandler} id="searchBar">
                  {this.state.switch === "General" ? (
                    <SearchBar
                      value={this.state.searchValue}
                      onChange={(e) => this.searchChangeHandler(e)}
                      label="Search"
                    />
                  ) : this.state.switch === "Identifier" ? (
                    <SearchBar
                      value={this.state.searchUser}
                      onChange={(e) => this.searchUserChangeHandler(e)}
                      label="Search user"
                    />
                  ) : this.state.switch === "Learner" ? (
                    <SearchBar
                      value={this.state.searchUserLearner}
                      onChange={(e) => this.searchUserInLearnerChangeHandler(e)}
                      label="Search user"
                    />
                  ) : null}
                </div>
                <Switch switchChangeHandler={this.switchChangeHandler} />

                <AddToHomescreen
                  onAddToHomescreenClick={this.handleAddToHomescreenClick}
                  appId="Add problemspotter to your home screen"
                  startAutomatically={true}
                  startDelay={0}
                  lifespan={30}
                  skipFirstVisit={true}
                  displayPace={0}
                  customPromptContent={{
                    cancelMsg: "",
                    installMsg: "Install",
                    guidanceCancelMsg: "",
                  }}
                  customPromptElements={{
                    container: "athContainer",
                    containerAddOns: "",
                    banner: "athBanner",
                    logoCell: "athLogoCell",
                    logoCellAddOns: "athContentCell",
                    logo: "athLogo",
                    titleCell: "athTitleCell",
                    titleCellAddOns: "athContentCell",
                    title: "athTitle",
                    cancelButtonCell: "athCancelButtonCell",
                    cancelButtonCellAddOns: "athButtonCell",
                    cancelButton: "athCancelButton",
                    installButtonCell: "athInstallButtonCell",
                    installButtonCellAddOns: "athButtonCell",
                    installButton: "athInstallButton",
                    installButtonAddOns: "button",
                    guidance: "athGuidance",
                    guidanceImageCell: "athGuidanceImageCell",
                    guidanceImageCellAddOns: "",
                    guidanceCancelButton: "athGuidanceCancelButton",
                  }}
                />

                {spinner}
                {searchFieldLoader}
                {statementsFields.length !== 0 && statementsFields.length > 15 && (
                  <div className={classes.paginitionDiv}>
                    <Pagination
                      variant="outlined"
                      color="primary"
                      count={this.state.pageCountNumber}
                      defaultPage={1}
                      boundaryCount={2}
                      size="large"
                      page={Number(this.state.defaultPage)}
                      onChange={(e, number) => this.pageNumberChange(e, number)}
                    />
                  </div>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4} lg={4} xl={4}>
            <Events
              recentStatements={this.state.recentStatements}
              allStatements={this.state.maxUploaderCount}
            />
          </Grid>

          <Footer />
          {""}
          <CookieConsent />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    userId: state.user.userId,
    statementsFromRedux: state.statement.statements,
    recentStatements: state.statement.recentStatements,
    composeHandler: state.user.composeHandler,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckStart: () => dispatch(actionCreator.authCheckStatus()),
    onAuthTypeHandler: (authType) =>
      dispatch(actionCreator.authTypeChecker(authType)),
    onProfileToStatements: (image) => dispatch(actionCreator.statement(image)),
    onStatementsToRedux: (data) => dispatch(actionCreator.statements(data)),
    onRecentStatementsUpdate: (data) =>
      dispatch(actionCreator.recentStatementsUpdate(data)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Statements));
