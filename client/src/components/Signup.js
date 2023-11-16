import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { userSchema } from "../validations/userValidation";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useApi } from "../ContextAPI/APIContext";
import CustomSnackbar from "./CustomSnackbar";
import useSnackbar from "../hooks/useSnackbar";
import { RenderTextField, RenderPasswordField } from "./InputFields";
import BackDrop from "./Backdrop";

const Signup = () => {
  const [loader, setLoader] = useState(false);
  const snackbar = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  // redirection based on session
  const navigate = useNavigate();
  const { restAPI } = useApi();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    const userId = localStorage.getItem("id");
    if (userEmail && userId) {
      navigate("/home");
    }
  }, [navigate]);

  const comparePasswords = () => {
    return formik.values.retypePassword !== formik.values.password;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      retypePassword: "",
      age: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      setLoader(true);
      restAPI
        .post("/sign-up", values)
        .then((response) => {
          setLoader(false);
          snackbar.showSuccess("Signup successful!");
        })
        .catch((error) => {
          setLoader(false);
          if (error && error.response && error.response.data) {
            snackbar.showError(error.response.data);
          }
        });
    },
  });

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
          Sign up
        </Typography>
        <BackDrop loader={loader} />
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <RenderTextField
                id="name"
                label="Name"
                type="string"
                formik={formik}
              />
              <RenderTextField
                id="email"
                label="Email"
                type="email"
                formik={formik}
              />
              <RenderPasswordField
                id="password"
                label="Password"
                formik={formik}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
              />
              <RenderPasswordField
                id="retypePassword"
                label="Retype Password"
                formik={formik}
                showPassword={showPassword}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
              />
              <RenderTextField
                id="age"
                label="Age"
                type="number"
                formik={formik}
              />
            </Grid>
            <Button
              type={comparePasswords() ? "button" : "submit"}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Signup
            </Button>
          </form>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/" className="links">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <CustomSnackbar snackbarProp={snackbar} />
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
