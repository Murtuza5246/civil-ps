import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import classes from "../user/login/Forget.module.css";
import { Button, CircularProgress, TextField } from "@material-ui/core";
import { loadReCaptcha } from "react-recaptcha-google";
import RecatptchaComponent from "../Recaptcha/Recaptcha";
import axios from "../axios/axios";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function FixedContainer(props) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [loader, setLoader] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const string = useSelector((state) => state.user.string);
  const emailEntering = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
    if (e.target.name === "password1") {
      setPassword1(e.target.value);
    }
  };
  const onClickSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    if (password !== password1) {
      setLoader(false);
      return enqueueSnackbar("Passwords do not match");
    }

    axios
      .patch(`/user/forget/newPassword/${props.id}`, {
        password: password,
      })
      .then((result) => {
        setLoader(false);
        if (result.data.message !== "Password has been reset successfully") {
          enqueueSnackbar(result.data.message);
        }
        if (result.data.message === "Password has been reset successfully") {
          setTimeout(() => {
            router.push("/statements");
          }, 2000);
          enqueueSnackbar(result.data.message, { variant: "success" });
          enqueueSnackbar("You will get redirected in a moment", {
            variant: "success",
          });
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
                type="password"
                onChange={emailEntering}
                value={password}
                id="standard-full-width"
                label="Enter your new password"
                style={{ margin: 8 }}
                placeholder="new password"
                name="password"
                helperText="eg : India@Great"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                type="password"
                onChange={emailEntering}
                value={password1}
                id="standard-full-width"
                label="Re type your password"
                style={{ margin: 8 }}
                placeholder="Re type"
                helperText="eg : India@Great"
                fullWidth
                name="password1"
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
                  disabled={password === "" || !string}
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
