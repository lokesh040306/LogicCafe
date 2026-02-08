import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import routes from './routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

// Initialize Express app
const app = express();

/* ---------- GLOBAL MIDDLEWARES ---------- */
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

/* ---------- API ROUTES ---------- */
app.use('/api', routes);

/* ---------- HEALTH CHECK ---------- */
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'OK' });
});

/* ---------- ERROR HANDLER ---------- */
app.use(errorHandler);

export default app;
