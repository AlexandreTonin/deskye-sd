import { app } from './app.js';
import { env } from './config/env/env.js';

app.listen(env.SERVER_PORT, () => {
  console.log(`Server is running at ${env.SERVER_PORT} port`);
});
