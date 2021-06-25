import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import classes from "./Forget.module.css";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { loadReCaptcha } from "react-recaptcha-google";
import RecatptchaComponent from "../../Recaptcha/Recaptcha";
import axios from "../../axios/axios";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function FixedContainer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [redirect, setRedirect] = useState(false);
  const string = useSelector((state) => state.user.string);
  const emailEntering = (e) => {
    setEmail(e.target.value);
  };
  const onClickSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      setLoader(false);
      return enqueueSnackbar("Enter valid email address");
    }
    axios
      .patch("/user/forget", { email: email })
      .then((result) => {
        setLoader(false);
        if (result.data.message !== "Reset link has been sent") {
          enqueueSnackbar(result.data.message);
        }
        if (result.data.message === "Reset link has been sent") {
          enqueueSnackbar(result.data.message, { variant: "success" });
          setTimeout(() => {
            router.push("/statements");
          }, 2000);
        }
      })
      .catch((error) => {
        setLoader(false);
        enqueueSnackbar("Something is wrong");
      });
  };
  useEffect(() => {
    loadReCaptcha();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography
          component="div"
          style={{ backgroundColor: "#f8f1f1", height: "100vh" }}
        >
          <div className={classes.MainDiv}>
            <img src="https://problemspotter.com/LOGO.png" alt="Logo" />
            <form type="submit">
              <TextField
                type="email"
                onChange={emailEntering}
                value={email}
                id="standard-full-width"
                label="Enter your email"
                style={{ margin: 8 }}
                placeholder="Email"
                helperText="Forget password"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className={classes.recaptchaCentre}>
                <RecatptchaComponent />
              </div>
              {!loader ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={onClickSubmit}
                  disabled={email === "" || !string}
                >
                  Submit
                </Button>
              ) : (
                <CircularProgress />
              )}
            </form>
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
