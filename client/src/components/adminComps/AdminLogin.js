import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/userValidation";
import { useNavigate, Link } from "react-router-dom";
import CustomSnackbar from "../CustomSnackbar";
import { RenderTextField } from "../InputFields";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useApi } from "../../ContextAPI/APIContext";
import useSnackbar from "../../hooks/useSnackbar";
import BackDrop from "../Backdrop";

const AdminLogin = () => {
  const [loader, setLoader] = useState(false);
  const snackbar = useSnackbar();

  const navigate = useNavigate();
  const { restAPI } = useApi();

  useEffect(() => {
    let item = localStorage.getItem("Are_you_in");
    if (item) {
      item = JSON.parse(item);
      let now = new Date();
      let validSession = now.getTime() < item.expirationTime;
      if (validSession && !item.admin) {
        navigate("/home");
      } else if (validSession && item.admin) {
        navigate("/adminHome");
      } else {
        localStorage.removeItem("Are_you_in");
      }
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    setLoader(true);

    restAPI
      .post("/adminLogin", values)
      .then((response) => {
        snackbar.showSuccess("Login successful!");
        let now = new Date();
        let expirationTime = now.getTime() + 720 * 60 * 1000; //12 hours
        let item = {
          value: "yes",
          admin: true,
          expirationTime: expirationTime,
        };
        localStorage.setItem("Are_you_in", JSON.stringify(item));
        navigate("/adminHome");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          snackbar.showError(error.response.data);
        }
        setLoader(false);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
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
          Admin Login
        </Typography>
        <BackDrop loader={loader} />
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <RenderTextField
                id="email"
                label="Email"
                type="email"
                formik={formik}
              />
              <RenderTextField
                id="password"
                label="Password"
                type="password"
                formik={formik}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" className="links">
                Login as a user
              </Link>
            </Grid>
          </Grid>
          <CustomSnackbar snackbarProp={snackbar} />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminLogin;
