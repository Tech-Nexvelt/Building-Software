import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());

// CORS Configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import productRoutes from './routes/productRoutes';

// Basic Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'success',
    message: 'Nexvelt POS Backend is running perfectly! 🚀',
    timestamp: new Date().toISOString()
  });
});

// API Routes will be mounted here
app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// ...

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
