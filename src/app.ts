import express, { Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import apiRoutes from './routes';

const app = express();

app.get('/', (_, res: Response) => res.status(200).send({ message: 'success' }));

const server = http.createServer(app);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', apiRoutes);

app.use((_, res) =>
  res.status(404).send({
    error: '404 route not found',
  })
);

export default server;
