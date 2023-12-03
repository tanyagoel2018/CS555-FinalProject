import { Avatar, Button, Checkbox, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from '@mui/icons-material/Send';
import Task from "../Task";
import { FcLike } from "react-icons/fc";
import TaskComplete from "../../modals/TaskComplete";
import { useApi } from "../../ContextAPI/APIContext";


const ShowUserData = () => {
    const navigate = useNavigate()
  const { state } = useLocation();

  let userId = null;
  const {restAPI} = useApi();
  const [open, setOpen] = useState(false);
  const [taskId,setTaskId] = useState(null);
  const [reward,setReward] = useState(null);
  const [user,setUser] = useState(null);
  const [reload,setReload] = useState(0);
  const handleOpen = ({taskId,reward}) => {
    setTaskId(taskId);
    setReward(reward);
    setOpen(true)};
  const handleClose = () => {
    setOpen(false);
    setReload(reload+1);
  };




  useEffect(()=>{
    if(state && state.userId){
        restAPI.get(`/protected/userData/${state.userId}`)
        .then((response)=>{
            setUser(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
      }
      else{
        navigate('/adminHome')
      } 
  },[reload])
let tasks=null;
  if(user && user.tasks){tasks = user.tasks.map((item) => {
    return (
      <div className="TaskContainer" key={item._id}>
        <Button
          variant="outlined"
          size="small"
          className="task"
          onClick={()=>handleOpen({taskId:item._id,reward:item.reward})}
          sx={{marginRight:'10px'}}
          startIcon={<SendIcon />}
        >
          Done
        </Button>
        <span className="task">{item.task}</span>
        <Button
          variant="outlined"
          size="small"
          className="reward"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          className="reward"
          size="small"
          sx={{ marginRight: "10px" }}
        >
          Edit
        </Button>
        <span className="reward">
          {item.reward}
          <FcLike />
          <span style={{ paddingLeft: "20px" }}></span>
        </span>
      </div>
    );
  });}


  if(user){return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <br />
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
              <h2>Rewards: {user.rewards}</h2>
            </div>
            <div className="div4 center">
              <br />
              {tasks}
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
            <Link to={'/adminHome'}>Back to Home</Link>
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
  );}
};

export default ShowUserData;
