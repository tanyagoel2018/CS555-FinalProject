import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
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
    );
  });

  return <List>{list}</List>;
};

export default AllUsersList;
