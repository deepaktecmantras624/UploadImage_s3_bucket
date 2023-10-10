// import dotenv from 'dotenv'

// import aws from 'aws-sdk'
const aws = require("aws-sdk");
// import crypto from 'crypto'
const crypto = require("crypto");
// import { promisify } from "util"
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);

require("dotenv").config();

const region = "ap-south-1";
const bucketName = "tecmantrasawsbucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

async function generateUploadURL() {
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}

module.exports = generateUploadURL;
