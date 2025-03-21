import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import apiRoutes from './routes';
import { testConnection } from './database/connection';
import logger from './utils/logger';

const app = express();

testConnection();

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req: Request, res: Response): void => {
  res.status(200).send({ message: 'success' });
});

app.use('/api', apiRoutes);

app.use((req: Request, res: Response): void => {
  res.status(404).send({
    error: '404 route not found',
  });
});

const server = http.createServer(app);

export default server;
