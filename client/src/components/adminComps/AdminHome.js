import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApi } from "../../ContextAPI/APIContext";
import CustomSnackbar from "../CustomSnackbar";
import useSnackbar from "../../hooks/useSnackbar";
import BackDrop from "../Backdrop";
import { Grid } from "@mui/material";
import AllUsersList from "./AllUsersList";
import Logout from "../Logout";

const AdminHome = () => {
  const [usersData, setUsersData] = useState(null);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { restAPI } = useApi();
  const snackbar = useSnackbar();

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
        if (error && error.response && error.response.data) {
          snackbar.showError(error.response.data);
        }
      });
  }, []);

  if (loader) {
    return <BackDrop loader={loader} />;
  } else {
    return (
      <>
        <Grid container spacing={1}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <div className="center">
              <h2>Admin Panel</h2>
              <br />
              <br />
              <AllUsersList usersData={usersData} />
            </div>
          </Grid>
          <Grid item xs={2}><Logout/></Grid>
        </Grid>
        
        <CustomSnackbar snackbarProp={snackbar} />
      </>
    );
  }
};

export default AdminHome;
