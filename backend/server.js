const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const {generativeAi} = require("./generativeAi");
app.use(cors());
app.use(express.json());
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();
const genAI = new generativeAi(process.env.GEMINI_API_KEY);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
