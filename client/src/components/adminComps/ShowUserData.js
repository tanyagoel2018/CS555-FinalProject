import { Avatar, Button, Checkbox, Grid } from "@mui/material";
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

  let userId = null;
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
      return (
        <div
          className="TaskContainer"
          key={item._id}
          style={{ height: "50px" }}
        >
          <div style={{ marginTop: "10px" }}>
            <div className="task" style={{ marginRight: "10px" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() =>
                  handleOpen({ taskId: item._id, reward: item.reward })
                }
                startIcon={<SendIcon />}
              >
                Done
              </Button>
            </div>
            <div
              className="task"
              style={{marginTop:'-5px'}}
            >
              <div style={{marginBottom:'-14px'}}>Task : {item.task}</div>
              <br/>
              <span>&nbsp;&nbsp;Assigned By: {item.assignedBy}</span>
            </div>
            <div className="reward">
              <Button
                variant="outlined"
                size="small"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </div>
            <div className="reward" style={{ marginRight: "10px" }}>
              <Button variant="outlined" size="small" startIcon={<LiaEdit />}>
                Edit
              </Button>
            </div>
            <div className="reward" style={{ marginTop: "5px" }}>
              <span>
                Reward : {item.reward}
                <FcLike />
                <span style={{ paddingLeft: "20px" }}></span>
              </span>
            </div>
          </div>
        </div>
      );
    });
  }

  if (user) {
    return (
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
                <h2>
                  Rewards: {user.rewards} <FcLike />
                </h2>
              </div>
              <div className="div4 center">
                <br />
                <br/>
                {tasks}
              </div>
            </div>
          </Grid>
          <Grid item xs={2}>
            <br />
            <br />
            <br />
            <br />
            <Link to={"/adminHome"}>
              <Button variant="outlined" color="secondary">
                Back to home
              </Button>
            </Link>
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

export default ShowUserData;
