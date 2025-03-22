import express, { Request, Response, NextFunction } from 'express';
import * as userController from '../controllers/userController';
import protect from '../middleware/protect';

const router = express.Router();

const userRouter = express.Router();

userRouter.post(
  '/signup',
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const { statusCode, data } = await userController.signup(req.body);
      return res.status(statusCode).json(data);
    } catch (err) {
      next(err);
    }
  },
);

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { statusCode, data } = await userController.login(req.body);
    return res.status(statusCode).json(data);
  } catch (err) {
    next(err);
  }
});

userRouter.get(
  '/profile',
  protect,
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = (req as any).user?.userid;
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const { statusCode, data } = await userController.login(userId);
      res.status(statusCode).json(data);
    } catch (err) {
      next(err);
    }
  },
);

router.use('/users', userRouter);

export default router;
