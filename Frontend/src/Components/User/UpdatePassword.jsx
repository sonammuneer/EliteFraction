import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updatePassword, clearErrors } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstant";
import MetaData from "../layouts/MataData/MataData";
import CricketBallLoader from "../layouts/loader/Loader";
import useStyles from "./LoginFromStyle";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { loading, isUpdated, error } = useSelector((state) => state.profileData);

  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState(true);

  // Handle input changes
  const handleOldPassword = (event) => setOldPassword(event.target.value);

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
    setIsValidPassword(event.target.value.length >= 8);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setIsValidConfirmPassword(event.target.value.length >= 8);
  };

  const handleShowPasswordClick = () => setShowPassword(!showPassword);

  // Handle password update submission
  const updatePasswordSubmitHandler = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.set("oldPassword", oldPassword);
    formData.set("newPassword", newPassword);
    formData.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(formData));
  };

  // Handle error messages and success notifications
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password updated successfully!");
      dispatch({ type: UPDATE_PASSWORD_RESET });
      navigate("/account");
    }
  }, [dispatch, error, isUpdated, navigate]);

  // Disable submit button if fields are empty or invalid
  const isSubmitDisabled = !(newPassword && confirmPassword && oldPassword && isValidPassword);

  return (
    <>
      <MetaData title="Update Password" />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={updatePasswordSubmitHandler}>
            <Avatar className={classes.avatar}>
              <SecurityUpdateGoodIcon />
            </Avatar>
            <Typography variant="h5" component="h1" className={classes.heading}>
              Update Password
            </Typography>

            <TextField
              label="Old Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={classes.textField}
              value={oldPassword}
              onChange={handleOldPassword}
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
              label="New Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={classes.textField}
              value={newPassword}
              onChange={handlePasswordChange}
              error={!isValidPassword && newPassword !== ""}
              helperText={!isValidPassword && newPassword !== "" ? "Password must be at least 8 characters" : ""}
              InputProps={{
                endAdornment: (
                  <Button variant="outlined" onClick={handleShowPasswordClick}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              style={{ marginTop: "1.5rem" }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={classes.textField}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!isValidConfirmPassword && confirmPassword !== ""}
              helperText={!isValidConfirmPassword && confirmPassword !== "" ? "Password must be at least 8 characters" : ""}
              InputProps={{
                endAdornment: (
                  <Button variant="outlined" onClick={handleShowPasswordClick}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </Button>
                ),
              }}
              style={{ marginTop: "1.5rem" }}
            />

            <Button
              type="submit"
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSubmitDisabled}
              style={{ marginTop: "2.5rem" }}
            >
              Update Password
            </Button>

            <Typography variant="body1" align="center" style={{ marginTop: "0.5rem" }}>
              <Link to="/account" className={classes.createAccount}>Cancel</Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePassword;
