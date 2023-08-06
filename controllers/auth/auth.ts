import { Request, Response } from 'express';
import UserModel, { IUser } from '../../models/userModel';
import jwt from 'jsonwebtoken';
import * as config from '../../config.json';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

export const signup = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password, fullName, confirmPassword }: { email: string, password: string, fullName: string, confirmPassword: string } = req.body;

    if (confirmPassword !== password) {
        return res.status(400).json({ error: 'Password and Confirm Password are different' });
    }

    try {
        const user = await UserModel.findOne({ email }, { _id: 1 });
        if (user) {
            return res.status(400).json({ error: 'User exists, try logging in' });
        }

        const result = await UserModel.create({ fullName, email, password });
        if (result) {
            const token = jwt.sign({ id: result._id }, config.JWT_SECRET, {
                expiresIn: 86400 * 30,
            });

            return res.status(201).json({
                message: 'User registered successfully',
                id: result._id,
                token,
            });
        }

        return res.status(400).json({ error: 'Something went wrong' });
    } catch (err: any) {
        return res.status(500).json({ error: err.toString() });
    }
};

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { email, password }: { email: string; password: string } = req.body;

    try {
        const user = await UserModel.findOne(
            { email },
            { email: 1, fullName: 1, password: 1 }
        );

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET);

        return res.status(200).json({
            message: 'User logged in successfully',
            id: user.id,
            full_name: user.fullName,
            email: user.email,
            token,
        });
    } catch (err: any) {
        return res.status(500).json({ error: err.toString() });
    }
};

export const logout = async (req: Request, res: Response) => {
    return res.status(200).json({ message: 'User logged out successfully' });
};

export const user = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne(
            { _id: res.locals.user._id },
            { email: 1, fullName: 1, createdAt: 1 }
        );
        if (!user) {
            return res.status(400).json({ error: 'Invalid user' });
        }
        return res.status(200).json({ ...user });
    } catch (err: any) {
        return res.status(500).json({ error: err.toString() });
    }
};

export const profile = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.findOne(
            { _id: res.locals.user._id },
            { email: 1, fullName: 1, createdAt: 1 }
        );
        if (!user) {
            return res.status(400).json({ error: 'Invalid user' });
        }
        return res.status(200).json({ ...user });
    } catch (err: any) {
        return res.status(500).json({ error: err.toString() });
    }
};
