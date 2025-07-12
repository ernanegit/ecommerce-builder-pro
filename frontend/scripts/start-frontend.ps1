Write-Host " Iniciando o frontend do E-commerce Builder Pro..." -ForegroundColor Green

# Verificar se estamos na pasta correta
if (!(Test-Path "frontend/package.json")) {
    Write-Host " Execute este script na raiz do projeto (onde está o docker-compose.yml)" -ForegroundColor Red
    exit 1
}

# Entrar na pasta frontend
Set-Location frontend

# Instalar dependências se necessário
if (!(Test-Path "node_modules")) {
    Write-Host " Instalando dependências..." -ForegroundColor Blue
    npm install
}

# Verificar se o backend está rodando
Write-Host " Verificando backend..." -ForegroundColor Blue
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/health" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host " Backend está funcionando!" -ForegroundColor Green
    }
} catch {
    Write-Host "  Backend não está rodando. Certifique-se de executar:" -ForegroundColor Yellow
    Write-Host "   docker-compose up -d" -ForegroundColor Yellow
    Write-Host "   cd backend && npm run dev" -ForegroundColor Yellow
}

# Iniciar o frontend
Write-Host " Iniciando servidor de desenvolvimento..." -ForegroundColor Blue
npm run dev
