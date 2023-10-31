import xss from "xss";
import jwt from "jsonwebtoken";

const logout = async(req, res)=>{
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: '2s',
      });
      res.cookie("jwt", token, {
        httpOnly: true, // Make the cookie accessible not only via HTTP(s)
        maxAge: 3600000, // Cookie expiration time in milliseconds (1 hour)
      });
    return res.json({msg: "token expires in 2 seconds"});
}

export default logout;