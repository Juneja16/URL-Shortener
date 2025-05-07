import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import shortid from "shortid";
import UrlShortener from "./App/Model/UrlShortener.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "./App/Views"));

app.get("/", (req, res) => {
  res.render("View1", { shortUrl: null });
});

app.post("/shorten", async (req, res) => {
  const longURl = req.body.url;
  const shortCode = shortid.generate();
  // const baseUrl = `${req.protocol}://${req.get("host")}`;
  // const shortUrl = `${baseUrl}/${shortCode}`;

  const shortUrl = `http://localhost:1000/${shortCode}`; // Change this to your actual domain

  const newUrl = new UrlShortener({
    originalUrl: longURl,
    shortCode: shortCode,
  });
  await newUrl.save();
  console.log("URL saved to database:", newUrl);
  res.render("View1", { shortUrl });
});

app.get("/:shortCode", async (req, res) => {
  const shortCode = req.params.shortCode;
  console.log("Short code received:", shortCode);
  const url = await UrlShortener.findOne({ shortCode });
  res.redirect(url.originalUrl);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/URLSHORTENER_31_3_2025")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(1000, () => {
      console.log(`Server is running on port ${1000}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
