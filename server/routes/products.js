import { purchase_product } from "../data/products.js";
import { Router } from "express";
import xss from "xss";
import { productUpdateSchema } from "../validations/productValidation.js";

const router = Router();

router.route("/").post(async (req, res) => {

    try {
        let input = req.body;
        let id = xss(input.id);
        let rewards = xss(input.rewards);
        let image = xss(input.image);
        await productUpdateSchema.validate({rewards, image})
        let result = await purchase_product(id,rewards,image);
        res.json(result);
    } catch (error) {
        res.status(400).json(error);
    }
})

export default router;
