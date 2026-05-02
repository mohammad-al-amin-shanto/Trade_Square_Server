import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';


const app: Application = express();

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Trade Square API is running...');
});

export default app;