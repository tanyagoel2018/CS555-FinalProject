import React, { useState } from "react";
import useSnackbar from "../hooks/useSnackbar";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../ContextAPI/APIContext";
import { RenderTextArea } from "./InputFields";
import BackDrop from "./Backdrop";
import CustomSnackbar from "./CustomSnackbar";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { feedbackSchema } from "../validations/feedbackValidation";
import Feedbacks from "./Feedback";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const { restAPI } = useApi();

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    validationSchema: feedbackSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    setLoader(true);

    restAPI
      .post("/protected/userfeedback", values)
      .then((response) => {
        snackbar.showSuccess("Feedback Successfull!");
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 403) {
          localStorage.removeItem("Are_you_in");
          navigate("/");
        }
        if (error && error.response && error.response.data) {
          snackbar.showError(error.response.data);
        }
        setLoader(false);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <BackDrop loader={loader} />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          User Feedback
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <RenderTextArea
                id="feedback"
                label="Feedback"
                type="string"
                formik={formik}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Feedback
            </Button>
          </form>
          <Box
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
          </Box>
          <CustomSnackbar snackbarProp={snackbar} />
          <Feedbacks></Feedbacks>
        </Box>
      </Box>
    </Container>
  );
};

export default FeedbackForm;
