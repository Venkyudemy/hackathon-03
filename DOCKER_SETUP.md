# Docker Setup Guide

This guide explains how to run the Smart City application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Port Configuration

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| API Gateway | 8090 | http://localhost:8090 |
| Eureka Server | 8761 | http://localhost:8761 |
| User Management | 8081 | http://localhost:8081 |
| City Entities | 8082 | http://localhost:8082 |
| Event Processing | 8083 | http://localhost:8083 |
| Aggregation Service | 8084 | http://localhost:8084 |
| PostgreSQL | 5432 | localhost:5432 |

**Note:** API Gateway port changed from 8080 to 8090.

## Quick Start

### 1. Build and Start All Services

```bash
docker-compose up --build
```

This will:
- Build all Docker images
- Start PostgreSQL database
- Start Eureka Server
- Start all microservices
- Start API Gateway
- Start Frontend

### 2. Start in Detached Mode (Background)

```bash
docker-compose up -d --build
```

### 3. View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api-gateway
docker-compose logs -f frontend
```

### 4. Stop All Services

```bash
docker-compose down
```

### 5. Stop and Remove Volumes (Database Data)

```bash
docker-compose down -v
```

## Service Startup Order

Docker Compose automatically handles service dependencies:

1. **PostgreSQL** - Starts first
2. **Eureka Server** - Starts after PostgreSQL
3. **Microservices** - Start after Eureka is healthy
4. **API Gateway** - Starts after all microservices are healthy
5. **Frontend** - Starts after API Gateway

## Health Checks

All services include health checks. You can verify services are running:

```bash
# Check service status
docker-compose ps

# Check Eureka dashboard
# Open browser: http://localhost:8761
```

## Accessing the Application

- **Frontend**: http://localhost:3000
- **API Gateway**: http://localhost:8090
- **Eureka Dashboard**: http://localhost:8761
- **API Endpoints**: http://localhost:8090/api/*

## Troubleshooting

### Services Won't Start

1. **Check Docker is running:**
   ```bash
   docker ps
   ```

2. **Check logs for errors:**
   ```bash
   docker-compose logs service-name
   ```

3. **Rebuild images:**
   ```bash
   docker-compose build --no-cache
   docker-compose up
   ```

### Port Already in Use

If a port is already in use, you can change it in `docker-compose.yml`:

```yaml
services:
  api-gateway:
    ports:
      - "8091:8090"  # Change host port (left side)
```

### Database Connection Issues

1. **Check PostgreSQL is running:**
   ```bash
   docker-compose ps postgres
   ```

2. **Check database logs:**
   ```bash
   docker-compose logs postgres
   ```

3. **Access PostgreSQL directly:**
   ```bash
   docker-compose exec postgres psql -U postgres -d smartcity_db
   ```

### Services Not Registering with Eureka

1. **Wait for Eureka to start** (30-60 seconds)
2. **Check Eureka logs:**
   ```bash
   docker-compose logs eureka-server
   ```
3. **Verify service names match** in `application-docker.yml`

### Frontend Not Loading

1. **Check frontend logs:**
   ```bash
   docker-compose logs frontend
   ```

2. **Verify API Gateway is accessible:**
   ```bash
   curl http://localhost:8090/actuator/health
   ```

3. **Check nginx configuration** in `frontend/nginx.conf`

## Environment Variables

You can override configuration using environment variables in `docker-compose.yml`:

```yaml
services:
  user-management:
    environment:
      - SPRING_DATASOURCE_PASSWORD=your_password
      - JWT_SECRET=your_jwt_secret
```

## Database Persistence

Database data is persisted in a Docker volume `postgres-data`. To reset:

```bash
docker-compose down -v
docker-compose up
```

## Building Individual Services

To build a specific service:

```bash
# Build single service
docker-compose build api-gateway

# Build and start single service
docker-compose up --build api-gateway
```

## Production Considerations

For production deployment:

1. **Use environment variables** for sensitive data
2. **Set up proper secrets management**
3. **Configure resource limits** in docker-compose.yml
4. **Use Docker secrets** for passwords
5. **Set up monitoring and logging**
6. **Configure reverse proxy** (nginx/traefik)
7. **Use Docker Swarm or Kubernetes** for orchestration

## Development vs Production

### Development
- Use `docker-compose.yml` as-is
- Logs are verbose
- Hot reload not available (rebuild required)

### Production
- Use environment-specific compose files
- Set logging levels to INFO/WARN
- Configure proper resource limits
- Set up health checks and auto-restart
- Use external PostgreSQL cluster

## Useful Commands

```bash
# View running containers
docker-compose ps

# Restart a specific service
docker-compose restart api-gateway

# Scale services (if needed)
docker-compose up --scale user-management=2

# Remove all containers and networks
docker-compose down

# Remove everything including volumes
docker-compose down -v

# View resource usage
docker stats

# Execute command in running container
docker-compose exec api-gateway sh
```

## Updating Services

After making code changes:

```bash
# Rebuild and restart
docker-compose up --build -d

# Or rebuild specific service
docker-compose build api-gateway
docker-compose up -d api-gateway
```

## Network Configuration

All services run on the `smartcity-network` Docker network. Services communicate using service names:

- `postgres` - Database
- `eureka-server` - Service Discovery
- `user-management` - User Service
- `city-entities` - Entities Service
- `event-processing` - Event Service
- `aggregation` - Aggregation Service
- `api-gateway` - API Gateway
- `frontend` - Frontend

## Support

For issues or questions:
1. Check logs: `docker-compose logs`
2. Verify all services are healthy: `docker-compose ps`
3. Check Eureka dashboard: http://localhost:8761

