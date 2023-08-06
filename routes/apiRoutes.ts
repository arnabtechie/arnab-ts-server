import express, { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import * as auth from '../controllers/auth/auth';
import jwt from 'jsonwebtoken';
import * as config from '../config.json';
import UserModel from '../models/userModel';

const router = express.Router();

const protect = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers && req.headers.authorization) {
        token = req.headers.authorization;
    }

    if (!token) {
        return res.status(401).send({
            error: 'You are not logged in! Please log in to get access',
        });
    }

    try {
        const decoded: any = jwt.verify(token, config.JWT_SECRET);

        if (!decoded) {
            return res.status(401).send({
                error: 'Unauthorized',
            });
        }

        const user = await UserModel.findOne(
            { _id: decoded.id },
            { _id: 1, fullName: 1, email: 1 }
        );

        if (!user) {
            return res.status(401).send({
                error: 'User belonging to this token no longer exists',
            });
        }

        res.locals.user = user;
        next();
    } catch (err: any) {
        return res.status(401).send({ error: err.toString() });
    }
};

// ------------------------------Unauthenticated---------------------------//
router.post(
    '/users/signup',
    [
        check('fullName', 'Please enter name.').not().isEmpty(),
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({ min: 4 }),
        check('confirmPassword', 'Please enter a valid confirmPassword').isLength({
            min: 4,
        }),
    ],
    auth.signup
);
router.post(
    '/users/login',
    [
        check('email', 'Please enter a valid email').isEmail(),
        check('password', 'Please enter a valid password').isLength({ min: 4 }),
    ],
    auth.login
);

// ----------------------------------------------------------------------//

router.use(protect);

// ------------------------------Authenticated---------------------------//
router.get('/users/logout', auth.logout);
router.get('/users/me', auth.user);
router.get('/users/user', auth.profile);

// ---------------------------------------------------------------------//

export default router;
