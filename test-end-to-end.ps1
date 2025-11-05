# End-to-End Application Test Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "End-to-End Application Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$testResults = @()
$totalTests = 0
$passedTests = 0
$failedTests = 0

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$URL,
        [string]$Method = "GET",
        [string]$ExpectedStatus = "200",
        [hashtable]$Headers = @{},
        [string]$Body = $null
    )
    
    $totalTests++
    try {
        $params = @{
            Uri = $URL
            Method = $Method
            TimeoutSec = 5
            UseBasicParsing = $true
            ErrorAction = "Stop"
        }
        
        if ($Headers.Count -gt 0) {
            $params.Headers = $Headers
        }
        
        if ($Body) {
            $params.Body = $Body
            $params.ContentType = "application/json"
        }
        
        $response = Invoke-WebRequest @params
        $statusMatch = $response.StatusCode -eq [int]$ExpectedStatus
        
        if ($statusMatch) {
            Write-Host "✅ PASS: $Name" -ForegroundColor Green
            Write-Host "   URL: $URL" -ForegroundColor Gray
            Write-Host "   Status: $($response.StatusCode)" -ForegroundColor Gray
            $passedTests++
            $script:testResults += @{
                Test = $Name
                Status = "PASS"
                URL = $URL
                StatusCode = $response.StatusCode
                Response = $response.Content.Substring(0, [Math]::Min(100, $response.Content.Length))
            }
            return $true
        } else {
            Write-Host "❌ FAIL: $Name" -ForegroundColor Red
            Write-Host "   Expected: $ExpectedStatus, Got: $($response.StatusCode)" -ForegroundColor Yellow
            $failedTests++
            $script:testResults += @{
                Test = $Name
                Status = "FAIL"
                URL = $URL
                StatusCode = $response.StatusCode
                Error = "Expected status $ExpectedStatus, got $($response.StatusCode)"
            }
            return $false
        }
    } catch {
        Write-Host "❌ FAIL: $Name" -ForegroundColor Red
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Yellow
        $failedTests++
        $script:testResults += @{
            Test = $Name
            Status = "FAIL"
            URL = $URL
            Error = $_.Exception.Message
        }
        return $false
    }
}

Write-Host "1. Testing Service Health Checks" -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow
Test-Endpoint -Name "Eureka Server" -URL "http://localhost:8761"
Test-Endpoint -Name "User Management Health" -URL "http://localhost:8081/actuator/health"
Test-Endpoint -Name "City Entities Health" -URL "http://localhost:8082/actuator/health"
Test-Endpoint -Name "Event Processing Health" -URL "http://localhost:8083/actuator/health"
Test-Endpoint -Name "Aggregation Service Health" -URL "http://localhost:8084/actuator/health"
Test-Endpoint -Name "API Gateway Health" -URL "http://localhost:8080/actuator/health"

Write-Host ""
Write-Host "2. Testing API Gateway Routes" -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow
Test-Endpoint -Name "Dashboard KPIs (via Gateway)" -URL "http://localhost:8080/api/dashboard/kpis"
Test-Endpoint -Name "Sensors (via Gateway)" -URL "http://localhost:8080/api/sensors"
Test-Endpoint -Name "Cameras (via Gateway)" -URL "http://localhost:8080/api/cameras"
Test-Endpoint -Name "Dashboard Analytics (via Gateway)" -URL "http://localhost:8080/api/dashboard/analytics"

Write-Host ""
Write-Host "3. Testing Direct Service Endpoints" -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow
Test-Endpoint -Name "Sensors (Direct)" -URL "http://localhost:8082/api/sensors"
Test-Endpoint -Name "Cameras (Direct)" -URL "http://localhost:8082/api/cameras"
Test-Endpoint -Name "Vehicles (Direct)" -URL "http://localhost:8082/api/vehicles"
Test-Endpoint -Name "Assets (Direct)" -URL "http://localhost:8082/api/assets"
Test-Endpoint -Name "Dashboard KPIs (Direct)" -URL "http://localhost:8084/api/dashboard/kpis"

Write-Host ""
Write-Host "4. Testing User Management Endpoints" -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow
Test-Endpoint -Name "Get All Users" -URL "http://localhost:8081/api/users"
$loginBody = '{"email":"test@example.com","password":"test123456"}'
Test-Endpoint -Name "Login Endpoint (POST)" -URL "http://localhost:8081/api/auth/login" -Method "POST" -Body $loginBody -ExpectedStatus "200"

Write-Host ""
Write-Host "5. Testing Event Processing" -ForegroundColor Yellow
Write-Host "-----------------------------------" -ForegroundColor Yellow
$eventBody = '{"eventType":"sensor","sourceId":"sensor-001","timestamp":"2024-01-01T00:00:00Z","data":{"temperature":25.5}}'
Test-Endpoint -Name "Event Ingestion" -URL "http://localhost:8083/api/events/ingest" -Method "POST" -Body $eventBody -ExpectedStatus "200"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total Tests: $totalTests" -ForegroundColor White
Write-Host "Passed: $passedTests" -ForegroundColor Green
Write-Host "Failed: $failedTests" -ForegroundColor $(if ($failedTests -eq 0) { "Green" } else { "Red" })
if ($totalTests -gt 0) {
    Write-Host "Success Rate: $([math]::Round(($passedTests/$totalTests)*100, 2))%" -ForegroundColor $(if ($failedTests -eq 0) { "Green" } else { "Yellow" })
} else {
    Write-Host "Success Rate: N/A (No tests completed)" -ForegroundColor Yellow
}
Write-Host ""

if ($totalTests -gt 0 -and $failedTests -eq 0) {
    Write-Host "✅ ALL TESTS PASSED - Application is working end-to-end!" -ForegroundColor Green
} elseif ($totalTests -eq 0) {
    Write-Host "⚠️  No services running - Cannot perform tests" -ForegroundColor Yellow
    Write-Host "   Please start services first using: .\start-all.bat" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Some tests failed. Check service status and configuration." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Detailed Results:" -ForegroundColor Cyan
$testResults | ForEach-Object {
    $color = if ($_.Status -eq "PASS") { "Green" } else { "Red" }
    Write-Host "$($_.Status): $($_.Test)" -ForegroundColor $color
    if ($_.StatusCode) {
        Write-Host "   Status Code: $($_.StatusCode)" -ForegroundColor Gray
    }
    if ($_.Error) {
        Write-Host "   Error: $($_.Error)" -ForegroundColor Yellow
    }
}

