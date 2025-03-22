import express, { Request, Response, NextFunction } from 'express';
import * as userController from '../controllers/userController';
// import protect from '../middleware/protect';

const router = express.Router();

router.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, data } = await userController.signup(req.body);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, data } = await userController.login(req.body);
    res.status(status).json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
