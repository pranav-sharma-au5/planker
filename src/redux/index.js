import { createStore, applyMiddleware, combineReducers } from "redux";
import appReducer from "./reducer";
import homeReducer from "./homeReducer";
import thunk from "redux-thunk";
const store = createStore(combineReducers({ appReducer, homeReducer }), applyMiddleware(thunk))
export default store