import React, { useEffect, useState } from "react";
// import { restAPI } from "../service/api";
import Task from "./Task";
import { useApi } from "../ContextAPI/APIContext";

const DailyTask = ()=>{ 
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


    if (loading){
        return <h4>loading..</h4>
    }
    return (
        <>
        <h2>Daily Tasks</h2>
        <article>    
            {dailyTasks.map((dailyTask)=>{
                const {task, reward} = dailyTask;
                return <Task task={task} reward={reward} />
            })}
        </article>
    </>)
}

export default DailyTask;