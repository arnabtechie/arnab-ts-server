import { pool } from '../database/connection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.dev';
import { signupSchema, loginSchema } from '../utils/validators';
import { SignupInput, LoginInput } from '../types/userTypes';
import { CustomError } from '../utils/errors';

export const signup = async (reqBody: SignupInput) => {
  const validatedData = signupSchema.parse(reqBody);
  const { fullName, email, password } = validatedData;

  const existingUser = await pool.query('SELECT uuid FROM users WHERE email = $1', [email]);
  if (existingUser.rows.length > 0) {
    throw new CustomError('User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await pool.query(
    'INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING uuid',
    [fullName, email, hashedPassword],
  );

  const token = jwt.sign({ uuid: newUser.rows[0].uuid }, JWT_SECRET, { expiresIn: '1h' });

  return {
    status: 201,
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
    'SELECT uuid, full_name, email, password FROM users WHERE email = $1',
    [email],
  );
  if (user.rows.length === 0) {
    throw new CustomError('Invalid credentials', 400);
  }

  const isMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!isMatch) {
    throw new CustomError('Invalid credentials', 400);
  }

  const token = jwt.sign({ uuid: user.rows[0].uuid }, JWT_SECRET, { expiresIn: '1h' });

  return {
    status: 200,
    data: {
      message: 'User logged in successfully',
      token,
    },
  };
};
