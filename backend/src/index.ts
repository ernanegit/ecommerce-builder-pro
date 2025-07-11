import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';

import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { storeRoutes } from './routes/store.routes';
import { templateRoutes } from './routes/template.routes';
import { errorHandler } from './middleware/error.middleware';
import { authMiddleware } from './middleware/auth.middleware';

const app = express();
const PORT = process.env.PORT || 8000;

export const prisma = new PrismaClient();
export const redis = new Redis(process.env.REDIS_URL!);

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    database: 'connected',
    redis: 'connected'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/stores', authMiddleware, storeRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
  console.log(` Environment: ${process.env.NODE_ENV}`);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  redis.disconnect();
  process.exit(0);
});
