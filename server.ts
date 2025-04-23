import app from './src/app';
import { connectDB } from './src/config/database';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

console.log(process.env.PG_PORT);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
