import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// Get current user
router.get('/me', async (req: any, res: any, next: any) => {
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
router.put('/me', async (req: any, res: any, next: any) => {
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
