import { combineReducers } from "@reduxjs/toolkit";
import {
  userReducer,
  profileReducer,
  forgetPasswordReducer,
  allUsersReducer,
  userDetailsReducer,
} from "./userReducer"; // ✅ Ensure this file exists

const rootReducer = combineReducers({
  userData: userReducer, // ✅ Manages user authentication
  profileData: profileReducer, // ✅ Manages user profile updates
  forgetPassword: forgetPasswordReducer, // ✅ Handles password reset
  allUsers: allUsersReducer, // ✅ Fetches all users (admin)
  userDetails: userDetailsReducer, // ✅ Fetches specific user details
});

export default rootReducer;
