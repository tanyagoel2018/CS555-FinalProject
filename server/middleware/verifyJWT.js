import jwt from "jsonwebtoken";
import "dotenv/config.js";

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = decoded;
    next();
  });
};

export default authenticateToken;
