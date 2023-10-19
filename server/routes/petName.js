// import auth from "../controllers/authentication.js";
import { Router } from "express";
import { petSchema } from "../validations/petNameValidations.js";
import { updatePetname } from "../data/petName.js";
import xss from "xss";

const router = Router();

//Pet Name routes:
router.route("/").post(async (req, res) => {
  try {
    let input = req.body;
    console.log(req.cookies);
    let userId = xss(input.id);
    let petName = xss(input.petName);
    await petSchema.validate({petName});
    let result = await updatePetname(userId, petName);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
