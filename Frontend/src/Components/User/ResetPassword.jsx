import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearErrors } from "../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      alert("Passwords do not match!"); // ✅ Simple alert instead of toast
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
      alert(error); // ✅ Simple alert for errors
      dispatch(clearErrors());
    }

    if (success) {
      alert("Password updated successfully!"); // ✅ Alert for success
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);

  // Disable Submit Button if Fields are Invalid
  const isSubmitDisabled = !(password && confirmPassword && isValidPassword);

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <form style={{ width: "300px", padding: "20px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }} onSubmit={resetPasswordSubmitHandler}>
        <Avatar style={{ margin: "auto", backgroundColor: "#1976d2" }}>
          <LockResetIcon />
        </Avatar>
        <Typography variant="h5" style={{ textAlign: "center", marginBottom: "10px" }}>
          Reset Password
        </Typography>

        <TextField
          label="New Password"
          variant="outlined"
          type={showPassword ? "text" : "password"}
          fullWidth
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
          color="primary"
          fullWidth
          disabled={isSubmitDisabled}
          style={{ marginTop: "2rem" }}
        >
          Confirm New Password
        </Button>

        <Typography variant="body1" align="center" style={{ marginTop: "1rem" }}>
          <Link to="/login">Cancel</Link>
        </Typography>
      </form>
    </div>
  );
};

export default ResetPassword;
