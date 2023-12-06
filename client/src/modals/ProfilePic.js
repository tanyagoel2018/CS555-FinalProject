import React, {  useState } from "react";
import { Modal, Box, Button, Avatar,Tooltip } from "@mui/material";
import { useApi } from "../ContextAPI/APIContext";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 260,
  bgcolor: "#fcc026",
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
  const [profilePic, setProfilePic] = useState(props.profilePic);
  const [updatePic,setUpdatePic] = useState(null);
  const cloudinaryApi = "dzlf4ut72";
  const presetValue = "lqbvmbqp";

  const handleImageChange = (event) => {
    setUpdatePic(event.target.files[0]);
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onloadend = () => {
        setProfilePic(reader.result);
        };
    reader.readAsDataURL(selectedFile);
    }
  };

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
          setProfilePic(response.data.url);
          restAPI
            .post("/protected/userData/profilePicEdit",{url:response.data.url})
            .then((response)=>{
                props.handleClose();
            })
            .catch((error)=>{
                console.log(error);
            })
        
        })
        .catch((error) => {
          console.log(error);
        });
  };
  return (
    <Modal open={props.open} onClose={props.handleClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="post-image" className="form-label">
            <Tooltip title="Edit Profile Image" arrow>
                <Avatar
                    sx={{ bgcolor: "#840032",width:200,height:200 }}
                    alt={props.userName}
                    src={profilePic}
                />
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
