import { env } from './config/env/env';

export default {
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  databaseUrl: env.DATABASE_URL,
  log: true,
};
