import React from "react";
import CookieConsent from "react-cookie-consent-notification";

const checkStatus = (status) => {
  if (status) {
    // To set a cookies
  }
};

const App = () => (
  <div className="app">
    <CookieConsent
      background={"#150485"}
      buttonText={"I agree"}
      buttonBackground={"#fff"}
      buttonColor={"#000"}
      buttonFontSize={15}
      color={"#fff"}
      consentFunction={checkStatus}
      padding={20}
      bottomPosition
    >
      This website uses cookies to enhance the user experience. Confirm your
      consent to the use of cookies.
    </CookieConsent>
  </div>
);
export default App;
