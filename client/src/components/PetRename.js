import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
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
import {useLocation} from 'react-router-dom';

const PetRename = () => {
  const { restAPI } = useApi();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const snackbar = useSnackbar();

  const location = useLocation()
  let save = undefined
  let buttonText = "Update";
  let headingText = "Update Pet Name";
  if(location.state){
    save = true;
    buttonText = "Save";
    headingText = "Name Your Pet";
  }

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
        if (error.response.status === 403){
          localStorage.removeItem("Are_you_in");
          navigate("/");
        }
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
            {headingText}
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
                {buttonText}
              </Button>
            </form>
            {!save &&  <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            paddingBottom={3}
          >
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              Cancel
            </Button>
          </Box>}
            <CustomSnackbar snackbarProp={snackbar} />
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default PetRename;
