import auth from "./Auth.js";
import userData from "./userData.js";
import petName from "./petName.js"

const constructorMethod = (app) => {
  app.use("/", auth);
  app.use("/userData", userData);
  app.use("/petName",petName);
  app.use("*", (req, res) => {
    return res.status(404).json({ msg: "Not Found" });
  });
};

export default constructorMethod;
