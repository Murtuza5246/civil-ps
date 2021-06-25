import * as actionType from "./action";

export const checkLogInAuth = (email, token, userId) => {
  return {
    type: actionType.CHECKLOGINAUTH,
    token: token,
    email: email,
    userId: userId,
  };
};
