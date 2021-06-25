import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { loadReCaptcha } from "react-recaptcha-google";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import classes from "./EmailVerification.module.css";
import { useSnackbar } from "notistack";
import NumberVerification from "./NumberVerification";
import { useRouter } from "next/router";

export default function SimpleContainer(props) {
  const Router = useRouter();
  let captchaToken = useSelector((state) => state.user.string);
  let userId = useSelector((state) => state.user.userId);
  const [redirectMe, setRedirectMe] = useState(false);
  const [redirectTime, setRedirectTime] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    loadReCaptcha();
  }, []);

  if (userId) {
    return Router.push("/statements");
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >
          <div className={classes.emailVerification}>
            <h1>Verification</h1>
            {/* <p>perform a recaptcha below and click on submit button.</p> */}
            {/* <RecaptchaComponent /> */}
            <NumberVerification id={props.userId} emailKey={props.emailKey} />
            {/* <Button
              onClick={() => onClickHandler()}
              variant="contained"
              color="primary"
              disabled={!captchaToken}
            >
              submit
            </Button> */}
          </div>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
