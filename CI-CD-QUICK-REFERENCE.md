# CI/CD Pipeline - Quick Reference

## 🚀 Quick Start

### Trigger Pipeline
```bash
git add .
git commit -m "your message"
git push origin main
```

### View Results
1. Go to GitHub → Actions tab
2. Click on latest workflow run
3. View job details and logs

## 📊 Pipeline Overview

| Job | Duration | Tests Run |
|-----|----------|-----------|
| Build & Unit Tests | 3-5 min | Backend unit tests (Mocha) |
| Selenium Tests | 2-4 min | 11 UI automation tests |
| Report | <1 min | Summary generation |

## ✅ What Gets Tested

### Backend Unit Tests
- ✅ Event CRUD operations
- ✅ Admin authentication
- ✅ API endpoints
- ✅ Database operations

### Frontend
- ✅ Build process (Vite)
- ✅ ESLint checks
- ✅ Dependencies

### UI Automation (Selenium)
- ✅ Admin login flow (5 tests)
- ✅ Event creation flow (6 tests)

## 🔧 Pipeline Commands

### Run tests locally

**Backend Unit Tests:**
```bash
cd backend
npm test
```

**Selenium Tests:**
```bash
# Start servers first
cd backend && npm start
cd frontend && npm run dev

# Then run tests
cd backend
npm run test:selenium
```

**Frontend Build:**
```bash
cd frontend
npm run build
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.github/workflows/ci-cd.yml` | Pipeline configuration |
| `backend/package.json` | Backend scripts & dependencies |
| `frontend/package.json` | Frontend scripts & dependencies |
| `backend/test/*.test.js` | Unit tests |
| `backend/test/selenium/*.test.js` | UI tests |

## 🎯 Success Indicators

Pipeline succeeds when:
- ✅ All dependencies install
- ✅ Frontend builds successfully
- ✅ All unit tests pass
- ✅ Selenium tests execute
- ✅ No critical errors

## 🐛 Quick Troubleshooting

**Pipeline fails at install:**
```bash
# Update lockfiles locally
npm install
git add package-lock.json
git commit -m "fix: update dependencies"
git push
```

**Tests fail:**
```bash
# Run locally to debug
cd backend
npm test
npm run test:selenium
```

## 📦 Artifacts

After each run, download:
- Backend build artifacts
- Frontend dist folder
- Test screenshots (on failure)

**Retention:** 7 days

## 🔄 Manual Run

1. GitHub → Actions
2. Select "CI/CD Pipeline"
3. Click "Run workflow"
4. Choose branch → Run

## 📈 For Viva Presentation

1. **Show workflow file** (`.github/workflows/ci-cd.yml`)
2. **Trigger pipeline** (push to main)
3. **Watch execution** (real-time in Actions tab)
4. **Explain jobs** (build → test → report)
5. **Show results** (green checkmarks, test summary)
6. **Demonstrate artifacts** (download builds)

## 🎨 Status Badge

Add to README.md:
```markdown
![CI/CD](https://github.com/ChamodiBandara/QAproject/actions/workflows/ci-cd.yml/badge.svg)
```

## ⚡ Performance

- **Average runtime:** 5-9 minutes
- **Parallel jobs:** Yes (Node 18 & 20)
- **Caching:** npm dependencies
- **Optimization:** Health checks, conditional steps

## 🔐 Environment Variables

Set in workflow (no secrets needed currently):
- `MONGODB_URI`: Test database
- `JWT_SECRET`: Test secret
- `PORT`: 5000
- `CI`: true (auto-set)

## 📞 Need Help?

1. Check workflow logs in Actions tab
2. Review `CI-CD-DOCUMENTATION.md`
3. Run tests locally for debugging
4. Check test output for specific errors

---

**Quick Commands Cheat Sheet:**

```bash
# Run all tests locally
cd backend && npm test && npm run test:selenium

# Build frontend
cd frontend && npm run build && npm run lint

# Trigger pipeline
git push origin main

# View status
# → GitHub Actions tab
```
