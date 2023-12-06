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
        fetchTask();

        setTaskReload(taskReload+1);
      });
      
    },[socket]);

  if (loading) {
    return <h4>loading..</h4>;
  }
  return (
    <Box className="center">
      <br/>
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
