import { Router } from 'express';
import { UserController } from '../controllers/UserController.js';

const userController = new UserController();

const router = Router();

router.get('/', (req, res) => {
  res.json('user');
});

router.get('/:id', userController.get);

router.post('/', userController.create);

router.put('/', userController.update);

router.delete('/:id', userController.delete);

export default router;
