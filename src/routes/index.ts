import express, { Request, Response, NextFunction } from 'express';
import { signup, login, logout, user, profile } from '../controllers/auth';

const router = express.Router();
router.post('/users/signup', signup);
router.post('/users/login', login);
router.get('/users/logout', logout);
router.get('/users/me', user);
router.get('/users/user', profile);

export default router;
