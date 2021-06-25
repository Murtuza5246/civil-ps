import React, { Component } from "react";
import classes from "./signup.module.css";
import { Form, Button, Col } from "react-bootstrap";
import Sidenav from "../../sideNavbar/Sidenav";
import axios from "../../axios/axios";
import { withSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import MetaTags from "react-meta-tags";
import Footer from "../../Footer/Footer";
import { loadReCaptcha } from "react-recaptcha-google";
import PasswordStrengthBar from "react-password-strength-bar";
import { connect } from "react-redux";
import shortid from "shortid";
import { withRouter } from "next/router";
import { apiDomain } from "../../../apiPath";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authType: "Student",
      email: "",
      password0: "",
      password1: "",
      fName: "",
      lName: "",
      experience: "",
      cAddress: "",
      cName: "",
      dob: "",
      selectedProfile: "",
      pString: "",
      city: "",
      nState: "",
      pCode: "",
      profileImage: "",
      imageSize: 1,
      imageSize1: 0,
      Number: "",
      redirect: false,
      loading: false,

      OName: "",
      OAddress: "",
      field: "",
    };
    this.onSubmitMethod = this.onSubmitMethod.bind();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    loadReCaptcha();
  }
  onSubmitMethod = (e, variant) => {
    e.preventDefault();
    var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!regularExpression.test(this.state.password0)) {
      alert(
        "password should contain atleast one number and one special character"
      );
      return;
    }
    if (this.state.authType === "Student") {
      if (
        !(
          this.state.fName === "" ||
          this.state.lName === "" ||
          this.state.email === "" ||
          this.state.password0 === "" ||
          this.state.password1 === "" ||
          this.state.password0 !== this.state.password1
        ) &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.state.email
        )
      ) {
        const creationDate = new Date();
        const creationTime = new Date().toLocaleTimeString();
        let formData = new FormData();
        formData.append("profileImage", this.state.profileImage);
        formData.append("authType", this.state.authType);
        formData.append("fName", this.state.fName);
        formData.append("lName", this.state.lName);
        formData.append("email", this.state.email);
        formData.append("password", this.state.password0);
        formData.append("creationDate", creationDate);
        formData.append("creationTime", creationTime);

        // let data = {
        //   authType: this.state.authType,
        //   fName: this.state.fName,
        //   lName: this.state.lName,
        //   email: this.state.email,
        //   password: this.state.password1,
        //   creationDate: new Date().toLocaleDateString(),
        //   creationTime: new Date().toLocaleTimeString(),
        // };
        if (this.state.profileImage !== "") {
          if (this.state.imageSize1 < 0.51) {
            this.setState({ loading: true });

            axios
              .post(`/user/signup/${shortid.generate()}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                if (res.data.message !== "User already exists") {
                  this.setState({ redirect: true });
                  this.props.router.push("/statements");
                }
                this.setState({ loading: false });
                if (res.data.message === "User already exists") {
                  this.props.enqueueSnackbar(res.data.message);
                } else {
                  this.props.enqueueSnackbar(res.data.message, { variant });
                }
              })
              .catch((err) => {
                console.log(err);
                this.setState({ loading: false });
                this.setState({ redirect: false });
                this.props.enqueueSnackbar(err.message);
              });
          } else {
            this.props.enqueueSnackbar("Photo should be less than 0.5MB");
          }
        } else {
          this.props.enqueueSnackbar("Profile photo is mandatory.");
        }
      } else if (this.state.password0 !== this.state.password1) {
        this.props.enqueueSnackbar("Password Do not match.");
        return;
      } else {
        this.props.enqueueSnackbar("Please enter valid details");
        return;
      }
    }
    if (this.state.authType === "Admin") {
      if (
        !(
          this.state.fName === "" ||
          this.state.lName === "" ||
          this.state.email === "" ||
          this.state.password0 === "" ||
          this.state.password1 === "" ||
          this.state.password0 !== this.state.password1 ||
          this.state.pString === ""
        ) &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.state.email
        )
      ) {
        if (this.state.imageSize1 < 0.51) {
          const creationDate = new Date();
          const creationTime = new Date().toLocaleTimeString();
          let formData = new FormData();
          formData.append("profileImage", this.state.profileImage);
          formData.append("authType", this.state.authType);
          formData.append("fName", this.state.fName);
          formData.append("lName", this.state.lName);
          formData.append("email", this.state.email);
          formData.append("password", this.state.password0);
          formData.append("creationDate", creationDate);
          formData.append("creationTime", creationTime);
          formData.append("pString", this.state.pString);
          if (this.state.profileImage !== "") {
            this.setState({ loading: true });
            axios
              .patch("/pString/private/" + this.state.pString)
              .then((result) => {
                if (result.data) {
                  if (
                    !(
                      this.state.fName === "" ||
                      this.state.lName === "" ||
                      this.state.email === "" ||
                      this.state.profileImage === "" ||
                      this.state.password0 === "" ||
                      this.state.password1 === "" ||
                      this.state.password0 !== this.state.password1 ||
                      this.state.pString === ""
                    ) &&
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                      this.state.email
                    )
                  ) {
                    axios
                      .post(`/user/signup/${shortid.generate()}`, formData, {
                        headers: {
                          "Content-Type": "multipart/form-data",
                        },
                      })
                      .then((res) => {
                        if (res.data.message !== "User already exists") {
                          this.setState({ redirect: true });
                          this.props.router.push("/statements");
                        }
                        this.setState({ loading: false });
                        if (res.data.message === "User already exists") {
                          this.props.enqueueSnackbar(res.data.message);
                          this.props.enqueueSnackbar("String is expired now");
                        } else {
                          this.props.enqueueSnackbar(res.data.message, {
                            variant,
                          });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        this.setState({ loading: false });
                        this.setState({ redirect: false });
                        this.props.enqueueSnackbar(err.message);
                      });
                  } else if (this.state.password0 !== this.state.password1) {
                    this.props.enqueueSnackbar("Password Do not match.");
                  } else if (this.state.profileImage === "") {
                    this.props.enqueueSnackbar(" Profile photo is mandatory.");
                  } else {
                    this.props.enqueueSnackbar("Please enter valid details");
                    return;
                  }
                } else {
                  this.setState({ loading: false });
                  this.props.enqueueSnackbar("String is not valid");
                }
              })
              .catch((err) => {
                this.setState({ loading: false });
                this.props.enqueueSnackbar("String is not valid");
                this.props.enqueueSnackbar(err.message);
              });
          } else {
            this.props.enqueueSnackbar("Profile photo is mandatory");
          }
        } else {
          this.props.enqueueSnackbar("Photo should be less than 0.5MB");
        }
      } else {
        this.props.enqueueSnackbar("Enter valid data");
      }
    }
    if (this.state.authType === "Identifier") {
      if (
        !(
          this.state.authType === "" ||
          this.state.fName === "" ||
          this.state.lName === "" ||
          this.state.email === "" ||
          this.state.password0 === "" ||
          this.state.password1 === "" ||
          this.state.Number === "" ||
          this.state.dob === "" ||
          this.state.cName === "" ||
          this.state.cAddress === "" ||
          this.state.city === "" ||
          this.state.nState === "" ||
          this.state.pCode === "" ||
          this.state.experience === "" ||
          this.state.password0 !== this.state.password1
        ) &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.state.email
        )
      ) {
        if (this.state.imageSize1 < 0.51) {
          const creationDate = new Date();
          const creationTime = new Date().toLocaleTimeString();
          let formData = new FormData();
          formData.append("profileImage", this.state.profileImage);
          formData.append("authType", this.state.authType);
          formData.append("fName", this.state.fName);
          formData.append("lName", this.state.lName);
          formData.append("email", this.state.email);
          formData.append("password", this.state.password0);
          formData.append("contact", this.state.Number);
          formData.append("dob", this.state.dob);
          formData.append("cName", this.state.cName);
          formData.append("cAddress", this.state.cAddress);
          formData.append("city", this.state.city);
          formData.append("nState", this.state.nState);
          formData.append("pCode", this.state.pCode);
          formData.append("experience", this.state.experience);
          formData.append("creationDate", creationDate);
          formData.append("creationTime", creationTime);
          if (this.state.profileImage !== "") {
            this.setState({ loading: true });
            axios
              .post(`/user/signup/${shortid.generate()}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                if (res.data.message !== "User already exists") {
                  this.setState({ redirect: true });
                  this.props.router.push("/statements");
                  this.props.enqueueSnackbar(res.data.message, { variant });
                }
                this.setState({ loading: false });
                if (res.data.message === "User already exists") {
                  this.props.enqueueSnackbar(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
                this.setState({ redirect: false });
                this.setState({ loading: false });
                this.props.enqueueSnackbar(err.message);
              });
          } else {
            this.props.enqueueSnackbar("Profile photo is mandatory.");
          }
        } else {
          this.props.enqueueSnackbar("Photo should be less than 0.5MB");
        }
      } else {
        this.props.enqueueSnackbar("Please enter valid detail");
      }
    }
    if (this.state.authType === "Professor") {
      if (
        !(
          this.state.authType === "" ||
          this.state.fName === "" ||
          this.state.lName === "" ||
          this.state.email === "" ||
          this.state.password0 === "" ||
          this.state.password1 === "" ||
          this.state.Number === "" ||
          this.state.dob === "" ||
          this.state.OName === "" ||
          this.state.OAddress === "" ||
          this.state.city === "" ||
          this.state.nState === "" ||
          this.state.pCode === "" ||
          this.state.experience === "" ||
          this.state.password0 !== this.state.password1
        ) &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          this.state.email
        )
      ) {
        if (this.state.imageSize1 < 0.51) {
          const creationDate = new Date();
          const creationTime = new Date().toLocaleTimeString();
          let formData = new FormData();
          formData.append("profileImage", this.state.profileImage);
          formData.append("authType", this.state.authType);
          formData.append("fName", this.state.fName);
          formData.append("lName", this.state.lName);
          formData.append("email", this.state.email);
          formData.append("password", this.state.password0);
          formData.append("contact", this.state.Number);
          formData.append("dob", this.state.dob);
          formData.append("cName", this.state.cName);
          formData.append("cAddress", this.state.cAddress);
          formData.append("city", this.state.city);
          formData.append("nState", this.state.nState);
          formData.append("pCode", this.state.pCode);
          formData.append("experience", this.state.experience);
          formData.append("creationDate", creationDate);
          formData.append("creationTime", creationTime);
          if (this.state.profileImage !== "") {
            this.setState({ loading: true });
            axios
              .post(`/user/signup/${shortid.generate()}`, formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((res) => {
                if (res.data.message !== "User already exists") {
                  this.setState({ redirect: true });
                  this.props.router.push("/statements");
                  this.props.enqueueSnackbar(res.data.message, { variant });
                }
                this.setState({ loading: false });
                if (res.data.message === "User already exists") {
                  this.props.enqueueSnackbar(res.data.message);
                }
              })
              .catch((err) => {
                console.log(err);
                this.setState({ redirect: false });
                this.setState({ loading: false });
                this.props.enqueueSnackbar(err.message);
              });
          } else {
            this.props.enqueueSnackbar("Profile photo is mandatory.");
          }
        } else {
          this.props.enqueueSnackbar("Photo should be less than 0.5MB");
        }
      } else {
        this.props.enqueueSnackbar("Please enter valid detail");
      }
    }
  };
  onFilesHandler = (e) => {
    try {
      this.setState({ profileImage: e.target.files[0] });
    } catch {
      this.setState({ profileImage: "" });
    }
    try {
      this.setState({
        selectedProfile: URL.createObjectURL(e.target.files[0]),
      });
    } catch {
      this.setState({
        selectedProfile: "",
      });
    }
    try {
      this.setState({ imageSize: e.target.files[0].size / (1024 * 1024) });
    } catch {
      this.setState({ imageSize: 1 });
    }
    try {
      this.setState({ imageSize1: e.target.files[0].size / (1024 * 1024) });
    } catch {
      this.setState({ imageSize1: "" });
    }
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className={classes.mainSignupDiv}>
        <MetaTags>
          <title>{"Problemspotter - User Signup"}</title>
          <meta
            id="meta-description"
            name="description"
            content={"Signup will create an account to access user features"}
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
          <Grid item md={2} lg={2} xl={2}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} md={10} lg={10} xl={10}>
            <div className={classes.signupPage}>
              <div className={classes.nestedDivSignup}>
                <h2 className={classes.authHeading}>SignUp Page</h2>

                <Form>
                  <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>
                      Auth type <i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <Form.Control
                      as="select"
                      name="authType"
                      required
                      value={this.state.authType}
                      onChange={(e) => this.onChangeHandler(e)}
                    >
                      <option>Student</option>

                      <option>Identifier</option>
                      <option>Professor</option>
                    </Form.Control>
                    <Form.Text className="text-muted">
                      Select this as per your Designation
                    </Form.Text>
                  </Form.Group>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>
                        First Name<i className="fas fa-star-of-life"></i>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => this.onChangeHandler(e)}
                        type="text"
                        name="fName"
                        value={this.state.fName}
                        required
                        placeholder="Enter First Name"
                      />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>
                        LastName<i className="fas fa-star-of-life"></i>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => this.onChangeHandler(e)}
                        type="text"
                        name="lName"
                        required
                        value={this.state.lName}
                        placeholder="Enter Last Name"
                      />
                    </Form.Group>

                    <Form.File
                      accept="image/*"
                      className={classes.uploadFilesPadding}
                      id="custom-file"
                      label={
                        this.state.profileImage === ""
                          ? "Upload profile photo* "
                          : this.state.profileImage
                          ? this.state.profileImage.name
                          : "Upload profile photo* "
                      }
                      onChange={(e) => this.onFilesHandler(e)}
                      custom
                    />
                  </Form.Row>
                  <p style={{ color: "red" }}>
                    {this.state.imageSize1 > 0.51 &&
                      "Photo should be less than 0.5MB"}
                  </p>
                  {this.state.selectedProfile !== "" && (
                    <div style={{ width: "100%" }}>
                      <img
                        src={this.state.selectedProfile}
                        alt="profile"
                        className={classes.selectedImage}
                      />
                    </div>
                  )}

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                      Email<i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => this.onChangeHandler(e)}
                      type="email"
                      name="email"
                      required
                      value={this.state.email}
                      placeholder="Enter your email"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                      Password<i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <Form.Control
                      onChange={(e) => this.onChangeHandler(e)}
                      type="password"
                      name="password0"
                      value={this.state.password0}
                      required
                      placeholder="Password"
                    />
                    <PasswordStrengthBar
                      password={this.state.password0}
                      minLength={5}
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>
                      Re-Type Password<i className="fas fa-star-of-life"></i>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password1"
                      required
                      value={this.state.password1}
                      onChange={(e) => this.onChangeHandler(e)}
                      placeholder="Re-Type Password"
                    />

                    {this.state.password1 !== this.state.password0 &&
                      this.state.password1 !== "" && (
                        <Form.Text className="text-muted">
                          <p style={{ color: "red" }}>password not match</p>
                        </Form.Text>
                      )}
                  </Form.Group>

                  {/* identifier data down*/}
                  {this.state.authType === "Admin" && (
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>
                        Enter your private string
                        <i className="fas fa-star-of-life"></i>
                      </Form.Label>
                      <Form.Control
                        onChange={(e) => this.onChangeHandler(e)}
                        type="password"
                        required
                        name="pString"
                        value={this.state.pString}
                        placeholder="Private string"
                      />
                    </Form.Group>
                  )}
                  {this.state.authType === "Identifier" && (
                    <div>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>
                            Contact<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="number"
                            name="Number"
                            required
                            value={this.state.Number}
                            placeholder="Enter Contact"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>
                            DOB<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="dob"
                            onChange={(e) => this.onChangeHandler(e)}
                            value={this.state.dob}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                          onChange={(e) => this.onChangeHandler(e)}
                          type="text"
                          name="cName"
                          value={this.state.cName}
                          placeholder="Company Name"
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>
                          Company Address<i className="fas fa-star-of-life"></i>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => this.onChangeHandler(e)}
                          name="cAddress"
                          value={this.state.cAddress}
                          placeholder="Company full address"
                        />
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>
                            City<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="text"
                            name="city"
                            value={this.state.city}
                            placeholder="City"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>
                            state<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="text"
                            name="nState"
                            value={this.state.nState}
                            placeholder="State"
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>
                            Pin Code<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="text"
                            value={this.state.pCode}
                            name="pCode"
                            placeholder="Pin Code"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Experience in years
                          <i className="fas fa-star-of-life"></i>
                        </Form.Label>
                        <Form.Control
                          onChange={(e) => this.onChangeHandler(e)}
                          type="text"
                          name="experience"
                          value={this.state.experience}
                          placeholder="Experience"
                        />
                        <Form.Text className="text-muted">
                          This is for the students who want more information
                          about uploader.
                        </Form.Text>
                      </Form.Group>
                    </div>
                  )}
                  {this.state.authType === "Professor" && (
                    <div>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Field</Form.Label>
                        <Form.Control
                          onChange={(e) => this.onChangeHandler(e)}
                          type="text"
                          name="field"
                          value={this.state.field}
                          placeholder="Your Field"
                        />
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>
                            Contact<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="number"
                            name="Number"
                            required
                            value={this.state.Number}
                            placeholder="Enter Contact"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>
                            DOB<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            name="dob"
                            onChange={(e) => this.onChangeHandler(e)}
                            value={this.state.dob}
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Organization Name</Form.Label>
                        <Form.Control
                          onChange={(e) => this.onChangeHandler(e)}
                          type="text"
                          name="OName"
                          value={this.state.OName}
                          placeholder="Organization Name"
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>
                          Organization Address
                          <i className="fas fa-star-of-life"></i>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={(e) => this.onChangeHandler(e)}
                          name="OAddress"
                          value={this.state.OAddress}
                          placeholder="Organization full address"
                        />
                      </Form.Group>
                      <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>
                            City<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="text"
                            name="city"
                            value={this.state.city}
                            placeholder="City"
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>
                            state<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="text"
                            name="nState"
                            value={this.state.nState}
                            placeholder="State"
                          />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPassword">
                          <Form.Label>
                            Pin Code<i className="fas fa-star-of-life"></i>
                          </Form.Label>
                          <Form.Control
                            onChange={(e) => this.onChangeHandler(e)}
                            type="text"
                            value={this.state.pCode}
                            name="pCode"
                            placeholder="Pin Code"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Experience in years
                          <i className="fas fa-star-of-life"></i>
                        </Form.Label>
                        <Form.Control
                          onChange={(e) => this.onChangeHandler(e)}
                          type="text"
                          name="experience"
                          value={this.state.experience}
                          placeholder="Experience"
                        />
                        <Form.Text className="text-muted">
                          This is for the students who want more information
                          about writer.
                        </Form.Text>
                      </Form.Group>
                    </div>
                  )}

                  {/* identifier data up*/}

                  <Button
                    onClick={(e) => this.onSubmitMethod(e, "success")}
                    variant="primary"
                    type="submit"
                    disabled={this.state.loading}
                  >
                    Submit
                  </Button>
                </Form>
                {this.state.loading && (
                  <p style={{ color: "red" }}>LOADING.......</p>
                )}
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Footer />
          </Grid>
        </Grid>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    string: state.user.string,
  };
}

export default connect(mapStateToProps)(withRouter(withSnackbar(SignUp)));
