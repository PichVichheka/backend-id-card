import { Router } from 'express';
import {
  getMyCardsController,
  deleteMyUserController,
  getMyUserDetailController,
  toggleMyUserBlockController,
} from '@/controller/my-card-controller';
import { authMiddleware } from '@/middleware/auth-middleware';

const router = Router();

router.get('/list', authMiddleware, getMyCardsController); // No /my-card prefix here, handled by index.ts
router.delete('/user/:id', authMiddleware, deleteMyUserController);
router.get('/user/:id', authMiddleware, getMyUserDetailController);
router.put('/user/:id/block', authMiddleware, toggleMyUserBlockController);

export default router;
