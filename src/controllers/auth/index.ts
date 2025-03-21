import { Request, Response } from 'express';

export const signup = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'User logged out successfully' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'User logged out successfully' });
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'User logged out successfully' });
};

export const user = async (req: Request, res: Response): Promise<void> => {
  const username = 'arnab';
  console.log(username);
  res.status(200).json({ message: 'User details' });
};

export const profile = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: 'User logged out successfully' });
};
