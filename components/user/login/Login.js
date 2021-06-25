import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../../redux/actions/index";
import classes from "./login.module.css";
import Spinner from "../../UI/Spinner/Spinner";
import LoginScreen from "./LoginScreen";
import Sidenav from "../../sideNavbar/Sidenav";
import { Grid } from "@material-ui/core";
import MetaTags from "react-meta-tags";
import Footer from "../../Footer/Footer";
import { withSnackbar } from "notistack";

import { useRouter } from "next/router";
import { apiDomain } from "../../../apiPath";

const Login = (props) => {
  const router = useRouter();
  return <LoginComponent {...props} router={router} />;
};
class LoginComponent extends Component {
  state = {
    email: "",
    password: "",
    userData: null,
    checkAlert: true,
    disabledButton: false,
  };
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  onSubmitHandler(e) {
    e.preventDefault();
    this.props.onAuthChecker(this.state.email, this.state.password);
    if (this.props.message) {
      this.props.enqueueSnackbar(this.props.message);
    }
  }

  onInputChangeHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    let form = null;
    if (this.props.loading) {
      form = <Spinner />;
    }
    if (!this.props.loading) {
      form = (
        <LoginScreen
          emailValue={this.state.email}
          onEmailChange={this.onInputChangeHandler}
          passwordValue={this.state.password}
          onPasswordChange={this.onInputChangeHandler}
          onButtonClick={(e) => this.onSubmitHandler(e)}
          alertMessage={this.props.authCheckCredential}
        />
      );
    }
    return (
      <div className={classes.mobileScreenHandler}>
        <MetaTags>
          <title>{"Problemspotter - User Login"}</title>
          <meta
            id="meta-description"
            name="description"
            content={
              "Login will allow user to access the features of problemspotter.com"
            }
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
          <Grid item md={2} lg={2} xs={2}>
            <Sidenav />
          </Grid>
          <Grid item xs={12} md={10} lg={10} xl={10}>
            <div className={classes.myWidthClassCompose}>
              {this.props.token && this.props.router.back()}
              <div className={classes.flexComponent}>
                <h3>
                  LogIn
                  <i
                    style={{ color: "red" }}
                    className="fas fa-sign-in-alt"
                  ></i>
                </h3>
                {form}
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
    loading: state.user.loading,
    token: state.user.token,
    authCheckCredential: state.user.credentialCheck,
    message: state.user.message,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuthChecker: (email, password) =>
      dispatch(actionCreators.newAuthStart(email, password)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withSnackbar(Login));
