import React, { useEffect, useState } from "react";
// import { restAPI } from "../service/api";
import Task from "./Task";
import { useApi } from "../ContextAPI/APIContext";
import { Avatar,Paper, Stack } from "@mui/material";

const DailyTask = ({userData})=>{ 
    const [dailyTasks, setDailyTaks] = useState([]);
    const [loading, setLoading] = useState(true);
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
    },[])

  if (loading) {
    return <h4>loading..</h4>;
  }
  return (
    <div className="center">
      <br/>
      <Paper sx={{bgcolor:"#EEAC02", width:'15em'}} className="center" elevation={10}>
        <br/>
        <Stack direction='row' sx={{alignItems:'center'}}>
        <Avatar sx={{bgcolor:"#840032"}}>{userData.name.slice(0,1)}</Avatar><span style={{paddingLeft:'20px',fontSize:'30px'}}>{userData.name}</span>
        </Stack>
      <h2>Rewards : {userData.rewards}</h2>
      </Paper>
      
      <h2>Daily Tasks</h2>
      <article>
        {dailyTasks.map((dailyTask) => {
          const { task, reward } = dailyTask;
          return <Task task={task} reward={reward} />;
        })}
      </article>
    </div>
  );
};

export default DailyTask;
