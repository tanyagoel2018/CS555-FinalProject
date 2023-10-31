import jwt from "jsonwebtoken";
import "dotenv/config.js";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    console.log(decoded.exp, Math.floor(Date.now() /1000));
    if(decoded.exp<=Math.floor(Date.now() / 1000)){
      return res.status(403).json({ error: "Token expired" });
    }
    req.user = decoded;
    next();
  });
};

export default authenticateToken;
