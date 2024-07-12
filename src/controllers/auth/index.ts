import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'User logged out successfully' });
};

export const login = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'User logged out successfully' });
};

export const logout = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'User logged out successfully' });
};

export const user = async (req: Request, res: Response) => {
  const username = 'arnab';
  console.log(username);
  return res.status(200).json({ message: 'User details' });
};

export const profile = async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'User logged out successfully' });
};
