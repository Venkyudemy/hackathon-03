# Smart City Backend - Microservices Architecture

A comprehensive Spring Boot microservices backend for a smart city management system.

## 🏗️ Architecture

This backend consists of 5 microservices and an API Gateway:

1. **User Management Service** (Port 8081) - Authentication & Authorization
2. **City Entities Service** (Port 8082) - CRUD for Sensors, Cameras, Assets, Vehicles
3. **Event Processing Service** (Port 8083) - Event ingestion & normalization
4. **Aggregation Service** (Port 8084) - Dashboard APIs & KPIs
5. **Eureka Server** (Port 8761) - Service Discovery
6. **API Gateway** (Port 8080) - Central entry point

## 📁 Project Structure

```
smartcity-backend/
├── java1-user-management/     # User & Auth Service
├── java2-city-entities/        # Entities CRUD Service
├── java3-event-processing/     # Event Ingestion Service
├── java4-aggregation/          # Dashboard & KPI Service
├── api-gateway/                # API Gateway
├── eureka-server/              # Service Discovery
└── database/                   # Database scripts
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Maven 3.6+
- PostgreSQL 12+

### Setup

1. **Create Database:**
```sql
CREATE DATABASE smartcity_db;
```

2. **Update Database Credentials** in each service's `application.yml`:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/smartcity_db
    username: postgres
    password: your_password
```

3. **Start Services:**
```bash
# Start Eureka Server first
cd eureka-server && mvn spring-boot:run

# Then start other services (in separate terminals)
cd java1-user-management && mvn spring-boot:run
cd java2-city-entities && mvn spring-boot:run
cd java3-event-processing && mvn spring-boot:run
cd java4-aggregation && mvn spring-boot:run
cd api-gateway && mvn spring-boot:run
```

Or use the startup scripts:
```bash
# Windows
start-all.bat

# Linux/Mac
chmod +x start-all.sh
./start-all.sh
```

## 📡 API Endpoints

All endpoints are accessible through **API Gateway** at `http://localhost:8080/api`

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Validate token

### Users
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user
- `GET /api/users` - Get all users
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Entities
- `GET /api/sensors` - Get all sensors
- `POST /api/sensors` - Create sensor
- `GET /api/cameras` - Get all cameras
- `POST /api/cameras` - Create camera
- `GET /api/assets` - Get all public assets
- `POST /api/assets` - Create asset
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create vehicle

### Events
- `POST /api/events/ingest` - Ingest single event
- `POST /api/events/batch` - Ingest batch of events

### Dashboard
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/kpis` - Get KPIs
- `GET /api/dashboard/analytics` - Get analytics

## 🔧 Configuration

### Database
Each service connects to PostgreSQL. Update `application.yml` in each service directory.

### Service Discovery
All services register with Eureka Server at `http://localhost:8761`

### Optional Services
- **Kafka**: For event streaming (configure in `java3-event-processing`)
- **AWS Services**: For Step Functions, DynamoDB, Timestream (configure credentials)

## 📚 Documentation

- **START_HERE.md** - Step-by-step setup guide
- **QUICK_START.md** - Quick reference
- **SETUP_GUIDE.md** - Detailed setup instructions
- **DEPLOYMENT_STATUS.md** - What's complete and what needs work

## 🧪 Testing

```bash
# Test API Gateway
curl http://localhost:8080/actuator/health

# Test Dashboard
curl http://localhost:8080/api/dashboard/kpis

# Create User
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

## 🏗️ Technology Stack

- **Spring Boot 3.2.0**
- **Spring Cloud** (Eureka, Gateway)
- **PostgreSQL** for relational data
- **JWT** for authentication
- **Kafka** (optional) for event streaming
- **AWS SDK** (optional) for cloud services

## 📝 Notes

- Services use auto-generated database schemas (Hibernate DDL)
- Mock data in Aggregation Service can be replaced with real service calls
- Kafka and AWS integrations are optional
- All services include comprehensive validation and exception handling

## 🔗 Frontend Integration

The frontend should connect to:
```
API_BASE_URL = http://localhost:8080/api
```

See the separate frontend repository for the React application.

## 📄 License

Part of hackathon submission.

