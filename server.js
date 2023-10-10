const express = require("express");
// import { generateUploadURL } from './s3.js'
const generateUploadURL = require("./s3.js");
const cors = require("cors");

const app = express();

// app.use(express.static('front'))
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.get("/s3Url", async (req, res) => {
  const url = await generateUploadURL();
  console.log(url);
  res.send({ url });
});

app.listen(8080, () => console.log("listening on port 8080"));
