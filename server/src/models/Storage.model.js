import mongoose from 'mongoose';

const StorageSchema = new mongoose.Schema({
  fileName: String,
  mimeType: String,
  bucket: String,
  etag: String,
  size: Number,
  location: String,
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  project: { type: mongoose.Schema.ObjectId, ref: 'Project' },
  account: { type: mongoose.Schema.ObjectId, ref: 'Account' },
  created: { type: Date, default: Date.now }
});

export const Storage = mongoose.model('Storage', StorageSchema, 'storage');
