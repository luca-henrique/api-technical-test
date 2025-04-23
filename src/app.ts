import express from 'express';
import userRoutes from './routes/user-routes';
import errorHandler from './middlewares/error-handle';
import rateLimiterMiddleware from './middlewares/rate-limit';

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use(errorHandler);
app.use(rateLimiterMiddleware);

export default app;
