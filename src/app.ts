import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
dotenv.config();

import userRoutes from './routes/product-routes';
import swaggerDocument from './docs/swagger.json';
import errorHandler from './middlewares/error-handle';
import rateLimiterMiddleware from './middlewares/rate-limit';
import { initDB } from './config/init-db';

const app = express();
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

initDB();

app.use(express.json());
app.use('/product', userRoutes);
app.use(errorHandler);
app.use(rateLimiterMiddleware);

export default app;
