import { users } from "../config/dbCollections.js";
import { ObjectId } from "mongodb";

const completeTask = async (userId, taskId, reward) => {
  const userCollection = await users();
  const filter = { _id: new ObjectId(userId) };
  await userCollection.update(filter, {
    $pull: { tasks: { _id: new ObjectId(taskId) } },
  });

  await userCollection.updateOne(filter, {
    $inc: { rewards: Number(reward) },
  });

  return 'Task Completed'
};


export { completeTask }