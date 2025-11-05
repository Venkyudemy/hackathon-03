# Service Status Report

**Date:** $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

## ✅ Frontend Status

**Frontend Dependencies:** ✅ **INSTALLED**
- All npm packages are installed
- Ready to run with `npm run dev`

## ❌ Backend Services Status

### Current Status: **0/6 services running**

| Service | Port | Status | Notes |
|---------|------|--------|-------|
| Eureka Server | 8761 | ❌ Not Running | Required first |
| User Management | 8081 | ❌ Not Running | Needs database |
| City Entities | 8082 | ❌ Not Running | Needs database |
| Event Processing | 8083 | ❌ Not Running | Needs database |
| Aggregation Service | 8084 | ❌ Not Running | Needs database |
| API Gateway | 8080 | ❌ Not Running | Needs Eureka |

## 🚀 How to Start Services

### Step 1: Start PostgreSQL Database
```bash
# Make sure PostgreSQL service is running
# Windows: Open Services (services.msc) and start PostgreSQL
```

### Step 2: Create Database (if not exists)
```sql
psql -U postgres
CREATE DATABASE smartcity_db;
\q
```

### Step 3: Start Eureka Server (REQUIRED FIRST)
```bash
cd eureka-server
mvn spring-boot:run
```
Wait for: `Started EurekaServerApplication`
Access: http://localhost:8761

### Step 4: Start All Services

**Option A: Use Start Script (Recommended)**
```bash
# Windows
start-all.bat

# Linux/Mac
chmod +x start-all.sh
./start-all.sh
```

**Option B: Manual Start (Separate Terminals)**
```bash
# Terminal 2
cd java1-user-management
mvn spring-boot:run

# Terminal 3
cd java2-city-entities
mvn spring-boot:run

# Terminal 4
cd java3-event-processing
mvn spring-boot:run

# Terminal 5
cd java4-aggregation
mvn spring-boot:run

# Terminal 6
cd api-gateway
mvn spring-boot:run
```

### Step 5: Verify Services
```powershell
# Run the status checker
.\check-services-status.ps1
```

## 📋 Prerequisites Checklist

Before starting services, ensure:
- [ ] Java 17+ installed (`java -version`)
- [ ] Maven 3.6+ installed (`mvn -version`)
- [ ] PostgreSQL running and accessible
- [ ] Database `smartcity_db` created
- [ ] Database credentials configured in `application.yml` files

## 🔍 Testing APIs

Once services are running, test endpoints:

```bash
# Health Check - Eureka
curl http://localhost:8761

# Dashboard KPIs (via API Gateway)
curl http://localhost:8080/api/dashboard/kpis

# Sensors (via API Gateway)
curl http://localhost:8080/api/sensors

# User Management Health
curl http://localhost:8081/actuator/health
```

## 📝 Notes

- **Eureka must be started FIRST** before other services
- Services need **PostgreSQL database** to start
- API Gateway depends on Eureka for service discovery
- All services should register with Eureka after startup

## 🛠️ Troubleshooting

### Services won't start
1. Check Java version: `java -version` (must be 17+)
2. Check Maven: `mvn -version`
3. Check PostgreSQL is running
4. Verify database exists and credentials are correct

### Services not registering with Eureka
1. Start Eureka Server first
2. Wait 30 seconds for services to register
3. Check service names match in `application.yml`

### Port already in use
```powershell
# Find process using port
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F
```

