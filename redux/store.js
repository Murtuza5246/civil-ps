import statementReducer from "./reducer/statement";
import userReducer from "./reducer/user";
import uiReducer from "./reducer/ui";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import React, { useEffect } from "react";

// const storeData = () => {
// const composeEnhancers = (first) => {
//   return applyMiddleware(thunk);
// };
let composeEnhancers = (ele) => {
  return ele;
};
if (typeof window != "undefined") {
  composeEnhancers =
    process.env.NODE_ENV === "development"
      ? typeof window != "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : null || compose;
}

///// redux work ////
const rootReducer = combineReducers({
  statement: statementReducer,
  user: userReducer,
  ui: uiReducer,
});
// let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// return store;
// };

export default store;
