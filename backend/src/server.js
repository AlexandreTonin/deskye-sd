import { app } from './app.js';
import { logger } from './infra/logger/logger.js';
import { env } from './shared/config/env.js';

app.listen(env.SERVER_PORT, () => {
  logger.info(`Server is running at ${env.SERVER_PORT} port`);
});
