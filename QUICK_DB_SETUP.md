# Quick Database Password Setup

## Current Default Password

**Password**: `postgres`

This is configured in:
- `java1-user-management/src/main/resources/application.yml`
- `java2-city-entities/src/main/resources/application.yml`

## Quick Check

### Test if password works:
```bash
# Windows
psql -U postgres -l

# Linux/Mac
psql -U postgres -l
```

If it asks for password:
- Try: `postgres` (default)
- Or: empty (just press Enter)
- Or: check your PostgreSQL installation

### Use the check script:
```bash
# Windows
database\check-password.bat

# Linux/Mac
chmod +x database/check-password.sh
./database/check-password.sh
```

## If Password is Different

### Update Both Services:

**1. User Management Service:**
Edit: `java1-user-management/src/main/resources/application.yml`
```yaml
password: your_actual_password
```

**2. City Entities Service:**
Edit: `java2-city-entities/src/main/resources/application.yml`
```yaml
password: your_actual_password
```

## Common PostgreSQL Passwords

- `postgres` (most common default)
- Empty password (some installations)
- Your system password (some installations)
- Check PostgreSQL installation documentation

## Quick Fix

If you're not sure what your password is:

1. **Try default first:**
   - Keep `password: postgres` in application.yml
   - Try starting services

2. **If it fails:**
   - Change to empty: `password: ""`
   - Or set environment variable: `DB_PASSWORD=your_password`

3. **Reset PostgreSQL password:**
   ```sql
   ALTER USER postgres WITH PASSWORD 'new_password';
   ```

## Current Status

✅ **Default password**: `postgres`
✅ **Configured in**: Both services' `application.yml`
✅ **Ready to use**: Just make sure PostgreSQL is running!

