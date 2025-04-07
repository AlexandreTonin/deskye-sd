import { env } from './config/env/env';

export default {
  migrationsTable: 'pgmigrations',
  dir: './infra/db/migrations',
  direction: 'up',
  databaseUrl: env.DATABASE_URL,
  log: true,
};
