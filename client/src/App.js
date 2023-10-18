import "./App.css";
import React, { useEffect, useState } from "react";
import { restAPI } from "./service/api";
// import Signup from "./components/Signup";
import Login from "./components/Login";
function App() {
  const [welcomeMsg, setWelcomeMsg] = useState("Not welcome");

  return (
    <div>
      <Login></Login>
      {/* <Signup></Signup> */}
    </div>
  );
}

export default App;
