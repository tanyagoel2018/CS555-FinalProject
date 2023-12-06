import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Grid, Typography, Box} from "@mui/material";
import { useApi } from "../ContextAPI/APIContext";
import DailyTask from "./DailyTask";
import Animation from "./PetAnimation";
import Products from "./Products";
import CustomSnackbar from "./CustomSnackbar";
import useSnackbar from "../hooks/useSnackbar";
import BackDrop from "./Backdrop";
import { io } from "socket.io-client";
import NameBanner from "./NameBanner";
import { CiEdit } from "react-icons/ci";

const UserData = () => {
  const navigate = useNavigate();
  const { restAPI } = useApi();
  const snackbar = useSnackbar();
  const [userData, setUserdata] = useState(null);
  const [loader, setLoader] = useState(true);
  const [reload, setReload] = useState(0);
  const [gif, setGif] = useState(null);
  const socket = useMemo(() => {
    const mySocket = io("localhost:4000", {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket"]
    });
    return mySocket;
  }, []); 
  // const socket = io("localhost:4000", {
  //       autoConnect: false,
  //       withCredentials: true,
  //       transports: ["websocket"]
  //     });
  
    useEffect(()=>{
        socket.connect();
        socket.on("Connect", ()=>{
          console.log("connected"); 
        });
    }, [socket]);

    useEffect(()=>{
      socket.on("score:update",(e)=>{
        fetchUserData();
        setReload(reload+1);
        console.log(e);
      });

    },[socket]);

  const fetchUserData = async()=>{
    const url = `/protected/userData`;
    restAPI
      .get(url)
      .then((response) => {
        console.log("API call from home");
        try {
          setUserdata(response.data);
          console.log("APi call made");
          setGif(response.data.pet.recentImage);
          setLoader(false);
        } catch (error) {
          setLoader(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 403){
          localStorage.removeItem("Are_you_in");
          navigate("/");
        }
        if (error && error.response && error.response.data) {
          snackbar.showError(error.response.data);
        }

      });
  }

 
  useEffect(() => {
    let item = localStorage.getItem("Are_you_in");
    if (item) {
      item = JSON.parse(item);
      let now =new Date();
      let validSession = now.getTime() < item.expirationTime
      if(!validSession || item.admin){
          navigate("/");
      }
    }
    else{
      navigate("/")
    }
    fetchUserData();
  }, [reload, navigate, restAPI]);
  //update the gif
  const updateGif = (img) => {
    setGif(img);
  };
  //COLOR : #2C579C
  if (loader) {
    return <BackDrop loader={loader} />;
  } else if (!userData.pet.petName) {
      navigate("/petRename", {state : {save:true}});  
  } else {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <Products
              rewards={userData.rewards}
              reloadParent={setReload}
              reload = {reload}
              gif={gif}
              updatexdGif={updateGif}
            />
           
          </Grid>
          <Grid item xs={6}>
            <div className="home center">
              <span>
                <Typography variant="h5" display={"inline-block"} paddingRight={1} paddingTop={5}>
                  Hi,{userData.pet.petName} here
                </Typography>
                
                <Link to="/petRename" className="links">
                     <CiEdit/>
                  </Link>
                </span>
                <Box paddingTop={2.5}>
                  <Animation gif={gif}  updateGif = {updateGif}/>
                </Box>
            </div>
          </Grid>
          <Grid item xs={3}>
            <NameBanner userName={userData.name} rewards = {userData.rewards}/>
            <DailyTask
              userData={userData}
              reloadParent={setReload}
              reload={reload}
              socket={socket}
            />
          </Grid>
        </Grid>
        <CustomSnackbar snackbarProp={snackbar} />
      </>
    );
  }
};

export default UserData;

