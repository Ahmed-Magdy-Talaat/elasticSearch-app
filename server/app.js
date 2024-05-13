const express = require("express");
const { upload } = require("./utils/multer.storage");
const cloudinary = require("cloudinary").v2;
const { client } =require("./utils/elastic.config");
require("./utils/cloud.config");
require("dotenv").config();
const app = express();
const pdfParse = require("pdf-parse");
const port = process.env.PORT;

client
  .index({
    index: "my_index",
    id: "1",
    body: {
      title: "Example Document",
      content: "This is an example document.",
    },
  })
  .then((response) => {
    console.log("Document indexed successfully:", response);
  })
  .catch((error) => {
    console.error("Error indexing document:", error);
  });

app.post("/upload", upload().single("pdf"), async (req, res) => {
  let url = "";
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    url = result.secure_url;

    // Parse text from the PDF file
    const pdfText = await pdfParse(req.file.path);

    res.status(200).json({
      pdfText,
      url,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error uploading file or parsing PDF.");
  }
});

app.listen(port, () => console.log(`app runing on server ${port}`));
