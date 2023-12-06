import React from "react";
import {
  Backdrop,
  CircularProgress,
} from "@mui/material";

const BackDrop = ({loader})=>{
    return (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default BackDrop;