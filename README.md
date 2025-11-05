# Smart City Backend - Microservices Architecture

A comprehensive Spring Boot microservices backend for a smart city management system with full validation and exception handling.

> **Note**: This is the **BACKEND** repository. The frontend React application is in the [`frontend/`](./frontend/) folder (or can be in a separate repository).

## Architecture Overview

The system consists of 4 core microservices and an API Gateway:

1. **JAVA1 - User Management Service** (Port 8081)
   - User authentication and authorization
   - Role and permission management
   - JWT token generation and validation
   - RESTful APIs for user/role CRUD operations

2. **JAVA2 - City Entities Service** (Port 8082)
   - CRUD operations for Sensors, Cameras, Public Assets, and Vehicles
   - PostgreSQL database with relational schema
   - Entity management with status tracking

3. **JAVA3 - Event Processing Service** (Port 8083)
   - Event ingestion endpoints
   - Event normalization and validation
   - Kafka/Kinesis publishing
   - Step Functions workflow triggers

4. **JAVA4 - Aggregation Service** (Port 8084)
   - Dashboard APIs
   - KPI computation
   - Time-windowed metrics
   - Analytics data aggregation

5. **API Gateway** (Port 8080)
   - Central entry point for all services
   - Service discovery with Eureka
   - CORS configuration
   - Request routing

## 🔗 Frontend Application

The frontend React application is in the [`frontend/`](./frontend/) folder. See `frontend/README.md` for frontend setup instructions.

To run the frontend:
```bash
cd frontend
npm install
npm run dev
```

The frontend will connect to the backend API Gateway at `http://localhost:8080/api`.

## Technology Stack

- **Spring Boot 3.2.0**
- **Spring Cloud (Eureka, Gateway, OpenFeign)**
- **PostgreSQL** for relational data
- **Kafka** for event streaming
- **AWS SDK** for Kinesis, Step Functions, DynamoDB, Timestream
- **JWT** for authentication
- **Lombok** for boilerplate reduction
- **Bean Validation** for input validation

## Features

### Validation
- All DTOs use Bean Validation annotations (`@NotNull`, `@NotBlank`, `@Email`, etc.)
- Global exception handler for validation errors
- Custom validation messages

### Exception Handling
- Global exception handlers in each service
- Custom exception types (ResourceNotFoundException, BadRequestException)
- Structured error responses with timestamps and details
- Validation error mapping

### Security
- JWT-based authentication
- Role-based access control (RBAC)
- Permission-based authorization
- Password encryption with BCrypt

## Getting Started

### Prerequisites
- Java 17+
- Maven 3.6+
- PostgreSQL 12+
- Kafka (optional, for event processing)
- Eureka Server (for service discovery)

### Database Setup

Create a PostgreSQL database:
```sql
CREATE DATABASE smartcity_db;
```

### Running the Services

1. **Start Eureka Server** (if using service discovery):
```bash
# Configure and run Eureka server on port 8761
```

2. **Start User Management Service**:
```bash
cd java1-user-management
mvn spring-boot:run
```

3. **Start City Entities Service**:
```bash
cd java2-city-entities
mvn spring-boot:run
```

4. **Start Event Processing Service**:
```bash
cd java3-event-processing
mvn spring-boot:run
```

5. **Start Aggregation Service**:
```bash
cd java4-aggregation
mvn spring-boot:run
```

6. **Start API Gateway**:
```bash
cd api-gateway
mvn spring-boot:run
```

## API Endpoints

### Authentication (User Management Service)
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Validate token

### Users (User Management Service)
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user by ID
- `GET /api/users` - Get all users
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Entities (City Entities Service)
- `GET /api/sensors` - Get all sensors
- `POST /api/sensors` - Create sensor
- `GET /api/cameras` - Get all cameras
- `POST /api/cameras` - Create camera
- `GET /api/assets` - Get all public assets
- `POST /api/assets` - Create asset
- `GET /api/vehicles` - Get all vehicles
- `POST /api/vehicles` - Create vehicle

### Events (Event Processing Service)
- `POST /api/events/ingest` - Ingest single event
- `POST /api/events/batch` - Ingest batch of events

### Dashboard (Aggregation Service)
- `GET /api/dashboard` - Get dashboard data
- `GET /api/dashboard/kpis` - Get KPIs
- `GET /api/dashboard/analytics` - Get analytics data
- `GET /api/dashboard/metrics/{metricName}` - Get time-windowed metrics

## Configuration

Each service has its own `application.yml` with:
- Database connection settings
- Service discovery configuration
- Kafka/Kinesis settings (for event processing)
- AWS SDK configuration
- Logging levels

## Database Schema

The services use JPA with Hibernate for automatic schema generation. Key entities:

- **Users**: User accounts with roles and permissions
- **Roles**: System roles with permissions
- **Permissions**: Fine-grained permissions
- **Sensors**: City sensors with location and status
- **Cameras**: CCTV cameras with stream URLs
- **Public Assets**: Infrastructure assets
- **Vehicles**: City vehicles with tracking

## Validation Rules

- Email validation for user emails
- Password minimum length (8 characters)
- Required fields marked with `@NotBlank` or `@NotNull`
- Coordinate validation for location data
- Status enum validation

## Exception Handling

All services implement:
- `GlobalExceptionHandler` for centralized error handling
- Custom exception types with descriptive messages
- HTTP status code mapping
- Validation error details in responses

## Next Steps

1. Configure AWS credentials for Kinesis, Step Functions, DynamoDB, and Timestream
2. Set up Kafka cluster for event streaming
3. Configure Eureka server for service discovery
4. Set up CI/CD pipeline
5. Add comprehensive unit and integration tests
6. Configure monitoring and logging (ELK, Prometheus, etc.)

## License

This project is part of a hackathon submission.

