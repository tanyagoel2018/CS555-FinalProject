import { fetchAllTask } from "../data/dailyTask.js";
import { ObjectId } from "mongodb";
import xss from "xss";

const getDailyTask = async (req, res) => {
  //TODO: get id from session object;
  let id = xss(req.user.id);
  //ID validation
  id = id.trim();
  if (!ObjectId.isValid(id)) throw `Valid ObjectId required for daily tasks`;
  //fetching daily task for the user
  try {
    const result = await fetchAllTask(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: "Valid User id needed" });
  }
};

export { getDailyTask };
