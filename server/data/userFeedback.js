import { feedbacks } from "../config/dbCollections.js";
import { feedbackSchema } from "../validations/feedbackValidation.js";

const addFeedback = async (userId, userFeedback) => {
  // console.log("In data/userFeedback");

  await feedbackSchema.validate({ feedback: userFeedback });

  const feedbackCollection = await feedbacks();

  const userExist = await feedbackCollection.findOne({
    userID: userId,
  });

  if (userExist != null) {
    try {
      let result = undefined;
      result = await feedbackCollection.updateOne(
        { userID: userId },
        { $push: { allFeedbacks: userFeedback } }
      );
      return;
    } catch (error) {
      console.error("Validation or Database Error:", error.message);
    }
  } else {
    let newFeedback = {
      userID: userId,
      allFeedbacks: [userFeedback],
    };

    try {
      const result = await feedbackCollection.insertOne(newFeedback);
      return;
    } catch (error) {
      console.error("Validation or Database Error:", error.message);
    }
  }
};

export { addFeedback };
