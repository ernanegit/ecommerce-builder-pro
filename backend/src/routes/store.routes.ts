import { Router, Response, NextFunction } from 'express';
import { z } from 'zod';
import { prisma } from '../index';
import { AuthenticatedRequest } from '../types';

const router = Router();

const createStoreSchema = z.object({
  name: z.string().min(2),
  subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/),
  templateId: z.string()
});

// Get user stores
router.get('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const stores = await prisma.store.findMany({
      where: { userId: req.userId },
      include: {
        template: {
          select: {
            name: true,
            category: true,
            thumbnail: true
          }
        },
        deployments: {
          select: {
            status: true,
            progress: true,
            finishedAt: true
          },
          orderBy: {
            startedAt: 'desc'
          },
          take: 1
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ stores });
  } catch (error) {
    next(error);
  }
});

// Create new store
router.post('/', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { name, subdomain, templateId } = createStoreSchema.parse(req.body);

    // Check if template exists
    const template = await prisma.template.findUnique({
      where: { id: templateId }
    });

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check subdomain availability
    const existingStore = await prisma.store.findUnique({
      where: { subdomain }
    });

    if (existingStore) {
      return res.status(400).json({ error: 'Subdomain already taken' });
    }

    const store = await prisma.store.create({
      data: {
        name,
        subdomain,
        domain: `${subdomain}.lojaexpress.com.br`,
        templateId,
        userId: req.userId!,
        status: 'CREATING'
      },
      include: {
        template: {
          select: {
            name: true,
            category: true,
            thumbnail: true
          }
        }
      }
    });

    // Create initial deployment
    await prisma.deployment.create({
      data: {
        storeId: store.id,
        status: 'PENDING',
        progress: 0
      }
    });

    res.status(201).json({
      message: 'Store creation started',
      store
    });
  } catch (error) {
    next(error);
  }
});

// Get store by ID
router.get('/:id', async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const store = await prisma.store.findFirst({
      where: {
        id,
        userId: req.userId
      },
      include: {
        template: {
          select: {
            name: true,
            category: true,
            thumbnail: true
          }
        },
        deployments: {
          orderBy: {
            startedAt: 'desc'
          },
          take: 5
        },
        analytics: {
          orderBy: {
            date: 'desc'
          },
          take: 30
        }
      }
    });

    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    res.json({ store });
  } catch (error) {
    next(error);
  }
});

export { router as storeRoutes };
