import { fetchAllTask } from "../data/dailyTask.js";
import { ObjectId } from "mongodb";
const getDailyTask = async (req, res)=>{    
    //TODO: get id from session object;
    let id = "6524760af1675ad28cfb417b";
    console.log(res);
    console.log("\n")
    console.log(req)
    //ID validation
    id = id.trim();
    if (!ObjectId.isValid(id)) throw `Valid ObjectId required for daily tasks`;
    console.log(req.cookies.jwt);
    //fetching daily task for the user
    try {
        const result = await fetchAllTask(id);
        return  res.status(200).json(result);
    } catch (error) {
        res.status(400).json({error: "Valid User id needed"});
    }
}

export {getDailyTask};