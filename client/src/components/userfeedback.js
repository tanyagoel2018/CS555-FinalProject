import React, { useState } from "react";
import CustomSnackbar from "./CustomSnackbar";
import useSnackbar from "../hooks/useSnackbar";
import { useFormik } from "formik";
import { userSchema } from "../validations/userValidation";
import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../ContextAPI/APIContext";
import { RenderTextArea } from "./InputFields";
import BackDrop from "./Backdrop";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState("");
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const { restAPI } = useApi();

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  // const handleSubmit = (event) => {
  //   // setLoader(true);
  //   restAPI
  //     .post("/userfeedback", event)
  //     .then((response) => {
  //       snackbar.showSuccess("Feedback submitted!");
  //       localStorage.setItem("Feedback_added", "yes");
  //       navigate("/home");
  //     })
  //     .catch((error) => {
  //       if (error && error.response && error.response.data) {
  //         snackbar.showError(error.response.data);
  //       }
  //     });
  // };

  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    onSubmit: (values) => {
      setLoader(true);
      restAPI
        .post("/protected/userfeedback", values)
        .then((response) => {
          snackbar.showSuccess("Feedback Submitted!");
          navigate("/home");
        })
        .catch((error) => {
          if (error && error.response && error.response.data) {
            snackbar.showError(error.response.data);
          }
        });
      setLoader(false);
    },
  });

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
              {/* <label>
              Your Feedback:
              <textarea
                value={feedback}
                onChange={handleInputChange}
                rows="4"
                cols="50"
              />
            </label>
            <br /> */}
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
        </Box>
      </Box>
    </Container>
  );
};

export default FeedbackForm;
