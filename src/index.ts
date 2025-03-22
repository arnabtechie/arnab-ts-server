import app from './app';
import logger from './utils/logger';

process.on('uncaughtException', (err) => {
  logger.info('UNCAUGHT EXCEPTION!');
  logger.info(err);
});

const PORT = 3000;

const server = app.listen(PORT, () => {
  logger.info(`server running on port ${PORT}...`);
});

process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
  });
});
