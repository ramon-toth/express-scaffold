import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

class S3Driver {
  s3;
  spacesEndpoint;
  corsRules = [
    {
      AllowedHeaders: [],
      AllowedMethods: ['GET'],
      AllowedOrigins: ['*'],
      ExposeHeaders: [],
      MaxAgeSeconds: 0
    }
  ];

  constructor() {
    this.spacesEndpoint = new AWS.Endpoint(process.env.SPACES_ENDPOINT);
    this.s3 = new AWS.S3({
      endpoint: this.spacesEndpoint,
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET
    });
  }

  // Bucket Actions
  // -------------------------------------------------------------------------
  listBuckets() {
    return new Promise((resolve, reject) => {
      this.s3.listBuckets({}, function (err, data) {
        if (err) reject(err);
        else {
          resolve(data);
        }
      });
    });
  }

  // Takes bucket name
  newBucket(Bucket) {
    return new Promise((resolve, reject) => {
      this.s3.createBucket({ Bucket }, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  deleteBucket(Bucket) {
    return new Promise((resolve, reject) => {
      this.s3.deleteBucket({ Bucket }, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  setCors(Bucket, corsRules = this.corsRules) {
    return new Promise((resolve, reject) => {
      let corsParams = { Bucket, CORSConfiguration: { CORSRules: corsRules } };
      this.s3.putBucketCors(corsParams, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  // File Actions
  // ----------------------------------------------------------------

  upload(Bucket, Key, Body, publicAccess = true) {
    const params = {
      Bucket,
      Key,
      Body,
      ACL: publicAccess ? 'public-read' : 'private'
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  deleteFile(Bucket, Key) {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject({ Bucket, Key }, function (err, data) {
        if (err) reject(err);
        else resolve(data['Contents']);
      });
    });
  }
}

export default new S3Driver();
