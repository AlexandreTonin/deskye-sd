import express from 'express';
import { TeamController } from '../controllers/TeamController.js';

const router = express.Router();

router.get('/', TeamController.findAll);
router.get('/:id', TeamController.findOne);
router.post('/', TeamController.create);
router.patch('/:id', TeamController.update);
router.delete('/:id', TeamController.delete);

export { router as teamRoutes };
