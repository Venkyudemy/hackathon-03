# API Connection Fixes Applied

## Issues Fixed

### 1. ✅ Response Format Mismatch
**Problem:** Frontend expected different response structure than backend returns.

**Fixed:**
- Updated `AuthContext.tsx` to handle `LoginResponse` format: `{ token, id, email, name, roles }`
- Updated `Dashboard.tsx` to map backend KPI fields: `trafficFlowPercentage`, `airQualityIndex`, `energyUsageGW`, `openIncidents`
- Updated to use `metrics` array from `DashboardDTO` when available

### 2. ✅ Enhanced Error Handling
**Problem:** API errors weren't providing enough information for debugging.

**Fixed:**
- Added detailed console logging: `[API] GET /api/dashboard/kpis`
- Added response status logging: `[API] Response status: 200 OK`
- Better error messages with context
- Handles empty responses and different content types

### 3. ✅ Token Handling
**Problem:** Frontend might not handle different token field names.

**Fixed:**
- Handles both `token` and `accessToken` fields
- Properly stores token in localStorage
- Token included in Authorization header for all requests

## How to Debug API Issues

### 1. Check Browser Console
Open DevTools (F12) and look for:
- `[API]` prefixed logs showing requests
- Response status codes
- Error messages

### 2. Check Network Tab
- Verify requests are going to `/api/*`
- Check response status codes
- View response body for errors

### 3. Common Error Messages

**"Cannot connect to backend"**
- Backend services not running
- Check: `docker-compose ps`
- Solution: Start services with `docker-compose up`

**"404 Not Found"**
- API endpoint doesn't exist
- Check: API Gateway routes in `application-docker.yml`
- Verify: Service is registered in Eureka

**"401/403 Unauthorized"**
- Invalid or missing JWT token
- Solution: Login again to get new token

**CORS Errors**
- Check: API Gateway CORS configuration
- Verify: Frontend origin is in allowedOrigins

## Testing API Connection

### Test Login
```bash
curl -X POST http://localhost:8090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smartcity.ai","password":"password"}'
```

### Test Dashboard KPIs
```bash
curl http://localhost:8090/api/dashboard/kpis
```

### Test Cameras
```bash
curl http://localhost:8090/api/cameras
```

## Expected Response Formats

### Login Response
```json
{
  "token": "eyJhbGc...",
  "id": "1",
  "email": "admin@smartcity.ai",
  "name": "Admin User",
  "roles": ["ADMIN"],
  "permissions": ["READ", "WRITE"]
}
```

### Dashboard KPIs Response
```json
{
  "trafficFlowPercentage": 87.0,
  "airQualityIndex": 42,
  "energyUsageGW": 2.4,
  "openIncidents": 12,
  "activeCameras": 6,
  "onlineSensors": 45
}
```

### Dashboard Response
```json
{
  "metrics": [
    {
      "label": "Traffic Flow",
      "value": "87%",
      "change": 5.2,
      "status": "good"
    }
  ],
  "recentIncidents": [],
  "kpis": { ... }
}
```

## Next Steps if Still Having Issues

1. **Check all services are running:**
   ```bash
   docker-compose ps
   ```

2. **Check service logs:**
   ```bash
   docker-compose logs api-gateway
   docker-compose logs frontend
   ```

3. **Verify Eureka registration:**
   - Visit: http://localhost:8761
   - Should see all services registered

4. **Test API Gateway directly:**
   ```bash
   curl http://localhost:8090/actuator/health
   ```

5. **Check nginx proxy:**
   - Verify `frontend/nginx.conf` proxy_pass is correct
   - Test from frontend container: `docker exec -it smartcity-frontend curl http://api-gateway:8090/actuator/health`

## Frontend-Backend Integration Status

✅ **Working:**
- API service created and configured
- Authentication with JWT tokens
- Dashboard KPIs fetching
- Error handling and logging
- Response format matching

⚠️ **May Need Testing:**
- Actual backend data (some endpoints return mock data)
- Service discovery (Eureka)
- CORS configuration in Docker

✅ **All fixes committed and pushed to repository**



