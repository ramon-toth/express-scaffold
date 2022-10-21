import { UserService } from '../services/UserService.js';
import { notFound, serverError, success } from '../framework/utils/responses.js';

// const userService = new UserService();

export class UserController {
  create(req, res, next) {
    const user = req.body;
    // Add logic here to create password and stuff

    UserService.upsert(user)
      .then((r) => res.json(r))
      .catch(() => serverError(res));
  }

  get(req, res, next) {
    const id = req.params.id;
    UserService.get(id)
      .then((u) => res.json(u))
      .catch(() => notFound(res));
  }

  update(req, res, next) {
    const user = req.body;
    UserService.upsert(user)
      .then((r) => res.json(r))
      .catch(() => serverError(res));
  }

  delete(req, res, next) {
    const id = req.params.id;
    UserService.delete(id)
      .then(() => success(res))
      .catch(() => notFound(res));
  }
}
