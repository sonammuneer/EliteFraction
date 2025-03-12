import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layouts/MataData/MataData";
import CricketBallLoader from "../layouts/loader/Loader";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import useStyles from "./LoginFromStyle";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { error, success, loading } = useSelector((state) => state.forgetPassword);

  // State Management
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(true);

  // Handle Input Changes
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };

  const handleConfirmPasswordChange = (event) => setConfirmPassword(event.target.value);

  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  // Handle Password Reset Submission
  const resetPasswordSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const formData = new FormData();
    formData.set("password", password);
    formData.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, formData));
  };

  // Handle Success & Errors
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password updated successfully!");
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  // Disable Submit Button if Fields are Invalid
  const isSubmitDisabled = !(password && confirmPassword && isValidPassword);

  return (
    <>
      <MetaData title="Reset Password" />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={resetPasswordSubmitHandler}>
            <Avatar className={classes.avatar}>
              <LockResetIcon />
            </Avatar>
            <Typography variant="h5" className={classes.heading}>
              Reset Password
            </Typography>

            <TextField
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={classes.textField}
              value={password}
              onChange={handlePasswordChange}
              error={!isValidPassword && password !== ""}
              helperText={!isValidPassword && password !== "" ? "Password must be at least 8 characters." : ""}
              InputProps={{
                endAdornment: (
                  <Button variant="outlined" onClick={handleShowPasswordClick}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              style={{ marginTop: "1rem" }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={classes.textField}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              InputProps={{
                endAdornment: (
                  <Button variant="outlined" onClick={handleShowPasswordClick}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              style={{ marginTop: "1rem" }}
            />

            <Button
              type="submit"
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSubmitDisabled}
              style={{ marginTop: "3.5rem" }}
            >
              Confirm New Password
            </Button>

            <Typography variant="body1" align="center" style={{ marginTop: ".5rem" }}>
              <Link to="/login" className={classes.createAccount}>
                Cancel
              </Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
