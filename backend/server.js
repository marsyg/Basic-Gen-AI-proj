const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const cors = require("cors");
const { GoogleGenerativeAI} = require("@google/generative-ai");
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
app.post("/gemini", async (req, res) => {
    console.log(req.body);
  function pathToGenerativeImage (path,mimeType) {
    const buffer = fs.readFileSync(path);  
    const base64 = buffer.toString("base64");
return {
    inlineData: {
        mimeType: mimeType,
        data: base64
    }
}
  }
    const model = genAI.getGenerativeModel({model : "gemini-1.5-flash-latest"});
    const prompt = req.body.prompt;
    const result = await model.generateContent([prompt,pathToGenerativeImage(filePath,"image/jpeg")]);
    const response = result.response
    const text = response.text()
    console.log(text)
    res.send(text);}
) 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
