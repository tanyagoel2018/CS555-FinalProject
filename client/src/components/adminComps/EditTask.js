import React, { useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { RenderTextField } from "../InputFields";

import { useFormik } from "formik";
import CustomSnackbar from "../CustomSnackbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../../ContextAPI/APIContext";

import useSnackbar from "../../hooks/useSnackbar";
import { taskSchema } from "../../validations/taskFormValidation";

const EditTask = () => {
  const [loader, setLoader] = useState(false);
  const { state } = useLocation();

  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const { restAPI } = useApi();
  let userId = null;
  let taskId = null;
  let task = null;
  let reward = null;

  if (state) {
    if (state.userId) userId = state.userId;
    if (state.taskId) taskId = state.taskId;
    if (state.task) taskId = state.task;
    if (state.reward) taskId = state.reward;
  }
  const formik = useFormik({
    initialValues: {
      userId: userId,
      task: task,
      reward: reward,
      taskId: taskId,
    },
    validationSchema: taskSchema,
    onSubmit: handleSubmit,
  });

  function handleSubmit(values) {
    setLoader(true);
    restAPI
      .post("/protected/adminTask/edit", values)
      .then((response) => {
        snackbar.showSuccess("Task edited successfully!");
        setTimeout(() => {
          navigate("/showUser", { state: { userId: userId } });
        });
      })
      .catch((error) => {
        if (error.response.data) {
          snackbar.showError(error.response.data);
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
          Edit Task
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
                {loader ? "Updating Task..." : "Update Task"}
              </Button>
            </Grid>
          </form>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              onClick={() => {
                navigate("/showUser", { state: { userId: userId } });
              }}
            >
              {" "}
              Cancel
            </Button>
          </Box>
          <CustomSnackbar snackbarProp={snackbar} />
        </Box>
      </Box>
    </Container>
  );
};

export default EditTask;
