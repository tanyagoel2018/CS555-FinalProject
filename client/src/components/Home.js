import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import DailyTask from "./DailyTask"
import {
  Button,
  Container,
  TextField,
  CssBaseline,
  Box,
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { petSchema } from "../validations/petNameValidations";
import { useApi } from "../ContextAPI/APIContext";

const UserData = () => {
  const [userData, setUserdata] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const [reload, setReload] = useState(0);
  const {withCredentials} = useApi();
  const isCookieSet = Cookies.get('jwt') !== undefined;
  console.log(Cookies.get());
  
  useEffect(() => {
    const id = localStorage.getItem("id");
    const url = `/userData?id=${id}`;
    console.log("in home", withCredentials);
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
  }, [reload]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  //petName form
  const formik = useFormik({
    initialValues: {
      petName: "",
    },
    validationSchema: petSchema,
    onSubmit: (values) => {
      values.id = userId;
      restAPI
        .post("/petName", values)
        .then((response) => {
          setLoader(false);
          setSuccess(true);
          setReload(reload + 1);
        })
        .catch((error) => {
          setLoader(false);
          setError(true);
          if (error && error.response && error.response.data) {
            setErrorMsg(error.response.data);
          }
        });
    },
  });
  //

  if (loader) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (!userData.pet.petName) {
    return (
      <>
        <Container component="main" maxWidth="xs">
          <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {errorMsg}
            </Alert>
          </Snackbar>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome {userData.name} Name your Pet
            </Typography>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={loader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ mt: 3 }}>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      id="petName"
                      name="petName"
                      label="Pet Name"
                      fullWidth
                      value={formik.values.petName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.petName && Boolean(formik.errors.petName)}
                      helperText={formik.touched.petName && formik.errors.petName}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Update
                </Button>
              </form>
            </Box>
          </Box>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <div className="home">
          <span>
          <h1>Welcome {userData.name}!</h1>
          <br></br>
          <h2>Your pet name is: {userData.pet.petName}!</h2>
          <br></br>
          <h2>Your current score is: {userData.rewards}</h2>
          <Link to="/petRename" className="links">
            Rename Pet
          </Link>
          </span>
          <span>
          <DailyTask/>
          </span>
        </div>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Update Successfull!
          </Alert>
        </Snackbar>
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
