// CRUD Controller class
// Constructor takes Service instance
//----------------------------------------------------------------
//

import { notFound, serverError, success } from './utils/responses.js';

export class CrudController {
  constructor(Service) {
    this.Service = Service;
  }

  create(req, res, next) {
    const doc = req.body;
    if (!doc.client) doc.client = req.user.clientId;

    this.Service.create(doc)
      .then((doc) => res.json(doc))
      .catch(() => serverError(res));
  }

  read(req, res, next) {
    const id = req.params.id;
    this.Service.read(id)
      .then((doc) => res.json(doc[0]))
      .catch(() => notFound(res));
  }

  list(req, res, next) {
    const client = req.user.clientId;

    this.Service.list(client, this._parsePagination(req))
      .then((docs) => res.json(docs))
      .catch(() => notFound(res));
  }

  listForAllClients(req, res, next) {
    this.Service.listForAllClients(this._parsePagination(req))
      .then((docs) => res.json(docs))
      .catch(() => notFound(res));
  }

  count(req, res) {
    const client = req.user.clientId;

    this.Service.countByKey('client', client)
      .then((docs) => res.json(docs))
      .catch(() => notFound(res));
  }

  update(req, res, next) {
    const doc = req.body;
    this.Service.update(doc)
      .then((doc) => res.json(doc))
      .catch(() => serverError(res));
  }

  delete(req, res, next) {
    const id = req.params.id;
    this.Service.delete(id)
      .then(() => success(res))
      .catch(() => notFound(res));
  }

  _parsePagination(req) {
    return {
      limit: parseInt(req.query.limit) || 100,
      skip: parseInt(req.query.skip) || 0
    };
  }
}
