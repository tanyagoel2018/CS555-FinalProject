import { Avatar, Box, Paper,  Typography, Stack, Tooltip, Icon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useApi } from "../ContextAPI/APIContext";
import ProfilePic from "../modals/ProfilePic";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const NameBanner = ({userName, rewards})=>{
    const [modalOpen, setModalOpen] = useState(false);
    const {restAPI} = useApi();
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState("");
    
    const handleOpenModal = ()=>{
        setModalOpen(true);
    }
    const handleCloseModal = ()=>{
        setModalOpen(false);
    }

    const fetchProfilePic = async()=>{
        try {
          const response = await restAPI.get("/protected/userData/profilePic");
          setProfilePic(response.data.profilePic);
        } catch (error) { 
            if (error.response.status === 403){
                localStorage.removeItem("Are_you_in");
                navigate("/");
            }
        }
    }

    useEffect(()=>{
        fetchProfilePic();
    },[profilePic])

    return (<>
    <Box className="center" paddingTop={5}>
    <Paper sx={{bgcolor:"#2C579C", width:'18em', height: '8em', borderRadius:"0.5em"}}  className="center" elevation={10}>
       <Box style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        <Stack direction='row' alignItems={'center'} sx={{ height: '12.5vh', justifyContent: 'left' }} paddingLeft={3}>
        <Tooltip title="View/Edit Profile Image" arrow>
        <Avatar 
            onClick= {handleOpenModal} 
            sx={{bgcolor:"#2C579C",  width: 45, height: 45 }} 
            alt={userName} 
            src={profilePic}
            >
        </Avatar>
        </Tooltip>
        <Box style={{paddingLeft:'20px', paddingTop:"23px"}}>
        <Stack>
        <Typography sx={{fontSize: "2em"}} align="left" color={"#fafafa"}>{userName}</Typography>
        <Typography sx={{fontSize: "1.3em", marginTop: "-14px"}} align="left" color={"#fafafa"} >{rewards} Points</Typography>
        <Stack direction={"row"}>
        <Typography sx={{fontSize: "1.3em", marginTop: "-8px"}} align="left" color={"#fafafa"}>Logout
        </Typography>
            <Box marginTop={-0.2} paddingLeft={1}> 
                <Logout/>
            </Box>
        </Stack>
        </Stack>
        </Box>
        <Tooltip title="Logout" arrow>
        <Box paddingLeft={1.3}>     
        </Box>
        </Tooltip>
        </Stack>
         </Box>
       </Paper>
       </Box>
       <ProfilePic open={modalOpen} handleClose = {handleCloseModal} profilePic = {profilePic} setProfilePic= {setProfilePic}/>
    </>);
}
export default NameBanner;