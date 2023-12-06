import * as yup from "yup";

const feedbackSchema = yup.object({
  feedback: yup
    .string()
    .required()
    .max(50, "Feedback can be maximum 50 characters long")
    .min(2, "Feedback should be at least 2 characters long"),
});

export { feedbackSchema };
