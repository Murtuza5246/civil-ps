import React, { Component } from "react";
import { ReCaptcha } from "react-recaptcha-google";
import * as actionCreator from "../../redux/actions/index";
import { connect } from "react-redux";

class RecatptchaComponent extends Component {
  constructor(props, context) {
    super(props, context);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      verify: false,
    };
  }
  componentDidMount() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  onLoadRecaptcha() {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }
  verifyCallback(recaptchaToken) {
    this.props.onRecaptchaGetToken(recaptchaToken);
  }
  render() {
    return (
      <div>
        {/* You can replace captchaDemo with any ref word */}
        <ReCaptcha
          ref={(el) => {
            this.captchaDemo = el;
          }}
          size="normal"
          data-theme="dark"
          render="explicit"
          sitekey="6Lc-c90ZAAAAAICUNiRK8MacfHGvKvV4Nr67lqCw"
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    string: state.user.string,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onRecaptchaStart: () => dispatch(actionCreator.authCheckStatus()),
    onRecaptchaGetToken: (string) =>
      dispatch(actionCreator.recaptchaCreatore(string)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecatptchaComponent);
