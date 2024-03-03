import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./database/db.config";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRoutes from "./routes/User";
import BlogPostRoutes from "./routes/BlogPost";
import CommentRoutes from "./routes/Comment";
import LikeRoutes from "./routes/Like";
require("dotenv").config();
const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.get("/", (req: Request, res: Response) => {
  res.send("Server is connecting");
});

app.use("/User", userRoutes);
app.use("/Blog", BlogPostRoutes);
app.use("/", CommentRoutes);
app.use("/Like", LikeRoutes);
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.listen(3000, () => console.log("Server is connecting on port: 3000 "));
  })
  .catch((err) =>
    console.error("Error During Data Source initialization", err)
  );
