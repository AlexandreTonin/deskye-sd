import express from 'express';
import pinoHttp from 'pino-http';

import { authRoutes } from './http/routes/authRoutes.js';
import { teamRoutes } from './http/routes/teamRoutes.js';
import { userRoutes } from './http/routes/userRoutes.js';
import { logger } from './infra/logger/logger.js';

const app = express();

// express configs
app.set('trust proxy', true);

// middlewares
app.use(express.json());
app.use(pinoHttp({ logger }));

// routes
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);
app.use('/', authRoutes);

export { app };
