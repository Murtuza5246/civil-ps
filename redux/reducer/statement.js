import * as actionType from "../actions/action";
import { utilityManage } from "../utilityManage";

const initialState = {
  profileImage: "",
  statements: [],
  searchFields: [],
  recentStatements: [],
};

const profileManage = (state = initialState, action) => {
  return utilityManage(state, { profileImage: action.profileImage });
};
const statementsToRedux = (state, action) => {
  return utilityManage(state, { statements: action.statements });
};
const searchFieldsHandler = (state, action) => {
  return utilityManage(state, { searchFields: action.fields });
};
const recentStatementsUpdate = (state, action) => {
  return utilityManage(state, { recentStatements: action.recentStatements });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.PROFILE_TO_STATEMENTS:
      return profileManage(state, action);
    case actionType.ALL_STATEMENTS_DATA:
      return statementsToRedux(state, action);
    case actionType.SEARCH_FIELDS:
      return searchFieldsHandler(state, action);
    case actionType.RECENT_STATEMENTS:
      return recentStatementsUpdate(state, action);
    default:
      return state;
  }
};

export default reducer;
