import { combineReducers } from "redux";
import session from "./slices/sessionSlice"

const reducers = combineReducers({session})
export default reducers;