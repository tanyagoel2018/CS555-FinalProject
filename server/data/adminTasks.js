import { users } from "../config/dbCollections.js";
import { ObjectId } from "mongodb";

const completeTask = async (userId, taskId, reward) => {
  const userCollection = await users();
  const filter = { _id: new ObjectId(userId) };
  const results = await userCollection.updateOne(filter, {
    $pull: { tasks: { _id: new ObjectId(taskId) } },
  });

  if (results.modifiedCount === 1) {
    const updateReward = await userCollection.updateOne(filter, {
        $inc: { rewards: Number(reward) },
      });
      if(updateReward.modifiedCount ===1){
        return 'Task Completed'
      }
      else{
        throw 'Task completion failed'
      }
  } else {
    throw 'Task completion failed';
  }

  

  return 'Task Completed'
};


export { completeTask }