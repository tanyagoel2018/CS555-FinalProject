import { Avatar, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { LiaEdit } from "react-icons/lia";
import SendIcon from "@mui/icons-material/Send";
import { FcLike } from "react-icons/fc";
import TaskComplete from "../../modals/TaskComplete";
import { useApi } from "../../ContextAPI/APIContext";

const ShowUserData = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { restAPI } = useApi();
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const [reward, setReward] = useState(null);
  const [user, setUser] = useState(null);
  const [reload, setReload] = useState(0);
  const handleOpen = ({ taskId, reward }) => {
    setTaskId(taskId);
    setReward(reward);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setReload(reload + 1);
  };

  const goToAddTask = () => {
    navigate("/addTasks", { state: { userId: user._id } });
  };

  const goToEditTask = (item) => {
    navigate("/editTasks", {
      state: {
        userId: user._id,
        taskId: item._id,
        task: item.task,
        reward: item.reward,
      },
    });
  };

  const handleDelete = async(taskId)=>{
      // console.log(taskId);
      try {
        await restAPI.post("/protected/adminTask/delete", {userId:user._id, taskId:taskId});
        setReload(reload+1);
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    if (state && state.userId) {
      restAPI
        .get(`/protected/userData/${state.userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate("/adminHome");
    }
  }, [reload]);
  let tasks = null;
  if (user && user.tasks) {
    tasks = user.tasks.map((item) => {
      return <TaskList task = {item} handleOpen={handleOpen} handleDelete = {handleDelete} goToEditTask ={goToEditTask}/>

    });
  }

  if (user) {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={0} sm={1} md={2} lg={3}></Grid>
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <br/>
            <div className="parent">
              <div className="div1 center">
                <Avatar
                  sx={{ bgcolor: "#840032", height: "70px", width: "70px" }}
                  alt={user.name}
                  src={user.profilePic}
                ></Avatar>
              </div>
              <div className="div2 center">
                <h2>{user.name}</h2>
              </div>
              <div className="div3 center">
                <h2>
                  Rewards: {user.rewards} <FcLike />
                </h2>
              </div>
              <div className="div4 center" >
                {tasks}
              </div>
            </div>
          </Grid>
          <Grid item xs={0} sm={1} md={2} lg={3}>
            <br />
            <br />
            <br />
            <br />
            <Link to={"/adminHome"}>
              <Button variant="outlined" color="secondary">
                Back to home
              </Button>
            </Link>
            <br />
            <br />
            <Button variant="outlined" color="secondary" onClick={goToAddTask}>
              Add new Task
            </Button>
          </Grid>
        </Grid>

        <TaskComplete
          open={open}
          userId={user._id}
          taskId={taskId}
          reward={reward}
          handleClose={handleClose}
        />
        {/* <CustomSnackbar snackbarProp={snackbar} /> */}
      </>
    );
  }
};

const TaskList = ({task, handleClose, handleDelete, handleOpen, goToEditTask})=>{
  return (
    <div
      className="TaskContainer"
      key={task._id}
      style={{ height: "50px" }}
    >
      <div style={{ marginTop: "10px" }}>
        <div className="task" style={{ marginRight: "10px" }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              handleOpen({ taskId: task._id, reward: task.reward })
            }
            startIcon={<SendIcon />}
            disabled={task.completed}
          >
            DONE
          </Button>
        </div>
        <div className="task" style={{ marginTop: "-5px" }}>
          {task.completed ? (
            <div
              style={{
                marginBottom: "-14px",
                textDecoration: "line-through",
              }}
            >
              Task : {task.task}
            </div>
          ) : (
            <div style={{ marginBottom: "-14px" }}>Task : {task.task}</div>
          )}
          <br />
          <span>&nbsp;&nbsp;Assigned By: {task.assignedBy}</span>
        </div>
        <div className="reward">
          <Button
            variant="outlined"
            size="small"
            startIcon={<DeleteIcon />}
            disabled={task.completed}
            onClick= {()=>{handleDelete(task._id)}}
          >
            Delete
          </Button>
        </div>
        <div className="reward" style={{ marginRight: "10px" }}>
          <Button
            disabled={task.completed}
            variant="outlined"
            size="small"
            startIcon={<LiaEdit />}
            onClick={() => {
              goToEditTask(task);
            }}
          >
            Edit
          </Button>
        </div>
        <div className="reward" style={{ marginTop: "5px" }}>
          {task.completed ? (
            <span style={{ textDecoration: "line-through" }}>
              Reward : {task.reward}
              {/* <FcLike /> */}
              <span style={{ paddingLeft: "20px" }}></span>
            </span>
          ) : (
            <span>
              Reward : {task.reward}
              <FcLike />
              <span style={{ paddingLeft: "20px" }}></span>
            </span>
          )}
        </div>
      </div>
    </div>
  );

}

export default ShowUserData;
