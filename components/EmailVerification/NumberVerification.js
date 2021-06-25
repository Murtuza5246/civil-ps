import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Input } from "semantic-ui-react";
import ReactCodeInput from "react-verification-code-input";
import firebase from "../firebase";
import axios from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import * as actionCreator from "../../redux/actions/index";
import { CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";

export default function FormDialog(props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [number, setNumber] = React.useState("+91");
  const [otp, setOtp] = React.useState("");
  const [inputLoading, setInputLoading] = React.useState(false);
  const [firstInput, setFirstInput] = React.useState(true);
  const [secondInput, setSecondInput] = React.useState(false);
  const [otpSuccess, setOtpSuccess] = React.useState(false);
  const [thirdShow, setThirdShow] = React.useState(false);
  const [firstInputCheck, setFirstInputCheck] = React.useState(true);
  const [secondInputCheck, setSecondInputCheck] = React.useState(true);
  const [redirectMe, setRedirectMe] = React.useState(false);
  const [loadLastButton, setLoadLastButton] = React.useState(true);
  const dispatch = useDispatch();

  const onChangeHandlerNumber = (e) => {
    setNumber(e.target.value);
  };
  const onChangeHandlerOtp = (e) => {
    setOtp(e);
  };

  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    if (number === "+91" || number === "") {
      return;
    }
    setUpRecaptcha();
    setInputLoading(true);
    setFirstInputCheck(false);
    let phoneNumber = number;
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;

        setInputLoading(false);
        setFirstInput(false);
        setSecondInput(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const makeAxiosRequest = () => {
    if (props.id && props.emailKey) {
      setLoadLastButton(false);
      axios
        .patch(
          `/user/account/authentication/${props.id}/${props.emailKey}/${number}`
        )
        .then((result) => {
          setRedirectMe(true);
          setLoadLastButton(true);
          router.push("/statements");
          enqueueSnackbar("Verification is successfully completed", {
            variant: "success",
          });
        })
        .catch((err) => {
          setLoadLastButton(true);
          enqueueSnackbar("Link is bad");
        });
    }
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    setSecondInputCheck(false);
    let otpInput = otp;
    let optConfirm = window.confirmationResult;

    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.

        setSecondInput(false);
        setThirdShow(true);
        setOtpSuccess(true);
        dispatch(actionCreator.numberVerification());

        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
        setSecondInputCheck(true);
      });
  };
  return (
    <div>
      <div id="recaptcha-container"></div>
      {firstInput && (
        <div style={{ width: "100%", margin: "10px" }}>
          <div style={{ width: "100%" }}>
            <Input
              loading={!inputLoading}
              icon="check"
              placeholder="Enter number with country code"
              value={number}
              onChange={onChangeHandlerNumber}
            />
          </div>
          {firstInputCheck ? (
            <Button button="Submit" type="submit" onClick={onSignInSubmit}>
              Send otp
            </Button>
          ) : (
            <Button>
              <CircularProgress size={15} />
            </Button>
          )}
        </div>
      )}
      {secondInput && (
        <div
          style={{
            width: "100%",
            margin: "10px",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <ReactCodeInput onChange={onChangeHandlerOtp} />
          {secondInputCheck ? (
            <Button button="Submit" type="submit" onClick={onSubmitOtp}>
              verify otp
            </Button>
          ) : (
            <Button>
              <CircularProgress size={15} />
            </Button>
          )}
        </div>
      )}

      {thirdShow && <p>press the submit button to complete the verification</p>}
      {thirdShow &&
        (loadLastButton ? (
          <Button
            onClick={() => makeAxiosRequest()}
            variant="contained"
            color="primary"
          >
            submit
          </Button>
        ) : (
          <Button
            onClick={() => makeAxiosRequest()}
            variant="contained"
            color="primary"
          >
            submit
          </Button>
        ))}
    </div>
  );
}
