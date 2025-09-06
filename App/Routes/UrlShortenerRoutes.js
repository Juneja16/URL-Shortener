import express from "express";
import {
  createShortUrl,
  getOriginalUrl,
  getPage,
} from "../Controller/UrlShortenerController.js";

const UrlRouter = express.Router();

// Render homepage with form
UrlRouter.get("/", getPage);

// Handle form submission → generate short URL
UrlRouter.post("/shorten", createShortUrl);

// Redirect short URL → original URL
UrlRouter.get("/:shortCode", getOriginalUrl);

export default UrlRouter;
