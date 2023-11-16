import React, { useEffect } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import DailyTask from "./DailyTask";
import { useNavigate, Link } from "react-router-dom";
import Animation from "./PetAnimation";
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
  Card,
  CardMedia,
  Paper,
  Stack,
} from "@mui/material";
import { petSchema } from "../validations/petNameValidations";
import { useApi } from "../ContextAPI/APIContext";
import Products from "./Products";
import useSnackbar from "../hooks/useSnackbar";

const UserData = () => {
  const navigate = useNavigate();
  const { restAPI } = useApi();
  const snackbar = useSnackbar();
  const [userData, setUserdata] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(true);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");
  const [reload, setReload] = useState(0);
  const [gif,setGif] = useState(null);

  useEffect(() => {
    const bleh = localStorage.getItem("Are_you_in");
    if (!bleh) {
      navigate("/");
    }
    const id = localStorage.getItem("id");
    const url = `/protected/userData`;
    restAPI
      .get(url)
      .then((response) => {
        try {
          setUserdata(response.data);
          setGif(response.data.pet.recentImage)
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
      restAPI
        .post("/protected/petName", values)
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
                      error={
                        formik.touched.petName && Boolean(formik.errors.petName)
                      }
                      helperText={
                        formik.touched.petName && formik.errors.petName
                      }
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
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Products
              reloadParent={setReload}
              rewards={userData.rewards}
              reload={reload}
            />
          </Grid>
          <Grid item xs={6}>
            <div className="home center">
            <span>

                <h2>{userData.pet.petName}</h2>
                
                <Link to="/petRename" className="links">
                  Rename Pet
                </Link>
              </span>
              <Animation gif = {gif}/>              
            </div>
            <Snackbar
              open={success}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Update Successfull!
              </Alert>
            </Snackbar>
            <Snackbar
              open={error}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMsg}!
              </Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={3}>
            <DailyTask userData={userData} />
          </Grid>
        </Grid>
      </>
    );
  }
};

export default UserData;
