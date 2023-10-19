// import auth from "../controllers/authentication.js";
import { getPetName, postPetName, putPetName } from "../controller/petName.js";
import { Router } from "express";
import { petSchema } from "../validations/petNameValidations.js";
import { updatePetname } from "../data/petName.js";

const router = Router();

//Pet Name routes:
router.route("/").post(async (req, res) => {
  try {
    let input = req.body;
    // await petSchema.validate(input);
    let userId = xss(input.id);
    let petname = xss(input.petname);
    let result = await updatePetname(id, petname);
    res.json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

export default router;
