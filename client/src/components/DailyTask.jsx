import React, { useEffect, useState } from "react";
// import { restAPI } from "../service/api";
import Task from "./Task";
import ProfilePic from "../modals/ProfilePic";
import { useApi } from "../ContextAPI/APIContext";
import { Avatar,Paper, Stack, Tooltip} from "@mui/material";
import Logout from "./Logout";
import { Link } from "react-router-dom";

const DailyTask = ({userData,reloadParent,reload})=>{ 
    const [dailyTasks, setDailyTaks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      reloadParent(reload+1);
    };

    const {restAPI} = useApi();
    const fetchTask = async()=>{
        try {
            const allTask = await restAPI.get("/protected/daily-task");
            setDailyTaks(allTask.data.tasks);
            setLoading(false);
        } catch (error) {
            console.log(error);            
        }
    }
    useEffect(()=>{
        fetchTask();
    },[fetchTask])

  if (loading) {
    return <h4>loading..</h4>;
  }
  return (
    <div className="center">
      <br/>
      <Paper sx={{bgcolor:"#EEAC02", width:'15em'}} className="center" elevation={10}>
        <br/>
        <div style={{width: '100%', height: '100%', overflow: 'hidden'}}>
        <Stack direction='row' sx={{alignItems:'center'}}>
        <span style={{padding: '2px'}}></span>
        <Tooltip title="View/Edit Profile Image" arrow>
        <Avatar onClick={handleOpen} sx={{bgcolor:"#840032"}} alt={userData.name} src={userData.profilePic}></Avatar>
        </Tooltip>
        <span style={{paddingLeft:'10px', fontSize:'30px'}}>{userData.name}</span>
        <span style={{padding: '8px'}}></span>
        <Tooltip title="Logout" arrow>
        <Avatar sx={{bgcolor:"#840032"}}><Logout/></Avatar>
        </Tooltip>
        </Stack>
      <h4>Rewards : {userData.rewards}</h4>
      </div>
      </Paper>
      
      <ProfilePic
      open={open}
      profilePic = {userData.profilePic}
      userName = {userData.name}
      handleClose={handleClose}
      />

      <h2>Daily Tasks</h2>
      <article>
        {dailyTasks.map((dailyTask) => {
          const { task, reward } = dailyTask;
          return <Task task={task} reward={reward} />;
        })}
      </article>
      <Link to="/userfeedback" className="links">Feedback</Link>
    </div>
  );
};

export default DailyTask;
