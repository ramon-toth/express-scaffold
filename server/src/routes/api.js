import UserRouter from './userRouter.js';
import StorageRouter from './storageRouter.js';

export default function api(app) {
  app.use('/api/user', UserRouter);
  app.use('/api/storage', StorageRouter);
}
