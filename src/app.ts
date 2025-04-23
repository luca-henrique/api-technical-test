import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import userRoutes from './routes/user-routes';
import errorHandler from './middlewares/error-handle';
import rateLimiterMiddleware from './middlewares/rate-limit';
import { initDB } from './config/init-db';

const app = express();

initDB();

app.use(express.json());
app.use('/users', userRoutes);
app.use(errorHandler);
app.use(rateLimiterMiddleware);

export default app;
