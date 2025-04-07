import { app } from './app.js';
import { env } from './shared/config/env.js';
import { logger } from './infra/logger/logger.js';

app.listen(env.SERVER_PORT, () => {
  logger.info(`Server is running at ${env.SERVER_PORT} port`);
});
