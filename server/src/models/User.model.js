import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    index: true
  },
  username: {
    type: String,
    unique: true,
    index: true
  },
  password: {
    type: String,
    select: false
  },
  account: { type: mongoose.Schema.ObjectId, ref: 'Account' },
  preferences: Object, // TODO define this
  created: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
