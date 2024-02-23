import express, { Request, Response, NextFunction } from 'express';
import { signup, login, logout, user, profile } from '../controllers/auth/auth';

const router = express.Router();

// ------------------------------Unauthenticated---------------------------//
router.post('/users/signup', signup);
router.post('/users/login', login);

// ----------------------------------------------------------------------//

// ------------------------------Authenticated---------------------------//
router.get('/users/logout', logout);
router.get('/users/me', user);
router.get('/users/user', profile);

// ---------------------------------------------------------------------//

export default router;
