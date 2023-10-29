import React from "react";
import {Alert,Snackbar} from "@mui/material";

const CustomSnackbar = ({snackbarProp})=>{
    const {success, error, errorMsg, successMsg, handleClose } = snackbarProp;
    let severity = success? "success": "error";
    let message = success? successMsg: errorMsg;

    return (<>
        <Snackbar open={success||error} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
      </>
    );
}

export default CustomSnackbar;