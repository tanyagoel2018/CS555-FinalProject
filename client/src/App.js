import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import PetRename from "./components/PetRename";
import FeedbackForm from "./components/userfeedback";
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
