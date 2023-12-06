import React, { useEffect, useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import { Box, Grid} from "@mui/material";
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
      <article>
        <Grid container spacing={2} paddingLeft={2} overflow="auto" maxHeight={"25em"}>
        {feedbacks.map((feedback) => {
        return (<h4>{feedback}, </h4>);
        })}
        </Grid>
        </article>
    </Box>
  );
};

export default Feedbacks;
