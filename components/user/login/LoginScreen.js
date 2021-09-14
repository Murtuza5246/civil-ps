import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import { Form } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { loadReCaptcha } from "react-recaptcha-google";
import { GoogleLogin } from 'react-google-login';
import axios from "../../axios/axios";
// import axios from "axios"
import * as actionCreator from "../../../redux/actions/index"

const LoginScreen = (props) => {
  const [captcha, setCaptcha] = useState(true);
  const [Message, setMessage] = useState(false);
  const [oAuth, setOAuth] = useState(true);
  const dispatch = useDispatch()
  const disabledButton = useSelector((state) => state.user.disabledButton);
  useEffect(() => {
    loadReCaptcha();
  }, []);

  const string = useSelector((state) => state.user.string);

  ///////////////////////////////////
  const responseGoogleSuccess = (response) => {
    setOAuth(false)
    
    axios.get(`/user/oauth/${response.profileObj.email}`).then(result => {
      console.log(result.data);
      if(result.data.message == "Not registered"){
        console.log(result.data.message);
        setOAuth(true)
        setMessage(true)
        return;
      }else{
        
        return dispatch(actionCreator.oAuthStart(result.data))
      }


    }).catch(error => {
      setOAuth(true)
      return console.log(error);
    })

    
 }
 /////////////////////////////////////////
 const responseGoogleFailure = (response) => {
   
    console.log(response);
 }
 if(oAuth){
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
 
      <h3>OR</h3>
      <GoogleLogin
    clientId="455448153921-rph42dturcfnelhq4u7fuibn2856j3cq.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogleSuccess}
    onFailure={responseGoogleFailure}
    cookiePolicy={'single_host_origin'}
  />
      {props.alertMessage && (
        <Alert severity="error">{props.alertMessage}</Alert>
      )}
     { Message ? <Alert severity="error">This email is not registered</Alert> : null
}
      <p>
        Forget password ? Click <Link href="/user/forget">here</Link>{" "}
      </p>
      <p>
        Doesn't have an account ? Click <Link href="/signup">here</Link>{" "}
      </p>
    </Form>
  );
 }else{
   return <h1>Fetching data from google.......</h1>
 }
  
};

export default LoginScreen;
