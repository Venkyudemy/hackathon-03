# Smart City Services Status Checker
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Smart City Services Status Check" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$services = @(
    @{Name="Eureka Server"; Port=8761; URL="http://localhost:8761"},
    @{Name="User Management Service"; Port=8081; URL="http://localhost:8081/actuator/health"},
    @{Name="City Entities Service"; Port=8082; URL="http://localhost:8082/api/sensors"},
    @{Name="Event Processing Service"; Port=8083; URL="http://localhost:8083/actuator/health"},
    @{Name="Aggregation Service"; Port=8084; URL="http://localhost:8084/api/dashboard/kpis"},
    @{Name="API Gateway"; Port=8080; URL="http://localhost:8080/api/dashboard/kpis"}
)

$runningCount = 0
$totalCount = $services.Count

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri $service.URL -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
        Write-Host "✅ $($service.Name) (Port $($service.Port)): RUNNING" -ForegroundColor Green
        Write-Host "   Status Code: $($response.StatusCode)" -ForegroundColor Gray
        $runningCount++
    } catch {
        Write-Host "❌ $($service.Name) (Port $($service.Port)): NOT RUNNING" -ForegroundColor Red
        if ($_.Exception.Message -like "*timeout*") {
            Write-Host "   Error: Connection timeout" -ForegroundColor Yellow
        } elseif ($_.Exception.Message -like "*refused*") {
            Write-Host "   Error: Connection refused" -ForegroundColor Yellow
        } else {
            Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Summary: $runningCount/$totalCount services running" -ForegroundColor $(if ($runningCount -eq $totalCount) { "Green" } else { "Yellow" })
Write-Host "========================================" -ForegroundColor Cyan

if ($runningCount -eq 0) {
    Write-Host ""
    Write-Host "⚠️  No services are running. To start services:" -ForegroundColor Yellow
    Write-Host "   1. Make sure PostgreSQL is running" -ForegroundColor Yellow
    Write-Host "   2. Start Eureka Server first:" -ForegroundColor Yellow
    Write-Host "      cd eureka-server && mvn spring-boot:run" -ForegroundColor White
    Write-Host "   3. Then start other services (use start-all.bat)" -ForegroundColor Yellow
}

