import mongoose from 'mongoose'

const AccountSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  legalName: String,
  address: String,
  country: String,
  postalCode: String,
  email: {
    type: String,
    unique: true,
    index: true
  },
  credits: Number,
  owner: { type: mongoose.Schema.ObjectId, ref: 'User' },
  users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
})

export const Account = new mongoose.model('Account', AccountSchema)
