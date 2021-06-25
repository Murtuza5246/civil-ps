import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Link from "next/link";
import { Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { loadReCaptcha } from "react-recaptcha-google";

const LoginScreen = (props) => {
  const [captcha, setCaptcha] = useState(true);
  const disabledButton = useSelector((state) => state.user.disabledButton);
  useEffect(() => {
    loadReCaptcha();
  }, []);

  const string = useSelector((state) => state.user.string);

  return (
    <Form>
      <div id="recaptcha-container"></div>
      <Form.Group controlId="formBasicEmail">
        <Form.Label style={{ color: "red" }}>
          <strong>Email address</strong>
        </Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={props.emailValue}
          onChange={props.onEmailChange}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label style={{ color: "red" }}>
          <strong>Password</strong>
        </Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={props.passwordValue}
          onChange={props.onPasswordChange}
        />
      </Form.Group>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        disabled={disabledButton}
        onClick={props.onButtonClick}
      >
        Submit
      </Button>
      {props.alertMessage && (
        <Alert severity="error">{props.alertMessage}</Alert>
      )}

      <p>
        Forget password ? Click <Link href="/user/forget">here</Link>{" "}
      </p>
      <p>
        Doesn't have an account ? Click <Link href="/signup">here</Link>{" "}
      </p>
    </Form>
  );
};

export default LoginScreen;
