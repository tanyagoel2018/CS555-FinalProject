import { Router } from "express";
const router  = Router();
import xss from "xss";
import {createUser} from '../data/Auth.js'
import { userSchema } from "../validations/userValidation.js";

//login route
// wrote the basic skeleton of login function
// login function incomplete
router.route('/')
.post(async (req,res)=>{
    try {
        let input = xss(req.body);
        let email = xss(input.email);
        let password = xss(input.password);

    } catch (error) {
        
    }
})


// signup route
router.route('/sign-up')
.post(async (req,res)=>{
    try {
        let input = req.body;
        await userSchema.validate(input,{ abortEarly: false });
        let email = xss(input.email);
        let password = xss(input.password);
        let name = xss(input.name);
        let age = xss(input.age);

        const newUser = await createUser(email,password,name,Number(age));
        res.json(newUser);
    } catch (error) {
        res.status(400).json(error)
    }
})

export default router;