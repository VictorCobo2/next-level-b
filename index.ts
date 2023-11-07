import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import * as routes from "./src/routes";
console.clear()

const APP = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://eonia:zjmT7cYAZEQ8WXem@eonia.vij6j1u.mongodb.net/NEXT-LEVEL";


APP.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, x_token ,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  next();
});

APP.use(express.json());


APP.use("/api/user", routes.USERS_ROUTES)
APP.use("/api/courses", routes.COURSE_ROUTE)
APP.use("/api/quiz", routes.QUIZ_ANSWERS_ROUTES)

APP.get("/api", (req, res) => {
  res.send("API ready");
});


mongoose
  .connect(`${MONGO_URI}`)
  .then(() => {
    console.log("MongoDB connected 🟢");
  })
  .catch((error) => {
    console.log("ERROR 🔴");
    console.log(error);
  });

APP.listen(PORT, () => console.log(`API lisening: http://localhost:${PORT}`));
