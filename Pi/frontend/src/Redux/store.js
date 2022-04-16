import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import reducers from "./reducers";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist"

const config = {key:"persist",storage}
const persistedReducers = persistReducer(config,reducers)
const store = configureStore({reducer:persistedReducers,middleware:[thunk]})

export default store