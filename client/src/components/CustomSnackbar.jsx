import React from "react";
import {Alert,Snackbar} from "@mui/material";

const CustomSnackbar = ({snackbarProp})=>{
    const {success, setError, setSuccess, error, errorMsg, successMsg} = snackbarProp;
    
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
        setError(false);
        setSuccess(false);
      };

    return (<>
        <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                {successMsg}
            </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {errorMsg}!
            </Alert>
        </Snackbar>
      </>
    );
}

export default CustomSnackbar;