import jwt from "jsonwebtoken";
import "dotenv/config.js"

const getCookie = (cName, socket)=> {
    const cookie = cName + "=";
    const decoded = decodeURIComponent(socket.handshake.headers.cookie);
    const cookieList = decoded.split(';');
    let res;
    cookieList.forEach(val => {
       if (val.indexOf(cookie) === 0) res = val.substring(cookie.length);
       })
    return res;
  }

  const getUserIdFromJWT = (cookie, socket)=>{
    const token = getCookie(cookie,socket)
    let user= {id:""}
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       user.id = decoded.id;
    });
    return user;
  }
  
export default getUserIdFromJWT;