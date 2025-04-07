import { app } from './app.js';
import { env } from './config/env/env.js';
import { logger } from './config/logger/logger.js';

app.listen(env.SERVER_PORT, () => {
  logger.info(`Server is running at ${env.SERVER_PORT} port`);
});
