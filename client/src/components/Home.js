import React, { useEffect } from "react";
import { restAPI } from "../service/api";
import { useState } from "react";
import { Snackbar, Alert, Backdrop, CircularProgress } from "@mui/material";

const UserData = () => {
  const [userData, setUserdata] = useState(null);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");
  const [userID, setUserid] = useState(localStorage.getItem("id"));
  useEffect(() => {
    const id = localStorage.getItem("id");
    const url = `/userData?id=${id}`;
    restAPI
      .get(url)
      .then((response) => {
        try {
          setUserdata(response.data);
          setLoader(false);
        } catch (error) {
          setLoader(true);
        }
      })
      .catch((error) => {
        setError(true);
        if (error && error.response && error.response.data) {
          setErrorMsg(error.response.data);
        }
      });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  if (loader) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else {
    return (
      <>
        <div className="home">
          <h1>Welcome {userData.name}!</h1>
          <br></br>
          <h2>Your pet name is: {userData.pet.petName}!</h2>
          <br></br>
          <h2>Your current score is: {userData.rewards}</h2>
        </div>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMsg}!
          </Alert>
        </Snackbar>
      </>
    );
  }
};

export default UserData;
