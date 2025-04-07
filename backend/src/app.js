import express from 'express';
import pinoHttp from 'pino-http';
import { logger } from './config/logger/logger.js';

const app = express();

app.set('trust proxy', true);

app.use(pinoHttp({ logger }));

export { app };
