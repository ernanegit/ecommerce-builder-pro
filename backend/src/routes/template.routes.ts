import { Router } from 'express';
import { prisma } from '../index';

const router = Router();

// Get all templates
router.get('/', async (req, res, next) => {
  try {
    const templates = await prisma.template.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        thumbnail: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ templates });
  } catch (error) {
    next(error);
  }
});

// Get template by ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    const template = await prisma.template.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        thumbnail: true,
        config: true,
        createdAt: true
      }
    });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json({ template });
  } catch (error) {
    next(error);
  }
});

export { router as templateRoutes };
