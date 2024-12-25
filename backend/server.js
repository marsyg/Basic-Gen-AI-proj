const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const {generativeAi, GoogleGenerativeAI} = require("@google/generative-ai");
app.use(cors());
app.use(express.json());
const fs = require("fs");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname + '-' + uniqueSuffix);
    },
})
const upload = multer({
    storage: storage,
   }).single("image");  
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
let filePath ;
app.post("/upload",  (req, res) => {
    upload(req, res, async (err) => {
        if(err) {
            console.log(err);
            return res.status(500).send("Internal Server Error");
        }
        filePath = req.file.path;
    }
    )
}
) 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
