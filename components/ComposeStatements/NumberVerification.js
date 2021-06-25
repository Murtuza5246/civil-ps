import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Input } from "semantic-ui-react";
import ReactCodeInput from "react-verification-code-input";
import firebase from "../firebase";
import axios from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import * as actionCreator from "../../redux/actions/index";
import { CircularProgress, useMediaQuery } from "@material-ui/core";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [number, setNumber] = React.useState("+91");
  const [otp, setOtp] = React.useState("");
  const [inputLoading, setInputLoading] = React.useState(false);
  const [firstInput, setFirstInput] = React.useState(true);
  const [secondInput, setSecondInput] = React.useState(false);
  const [otpSuccess, setOtpSuccess] = React.useState(false);
  const [thirdShow, setThirdShow] = React.useState(false);
  const [firstInputCheck, setFirstInputCheck] = React.useState(true);
  const [secondInputCheck, setSecondInputCheck] = React.useState(true);
  const userId = useSelector((state) => state.user.userId);
  const dispatch = useDispatch();
  const numberVerified = useSelector((state) => state.user.numberVerified);
  const token = useSelector((state) => state.user.token);
  const width = useMediaQuery("(min-width:500px)");
  useEffect(() => {
    if (userId && !numberVerified) {
      setOpen(true);
    }
    if (otpSuccess) {
      setOpen(false);
    }
  }, [numberVerified, userId, otpSuccess]);
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
    axios
      .patch(
        `user/number/verification`,
        { userId: userId, number: number },
        {
          headers: {
            authorization: "Bearer " + token,
          },
        }
      )
      .then((result) => {
        enqueueSnackbar("number verified successfully");
      })
      .catch();
  };

  const onSubmitOtp = (e) => {
    e.preventDefault();
    setSecondInputCheck(false);
    let otpInput = otp;
    let optConfirm = window.confirmationResult;

    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        makeAxiosRequest();
        // User signed in successfully.

        setSecondInput(false);
        setThirdShow(true);
        setOtpSuccess(true);
        dispatch(actionCreator.numberVerification());

        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        setSecondInputCheck(true);
        alert("Incorrect OTP");
      });
  };
  return (
    <div>
      <Button onClick={handleClickOpen} variant="contained" color="secondary">
        Verify Number
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullScreen={!width}
      >
        <DialogTitle id="form-dialog-title">
          Verify your phone number
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter you number below and hit send otp button
          </DialogContentText>
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
            <div style={{ width: "100%", margin: "10px" }}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
