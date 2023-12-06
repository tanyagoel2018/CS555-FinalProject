import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import { RenderTextField } from "../InputFields";

import { useFormik } from "formik";
import CustomSnackbar from "../CustomSnackbar";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useApi } from "../../ContextAPI/APIContext";

import useSnackbar from "../../hooks/useSnackbar";

const AddTask = () => {
  const [loader, setLoader] = useState(false);
  const { state } = useLocation();

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { restAPI } = useApi();
  let userId = null;
  if (state && state.userId) {
    userId = state.userId;
  }
  const formik = useFormik({
    initialValues: {
      task: "",
      reward: null,
      userId: userId,
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    setLoader(true);
    restAPI
      .post("/protected/adminTask/add", values)
      .then((response) => {
        snackbar.showSuccess("Task added successfully!");

        // setTaskValue("");
        // setRewardValue(0);
        navigate("/showUser", { state: { userId: userId } });
      })
      .catch((error) => {
        if (error && error.response && error.response.data) {
          snackbar.showError(error.response.data.message);
        }
      })
      .finally(() => {
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
          Add Task
        </Typography>
        <Box sx={{ mt: 3 }}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <RenderTextField
                  fullWidth
                  id="task"
                  label="Task"
                  variant="outlined"
                  formik={formik}
                />
              </Grid>
              <Grid item xs={12}>
                <RenderTextField
                  fullWidth
                  id="reward"
                  label="Rewards"
                  variant="outlined"
                  type="number"
                  formik={formik}
                />
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loader}
              >
                {loader ? "Adding Task..." : "Add Task"}
              </Button>
            </Grid>
          </form>
          <CustomSnackbar snackbarProp={snackbar} />
        </Box>
      </Box>
    </Container>
  );
};

export default AddTask;