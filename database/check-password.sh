#!/bin/bash

echo "Checking PostgreSQL connection..."
echo ""

read -p "PostgreSQL username [postgres]: " DB_USER
DB_USER=${DB_USER:-postgres}

read -sp "PostgreSQL password: " DB_PASSWORD
echo ""

echo "Testing connection..."
PGPASSWORD=$DB_PASSWORD psql -U $DB_USER -h localhost -c "SELECT version();" 2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Connection successful!"
    echo "Password is correct: $DB_PASSWORD"
else
    echo ""
    echo "❌ Connection failed!"
    echo "Password might be incorrect or PostgreSQL is not running."
    echo ""
    echo "Try:"
    echo "1. Check if PostgreSQL is running"
    echo "2. Try empty password (just press Enter)"
    echo "3. Check your PostgreSQL installation"
fi

