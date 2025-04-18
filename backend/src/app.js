import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from './infra/logger/logger.js';
import { userRoutes } from './http/routes/userRoutes.js';

const app = express();

// express configs
app.set('trust proxy', true);

// middlewares
app.use(express.json());
app.use(pinoHttp({ logger }));

// routes
app.use('/users', userRoutes);

export { app };
