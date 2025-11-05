@echo off
echo Checking PostgreSQL connection...
echo.

set /p DB_USER="PostgreSQL username [postgres]: "
if "%DB_USER%"=="" set DB_USER=postgres

set /p DB_PASSWORD="PostgreSQL password: "

echo.
echo Testing connection...
set PGPASSWORD=%DB_PASSWORD%
psql -U %DB_USER% -h localhost -c "SELECT version();" 2>nul

if %ERRORLEVEL% EQU 0 (
    echo.
    echo Connection successful!
    echo Password is correct.
) else (
    echo.
    echo Connection failed!
    echo Password might be incorrect or PostgreSQL is not running.
    echo.
    echo Try:
    echo 1. Check if PostgreSQL is running
    echo 2. Try empty password
    echo 3. Check your PostgreSQL installation
)

pause

