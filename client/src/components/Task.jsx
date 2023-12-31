import React from "react";
import {FcLike} from "react-icons/fc"
const Task = ({task, reward,id})=>{
    return <div className="TaskContainer" key={id}>
        <span className="task">{task}</span>
        <span className="reward">{reward} <FcLike /></span>
    </div>
}

export default Task; 