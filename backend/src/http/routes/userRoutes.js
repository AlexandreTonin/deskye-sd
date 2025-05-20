import express from 'express';

import { UserController } from '../controllers/UserController.js';

const router = express.Router();

router.get('/', UserController.findAll);
router.get('/:id', UserController.findOne);
router.post('/', UserController.create);
router.patch('/:id', UserController.update);
router.delete('/:id', UserController.delete);

export { router as userRoutes };
