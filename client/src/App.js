import './App.css';
import React, {useEffect, useState} from "react";
import { restAPI } from './service/api';
import DailyTask from './components/DailyTask';

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
  return ( <>
  <h1>{welcomeMsg}</h1>
  <DailyTask />
  </>
  )
  ;
}

export default App;
