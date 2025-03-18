import { createStore, combineReducers, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit"; // ✅ Use Redux Toolkit for better support
import { thunk } from "redux-thunk"; 
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  user: userReducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  devTools: process.env.NODE_ENV !== "production", // ✅ Enables Redux DevTools only in development mode
});

export default store;
