// CRUD Service class for Mongoose
// Constructor takes Mongoose Model
//----------------------------------------------------------------
//
import { ApiEvents$ } from '../subscribers/events.js';
import { Observable } from 'rxjs';

export class CrudService {
  constructor(model, eventSubject = ApiEvents$, resourceName = null) {
    this.Model = model;
    this.eventSubject = eventSubject;
    this.resource = resourceName || this.Model.collection.collectionName;
  }

  create(object) {
    return new Promise((resolve, reject) => {
      new this.Model(object)
        .save()
        .then((doc) => this._emit('create', doc))
        .then((doc) => resolve(doc))
        .catch((err) => {
          reject(err);
          this._emit('create', null, err.message);
        });
    });
  }

  read(id, populate = null) {
    return new Promise((resolve, reject) => {
      this.Model.findById(id)
        .populate(populate)
        .lean()
        .exec()
        .then((doc) => this._removeFuzzyIndex([doc]))
        .then((doc) => this._emit('read', doc))
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => {
          reject(err);
          this._emit('read', null, err.message);
        });
    });
  }

  readByKey(key, value, populate = null) {
    return new Promise((resolve, reject) => {
      this.Model.find()
        .where(key)
        .equals(value)
        .populate(populate)
        .lean()
        .exec()
        // .then((doc) => this._removeFuzzyIndex(doc))
        .then((doc) => this._emit('read', doc))
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => {
          reject(err);
          this._emit('readByKey', null, err.message);
        });
    });
  }

  countByKey(key, value) {
    return new Promise((resolve, reject) => {
      this.Model.find()
        .where(key)
        .equals(value)
        .countDocuments()
        .exec()
        .then((doc) => this._emit('count', doc))
        .then((doc) => (doc ? resolve(doc) : resolve(0)))
        .catch((err) => {
          reject(err);
          this._emit('count', null, err.message);
        });
    });
  }

  list(client, pagination = { limit: 0, skip: 0 }, populate = null, sort = { _id: 1 }) {
    const { limit, skip } = pagination;

    return new Promise((resolve, reject) => {
      this.Model.find({ client })
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .populate(populate)
        .sort(sort)
        .lean()
        .exec()
        .then((doc) => this._removeFuzzyIndex(doc))
        .then((doc) => this._emit('list', doc))
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => {
          reject(err);
          this._emit('list', null, err.message);
        });
    });
  }

  update(update) {
    return new Promise((resolve, reject) => {
      this.Model.findOneAndUpdate({ _id: update._id }, update, { upsert: true, new: true })
        .exec()
        .then((doc) => this._emit('update', doc))
        .then((doc) => resolve(doc))
        .catch((err) => {
          reject(err);
          this._emit('update', null, err.message);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.Model.findByIdAndDelete(id)
        .exec()
        .then((doc) => this._emit('delete', doc))
        .then((doc) => (doc ? resolve(doc) : reject()))
        .catch((err) => {
          reject(err);
          this._emit('delete', null, err.message);
        });
    });
  }

  _emit(event, payload = null, errorMsg = null) {
    const apiEvent = new Observable((subscriber) => {
      const error = {
        resource: this.resource,
        event,
        error: 'API Service Error',
        message: errorMsg
      };
      if (!payload) {
        subscriber.next(error);
        subscriber.complete();
      }

      const message = {
        resource: this.resource,
        event,
        payload
      };
      subscriber.next(message);
      subscriber.complete();
    });
    this.eventSubject.next(apiEvent);

    return payload;
  }

  _removeFuzzyIndex(docs) {
    return docs.map((doc) => {
      delete doc['email_fuzzy'];
      delete doc['fullName_fuzzy'];
      return doc;
    });
  }
}
