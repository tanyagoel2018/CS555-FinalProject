import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const taskSchema = yup.object({
  task: yup
    .string()
    .required()
    .max(50)
    .min(1)
    .matches(/^[A-Za-z0-9 ]*$/, "Only letter and numbers allowed"),
  reward: yup.number().required().min(1).max(1000),
});

export { taskSchema };
