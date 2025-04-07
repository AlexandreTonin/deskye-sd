import { env } from './shared/config/env.js';

export default {
  migrationsTable: 'pgmigrations',
  dir: './infra/db/migrations',
  direction: 'up',
  databaseUrl: env.DATABASE_URL,
  log: true,
};
