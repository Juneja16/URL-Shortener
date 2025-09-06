import UrlShortener from "../Model/UrlShortener.js";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
dotenv.config();

const getPage = async (req, res) => {
  res.render("View1", { shortUrl: null });
};

const createShortUrl = async (req, res) => {
  try {
    const { name, email, url: originalUrl } = req.body;

    // Validate URL
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).send("Invalid URL");
    }

    const shortCode = nanoid(7);
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const shortUrl = `${baseUrl}/url/${shortCode}`;

    const newUrl = new UrlShortener({ name, email, originalUrl, shortCode });
    await newUrl.save();

    console.log("URL saved to database:", newUrl);
    res.render("View1", { shortUrl });
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).send("Server error");
  }
};

const getOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;
    console.log("Short code received:", shortCode);

    const urlDoc = await UrlShortener.findOne({ shortCode });
    if (urlDoc) {
      return res.redirect(urlDoc.originalUrl);
    }
    res.status(404).send("URL not found");
  } catch (error) {
    console.error("Error fetching original URL:", error);
    res.status(500).send("Server error");
  }
};

export { createShortUrl, getOriginalUrl, getPage };
