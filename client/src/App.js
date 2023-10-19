import "./App.css";
import React, { useEffect, useState } from "react";
import { restAPI } from "./service/api";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [welcomeMsg, setWelcomeMsg] = useState("Not welcome");

  return (
    <div>
      {/* <Signup></Signup> */}
      {/* <Login></Login> */}
      <Home></Home>
    </div>
  );
}

export default App;
