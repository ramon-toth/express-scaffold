import { Router } from 'express';
// import { StorageController } from '../controllers/StorageController.js';
import multer from 'multer';
const upload = multer();

// const storageController = new StorageController();
const router = Router();

router.get('/', (req, res) => {
  res.json('storage');
});

// router.post('/', upload.array('upload'), storageController.create);

export default router;
