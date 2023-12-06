import React, { useEffect, useState } from "react";
// import { restAPI } from "../service/api";
import Task from "./Task";
import { useApi } from "../ContextAPI/APIContext";
import { Avatar,Paper, Stack, Tooltip, Box} from "@mui/material";
import Logout from "./Logout";
import { Link, useNavigate } from "react-router-dom";

const DailyTask = ({userData,reloadParent,reload, socket})=>{ 
    const [dailyTasks, setDailyTaks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [taskReload, setTaskReload ] = useState(0);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate();
    const handleClose = () => {
      setOpen(false);
      reloadParent(reload+1);
    };

    const {restAPI} = useApi();
    const fetchTask = async()=>{
        try {
            const allTask = await restAPI.get("/protected/daily-task");
            let tasks = allTask.data.filter((task)=>task.completed==false)
            setDailyTaks(tasks);
            setLoading(false);
        } catch (error) {
          if (error.response.status === 403){
            localStorage.removeItem("Are_you_in");
            navigate("/");
          }
        }
    }
    useEffect(()=>{
        fetchTask();
    },[taskReload])
    
    useEffect(()=>{
      socket.on("task:update", (e)=>{
        console.log(e);
<<<<<<< HEAD
        // setTaskReload(taskReload+1);
        fetchTask();
=======
        setTaskReload(taskReload+1);
>>>>>>> 46f56de (websocket implemented)
      });
      
    },[socket]);

  if (loading) {
    return <h4>loading..</h4>;
  }
  return (
    <Box className="center">
      <br/>
      {/* <Paper sx={{bgcolor:"#EEAC02", width:'15em'}} className="center" elevation={10}>
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
      </Paper> */}
      
      {/* <ProfilePic
      open={open}
      profilePic = {userData.profilePic}
      userName = {userData.name}
      handleClose={handleClose}
      /> */}

      <h2>Daily Tasks</h2>
      <article>
        {dailyTasks.map((dailyTask) => {
          const { task, reward } = dailyTask;
          return <Task task={task} reward={reward} key={dailyTask._id}/>;
        })}
      </article>
      <Link to="/userfeedback" className="links">Feedback</Link>
    </Box>
  );
};

export default DailyTask;
