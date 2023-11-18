import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";

const RenderTextField = ({ id, label, type, formik }) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        id={id}
        name={id}
        label={label}
        type={type}
        fullWidth
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={formik.touched[id] && formik.errors[id]}
      />
    </Grid>
  );
};

const RenderTextArea = ({ id, label, type, formik }) => {
  return (
    <Grid item xs={true}>
      <TextField
        variant="outlined"
        id={id}
        name={id}
        label={label}
        type={type}
        fullWidth
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={formik.touched[id] && formik.errors[id]}
      />
    </Grid>
  );
};

const RenderPasswordField = ({
  id,
  label,
  formik,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        id={id}
        name={id}
        label={label}
        type={showPassword ? "text" : "password"}
        fullWidth
        value={formik.values[id]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={formik.touched[id] && formik.errors[id]}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export { RenderTextField, RenderPasswordField, RenderTextArea };
