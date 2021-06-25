import * as actionType from "./action";
import axios from "../../components/axios/axios";
import jwt from "jsonwebtoken";
import $ from "jquery";

function checkCookie() {
  return true;
}
checkCookie();
export const authStart = () => {
  return {
    type: actionType.AUTH_START,
  };
};

export const authFail = (error) => {
  return {
    type: actionType.AUTH_FAIL,
    error: error,
  };
};
export const recaptchaCreatore = (string) => {
  return {
    type: actionType.CAPTCHA,
    string: string,
  };
};
export const textEditor = (object) => {
  return {
    type: actionType.TEXT,
    textObject: object,
  };
};
export const logUserIn = (
  userId,
  email,
  token,
  fName,
  lName,
  verified,
  composeHandler,
  canApprove
) => {
  return {
    type: actionType.CKECK_USER_IN,
    userId: userId,
    email: email,
    fName,
    lName,
    token: token,
    verified,
    composeHandler,
    canApprove,
  };
};
export const numberVerification = () => {
  return {
    type: actionType.NUMBER_VERIFICATION,
    numberVerified: true,
  };
};

export const authCheckStatus = () => {
  if (checkCookie()) {
    return (dispatch) => {
      let token = localStorage.getItem("token");
      let initTime = localStorage.getItem("initTime");
      const newTime1 = new Date().getTime() - 3600000 * 12;

      if (initTime <= newTime1) {
        dispatch(logout());
      } else if (initTime > newTime1) {
        if (token) {
          setTimeout(() => {
            dispatch(logout());
          }, 3600000 * 12 - (new Date().getTime() - parseInt(initTime, 10)));
        }
        try {
          const decoded = jwt.verify(token, actionType.JWT_SECRET);
          dispatch(
            logUserIn(
              decoded.userId,
              decoded.email,
              token,
              decoded.fName,
              decoded.lName,
              decoded.verified,
              decoded.composeHandle,
              decoded.canApprove
            )
          );
        } catch {
          dispatch(logout());
        }
      } else {
        dispatch(logout());
      }
    };
  }
};

export const authSuccess = (
  email,
  token,
  userId,
  fName,
  lName,
  data1,
  data2,
  composeHandler,
  canApprove
) => {
  if (checkCookie()) {
    const time = new Date().getTime();
    localStorage.setItem("token", token);
    localStorage.setItem("initTime", time);
    return {
      type: actionType.AUTH_SUCCESS,
      token: token,
      email: email,
      userId: userId,
      fName: fName,
      lName: lName,
      composeHandler,
      canApprove,
    };
  }
};

export const logout = () => {
  if (checkCookie()) {
    localStorage.removeItem("token");
    localStorage.removeItem("initTime");
    localStorage.removeItem("newTime");
    return {
      type: actionType.AUTH_LOGOUT,
    };
  }
};
export const statement = (image) => {
  return {
    type: actionType.PROFILE_TO_STATEMENTS,
    profileImage: image,
  };
};
export const checkAuthTimeout = (expire) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expire * 1000);
  };
};
export const authCredentialFail = () => {
  return {
    type: actionType.AUTHCREDENTIALFAIL,
  };
};

export const authCheckState = () => {
  if (checkCookie()) {
    return (dispatch) => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(logout());
        dispatch(authFail());
      } else {
        const expirationDate = new Date(localStorage.getItem("expirationDate"));

        if (expirationDate <= new Date()) {
          dispatch(logout());
        } else {
          const userId = localStorage.getItem("userId");
          dispatch(authSuccess(token, userId));

          dispatch(
            checkAuthTimeout(
              (expirationDate.getTime() - new Date().getTime()) / 1000
            )
          );
        }
      }
    };
  }
};
const getDeviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile";
  }
  return "desktop";
};
export const errCheck = (message) => {
  return {
    type: actionType.AUTHCREDENTIALFAIL_MESSAGE,
    message: message,
  };
};
export const newUpdatedStatement = (object) => {
  return {
    type: actionType.NEW_FINAL_TEXT,
    newObjectForStatement: object,
  };
};
export const userVerificationDetailsLoader = (data) => {
  return {
    type: actionType.VERIFICATION,
    verifiedUsers: data,
  };
};
let ipDetails = {};
const getUserOtherDetails = async () => {
  try {
    $.getJSON(
      "https://ipgeolocation.abstractapi.com/v1/?api_key=cfaded60d98d4ca586f18068aeb8b56c&ip_address=27.61.145.73",
      function (data) {
        ipDetails = JSON.stringify(data, null, 2);
        return JSON.stringify(data, null, 2);
      }
    );
  } catch {
    ipDetails = {
      flag: {
        svg: "https://static.abstractapi.com/country-flags/IN_flag.svg",
        png: "https://static.abstractapi.com/country-flags/IN_flag.png",
      },
    };
  }
};
getUserOtherDetails();

export const userMentionFound = (data) => {
  return {
    type: actionType.USER_MENTIONS_FOUND,
    mentionsUser: data,
  };
};

export const newAuthStart = (email, password) => {
  if (checkCookie()) {
    return (dispatch) => {
      if (
        !(email === "" || password === "") &&
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          email
        )
      ) {
        dispatch(authStart());
        const weeks = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        let dayNumber = new Date().getDay();
        const data = {
          day: weeks[dayNumber],
          email: email,
          password: password,
          deviceType: getDeviceType(),
          otherDetails: ipDetails,
        };

        axios
          .post("/user/login", data)
          .then((result) => {
            dispatch(errCheck(result.data.message));
            if (result.data.message === "Auth Successful") {
              dispatch(statement(result.data.profileImage));
              dispatch(authCheckStatus());
              setTimeout(() => {
                authCheckStatus();
              }, 1000);
              dispatch(authTypeChecker(result.data.authType));
              setTimeout(() => {
                dispatch(logout());
              }, 3600000 * 12);
            }

            dispatch(
              authSuccess(
                result.data.email,
                result.data.token,
                result.data.userId,
                result.data.fName,
                result.data.lName,
                result.data.authType,
                result.data.verified,
                result.data.composeHandle,
                result.data.canApprove
              )
            );
          })
          .catch((err) => {
            console.log(err);
            dispatch(errCheck(err.message));
            dispatch(authFail());
            dispatch(logout());
          });
      } else {
        return dispatch(authCredentialFail());
      }
    };
  }
};
export const authTypeChecker = (authType) => {
  return {
    type: actionType.ON_AUTH_TYPE_CHECKER,
    authType: authType,
  };
};
export const userLevelCheckUpdate = (level) => {
  return {
    type: actionType.USER_LEVEL_CHECK,
    level: level,
  };
};
export const userLevelCheck = (userId) => {
  if (userId)
    return (dispatch) => {
      axios
        .get(`/user/level/${userId}`)
        .then((result) => {
          dispatch(userLevelCheckUpdate(result.data.level));
        })
        .catch((err) => {
          console.log(err);
        });
    };
};
