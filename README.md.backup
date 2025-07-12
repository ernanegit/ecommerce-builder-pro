
# E-commerce Builder Pro

Sistema automatizado para criacao de lojas virtuais em 5 minutos.

## Status do Projeto

- Status: Em Desenvolvimento
- Docker: Funcionando
- Database: Configurado
- Backend: Pronto
- Frontend: Em desenvolvimento

## Tecnologias

**Backend:**
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Redis

**Frontend:**
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

**DevOps:**
- Docker + Docker Compose
- GitHub Actions
- Kubernetes (futuro)

## Implementado

- [x] Estrutura do projeto
- [x] Docker Compose configurado
- [x] Backend base com TypeScript
- [x] Banco PostgreSQL funcionando
- [x] Redis configurado
- [x] Schema Prisma com migrations
- [x] Prisma Studio funcionando
- [x] CI/CD GitHub Actions
- [ ] API endpoints
- [ ] Frontend dashboard
- [ ] Sistema de automacao

## Como Executar

### Pre-requisitos
- Node.js 20+
- Docker Desktop
- Git

### Setup Rapido

```bash
# 1. Clonar repositorio
git clone https://github.com/ernanegit/ecommerce-builder-pro.git
cd ecommerce-builder-pro

# 2. Configurar backend
cd backend
npm install
cp .env.example .env

# 3. Subir banco de dados
cd ..
docker-compose up -d postgres redis

# 4. Executar migrations
cd backend
npx prisma generate
npx prisma migrate dev --name init

# 5. Executar backend
npm run dev
```

### Verificar se funcionou

```bash
# Backend rodando
curl http://localhost:8000/health

# Prisma Studio
npx prisma studio
```

## URLs de Desenvolvimento

| Servico | URL | Status |
|---------|-----|--------|
| Backend | http://localhost:8000 | Funcionando |
| Frontend | http://localhost:3000 | Em desenvolvimento |
| Prisma Studio | http://localhost:5555 | Funcionando |
| PostgreSQL | localhost:5433 | Funcionando |
| Redis | localhost:6380 | Funcionando |

## Estrutura do Projeto

```
ecommerce-builder-pro/
├── backend/              # API Node.js + TypeScript
│   ├── src/             # Codigo fonte
│   ├── prisma/          # Schema e migrations
│   └── tests/           # Testes
├── frontend/            # App Next.js + React
├── automation/          # Scripts de deploy
├── docs/               # Documentacao
├── scripts/            # Scripts de setup
└── .github/workflows/  # CI/CD
```

## Database Schema

### Modelos Principais
- **User** - Usuarios do sistema
- **Store** - Lojas virtuais criadas
- **Template** - Templates de design
- **Deployment** - Historico de deploys
- **Integration** - Integracoes (PagSeguro, Correios)
- **Analytics** - Metricas de vendas

### Relacionamentos
```
User (1) → (N) Store
Store (1) → (N) Deployment
Store (1) → (N) Integration
Store (1) → (N) Analytics
Template (1) → (N) Store
```

## Comandos Uteis

### Docker
```bash
# Subir todos os servicos
docker-compose up

# Subir em background
docker-compose up -d

# Ver logs
docker-compose logs postgres
docker-compose logs redis

# Parar tudo
docker-compose down
```

### Database
```bash
# Gerar Prisma Client
npx prisma generate

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Reset do banco
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio
```

### Desenvolvimento
```bash
# Backend em desenvolvimento
cd backend && npm run dev

# Frontend em desenvolvimento
cd frontend && npm run dev

# Executar testes
npm test

# Build para producao
npm run build
```

## Variaveis de Ambiente

### Backend (.env)
```env
DATABASE_URL="postgresql://ecommerce_user:ecommerce_pass@localhost:5433/ecommerce_builder"
REDIS_URL="redis://localhost:6380"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-super-secret-refresh-key"
PORT=8000
NODE_ENV=development
```

## Roadmap

### Fase 1 - MVP (3 meses)
- [x] Setup inicial do projeto
- [x] Backend estrutura base
- [x] Docker + banco de dados
- [ ] API endpoints principais
- [ ] Frontend dashboard
- [ ] Automacao basica de criacao
- [ ] 3 templates funcionais

### Fase 2 - Growth (6 meses)
- [ ] 10+ templates profissionais
- [ ] Integracoes brasileiras completas
- [ ] Analytics avancado em tempo real
- [ ] Sistema de notificacoes
- [ ] API para terceiros
- [ ] Testes automatizados

### Fase 3 - Scale (12 meses)
- [ ] IA para otimizacao automatica
- [ ] Mobile app nativo
- [ ] Marketplace de templates
- [ ] White-label para agencias
- [ ] Multi-tenancy avancado

## Testes

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test

# Coverage
npm run test:coverage
```

## Deploy

### Desenvolvimento
```bash
docker-compose up
```

### Producao (futuro)
```bash
# Kubernetes
kubectl apply -f k8s/

# Docker Swarm
docker stack deploy -c docker-compose.prod.yml ecommerce
```

## Contribuicao

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudancas (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Convencoes de Commit
```
feat: nova funcionalidade
fix: correcao de bug
docs: documentacao
style: formatacao
refactor: refatoracao
test: testes
chore: configuracao
```

## Arquitetura do Sistema

```
Frontend (Next.js) → Backend (Node.js) → PostgreSQL + Redis
                                      ↓
                              Automacao (Docker + Scripts)
                                      ↓
                              Deploy (DigitalOcean + Magento)
```

## Fluxo de Desenvolvimento

1. **Captacao** - Anuncio no Mercado Livre
2. **Configuracao** - Formulario de setup da loja
3. **Automacao** - Criacao automatica via scripts
4. **Deploy** - Loja online em 5 minutos
5. **Gestao** - Dashboard para administracao

## Suporte

- **Issues**: [GitHub Issues](https://github.com/ernanegit/ecommerce-builder-pro/issues)
- **Wiki**: [Documentacao](https://github.com/ernanegit/ecommerce-builder-pro/wiki)
- **Email**: suporte@ecommercebuilder.com.br

## Licenca

Este projeto esta sob a licenca MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

---

**Desenvolvido para revolucionar a criacao de e-commerce no Brasil**