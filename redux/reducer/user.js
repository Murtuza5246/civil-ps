import * as actionType from "../actions/action";
import { utilityManage } from "../utilityManage";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null,
  authType: null,
  credentialCheck: null,
  fName: null,
  lName: null,
  email: "",
  verified: false,
  message: null,
  disabledButton: false,
  string: false,
  verifiedUsers: [],
  textObject: {},
  newObjectForStatement: {},
  composeHandler: false,
  canApprove: false,
  level: 0,
  mentions: [],
  // redirectPath: "/",
};

// const setRedirectPath = (state, action) => {
//   return utilityManage(state, { redirectPath: action.path });
// };
const authStart = (state, action) => {
  return utilityManage(state, {
    error: null,
    loading: true,
    token: null,
    userId: null,
    email: null,
    disabledButton: true,
    string: false,
    level: 0,
  });
};
const recaptchaCreatore = (state, action) => {
  return utilityManage(state, {
    string: action.string,
  });
};

const authCredentialCheck = (state, action) => {
  return utilityManage(state, {
    credentialCheck: "Please enter valid credentials",
  });
};

const authSuccess = (state, action) => {
  return utilityManage(state, {
    token: action.token,
    userId: action.userId,
    email: action.email,
    authType: action.authType,
    fName: action.fName,
    lName: action.lName,
    loading: false,
    error: null,
    disabledButton: false,
    composeHandler: action.composeHandler,
    canApprove: action.canApprove,
  });
};
const onCheckUserInOrOut = (state, action) => {
  return utilityManage(state, {
    token: action.token,
    userId: action.userId,
    email: action.email,
    fName: action.fName,
    lName: action.lName,
    verified: action.verified,
    loading: false,
    error: null,
    composeHandler: action.composeHandler,
    canApprove: action.canApprove,
  });
};

const authFail = (state, action) =>
  utilityManage(state, {
    error: action.error,
    loading: false,
    disabledButton: false,
    string: false,
    composeHandler: false,
  });

const authLogOut = (state, action) =>
  utilityManage(state, {
    token: null,
    userId: null,
    authType: null,
    email: null,
    fName: null,
    lName: null,
    credentialCheck: null,
    string: false,
    composeHandler: false,
    canApprove: false,
    level: 0,
  });
const authTypeChecker = (state, action) => {
  return utilityManage(state, {
    authType: action.authType,
  });
};
const authDetailChecker = (state, action) => {
  return utilityManage(state, {
    credentialCheck: action.message,
  });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return authStart(state, action);
    case actionType.AUTH_FAIL:
      return authFail(state, action);
    case actionType.AUTH_LOGOUT:
      return authLogOut(state, action);
    // case actionType.AUTH_REDIRECT_PATH:
    //   return setRedirectPath(state, action);
    case actionType.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionType.AUTHCREDENTIALFAIL:
      return authCredentialCheck(state, action);
    case actionType.CKECK_USER_IN:
      return onCheckUserInOrOut(state, action);
    case actionType.ON_AUTH_TYPE_CHECKER:
      return authTypeChecker(state, action);
    case actionType.AUTHCREDENTIALFAIL_MESSAGE:
      return authDetailChecker(state, action);
    case actionType.CAPTCHA:
      return recaptchaCreatore(state, action);
    case actionType.VERIFICATION:
      return {
        ...state,
        verifiedUsers: action.verifiedUsers,
      };
    case actionType.TEXT:
      return {
        ...state,
        textObject: action.textObject,
      };
    case actionType.NEW_FINAL_TEXT:
      return {
        ...state,
        newObjectForStatement: action.newObjectForStatement,
      };
    case actionType.USER_LEVEL_CHECK:
      return {
        ...state,
        level: action.level,
      };
    case actionType.USER_MENTIONS_FOUND:
      return {
        ...state,
        mentions: action.mentionsUser,
      };

    default:
      return state;
  }
};

export default authReducer;
