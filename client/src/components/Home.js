import React, { useEffect } from "react";
import { restAPI } from "../service/api";
import { useState } from "react";

const UserData = () => {
  const [score, setScore] = useState(null);
  const id = window.sessionStorage.getItem("id");
  const url = "/user-data?id=" + id.toString();
  useEffect(() => {
    restAPI
      .get(url)
      .then((response) => {
        // setScore(response.score);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <p>Your current score is: {score}</p>
    </div>
  );
};

export default UserData;
