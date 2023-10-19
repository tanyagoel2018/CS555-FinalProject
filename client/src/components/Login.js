import React, {useState, useEffect} from "react";
import { restAPI } from "../service/api";
import { useFormik } from "formik";
import { loginSchema } from "../validations/userValidation";
import {useNavigate, Link} from 'react-router-dom';
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

const Login = () => {
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    const userId = localStorage.getItem('id');
    if (userEmail && userId) {
      navigate('/home');
    }
  }, [navigate]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
    setSuccess(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoader(true);
      restAPI
        .post("/login", values)
        .then((response) => {
          setLoader(false);
          setSuccess(true);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("name", response.data.name);
          navigate('/signUp');
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

  return (
    <Container component="main" maxWidth="xs">
      <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Login successful!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
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
        {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
        <Typography component="h1" variant="h5">
          Login
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
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
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
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
