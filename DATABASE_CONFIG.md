# Database Configuration Guide

## Current Database Settings

### Default Configuration
- **Database Name**: `smartcity_db`
- **Username**: `postgres`
- **Password**: `postgres` (default PostgreSQL password)
- **Host**: `localhost`
- **Port**: `5432`

## Where Password is Configured

The database password is set in each service's `application.yml` file:

### Services with Database:
1. **User Management Service**
   - File: `java1-user-management/src/main/resources/application.yml`
   - Line 11: `password: postgres`

2. **City Entities Service**
   - File: `java2-city-entities/src/main/resources/application.yml`
   - Line 11: `password: postgres`

## How to Change Password

### Option 1: Update in application.yml (Simple)

Edit both files and change the password:

**java1-user-management/src/main/resources/application.yml:**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/smartcity_db
    username: postgres
    password: your_new_password  # Change this
```

**java2-city-entities/src/main/resources/application.yml:**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/smartcity_db
    username: postgres
    password: your_new_password  # Change this
```

### Option 2: Use Environment Variables (Recommended for Production)

**Update application.yml:**
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/smartcity_db
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:postgres}  # Uses env var or defaults to postgres
```

**Set environment variables:**
```bash
# Windows
set DB_USERNAME=postgres
set DB_PASSWORD=your_password

# Linux/Mac
export DB_USERNAME=postgres
export DB_PASSWORD=your_password
```

### Option 3: Change PostgreSQL Password

If you want to change the actual PostgreSQL password:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Change password
ALTER USER postgres WITH PASSWORD 'your_new_password';

-- Exit
\q
```

Then update the `application.yml` files with the new password.

## Quick Setup

### If using default PostgreSQL installation:
1. **Default password is usually**: `postgres` or empty
2. **Check your PostgreSQL setup**:
   ```bash
   psql -U postgres -l
   ```
   If it asks for password and `postgres` doesn't work, try:
   - Empty password (just press Enter)
   - Or check your PostgreSQL installation docs

### If password is different:
1. Update both `application.yml` files
2. Or use environment variables (Option 2 above)

## Verify Connection

Test the connection:
```bash
psql -U postgres -d smartcity_db
```

If it connects, your password is correct!

## Security Note

⚠️ **For Production:**
- Never commit passwords to git
- Use environment variables
- Use `.env` files (not committed)
- Use secrets management (AWS Secrets Manager, etc.)

## Current Configuration Files

- `java1-user-management/src/main/resources/application.yml`
- `java2-city-entities/src/main/resources/application.yml`

Both currently use: `password: postgres`

