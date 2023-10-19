//TODO: write YUP validation

import yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

const petSchema = yup.object({
  petName: yup
    .string()
    .required()
    .max(50)
    .min(1)
    .matches(/^[A-Za-z ]*$/, "Please enter valid name"),
});

export { petSchema };
