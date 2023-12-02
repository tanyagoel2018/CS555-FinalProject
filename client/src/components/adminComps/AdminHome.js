import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const AdminHome = () =>{
    const [usersData,setUsersData] = useState(null)
    const navigate = useNavigate();
    
    useEffect(()=>{
    let item = localStorage.getItem("Are_you_in");
    if (item) {
      item = JSON.parse(item);
      let now =new Date();
      let validSession = now.getTime() < item.expirationTime
      if(!validSession || !item.admin){
          navigate("/");
      }
    }
    },[])
}

export default AdminHome