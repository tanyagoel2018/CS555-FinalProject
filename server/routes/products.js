import { purchase_product } from "../data/products.js";
import { Router } from "express";
import xss from "xss";
import { productUpdateSchema } from "../validations/productValidation.js";
import {purchaseProduct, getPurchasableProducts, getMyProducts} from "../controllers/products.js"
const router = Router();

// router.route("/").post(async (req, res) => {
//     try {
//         let input = req.body;
//         let id = xss(req.user.id);
//         let rewards = input.rewards;
//         let image = xss(input.image);
//         await productUpdateSchema.validate({rewards, image})
//         let result = await purchase_product(id,rewards,image);
//         res.json(result);
//     } catch (error) {
//         res.status(400).json(error);
//     }
// })
router.route("/").post(purchaseProduct).get(getPurchasableProducts);
router.route("/myProducts").get(getMyProducts);

export default router;
