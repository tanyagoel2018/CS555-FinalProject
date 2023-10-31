import auth from "./Auth.js";
import userData from "./userData.js";
import petName from "./petName.js";
import dailyTask from "./dailyTask.js";
import verifyJWT from "../middleware/verifyJWT.js";
import products from "./products.js";
import logout from "./logout.js";

const constructorMethod = (app) => {
  app.use("/", auth);
  app.use("/protected", verifyJWT);
  app.use("/protected/logout", logout);
  app.use("/protected/daily-task", dailyTask);
  app.use("/protected/userData", userData);
  app.use("/protected/petName", petName);
  app.use("/protected/products",products);
  app.use("*", (req, res) => {
    return res.status(404).json({ msg: "Not Found" });
  });
};

export default constructorMethod;
