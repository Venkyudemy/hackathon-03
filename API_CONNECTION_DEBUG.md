# API Connection Debugging Guide

## Common Issues and Solutions

### 1. Network Errors / Failed to Fetch

**Symptoms:**
- Console shows "Failed to fetch" or "Network error"
- Frontend shows "Cannot connect to backend"

**Solutions:**
1. **Check if backend services are running:**
   ```bash
   docker-compose ps
   ```

2. **Check API Gateway health:**
   ```bash
   curl http://localhost:8090/actuator/health
   ```

3. **Check nginx proxy configuration:**
   - Verify `frontend/nginx.conf` has correct proxy_pass to `api-gateway:8090`
   - Check if frontend container can reach api-gateway container

4. **Check Docker network:**
   ```bash
   docker network inspect smartcity-network
   ```

### 2. CORS Errors

**Symptoms:**
- Browser console shows CORS errors
- OPTIONS requests fail

**Solutions:**
1. **Verify CORS configuration in API Gateway:**
   - Check `api-gateway/src/main/resources/application-docker.yml`
   - Ensure `http://frontend:80` is in allowedOrigins

2. **Check nginx CORS headers:**
   - Verify nginx.conf doesn't block CORS

### 3. 404 Not Found

**Symptoms:**
- API calls return 404
- Endpoints not found

**Solutions:**
1. **Check API Gateway routes:**
   - Verify routes in `application-docker.yml` match frontend calls
   - Check service names match Eureka registration

2. **Check Eureka service registration:**
   - Visit http://localhost:8761
   - Verify all services are registered

3. **Verify endpoint paths:**
   - Frontend calls: `/api/dashboard/kpis`
   - Should route to: `aggregation-service` → `/api/dashboard/kpis`

### 4. Authentication Errors

**Symptoms:**
- Login fails
- 401/403 errors

**Solutions:**
1. **Check login endpoint:**
   ```bash
   curl -X POST http://localhost:8090/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

2. **Verify JWT token format:**
   - Check if backend returns `token` or `accessToken`
   - API service handles both

3. **Check token storage:**
   - Verify localStorage has `auth_token`
   - Check if token is included in Authorization header

### 5. Service Not Available

**Symptoms:**
- Specific endpoints fail
- Services not registered in Eureka

**Solutions:**
1. **Check service health:**
   ```bash
   # User Management
   curl http://localhost:8081/actuator/health
   
   # City Entities
   curl http://localhost:8082/actuator/health
   
   # Aggregation
   curl http://localhost:8084/actuator/health
   ```

2. **Check service logs:**
   ```bash
   docker-compose logs user-management
   docker-compose logs city-entities
   docker-compose logs aggregation
   ```

## Debugging Steps

### Step 1: Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for `[API]` prefixed logs
4. Check Network tab for failed requests

### Step 2: Check API Service Logs
The API service now logs:
- Request method and URL: `[API] GET /api/dashboard/kpis`
- Response status: `[API] Response status: 200 OK`
- Errors: `[API] Error response: {...}`

### Step 3: Test API Endpoints Directly
```bash
# Test Dashboard KPIs
curl http://localhost:8090/api/dashboard/kpis

# Test Cameras
curl http://localhost:8090/api/cameras

# Test Login
curl -X POST http://localhost:8090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smartcity.ai","password":"password"}'
```

### Step 4: Check Docker Containers
```bash
# Check all containers
docker-compose ps

# Check specific service logs
docker-compose logs api-gateway
docker-compose logs frontend

# Check if containers can communicate
docker exec -it smartcity-frontend curl http://api-gateway:8090/actuator/health
```

## Environment Variables

If running in Docker, the API base URL is automatically `/api` which is proxied by nginx.

If running locally (npm run dev), check:
- `frontend/vite.config.ts` proxy configuration
- API Gateway should be on `http://localhost:8090`

## Common Fixes

1. **Restart services:**
   ```bash
   docker-compose restart frontend api-gateway
   ```

2. **Rebuild containers:**
   ```bash
   docker-compose up --build -d
   ```

3. **Check database connectivity:**
   - Services need PostgreSQL to start
   - Verify database is running and accessible

4. **Clear browser cache:**
   - Clear localStorage
   - Clear browser cache
   - Hard refresh (Ctrl+Shift+R)

## Testing Checklist

- [ ] All Docker containers are running
- [ ] API Gateway is accessible on port 8090
- [ ] Frontend can reach API Gateway (check nginx proxy)
- [ ] Eureka shows all services registered
- [ ] Browser console shows API requests
- [ ] Network tab shows successful API responses
- [ ] No CORS errors in console
- [ ] JWT token is stored in localStorage after login

## Getting Help

If issues persist:
1. Check `docker-compose logs` for all services
2. Check browser console for detailed error messages
3. Verify API Gateway routes match frontend calls
4. Test endpoints directly with curl
5. Check Eureka dashboard for service registration

