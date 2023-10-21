import React from "react";
import {FcLike, FcOk} from "react-icons/fc"
const Task = ({task, reward})=>{
    return <div className="TaskContainer">
        <span className="task">{task}</span>
        <span className="reward">{reward} <FcLike /></span>
    </div>
}

export default Task;