import auth from "./Auth.js";

const constructorMethod = (app) => {
  app.use("/", auth);
  app.use("*", (req, res) => {
    return res.status(404).json({ msg: "Not Found" });
  });
};

export default constructorMethod;
