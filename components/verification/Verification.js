import React, { useState } from "react";
import { useSelector } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { Button, TextField } from "@material-ui/core";
import axios from "../axios/axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
export default function SimpleContainer() {
  const Router = useRouter();
  const mainEmail = useSelector((state) => state.user.email);
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const verificationAction = (type) => {
    if (email === "" || password === "") {
      return enqueueSnackbar("Please fill the data");
    } else {
      axios
        .patch(`verify/verification/${email}/${password}/${type}`)
        .then((result) => {
          enqueueSnackbar(result.data.message, { variant: "success" });
        })
        .catch((err) => {
          enqueueSnackbar(err.message);
        });
    }
  };

  return (
    <React.Fragment>
      {mainEmail === "murtuza5246@gmail.com"
        ? null
        : Router.push("/statements")}
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{
            backgroundColor: "#cfe8fc",
            height: "100vh",
            padding: "50px",
          }}
        >
          {" "}
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            id="standard-full-width"
            label="user email"
            style={{ margin: 8 }}
            placeholder="enter email"
            fullWidth
            value={email}
            margin="normal"
            type="email"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="standard-full-width"
            onChange={(e) => setPassword(e.target.value)}
            label="Admin password"
            style={{ margin: 8 }}
            placeholder="enter password"
            fullWidth
            type="password"
            value={password}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => verificationAction("activate")}
          >
            add
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => verificationAction("deactivate")}
          >
            remove
          </Button>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
