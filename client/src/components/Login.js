import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { loginSchema } from "../validations/userValidation";
import { useNavigate, Link } from "react-router-dom";
import CustomSnackbar from "./CustomSnackbar";
import { RenderTextField } from "./InputFields";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useApi } from "../ContextAPI/APIContext";
import useSnackbar from "../hooks/useSnackbar";
import BackDrop from "./Backdrop";

const Login = () => {
  const [loader, setLoader] = useState(false);
  const snackbar = useSnackbar();

  const navigate = useNavigate();
  const { restAPI } = useApi();

  useEffect(() => {
    const bleh = localStorage.getItem("Are_you_in");
    if (bleh) {
      navigate("/home");
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
      .post("/login", values)
      .then((response) => {
        snackbar.showSuccess("Login successful!");
        localStorage.setItem("Are_you_in", "yes");
        navigate("/home");
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
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
          Login
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
              <Link to="/signUp" className="links">
                Don't have an account? Sign up here!
              </Link>
            </Grid>
          </Grid>
          <CustomSnackbar snackbarProp={snackbar} />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
