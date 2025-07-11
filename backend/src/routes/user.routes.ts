import { Router, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { AuthenticatedRequest } from '../types';

const router = Router();

// Get current user
router.get('/me', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        createdAt: true,
        stores: {
          select: {
            id: true,
            name: true,
            domain: true,
            status: true,
            createdAt: true
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

// Update user
router.put('/me', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;

    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { name },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        updatedAt: true
      }
    });

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    next(error);
  }
});

export { router as userRoutes };
