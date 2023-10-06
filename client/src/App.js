import './App.css';
import React, {useEffect, useState} from "react";
import { restAPI } from './service/api';

function App() {
  const [welcomeMsg, setWelcomeMsg] = useState("Not welcome");

  const fetchMsg = async()=>{
      try {
        let res = await restAPI.get();
        setWelcomeMsg(res.data.msg);
      } catch (error) {
        
      }
  }
  
  useEffect(()=>{
    fetchMsg();
  }, [])
  return <h1>{welcomeMsg}</h1>;
}

export default App;
