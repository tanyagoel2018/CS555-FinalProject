import { feedbacks } from "../config/dbCollections.js";

const addFeedback = async (feedback) => {
  console.log("In data/userFeedback");
  const feedbackCollection = await feedbacks();
  //   const feedbackSchema = yup
  //     .string()
  //     .required()
  //     .min(2, "Feedback should be at least 2 characters long");

  try {
    // await feedbackSchema.validate(feedback);
    console.log(feedbackCollection);
    const result = await feedbackCollection.insertOne({ feedback });

    return result.ops[0].feedback;
  } catch (error) {
    console.error("Validation or Database Error:", error.message);
  }
};

export { addFeedback };
