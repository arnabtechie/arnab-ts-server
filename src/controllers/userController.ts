import { pool } from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.dev';
import { signupSchema, loginSchema } from '../utils/validators';
import { SignupInput, LoginInput } from '../types/userTypes';
import { CustomError } from '../utils/errors';
import { v7 as uuidv7 } from 'uuid';

export const signup = async (reqBody: SignupInput) => {
  const validatedData = signupSchema.parse(reqBody);
  const { fullName, email, password } = validatedData;

  const existingUser = await pool.query('SELECT userid FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    throw new CustomError('User already exists', 400);
  }

  const userId = uuidv7();
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
    'INSERT INTO users (userid, fullname, email, password) VALUES ($1, $2, $3, $4) RETURNING userid',
    [userId, fullName, email, hashedPassword],
  );

  const token = jwt.sign({ uuid: newUser.rows[0].uuid }, JWT_SECRET, { expiresIn: '1h' });

  return {
    statusCode: 201,
    data: {
      message: 'User registered successfully',
      token,
    },
  };
};

export const login = async (reqBody: LoginInput) => {
  const validatedData = loginSchema.parse(reqBody);
  const { email, password } = validatedData;

  const user = await pool.query(
    'SELECT userid, full_name, email, password FROM users WHERE email = $1',
    [email],
  );
  if (user.rows.length === 0) {
    throw new CustomError('Invalid credentials', 400);
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    throw new CustomError('Invalid credentials', 400);
  }

  const token = jwt.sign({ userid: user.rows[0].userid }, JWT_SECRET, { expiresIn: '1h' });

  return {
    statusCode: 200,
    data: {
      message: 'User logged in successfully',
      token,
    },
  };
};

export const getUserProfile = async (userid: string) => {
  const user = await pool.query('SELECT userid, full_name, email FROM users WHERE userid = $1', [
    userid,
  ]);

  if (user.rows.length === 0) {
    throw new CustomError('User not found', 404);
  }

  return {
    statusCode: 200,
    data: user.rows[0],
  };
};
