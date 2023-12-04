import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../../ContextAPI/APIContext";
import CustomSnackbar from "../CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";
import BackDrop from "../Backdrop";
import { Avatar, Grid, Icon, TextField, Tooltip } from "@mui/material";
import AllUsersList from "./AllUsersList";
import Logout from "../Logout";

const AdminHome = () => {
  const [usersData, setUsersData] = useState(null);
  const [loader, setLoader] = useState(true);
  const [searchQuery,setSearchQuery] = useState(null);
  const [reload,setReload] = useState(0);
  const navigate = useNavigate();
  const { restAPI } = useApi();
  const snackbar = useSnackbar();

const searchUsers =(e)=>{
    if(!e.target.value.trim()){
        setReload(reload+1);
    }
    setSearchQuery(e.target.value.trim());
        
}

useEffect(() => {
    let item = localStorage.getItem("Are_you_in");
    if (item) {
      item = JSON.parse(item);
      let now = new Date();
      let validSession = now.getTime() < item.expirationTime;
      if (!validSession || !item.admin) {
        navigate("/");
      }
    } else {
      navigate("/");
    }

    const url = `/protected/userData/allUsers`;
    restAPI
      .get(url)
      .then((response) => {
        try {
          setUsersData(response.data);
          setLoader(false);
        } catch (error) {
          setLoader(true);
        }
      })
      .catch((error) => {
        if(error.response.status==403){
            localStorage.removeItem('Are_you_in');
            navigate('/');
        }
        if (error && error.response && error.response.data) {
          snackbar.showError(error.response.data);
        }
      });
  }, [reload]);


    useEffect(()=>{
        if(searchQuery){const url = `/protected/userData/search`;
        restAPI
          .post(url,{
            searchQuery
          })
          .then((response) => {
            try {
              setUsersData(response.data);
              setLoader(false);
            } catch (error) {
              setLoader(true);
            }
          })
          .catch((error) => {
            if(error.response.status==403){
                localStorage.removeItem('Are_you_in');
                navigate('/');
            }
            if (error && error.response && error.response.data) {
              snackbar.showError(error.response.data);
            }
          });}
    },[searchQuery])

  

  if (loader) {
    return <BackDrop loader={loader} />;
  } else {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <div className="center" >
              <h2>Admin Panel</h2>
              <br />
              <TextField id="search" label="Search by patient name" variant="outlined" color="secondary" sx={{width:'300px'}} onChange={searchUsers}/>
              <br />
              <div style={{height:'400px',overflowY:'scroll'}}>
              <AllUsersList usersData={usersData} />
              </div>
            </div>
          </Grid>
          <Grid item xs={2}><br/>
          <Tooltip title="Logout" arrow>
        <Avatar sx={{bgcolor:"#840032"}}><Logout/></Avatar>
        </Tooltip>
          </Grid>
        </Grid>
        
        <CustomSnackbar snackbarProp={snackbar} />
      </>
    );
  }
};

export default AdminHome;
