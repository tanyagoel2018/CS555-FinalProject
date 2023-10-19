import React, { useEffect } from "react";
import { restAPI } from "../service/api";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
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

const PetRename = () => {
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("Something went wrong");
  const [userId, setUserId] = useState(localStorage.getItem("id"));
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  //petName form
  const formik = useFormik({
    initialValues: {
      petName: "",
    },
    validationSchema: petSchema,
    onSubmit: (values) => {
      values.id = userId;
      setLoader(true);
      restAPI
        .post("/petName", values)
        .then((response) => {
          setLoader(false);
          navigate("/home");
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

  return (
    <>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Update Pet Name
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
            <Link to="/home" className="links">
              Cancel
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default PetRename;
