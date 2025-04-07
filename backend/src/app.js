import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from './config/logger/logger.js';
import { userRoutes } from './routes/userRoutes.js';

const app = express();

// express configs
app.set('trust proxy', true);

// middlewares
app.use(express.json());
app.use(pinoHttp({ logger }));

// routes
app.use('/users', userRoutes);

export { app };
