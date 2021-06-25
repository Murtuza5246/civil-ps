import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Compose.module.css";
import { Form, Button, Col } from "react-bootstrap";
import { Progress } from "reactstrap";
// import { Redirect } from "react-router";
import Sidenav from "../sideNavbar/Sidenav";
import axios from "../axios/axios";
import Footer from "../Footer/Footer";
import { FormControlLabel, Grid, Switch } from "@material-ui/core";
import { withSnackbar } from "notistack";
import Keywords from "./keywords/Keyword";
import MetaTags from "react-meta-tags";
import { loadReCaptcha } from "react-recaptcha-google";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextEditor from "../textEditor/TextEditor";
import FieldSelect from "./FieldSelect";
import * as actionCreator from "../../redux/actions/index";
import { fields } from "../Fields/Fields";
import ContentType from "./ContentType";
import ImageCarasol from "./imageCarasol/ImageCarasol";
import YoutubeVideo from "../videoPlayer/Youtube";
import SelectedDocuments from "./SelectedDocuments";
import { apiDomain } from "../../apiPath";

class ComposeStatements extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadPercentage: 0,
      title: "",
      content: this.props.textObject,
      field: "",
      place: "",
      youTubeURL: "",
      youTubeURLDescription: "",
      statementImage: "",

      identifier: "",
      email: "",
      organizationName: "",
      shareEmail: false,
      link: "",
      linkTitle: "",
      attention: false,
      organizationLink: "",
      mSecond: "",
      loading: false,
      document: "",
      label: "Problem",
      keyword: {
        label: "",
      },
      resetFields: {
        label: "",
      },
      passingFields: {
        label: "",
      },
      passingKeyword: {
        label: "",
      },
      keywordButton: false,
      fieldButton: false,
      finalKeyWords: null,
      clearStorage: true,
      clearField: true,
      selectedImages: [],
      selectedDocuments: [],
      fieldForArray: "",
      textObject: {
        blocks: [
          {
            text: "",
          },
        ],
      },
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const fullName = this.props.fName + " " + this.props.lName;
      this.setState({ identifier: fullName, email: this.props.email });
    }, 1000);
    loadReCaptcha();
    this.props.onSettingObject();
  }
  textObjectDummy = (object) => {
    this.setState({ textObject: object });
  };

  onLabelChangeHandler = (value) => {
    this.setState({ label: value });
  };
  onChangeHandler = (event) => {
    const { name, value } = event.target;
    if (name === "keyword") {
      this.setState({
        [name]: {
          label: value,
        },
      });
      return;
    }
    if (name === "field") {
      this.setState({ fieldForArray: value });
      return;
    }
    this.setState({ [name]: value });
  };
  onChangeCheckHandler = (event) => {
    const { name, checked } = event.target;

    this.setState({ [name]: checked });
  };

  onFilesHandler = (e) => {
    this.setState({ statementImage: e.target.files });

    let imageArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      imageArray.push({
        image: URL.createObjectURL(e.target.files[i]),
      });
    }
    this.setState({ selectedImages: imageArray });
  };
  keywordsHandler() {
    this.setState({ passingKeyword: this.state.keyword });
    this.setState({
      keyword: {
        label: "",
      },
    });
  }
  onDocumentHandler = (e) => {
    try {
      this.setState({ document: e.target.files });
    } catch {
      this.setState({ document: "" });
    }
    let documentArray = [];
    for (let i = 0; i < e.target.files.length; i++) {
      documentArray.push({
        url: URL.createObjectURL(e.target.files[i]),
      });
    }
    this.setState({ selectedDocuments: documentArray });
  };
  finalListHandle(data) {
    this.setState({ finalKeyWords: data });
    this.setState({ keywordButton: true });
    this.setState({
      keyword: {
        label: "",
      },
    });
  }
  mentionedPeople(data) {
    this.setState({ mentions: data });
  }

  onFieldGetting(data) {
    this.setState({ finalFields: data });
  }
  onSubmitHandler = (e, variant) => {
    e.preventDefault();
    const time =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();
    const date = new Date();
    const mSecond = new Date().getTime();
    this.setState({
      date: date,
      time: time,
      mSecond,
    });

    if (
      this.state.title === "" ||
      this.state.place === "" ||
      this.state.organizationName === ""
    ) {
      this.props.enqueueSnackbar("Please Fill The All Required Fields.");
      return;
    }
    if (this.state.finalFields.length === 0) {
      this.props.enqueueSnackbar("Please select field first.");
      return;
    }
    if (
      this.state.organizationLink !== "" &&
      this.state.organizationName === ""
    ) {
      this.props.enqueueSnackbar(
        "organization link is provided but link isn't"
      );
      return;
    }
    if (this.state.link !== "" && this.state.linkTitle === "") {
      this.props.enqueueSnackbar("Link is provided but link title  isn't.");
      return;
    }
    if (!this.state.keywordButton) {
      this.props.enqueueSnackbar("Please save the keywords");
      return;
    }

    if (this.state.textObject.blocks[0].text === "") {
      this.props.enqueueSnackbar("Detailed statement can not be blank!");

      return;
    }
    if (this.state.textObject.blocks[0].text.length < 20) {
      this.props.enqueueSnackbar("Detailed statement can not be too short!");

      return;
    }

    const formData = new FormData();
    formData.append("profileImage", this.props.profileImage);
    formData.append("userId", this.props.userId);
    for (var x = 0; x < this.state.statementImage.length; x++) {
      formData.append("statementImage", this.state.statementImage[x]);
    }
    for (var i = 0; i < this.state.statementImage.length; i++) {
      formData.append("statementImage", this.state.document[i]);
    }
    formData.append("statementImage", this.state.statementImage);
    formData.append("title", this.state.title);
    formData.append("label", this.state.label);

    formData.append("keyword", JSON.stringify(this.state.finalKeyWords));

    formData.append("organizationLink", this.state.organizationLink);
    formData.append("field", JSON.stringify(this.state.finalFields));
    formData.append("place", this.state.place);
    formData.append("identifier", this.state.identifier);
    formData.append("email", this.state.email);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("statement", JSON.stringify(this.props.textObject));

    formData.append("mentions", JSON.stringify(this.state.mentions));

    formData.append("organization", this.state.organizationName);
    formData.append("approval", false);
    formData.append("link", this.state.link);
    formData.append("linkTitle", this.state.linkTitle);
    formData.append("shareEmail", this.state.shareEmail);
    formData.append("youTubeURL", this.state.youTubeURL);
    formData.append("youTubeURLDescription", this.state.youTubeURLDescription);
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

    const postString =
      this.state.statementImage !== ""
        ? "/statements/compose/"
        : "/statements/compose/textonly";
    axios
      .post(postString, formData, options)
      .then((result) => {
        this.setState({ loading: false });
        this.setState({ keywordButton: false });
        this.setState({ clearStorage: false });
        this.setState({ clearField: false });
        this.setState({ uploadPercentage: 100 }, () => {
          setTimeout(() => {
            this.setState({ uploadPercentage: 0 });
          }, 1000);
        });

        this.props.enqueueSnackbar("Created statement successfully", {
          variant,
        });
        this.props.enqueueSnackbar("Yoy will get notified ones its approved");
        this.stateHandler();
      })
      .catch((err) => {
        this.setState({ loading: false });
        this.setState({ keywordButton: false });
        this.setState({ uploadPercentage: 0 });
        this.props.enqueueSnackbar(err.message);
      });

    ///////////////////////////////////////////////////////////
  };

  stateHandler = () => {
    this.setState({
      title: "",
      content: "",
      field: "",
      place: "",
      statementImage: "",
      organizationName: "",
      shareEmail: false,
      link: "",
      linkTitle: "",
      youTubeURL: "",
      youTubeURLDescription: "",
      organizationLink: "",
    });
  };
  handleChangeLabel = (e) => {
    this.setState({ checked: e.target.checked });
  };
  render() {
    let redirect = null;
    if (!this.props.composeHandler) {
      // redirect = <Redirect to="/" />;
    }
    const textEditorError = () => {
      try {
        return (
          <TextEditor
            mentionedPeople={(data) => this.mentionedPeople(data)}
            object={(data) => this.textObjectDummy(data)}
          />
        );
      } catch {
        return <div>You have error with text editor;;</div>;
      }
    };

    return (
      <div>
        {" "}
        <MetaTags>
          <title>{"Problemspotter - Compose statements"}</title>
          <meta
            id="meta-description"
            name="description"
            content={"Statement Approval will done after review"}
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
        {redirect}
        <Grid container>
          <Grid item md={2} lg={2} xl={2}>
            <Sidenav />
          </Grid>
          <Grid item md={10} lg={10} xl={10}>
            <div className={classes.myWidthClassCompose}>
              <div className={classes.BoxShadowBox}>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <h2 style={{ fontFamily: "Merriweather", color: "#0321b5" }}>
                    Compose Statement{" "}
                    <i
                      style={{ fontSize: "1.4rem", color: "#42d13a" }}
                      className="fas fa-pen-alt fas-7x"
                    ></i>
                  </h2>
                </div>
                <div className={classes.toastControl}></div>
                <Form
                  action="submit"
                  encType="multipart/form-data"
                  onSubmit={(e) => this.onSubmitHandler(e, "success")}
                  className={classes.FormTop}
                >
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <FieldSelect
                      selectedFields={(data) => this.onFieldGetting(data)}
                      fieldArray={fields.map((name) => name.toUpperCase())}
                    />
                    <Form.Text className="text-muted">
                      Choose your core field first
                    </Form.Text>
                    <Form.Text className="text-muted">
                      This will help students to search statements according to
                      their area of interest
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>
                      content type <i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <ContentType
                      onChangeHandler={this.onLabelChangeHandler}
                      label={this.state.label}
                    />
                    {this.props.authType === "Identifier" && (
                      <Form.Text className="text-muted">
                        If you just want to share a knowledge then select
                        knowledge from drop down
                      </Form.Text>
                    )}

                    {this.props.authType === "Professor" && (
                      <Form.Text className="text-muted">
                        If you just want to share a problem then select problem
                        from drop down
                      </Form.Text>
                    )}
                    {this.props.authType === "Admin" && (
                      <Form.Text className="text-muted">
                        If you just want to share a problem then select problem
                        from drop down
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      Title <i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={this.state.title}
                      placeholder="Enter title here"
                      onChange={(e) => this.onChangeHandler(e)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      Place <i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="place"
                      value={this.state.place}
                      onChange={(e) => this.onChangeHandler(e)}
                      placeholder="Enter place here"
                    />
                    <Form.Text className="text-muted">
                      Write your working place in state after city. eg Gujarat,
                      Vadodara
                    </Form.Text>
                  </Form.Group>
                  <Form.Row as={Col} controlId="formGridPassword">
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>
                        Organization <i className="fas fa-star-of-life"></i>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="organizationName"
                        value={this.state.organizationName}
                        onChange={(e) => this.onChangeHandler(e)}
                        placeholder="Enter your organization"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Organization Link</Form.Label>
                      <Form.Control
                        type="text"
                        name="organizationLink"
                        value={this.state.organizationLink}
                        onChange={(e) => this.onChangeHandler(e)}
                        placeholder="Enter your organization Link"
                      />
                      <Form.Text className="text-muted">
                        Only One Link Is Allowed.
                      </Form.Text>
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>
                      Detailed Statement <i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <div className={classes.TextEditor}>
                      {textEditorError()}

                      <Form.Text className="text-muted">
                        People will get notified if you mention them in detailed
                        statement.
                      </Form.Text>
                    </div>
                  </Form.Group>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Link Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="linkTitle"
                        placeholder="Enter Link Heading"
                        onChange={(e) => this.onChangeHandler(e)}
                        value={this.state.linkTitle}
                      />{" "}
                      <Form.Text className="text-muted">
                        Enter link heading eg. "My reference Link".
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Link</Form.Label>
                      <Form.Control
                        type="text"
                        name="link"
                        value={this.state.link}
                        onChange={(e) => this.onChangeHandler(e)}
                        placeholder="Enter your reference link"
                      />
                      <Form.Text className="text-muted">
                        In this field only one Link is allowed.
                      </Form.Text>
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      YouTube Link{" "}
                      <span
                        style={{ color: "red" }}
                        className="fab fa-youtube"
                      ></span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="youTubeURL"
                      value={this.state.youTubeURL}
                      onChange={(e) => this.onChangeHandler(e)}
                      placeholder="Enter YouTube link here"
                    />
                    <Form.Text className="text-muted">
                      Sharing videos are good practice to share knowledge.
                    </Form.Text>
                  </Form.Group>
                  {this.state.youTubeURL !== "" && (
                    <div>
                      <YoutubeVideo videoId={this.state.youTubeURL} />
                    </div>
                  )}
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>
                      YouTube video Description ?{" "}
                      <span
                        style={{ color: "red" }}
                        className="fab fa-youtube"
                      ></span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="youTubeURLDescription"
                      value={this.state.youTubeURLDescription}
                      onChange={(e) => this.onChangeHandler(e)}
                      placeholder="Enter some explanation for video."
                    />
                    <Form.Text className="text-muted">
                      Share some thoughts about the video..
                    </Form.Text>
                  </Form.Group>
                  <Form.File
                    className={classes.uploadFilesPadding}
                    accept="image/*"
                    multiple="multiple"
                    id="custom-file"
                    label={
                      this.state.statementImage === ""
                        ? "Choose image "
                        : this.state.statementImage.length +
                          " image" +
                          (this.state.statementImage.length > 1 ? "s" : "") +
                          " selected"
                    }
                    onChange={(e) => this.onFilesHandler(e)}
                    custom
                  />
                  <Form.File
                    className={classes.uploadFilesPadding}
                    accept="application/pdf,application/msword"
                    multiple="multiple"
                    id="custom-file"
                    label={
                      this.state.document === ""
                        ? "Choose file "
                        : this.state.document.length +
                          " file" +
                          (this.state.document.length > 1 ? "s" : "") +
                          " selected"
                    }
                    onChange={(e) => this.onDocumentHandler(e)}
                    custom
                  />{" "}
                  {this.state.selectedImages.length !== 0 ? (
                    <div className={classes.imageCarasol}>
                      <div className={classes.carasolMarginClass}>
                        <ImageCarasol images={this.state.selectedImages} />
                      </div>
                      <hr />
                    </div>
                  ) : null}
                  {this.state.selectedDocuments.length !== 0 ? (
                    <div className={classes.imageCarasol}>
                      <div className={classes.carasolMarginClass}>
                        {this.state.selectedDocuments.map((item) => (
                          <SelectedDocuments filename={item.url} />
                        ))}
                      </div>
                      <hr />
                    </div>
                  ) : null}
                  <div
                    style={{
                      borderRadius: "10px",
                      border: "2px solid green",
                      padding: "10px",
                    }}
                  >
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Keywords</Form.Label>
                      <Form.Control
                        type="text"
                        name="keyword"
                        value={this.state.keyword.label}
                        onChange={(e) => this.onChangeHandler(e)}
                        placeholder="e.g total station"
                        disabled={this.state.keywordButton}
                      />
                      <Form.Text className="text-muted">
                        keywords make search easier.
                      </Form.Text>
                      <Button
                        name="keyword"
                        variant="outlined"
                        onClick={(e) => this.keywordsHandler(e)}
                      >
                        <i
                          style={{ fontSize: "1.5rem", color: "green" }}
                          className="fas fa-arrow-circle-down"
                        >
                          ADD
                        </i>
                      </Button>
                    </Form.Group>
                    <Keywords
                      resetArray={this.state.clearStorage}
                      keywordButton={this.state.keywordButton}
                      word={this.state.passingKeyword}
                      arrayTransfer={(data) => this.finalListHandle(data)}
                    />
                  </div>
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check
                      onChange={(e) => this.onChangeCheckHandler(e)}
                      name="shareEmail"
                      type="checkbox"
                      label="Share your email with students."
                      value={this.state.shareEmail}
                    />
                  </Form.Group>
                  <Progress
                    max="100"
                    color="success"
                    value={this.state.uploadPercentage}
                    className="mt-4 mb-1"
                  >
                    {isNaN(Math.round(this.state.uploadPercentage, 2))
                      ? 0
                      : Math.round(this.state.uploadPercentage, 2)}
                    %
                  </Progress>
                  <Grid container>
                    <Grid item xs={3} lg={2} md={2} xl={2}>
                      {" "}
                      <Button
                        disabled={this.state.loading}
                        variant="primary"
                        type="submit"
                        onClick={(e) => this.onSubmitHandler(e, "success")}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <Grid item xs={9} lg={10} md={10} xl={10}>
                      {" "}
                      <p style={{ color: "red" }}>
                        {this.state.loading && <CircularProgress />}
                      </p>
                    </Grid>
                  </Grid>
                </Form>
              </div>
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
    token: state.user.token,
    profileImage: state.statement.profileImage,
    fName: state.user.fName,
    lName: state.user.lName,
    email: state.user.email,
    userId: state.user.userId,
    string: state.user.string,
    textObject: state.user.textObject,
    composeHandler: state.user.composeHandler,
    numberVerified: state.user.numberVerified,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSettingObject: () => dispatch(actionCreator.textEditor({})),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(ComposeStatements));
