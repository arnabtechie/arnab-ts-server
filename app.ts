import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import mongoose from 'mongoose';
import * as config from './config.json';
import morgan from 'morgan';

const app = express();

app.get("/", (req, res) => res.status(200).send({ message: "success" }));

const server = http.createServer(app);

mongoose.connect(config.DB_CONNECTION_STRING);

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", () => {
  console.log("Database connected");
});

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use((_, res) =>
  res.status(404).send({
    error: "404 route not found",
  })
);

export default server;