import React, { useEffect, useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import { Box, Grid, Typography} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Feedbacks = ({userData,reloadParent,reload, socket})=>{ 
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const {restAPI} = useApi();
    const fetchFeedbacks = async()=>{
        setLoading(true);
        try {
            const allFeedbacks = await restAPI.get("/protected/userfeedback");
            setFeedbacks(allFeedbacks.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
          if (error.response.status === 403){
            localStorage.removeItem("Are_you_in");
            navigate("/");
          }
        }
    }
    useEffect(()=>{
        fetchFeedbacks();
    },[])

  if (loading) {
    return <h4>loading..</h4>;
  }
  
  return (
    <Box className="center">
      <br/>
      <h2>Feedbacks (by you) so far:</h2>
      <Box sx={{ overflow: 'auto', maxHeight: '150px' }}>
      <article>
        {feedbacks.map((feedback) => {
        return (
            <Typography variant={"body1"}>{feedback}</Typography>
        );
        })}
        </article>
        </Box>
    </Box>
  );
};

export default Feedbacks;
