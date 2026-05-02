import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import connectDB from './config/db';

const app: Application = express();

// DB connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Trade Square API is running...');
});

export default app;