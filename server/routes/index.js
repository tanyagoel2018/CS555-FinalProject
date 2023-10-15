import dailyTask from "./dailyTask.js";

const constructorMethod = (app) => {
  app.use("/", (req, res)=>{
    return res.status(200).json({msg: `Hello from backend`});
  });
  app.use("*",(req, res)=>{
    return res.status(404).json({msg: "Not Found"});
  });
  app.use("/daily-task", dailyTask);

}

export default constructorMethod;