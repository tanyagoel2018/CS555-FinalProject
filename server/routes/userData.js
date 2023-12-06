import { Router } from "express";
const router = Router();
import { getAllUsers, getUserByName, getUserByUserID, updateProfilePic, getProfilePic } from "../data/userData.js";

// getting all user data route
router.route("/").get(async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await getUserByUserID(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/profilePic").get(async(req, res)=>{
  try {
    let userId = req.user.id;
    let profilePic = await getProfilePic(userId);
    res.status(200).json(profilePic);
  }
  catch(error){
    res.status(400).json(error);
  }
});
 

router.route("/allUsers").get(async (req, res) => {
  try {
    const admin = req.user.admin;
    if(!admin){
      return res.status(403).json('not an admin');
    }
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/search").post(async (req, res) => {
  try {
    let searchQuery = req.body.searchQuery
    const results = await getUserByName(searchQuery);
    res.json(results);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.route("/profilePicEdit").post(async (req, res) => {
  try {
    let userId = req.user.id;
    let url = req.body.url;
    let user = await updateProfilePic(userId,url);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});
router.route("/:userId").get(async (req, res) => {
  try {
    let userId = req.params.userId.toString();

    const user = await getUserByUserID(userId);
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
