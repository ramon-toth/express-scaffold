/*
import Storage from '../models/storage.model.js';
import s3 from '../utils/s3.mjs';
import sharp from 'sharp';
import fetch from 'node-fetch';

class StorageService {
  // Bucket Actions
  // ----------------------------------------------------------------
  //

  listBuckets() {
    return s3.listBuckets();
  }

  listBucketFiles(Bucket) {
    return s3.listFiles(Bucket);
  }

  createBucket(Bucket) {
    return s3.newBucket(Bucket);
  }

  deleteBucket(Bucket) {
    return s3.deleteBucket(Bucket);
  }

  setCorsDefault(Bucket) {
    return s3.setCors(Bucket);
  }

  // File Actions
  // ----------------------------------------------------------------
  //

  listFilesForClient(client) {
    return new Promise((resolve, reject) => {
      Storage.find({ client })
        .lean()
        .exec()
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => reject(err));
    });
  }

  getFile(id) {
    return new Promise((resolve, reject) => {
      Storage.findById(id)
        .lean()
        .exec()
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => reject(err));
    });
  }

  upload(files, user) {
    const bucket = user.clientId;
    return this._saveFiles(files, bucket, user);
  }

  uploadRecording(file, bucket, user, meta) {
    return this._saveFiles(file, bucket, user, meta);
  }

  deleteFile(id, bucket) {
    return new Promise(async (resolve, reject) => {
      try {
        const fileRecord = await Storage.findById(id).lean().exec();
        if (!fileRecord) reject('not found');

        s3.deleteFile(bucket, fileRecord.key || fileRecord.location)
          .then((doc) => Storage.findByIdAndDelete(id).exec())
          .then((doc) => resolve(doc))
          .catch((err) => reject(err));
      } catch (error) {}
    });
  }

  // Image Actions
  // ----------------------------------------------------------------
  //

  async uploadImage(
    files,
    user,
    options = {
      size: { width: 1920, height: null },
      blur: null
    }
  ) {
    const bucket = user.clientId;
    const buffers = await Promise.all(files.map(async (file) => this._processImage(file.buffer, options)));
    files.map((file, i) => {
      file.buffer = buffers[i];
      return file;
    });
    return this._saveFiles(files, bucket, user);
  }

  downloadImage(url) {
    return fetch(url)
      .then((x) => x.arrayBuffer())
      .then((x) => Buffer.from(x, 'base64'));
  }

  // Utility methods
  // ----------------------------------------------------------------
  //

  _processImage(buffer, options) {
    const { width, height } = options.size;
    const blur = options.blur;

    return new Promise((resolve, reject) => {
      if (blur) {
        sharp(buffer)
          .resize({ width, height })
          .withMetadata()
          .blur(blur)
          .toBuffer()
          .then((buf) => resolve(buf))
          .catch((err) => reject(err));
      }

      if (!blur) {
        sharp(buffer)
          .resize({ width, height })
          .withMetadata()
          .toBuffer()
          .then((buf) => resolve(buf))
          .catch((err) => reject(err));
      }
    });
  }

  _saveFiles(files, bucket, user, meta = {}) {
    let storageRecords = [];
    return new Promise(async (resolve, reject) => {
      const uploads = await Promise.all(
        files.map(async (file) => await s3.upload(bucket, new Date().valueOf() + '-' + file.originalname, file.buffer))
      );

      const records = uploads.map(async (upload, i) => {
        await this._createStorageRecord(files[i], upload, user, meta).then((doc) => storageRecords.push(doc));
      });

      Promise.all(records)
        .then(() => resolve(storageRecords))
        .catch((err) => reject(err))
        .catch((err) => console.log(error));
    });
  }

  _createStorageRecord(file, s3record, user, meta) {
    return new Promise((resolve, reject) => {
      new Storage({
        fileName: new Date().valueOf() + '-' + file.originalname,
        mimeType: file.mimetype,
        etag: s3record.ETag.replace(/['"]+/g, ''),
        key: s3record.Key,
        size: file.size,
        location: s3record.Location.includes('http') ? s3record.Location : `https://${s3record.Location}`,
        bucket: s3record.Bucket,
        owner: user ? user.id : null,
        client: user ? user.clientId : meta.client,
        meta
      })
        .save()
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }
}

export default new StorageService();
*/
