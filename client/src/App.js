import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import PetRename from "./components/PetRename";
import FeedbackForm from "./components/userfeedback";
import AdminHome from "./components/adminComps/AdminHome";
import AddTasks from "./components/adminComps/AddTasks";
import AdminLogin from "./components/adminComps/AdminLogin";
import EditTask from "./components/adminComps/EditTask";
import ShowUserData from "./components/adminComps/ShowUserData";
function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/petRename" element={<PetRename />} />
          <Route path="/userfeedback" element={<FeedbackForm />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/addTasks" element={<AddTasks />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/showUser" element={<ShowUserData />} />
          <Route path="/editTasks" element={<EditTask />} />
        </Routes> 
      </div>
    </Router>
  );
}
 
export default App;
