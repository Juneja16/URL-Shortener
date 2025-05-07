import mongoose from "mongoose";

const urlShortenerSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UrlShortener = mongoose.model("UrlShortener", urlShortenerSchema);
export default UrlShortener;
// This code defines a Mongoose schema and model for a URL shortener application.
// The schema includes fields for the original URL, the shortened code, and the creation date.
// The model is then exported for use in other parts of the application.
