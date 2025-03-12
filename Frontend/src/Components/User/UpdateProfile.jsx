import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UpdateIcon from "@mui/icons-material/Update";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Link } from "react-router-dom";
import {
  clearErrors,
  updateProfile,
  load_UserProfile,
} from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layouts/MataData/MataData";
import CricketBallLoader from "../layouts/loader/Loader";
import useStyles from "./LoginFromStyle";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classes = useStyles();

  const { error, isUpdated, loading } = useSelector((state) => state.profileData);
  const { user } = useSelector((state) => state.userData);

  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  // Handle input changes
  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    setIsValidName(newName.length >= 4);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      };
    }
  };

  // Submit updated profile
  const updateProfileSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", avatar);

    dispatch(updateProfile(formData));
  };

  // Effect: Pre-fill user data and handle success/error
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar?.url || "");
    }

    if (error) {
      toast.error(error); // Show error message
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated successfully!");
      dispatch({ type: UPDATE_PROFILE_RESET });
      dispatch(load_UserProfile());
      navigate("/account"); // Redirect after successful update
    }
  }, [dispatch, user, error, isUpdated, navigate]);

  const isSubmitDisabled = !(email && isValidEmail && name && isValidName);

  return (
    <>
      <MetaData title="Update Profile" />
      {loading ? (
        <CricketBallLoader />
      ) : (
        <div className={classes.formContainer}>
          <form className={classes.form} onSubmit={updateProfileSubmitHandler}>
            <Avatar className={classes.avatar}>
              <UpdateIcon />
            </Avatar>
            <Typography variant="h5" className={classes.heading}>
              Update Profile Details
            </Typography>

            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={name}
              onChange={handleNameChange}
              error={!isValidName && name !== ""}
              helperText={!isValidName && name !== "" ? "Name must be at least 4 characters." : ""}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              className={classes.textField}
              value={email}
              onChange={handleEmailChange}
              error={!isValidEmail && email !== ""}
              helperText={!isValidEmail && email !== "" ? "Invalid email address." : ""}
            />

            {/* Avatar Upload */}
            <div className={classes.root}>
              <Avatar alt="Avatar Preview" src={avatarPreview} className={classes.avatar2} />
              <input
                accept="image/*"
                id="avatar-input"
                type="file"
                className={classes.input}
                onChange={handleAvatarChange}
              />
              <label htmlFor="avatar-input">
                <Button variant="contained" color="default" component="span" className={classes.uploadAvatarButton}>
                  <CloudUploadIcon style={{ color: "#FFFFFF" }} />
                  <p className={classes.uploadAvatarText}>Upload Avatar</p>
                </Button>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              className={classes.loginButton}
              fullWidth
              disabled={isSubmitDisabled}
              style={{ marginTop: "3rem" }}
            >
              Update Profile
            </Button>

            <Typography variant="body1" align="center" style={{ marginTop: ".5rem" }}>
              <Link to="/account" className={classes.createAccount}>Cancel</Link>
            </Typography>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateProfile;
