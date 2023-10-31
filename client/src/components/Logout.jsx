import React, { useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import { useNavigate } from "react-router-dom";
import { Backdrop, Button, CircularProgress } from "@mui/material";
const Logout = ()=>{
    const {restAPI} = useApi();
    const navigate = useNavigate();

    // TODO: snackbar.
    const [loading, setLoading] = useState(false);

    const logMeOut= async()=>{
        // await restAPI.get("/protected/logout");
        const allTask = await restAPI.get("/protected/logout");
        console.log(allTask);
    };
    
    const handleLogout= async()=>{
        try {        
            setLoading(true);
            await logMeOut();
            localStorage.removeItem("Are_you_in");
            setLoading(false);
        } catch (error) {
            
        }
        navigate("/");

    }
    return (
        <>
         <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Button to="/" className="btn" onClick={handleLogout}>
                Logout
            </Button>
        </>
    );
}

export default Logout;