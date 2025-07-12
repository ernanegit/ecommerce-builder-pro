import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Template 1
  const template1 = await prisma.template.upsert({
    where: { id: 'template-moderno' },
    update: {},
    create: {
      id: 'template-moderno',
      name: 'Loja Moderna',
      category: 'Geral',
      description: 'Template moderno e responsivo',
      thumbnail: 'https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=Moderna',
      files: { css: 'modern.css' },
      config: { color: '#4F46E5' },
      isActive: true
    }
  });

  // Template 2
  const template2 = await prisma.template.upsert({
    where: { id: 'template-elegante' },
    update: {},
    create: {
      id: 'template-elegante',
      name: 'Elegante',
      category: 'Moda',
      description: 'Template elegante para moda',
      thumbnail: 'https://via.placeholder.com/400x300/EC4899/FFFFFF?text=Elegante',
      files: { css: 'elegant.css' },
      config: { color: '#EC4899' },
      isActive: true
    }
  });

  // Template 3
  const template3 = await prisma.template.upsert({
    where: { id: 'template-tech' },
    update: {},
    create: {
      id: 'template-tech',
      name: 'Tech Store',
      category: 'Tecnologia',
      description: 'Template para eletrônicos',
      thumbnail: 'https://via.placeholder.com/400x300/10B981/FFFFFF?text=Tech',
      files: { css: 'tech.css' },
      config: { color: '#10B981' },
      isActive: true
    }
  });

  console.log('Created 3 templates');

  // Usuário demo - gerar hash da senha corretamente
  const hashedPassword = await bcrypt.hash('demo123', 12);
  
  const user = await prisma.user.upsert({
    where: { email: 'demo@test.com' },
    update: {},
    create: {
      name: 'Demo User',
      email: 'demo@test.com',
      password: hashedPassword,
      plan: 'PRO'
    }
  });

  console.log('Created demo user');
  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });