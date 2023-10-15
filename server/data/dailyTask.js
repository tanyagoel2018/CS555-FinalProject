import { users } from "../config/dbCollections.js";
import { ObjectId } from "mongodb";
import { dailyTaskScema } from "../validations/dailyTaskValidation.js";

const fetchAllTask = async (id)=>{
    id = id.trim();
    await dailyTaskScema.validate({id});
    if (!ObjectId.isValid(id)) throw `Valid ObjectId required for daily tasks`;
    const userCollection = await users();
    let dailyTask = await userCollection.findOne({ _id: new ObjectId(id) },{ projection: { tasks: 1, _id:0 } });
    return dailyTask.tasks;
}

export {fetchAllTask};