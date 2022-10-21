import { User } from '../models/User.model.js';

export class UserService {
  static get(id) {
    return new Promise((resolve, reject) => {
      User.findById(id)
        .lean()
        .exec()
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => reject(err));
    });
  }

  static upsert(user) {
    return new Promise((resolve, reject) => {
      const update = new User(user);
      User.findOneAndUpdate({ _id: update._id }, update, { upsert: true, new: true })
        .exec()
        .then((doc) => resolve(doc))
        .catch((err) => reject(err));
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      User.findByIdAndDelete(id)
        .exec()
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => reject(err));
    });
  }
}
