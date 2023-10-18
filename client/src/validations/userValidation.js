import * as yup from "yup"
import YupPassword from 'yup-password';
YupPassword(yup);

const userSchema = yup.object({
    email: yup.string().email().required().max(50),
    password: yup.string().required().password()
                .min(6,"Password must have atleast 6 characters"),
    name: yup.string().required().max(50).min(1).matches(/^[A-Za-z ]*$/, 'Please enter valid name'),
    age: yup.number("Age must be a number").required()
            .typeError('Age must be a number')
            .min(1).max(130)
})

export {userSchema};