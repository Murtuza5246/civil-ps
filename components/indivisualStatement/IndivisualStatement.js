import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./indivisual.module.css";
import axios from "../axios/axios";
import { Grid } from "@material-ui/core";
import BackDrop from "../BackDropFile/BackDrop";
import Sidenav from "../sideNavbar/Sidenav";
import { withSnackbar } from "notistack";
import Footer from "../Footer/Footer";
import CommentSection from "./commentSection/commentSection";

// import { Redirect } from "react-router";
import PlusButton from "../PlusButton/PlusForIndivisual";
import draftToHtml from "draftjs-to-html";

import * as actionCreator from "../../redux/actions/index";
import Suggestions from "./Suggestions/Suggestions";
const EditingMode = dynamic(
  async () => {
    return import("./editingMode/EditingMode");
  },
  { ssr: false }
);

import dynamic from "next/dynamic";
const AdminView = dynamic(
  async () => {
    return import("./adminView/AdminView");
  },
  { ssr: false }
);
import PublicView from "./publicView/PublicView";
// const PublicView = dynamic(
//   async () => {
//     return import("./publicView/PublicView");
//   },
//   { ssr: false }
// );
import { useRouter } from "next/router";

const IndivisualStatement = (props) => {
  const router = useRouter();
  return <IndivisualStatementClass {...props} router={router} />;
};
class IndivisualStatementClass extends Component {
  static getInitialProps({ query }) {
    console.log(query);
    return { query };
  }
  state = {
    statement: null,
    approved: "",
    email: null,

    loading: false,
    profileImage: "",
    comments: [],
    updatedContent: "",
    updatedTitle: "",
    redirect: false,
    actualStatement: {},
    saveButtonIndex: false,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.initialData();
    // (window.adsbygoogle = window.adsbygoogle || []).push({});
  }
  initialData() {
    try {
      this.setState({ statement: this.props.data });
      this.setState({ actualStatement: JSON.parse(this.props.data.statement) });
      this.props.textEditor(JSON.parse(this.props.data.statement));

      this.setState({ approved: this.props.data.approved });
      this.setState({ email: this.props.data.email });
      this.setState({ comments: this.props.data.comments });
      this.setState({
        updatedTitle: this.props.data.title,
        updatedContent: this.props.data.statement,
      });
    } catch {}
  }

  fetchingStatement() {
    axios
      .get("/statements/user/statements/" + this.props.id)
      .then((result) => {
        this.setState({ statement: result.data });
        this.setState({ actualStatement: JSON.parse(result.data.statement) });
        result.textEditor(JSON.parse(result.data.statement));

        this.setState({ approved: result.data.approved });
        this.setState({ email: result.data.email });
        this.setState({ comments: result.data.comments });
        this.setState({
          updatedTitle: result.data.title,
          updatedContent: result.data.statement,
        });
        this.onProfileImageFetcher();
      })
      .catch((err) => {
        console.log(err);
        this.setState({ redirect: true });
        this.props.enqueueSnackbar("Something went wrong");
      });
  }
  onReloading = (id) => {
    this.fetchingStatement();
  };
  onLoadingHandler() {
    this.setState({ loading: true });
  }
  onChangeHandler(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  sum(key) {
    return this.reduce((a, b) => a + (b[key] || 0), 0);
  }

  onSaveStatementHandler = () => {
    this.setState({ saveButtonIndex: true });

    const audio = new Audio("https://problemspotter.com/click.mp3");
    const tick = new Audio("/tick.mp3");

    axios
      .patch("/user/statement/save/" + this.props.userId, {
        _id: this.state.statement._id,
        title: this.state.statement.title,
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
        this.setState({ saveButtonIndex: false });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ saveButtonIndex: false });
        this.props.enqueueSnackbar(err.message);
        console.log(err);
      });
  };
  cancleEditingButton(data) {
    this.setState({ clicked: false });
    this.fetchingStatement();
  }
  updateStatement(variant) {
    this.setState({ disabled: true });

    let updatedData = {
      updatedTitle: this.state.updatedTitle,
      updatedContent: JSON.stringify(this.props.newObjectFinal),
      userId: this.props.userId,
    };

    axios
      .patch(
        "/statements/updateFields/" + this.props.id,

        updatedData,
        {
          headers: {
            authorization: "Bearer " + this.props.token, //the token is a variable which holds the token
          },
        }
      )
      .then((result) => {
        this.setState({ disabled: false });
        this.props.enqueueSnackbar("Updated successfully", variant);
        this.fetchingStatement();
        this.setState({ clicked: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ disabled: false });
        this.props.enqueueSnackbar("Something went wrong");
      });
    this.fetchingStatement();
  }

  render() {
    const contentState = draftToHtml(this.state.actualStatement);

    let data = null;

    if (this.state.approved !== "" && this.state.approved) {
      data = (
        <PublicView
          statement={this.state.statement}
          approved={this.state.approved}
          contentState={contentState}
          saveButtonIndex={this.state.saveButtonIndex}
          onSaveStatementHandler={this.onSaveStatementHandler}
          fields={this.state.statement.field ? this.state.statement.field : []}
          id={this.state.statement._id}
          urlId={this.props.id}
          someId={this.props.id}
          comments={this.state.comments}
          name={this.props.fName + " " + this.props.lName}
          userId={this.state.statement.userId}
        />
      );
    }
    if (this.state.approved !== "" && !this.state.approved) {
      data = (
        <div>
          <h2 className={classes.h2Tag}>YOU ARE NOT AUTHORIZED</h2>
        </div>
      );
    }
    if (
      this.state.approved !== "" &&
      (this.state.approved === null || this.state.approved === false) &&
      this.props.canApprove
    ) {
      data = (
        <AdminView
          statement={this.state.statement}
          approved={this.state.approved}
          contentState={contentState}
          saveButtonIndex={this.state.saveButtonIndex}
          editingModeButton={() =>
            this.setState({ clicked: !this.state.clicked })
          }
          onSaveStatementHandler={this.onSaveStatementHandler}
          onReloading={this.onReloading}
        />
      );
    }

    if (this.state.clicked && this.props.authType === "Admin") {
      data = (
        <EditingMode
          updatedTitle={this.state.updatedTitle}
          onChangeHandler={(e) => this.onChangeHandler(e)}
          updateStatement={() => this.updateStatement("success")}
          cancleEditingButton={() => this.cancleEditingButton()}
        />
      );
    }
    return (
      <div className={classes.IndivisualStatementMainDiv}>
        <PlusButton />
        {this.state.redirect && this.props.router.push("/not/found")}
        <Grid container>
          <Grid item md={2} lg={2} xl={2}>
            <Sidenav />
          </Grid>{" "}
          <Grid item md={10} lg={10} xl={10}>
            <div id="myDiv" className={classes.myWidthClass}>
              <div className={classes.overFlowDiv}>{data}</div>
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
    authType: state.user.authType,
    canApprove: state.user.canApprove,
    userId: state.user.userId,
    fName: state.user.fName,
    token: state.user.token,
    lName: state.user.lName,
    textObject: state.user.textObject,
    newObjectFinal: state.user.newObjectForStatement,
    string: state.user.string,
    verifiedUsers: state.user.verifiedUsers,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    textEditor: (textObject) => dispatch(actionCreator.textEditor(textObject)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(IndivisualStatement));
