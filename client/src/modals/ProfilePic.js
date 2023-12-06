import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Avatar,Tooltip } from "@mui/material";
import { useApi } from "../ContextAPI/APIContext";
import axios from "axios";
import IconButton from '@mui/material/IconButton';
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import useSnackbar from "../hooks/useSnackbar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 260,
  bgcolor: "#f4f2f7",
  border: "2px solid #000",
  boxShadow: 24,
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  textAlign:'center',
  justifyContent:'center',
  p: 4,
};

const ProfilePic = (props) => {
  const { restAPI } = useApi();
  const {profilePic, setProfilePic} = props;
  const [localProfilePic, setLocalProfilePic] = useState(props.profilePic);
  const [updatePic,setUpdatePic] = useState(profilePic);
  const cloudinaryApi = "dzlf4ut72";
  const presetValue = "lqbvmbqp";
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  useEffect(()=>{
    setLocalProfilePic(props.profilePic);
  },[props.profilePic])

  const handleImageChange = (event) => {
    setUpdatePic(event.target.files[0]);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
        setLocalProfilePic(reader.result);
        };
    reader.readAsDataURL(selectedFile);
    }
  };

  const handleClose = ()=>{
    setLocalProfilePic(props.profilePic);
    props.handleClose();
  }


  const handleSubmit = (event) => {
    event.preventDefault();
      const formData = new FormData();
      formData.append("file", updatePic);
      formData.append("upload_preset", presetValue);

      axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloudinaryApi}/image/upload`,
          formData
        )
        .then((response) => {
          restAPI
            .post("/protected/userData/profilePicEdit",{url:response.data.url})
            .then((response)=>{
                snackbar.showSuccess("Profile Picture Updated")
                setProfilePic(response.data.url);
                props.handleClose();
            })
            .catch((error)=>{
              if (error.response.status === 403){
                localStorage.removeItem("Are_you_in");
                navigate("/");
              }
              snackbar.showError("Error! Try again later")
            });
        })
        .catch((error) => {
          snackbar.showError("Error! Try again later")
        });
  };
  return (
    <Modal open={props.open} onClose={handleClose}>
      <Box sx={style}>
      <IconButton edge="end" color="inherit" onClick={props.handleClose} aria-label="close" sx={{marginLeft: "-260px", marginTop:"-20px"}}>
                <RxCross1 color='red'/>
        </IconButton>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="post-image" className="form-label">
            <Tooltip title="Edit Profile Image" arrow>
              <Avatar
                    sx={{ bgcolor: "#840032",width:200,height:200 }}
                    alt={props.userName}
                    src={localProfilePic}/>
                </Tooltip>
            </label>
            <input
              id="post-image"
              className="form-control"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
          <br/>
          <Button type="submit">Upload</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfilePic;
