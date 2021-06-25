import * as actionType from "../actions/action";
import { utilityManage } from "../utilityManage";

const initialState = {
  Drop: false,
};

const ToggleDrop = (state, action) => {
  return utilityManage(state, { Drop: !state.Drop });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.TOGGLE_DROP:
      return ToggleDrop(state, action);
    default:
      return state;
  }
};

export default reducer;
