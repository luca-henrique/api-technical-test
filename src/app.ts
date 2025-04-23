import dotenv from 'dotenv';
import express from 'express';
dotenv.config();

import userRoutes from './routes/product-routes';
import errorHandler from './middlewares/error-handle';
import rateLimiterMiddleware from './middlewares/rate-limit';
import { initDB } from './config/init-db';

const app = express();

initDB();

app.use(express.json());
app.use('/product', userRoutes);
app.use(errorHandler);
app.use(rateLimiterMiddleware);

export default app;
