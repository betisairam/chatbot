import { combineReducers } from "redux";
import chatReducer from "./chat.reducers";

export default combineReducers({
    chat: chatReducer
});
