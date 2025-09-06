import express from "express";
import dotenv from "dotenv";
import path from "path";
import UrlRouter from "./App/Routes/UrlShortenerRoutes.js";
import connectDB from "./App/Config/db.js";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "./App/Views"));

app.use("/url", UrlRouter);

connectDB().then(() => {
  app.listen(process.env.PORT || 1000, () => console.log(`Server running on port ${process.env.PORT || 1000}`));
}).catch((err) => {
  console.error("DB connection failed", err);
  process.exit(1);
});