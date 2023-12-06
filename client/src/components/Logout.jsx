import React, { useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress, Box } from "@mui/material";
import {LiaRunningSolid} from "react-icons/lia";
import { FaPowerOff } from "react-icons/fa6";

const Logout = ()=>{
    const {restAPI} = useApi();
    const navigate = useNavigate();

    // TODO: snackbar.
    const [loading, setLoading] = useState(false);

    const logMeOut= async()=>{
        // await restAPI.get("/protected/logout");
        try {
            await restAPI.get("/protected/logout");
        } catch (error) {
            if (error.response.status === 403){
                localStorage.removeItem("Are_you_in");
                navigate("/");
              }
        }
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

        {<FaPowerOff size={23} onClick={handleLogout} color={"#fafafa"}/>}
        {/* <Button to="/" className="btn" onClick={handleLogout}>
                Logout
            </Button> */}
        </>
    );
}

export default Logout;