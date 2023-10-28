import yup from "yup";


const productUpdateSchema = yup.object({
    rewards : yup.number().required().typeError('Rewards must be a number').min(0),
    image : yup.string().required()
});



export { productUpdateSchema };
