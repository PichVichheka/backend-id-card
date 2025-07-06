import { Router } from 'express';
const router = Router();

/**
 * Routes
 */
import authRouter from './auth-route';
import userRouter from './user-route';
import cardRouter from './card-route';
import uploadRouter from './upload-route';
import dashboardRouter from './dashboard-route';
import myCardRouter from './my-card-route'; // Add this line

/**
 * Root route
 */
router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the API',
    status: 'ok',
    version: '1.0.0',
    docs: 'https//docs.digital-idcard.com',
    timestamp: new Date().toISOString(),
  });
});

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/card', cardRouter);
router.use('/upload', uploadRouter);
router.use('/dashboard', dashboardRouter);
router.use('/my-card', myCardRouter); // Add this line

export default router;
