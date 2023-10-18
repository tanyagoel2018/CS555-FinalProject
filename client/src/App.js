import './App.css';
import React, {useEffect, useState} from "react";
import { restAPI } from './service/api';
import Signup from './components/Signup';
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
  return (
    <div>
      <Signup></Signup>
    </div>
  )
}

export default App;
