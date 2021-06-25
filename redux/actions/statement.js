import * as actionType from "./action";

export const statement = (image) => {
  return {
    type: actionType.PROFILE_TO_STATEMENTS,
    profileImage: image,
  };
};

export const statements = (data) => {
  return {
    type: actionType.ALL_STATEMENTS_DATA,
    statements: data,
  };
};
export const searchFields = (fields) => {
  return {
    type: actionType.SEARCH_FIELDS,
    fields,
  };
};

export const recentStatementsUpdate = (recentStatements) => {
  return {
    type: actionType.RECENT_STATEMENTS,
    recentStatements,
  };
};
