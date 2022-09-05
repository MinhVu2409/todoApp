import { combineReducers } from "redux";

import toDo from "./DataApp";

const appReducers = combineReducers({
  toDo,
});
export default appReducers;
