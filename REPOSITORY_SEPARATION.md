# Repository Separation Guide

## 📁 Recommended Structure

Keep backend and frontend in **separate repositories** for better organization:

```
smartcity-backend/          (This repository)
├── java1-user-management/
├── java2-city-entities/
├── java3-event-processing/
├── java4-aggregation/
├── api-gateway/
├── eureka-server/
└── database/

smartcity-frontend/         (Separate repository)
├── src/
├── package.json
├── vite.config.ts
└── ...
```

## 🎯 Benefits of Separation

1. **Cleaner Organization** - Each repo has a single purpose
2. **Independent Deployment** - Deploy backend and frontend separately
3. **Different Teams** - Backend and frontend teams can work independently
4. **Smaller Repos** - Easier to manage and faster to clone
5. **Different CI/CD** - Separate pipelines for backend and frontend

## 📋 Current Setup

### Backend Repository (This Repo)
✅ **Includes:**
- All Spring Boot microservices
- API Gateway
- Eureka Server
- Database scripts
- Backend documentation

❌ **Excludes:**
- Frontend source code (`src/`)
- `package.json`, `vite.config.ts`
- Frontend build files
- `node_modules/`

### Frontend Repository (Separate)
✅ **Should Include:**
- React source code (`src/`)
- `package.json`, `package-lock.json`
- `vite.config.ts`, `tsconfig.json`
- `tailwind.config.js`, `postcss.config.js`
- `index.html`
- Frontend documentation

❌ **Excludes:**
- Backend Java code
- Maven `pom.xml` files
- `target/` directories

## 🔧 How to Separate

### Option 1: Create New Frontend Repository

1. **Create new repository** for frontend:
```bash
mkdir smartcity-frontend
cd smartcity-frontend
git init
```

2. **Copy frontend files** from this repo:
```bash
# From backend repo
cp -r src/ ../smartcity-frontend/
cp package.json package-lock.json vite.config.ts ../smartcity-frontend/
cp tsconfig*.json ../smartcity-frontend/
cp tailwind.config.js postcss.config.js ../smartcity-frontend/
cp eslint.config.js index.html ../smartcity-frontend/
```

3. **Update .gitignore in backend repo** (already done):
   - Frontend files are excluded

4. **Remove frontend from backend repo:**
```bash
# In backend repo
git rm -r --cached src/
git rm --cached package.json package-lock.json
git rm --cached vite.config.ts tsconfig*.json
git rm --cached tailwind.config.js postcss.config.js
git rm --cached eslint.config.js index.html
git commit -m "Remove frontend - moved to separate repository"
```

### Option 2: Keep Both (Monorepo)

If you want to keep both in one repo:

1. **Uncomment frontend ignores** in `.gitignore`
2. **Keep frontend files** in the repo
3. **Add clear documentation** about structure

## 📝 Current .gitignore Status

The `.gitignore` is configured to **exclude frontend** by default:

```gitignore
# Frontend files (separate repository)
src/
index.html
package.json
package-lock.json
vite.config.ts
tsconfig*.json
tailwind.config.js
postcss.config.js
eslint.config.js
```

This means:
- ✅ Frontend files won't be committed to backend repo
- ✅ Backend repo stays clean
- ✅ You can create separate frontend repo

## 🚀 Deployment

### Backend Deployment
- Deploy each microservice independently
- Use Docker/Kubernetes
- Configure API Gateway
- Set up service discovery

### Frontend Deployment
- Build React app: `npm run build`
- Deploy to static hosting (Vercel, Netlify, S3)
- Configure API Gateway URL
- Set up CORS if needed

## 🔗 Integration

### Frontend → Backend Connection

In frontend, configure API base URL:

```typescript
// frontend/src/config/api.ts
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
```

### Environment Variables

**Frontend `.env`:**
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

**Backend `application.yml`:**
```yaml
server:
  port: 8080
```

## ✅ Checklist

### Backend Repository
- [x] All Java microservices
- [x] API Gateway
- [x] Eureka Server
- [x] Database scripts
- [x] Backend documentation
- [x] `.gitignore` excludes frontend

### Frontend Repository (Separate)
- [ ] Create new repository
- [ ] Copy frontend files
- [ ] Add frontend README
- [ ] Configure API connection
- [ ] Set up build/deploy pipeline

## 📚 Documentation

- **Backend**: See `BACKEND_README.md`
- **Frontend**: See `FRONTEND_README.md` (in frontend repo)
- **This Guide**: `REPOSITORY_SEPARATION.md`

## 🎯 Summary

**Current Status:**
- ✅ Backend repo configured to exclude frontend
- ✅ Ready to create separate frontend repository
- ✅ Clean separation maintained

**Next Steps:**
1. Create new frontend repository
2. Copy frontend files to new repo
3. Remove frontend from backend repo (if already committed)
4. Update documentation

