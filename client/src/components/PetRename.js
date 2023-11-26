import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { petSchema } from "../validations/petNameValidations";
import { useApi } from "../ContextAPI/APIContext";
import CustomSnackbar from "./CustomSnackbar";
import useSnackbar from "../hooks/useSnackbar";
import BackDrop from "./Backdrop";
import { RenderTextField } from "./InputFields";

const PetRename = () => {
  const { restAPI } = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const formik = useFormik({
    initialValues: {
      petName: "",
    },
    validationSchema: petSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    setLoading(true);
    restAPI
      .post("/protected/petName", values)
      .then((response) => {
        setLoading(false);
        snackbar.showSuccess("Pet rename successful!");
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        if (error && error.response && error.response.data) {
          snackbar.showError(error.response.data);
        }
      });
  }

  return (
    <>
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
            Update Pet Name
          </Typography>
          <BackDrop loader={loading} />
          <Box sx={{ mt: 3 }}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <RenderTextField
                    id="petName"
                    label="Pet Name"
                    type="string"
                    formik={formik}
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
            <CustomSnackbar snackbarProp={snackbar} />
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default PetRename;
