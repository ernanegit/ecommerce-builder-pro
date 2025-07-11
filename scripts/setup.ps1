Write-Host " Setting up E-commerce Builder Pro..." -ForegroundColor Green

# Verificar se Docker está instalado
if (!(Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Host " Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Criar arquivo .env se não existir
if (!(Test-Path "backend\.env")) {
    Write-Host " Creating .env file..." -ForegroundColor Yellow
    Copy-Item "backend\.env.example" "backend\.env"
    Write-Host "  Please update backend\.env with your actual values" -ForegroundColor Yellow
}

# Subir containers
Write-Host "🐳 Starting Docker containers..." -ForegroundColor Blue
docker-compose up -d postgres redis

# Aguardar banco de dados
Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Blue
Start-Sleep -Seconds 10

# Instalar dependências do backend
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Blue
Set-Location backend
npm install

# Gerar Prisma Client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Blue
npx prisma generate

# Executar migrations
Write-Host "🗄️ Running database migrations..." -ForegroundColor Blue
npx prisma migrate dev --name init

Set-Location ..

# Instalar dependências do frontend
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Blue
Set-Location frontend
npm install

Set-Location ..

Write-Host " Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host " Next steps:" -ForegroundColor Cyan
Write-Host "1. Update backend\.env with your actual API keys"
Write-Host "2. Run 'docker-compose up' to start all services"
Write-Host "3. Access the app at http://localhost:3000"
Write-Host "4. Backend API will be available at http://localhost:8000"
