import React from "react";
import { Modal, Box, Button } from "@mui/material";
import { useApi } from "../ContextAPI/APIContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height:250,
  bgcolor:"#f4f2f7",
  border: "2px solid #000",
  boxShadow: 24,
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  textAlign:'center',
  justifyContent:'center',
};

const TaskComplete = (props) => {
  const { restAPI } = useApi();


  const markComplete= async()=>{
    try {
      await restAPI.post('/protected/adminTask/', {
        userId:props.userId,
        taskId:props.taskId,
        reward:props.reward});
        props.handleClose()
    } catch (error) {
      console.log(error);
    }


    //  restAPI
    // .post('/protected/adminTask/',{
    //     userId:props.userId,
    //     taskId:props.taskId,
    //     reward:props.reward
    // })
    // .then((response)=>{
    //     props.handleClose()
    // })
    // .catch((error)=>{
    //     console.log(error);
    // })
  }

  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <br/>
        <br/>
        <h3>Are you sure, you want to mark this task as complete?</h3>
        <p>Rewards will be updated and task will be marked as completed for this user</p>
        <div style={{display:'flex',padding:"50px"}}>
        <Button
          variant="outlined"
          color="primary"
          onClick={markComplete}
          size="small"
          sx={{ marginRight:'50px' }}
        >
          Yes
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={()=>props.handleClose()}
          sx={{ marginLeft:'50px'}}
        >
          No
        </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskComplete;
