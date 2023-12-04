import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
} from "@mui/material";
import ShowUserData from "./ShowUserData";
import { Link, useNavigate } from "react-router-dom";

const AllUsersList = ({ usersData }) => {
const navigate = useNavigate();
const showUser =(user)=>{
    navigate('/showUser',{state:{userId:user._id}})
}

  const list = usersData.map((user) => {
    return (
        <>
        <Divider/>
        <ListItem button sx={{ width: "400px"}} onClick={()=>showUser(user)} key={user._id}>
          <ListItemAvatar>
            <Avatar
              sx={{ bgcolor: "#840032"}}
              alt={user.name}
              src={user.profilePic}
            ></Avatar>
          </ListItemAvatar>
          <ListItemText primary={user.name} />
          <span style={{ display: "inline" }}>
            Rewards
            <ListItemText primary={user.rewards} />
          </span>
        </ListItem>
        <Divider/>
        </>
        
    );
  });
  if(usersData.length>0){
  return <List>{list}</List>;
  }
  else if(usersData.length==0){
    return <h2>Patient not found</h2>
  }
};

export default AllUsersList;
