import { users } from "../config/dbCollections.js";
import { ObjectId } from "mongodb";

const completeTask = async (userId, taskId, reward) => {
  const userCollection = await users();
  const results = await userCollection.updateOne(
    { _id: new ObjectId(userId), "tasks._id": new ObjectId(taskId) },
    {
      $set: { "tasks.$.completed": true },
    }
  );

  const filter = { _id: new ObjectId(userId) };
  let res = await userCollection.findOne(filter);
  res = res.tasks.find((task) => task._id.toString() === taskId);

  if (results.modifiedCount === 1 && res) {
    const updateReward = await userCollection.updateOne(filter, {
      $inc: { rewards: Number(reward) },
    });
    const removeTask = await userCollection.updateOne(filter, {
      $pull: { tasks: { _id: new ObjectId(taskId) } },
    });
    const addTaskToLast = await userCollection.updateOne(filter, {
      $push: { tasks: res },
    });
    if (
      updateReward.modifiedCount === 1 &&
      removeTask.modifiedCount === 1 &&
      addTaskToLast.modifiedCount === 1
    ) {
      return "Task Completed";
    } else {
      throw "Task completion failed";
    }
  } else {
    throw "Task completion failed";
  }
};

const addNewTask = async (userId, name, task, reward) => {
  let newTask = {
    _id: new ObjectId(),
    task,
    reward,
    completed: false,
    assignedBy: name,
  };

  const filter = { _id: new ObjectId(userId) };
  const userCollection = await users();
  let res = await userCollection.updateOne(filter, {
    $push: { tasks: newTask },
  });

  if (res.modifiedCount === 1) {
    return "Task Added";
  } else {
    throw "Task failed to add!";
  }
};

export { completeTask, addNewTask };

//object ={,
//   _id:new ObjectId()
//   task,
//   reward,
//   completed:false,
//   assignedby:name
// }
