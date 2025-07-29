import env from '@config/env.js';
import app from './app.js';
import http from 'http';
import { connectDb } from '@config/db.js';

const server = http.createServer(app);
const PORT = env.PORT;

(async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log('Server is running on port', PORT);
    });
  } catch (error) {
    console.log('Server listening error ❌', error);
    process.exit(1);
  }
})();
