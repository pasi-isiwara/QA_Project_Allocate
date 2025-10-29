# CI/CD Pipeline Documentation

## Overview

This project uses **GitHub Actions** for continuous integration and continuous deployment (CI/CD). The pipeline automatically builds the project and runs all tests whenever code is pushed to the repository.

## Pipeline Configuration

**File:** `.github/workflows/ci-cd.yml`

### Pipeline Triggers

The CI/CD pipeline runs automatically on:
- **Push** to `main` or `develop` branches
- **Pull requests** targeting `main` or `develop` branches
- **Manual trigger** via GitHub Actions UI (workflow_dispatch)

## Pipeline Jobs

### 1. Build and Test Job (`build-and-test`)

**Purpose:** Build the project and run unit tests

**Matrix Strategy:** Tests on multiple Node.js versions (18.x, 20.x)

**Services:**
- MongoDB 7.0 (for database tests)

**Steps:**
1. ✅ Checkout repository
2. ✅ Setup Node.js (with npm caching)
3. ✅ Install backend dependencies
4. ✅ Install frontend dependencies
5. ✅ Build backend
6. ✅ Run backend unit tests (Mocha + Supertest)
7. ✅ Build frontend (Vite)
8. ✅ Lint frontend code
9. ✅ Upload build artifacts

**Environment Variables:**
```yaml
MONGODB_URI: mongodb://localhost:27017/test_db
JWT_SECRET: test_jwt_secret_key_for_ci
PORT: 5000
```

### 2. Selenium UI Tests Job (`selenium-tests`)

**Purpose:** Run Selenium UI automation tests

**Runs:** After build-and-test job completes successfully

**Services:**
- MongoDB 7.0
- Chrome Browser

**Steps:**
1. ✅ Checkout repository
2. ✅ Setup Node.js 20.x
3. ✅ Install Google Chrome browser
4. ✅ Install dependencies (backend + frontend)
5. ✅ Start backend server (port 5000)
6. ✅ Start frontend server (port 5173)
7. ✅ Run Selenium UI tests
8. ✅ Stop servers (cleanup)
9. ✅ Upload screenshots on failure

**Special Features:**
- Automatic headless mode in CI (`--headless=new`)
- Server health checks with curl
- Log capture on failure
- Screenshot capture on test failure

### 3. Report Job (`report`)

**Purpose:** Generate test summary report

**Runs:** After all jobs complete (regardless of success/failure)

**Outputs:**
- Summary of build and test results
- Pipeline completion timestamp
- Displayed in GitHub Actions Summary

## Test Coverage

### Backend Unit Tests
- **Test Files:** `backend/test/*.test.js`
- **Framework:** Mocha + Chai + Supertest
- **Coverage:**
  - Event API endpoints (GET, POST, PUT, DELETE)
  - Admin authentication
  - Database operations

### Selenium UI Tests
- **Test Files:** `backend/test/selenium/*.test.js`
- **Framework:** Selenium WebDriver + Mocha
- **Scenarios:**
  1. Admin Login (5 tests)
  2. Event Creation (6 tests)

## Viewing Pipeline Results

### On GitHub

1. **Navigate to Actions Tab:**
   - Go to your repository on GitHub
   - Click on the "Actions" tab

2. **View Workflow Runs:**
   - See all pipeline runs with status (✓ success, ✗ failure)
   - Click on any run to see details

3. **Inspect Job Details:**
   - Click on a job name to see step-by-step logs
   - Green checkmarks = passed steps
   - Red X marks = failed steps

4. **Download Artifacts:**
   - Scroll to bottom of workflow run
   - Download build artifacts or test screenshots
   - Available for 7 days

### Pipeline Status Badge

Add this badge to your README.md:

```markdown
![CI/CD Pipeline](https://github.com/ChamodiBandara/QAproject/actions/workflows/ci-cd.yml/badge.svg)
```

## Local Testing

### Test the workflow locally (optional):

Install Act (GitHub Actions local runner):
```bash
# Windows (with Chocolatey)
choco install act-cli

# Or download from: https://github.com/nektos/act
```

Run workflow locally:
```bash
act -j build-and-test
```

## Manual Trigger

To manually run the pipeline:

1. Go to **Actions** tab on GitHub
2. Select **CI/CD Pipeline** workflow
3. Click **Run workflow** button
4. Select branch
5. Click **Run workflow**

## Environment Setup for CI

### Required Secrets (if needed)

Currently, no secrets are required. If you need to add them:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add secrets like:
   - `MONGODB_URI` (if using external DB)
   - `JWT_SECRET` (for production)
   - `DEPLOY_TOKEN` (for deployment)

### Using Secrets in Workflow

```yaml
env:
  MONGODB_URI: ${{ secrets.MONGODB_URI }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
```

## Pipeline Optimization

### Current Optimizations:
✅ npm caching (speeds up dependency installation)
✅ Parallel job execution where possible
✅ Matrix strategy (test on multiple Node versions)
✅ Conditional steps (continue-on-error for optional tests)
✅ Artifact upload for debugging

### Performance:
- **Build and Test:** ~3-5 minutes
- **Selenium Tests:** ~2-4 minutes
- **Total Pipeline:** ~5-9 minutes

## Troubleshooting

### Common Issues

**1. Pipeline fails at "Install Dependencies"**
- **Cause:** package-lock.json is out of sync
- **Solution:** Run `npm install` locally and commit package-lock.json

**2. MongoDB connection fails**
- **Cause:** Service not ready
- **Solution:** Pipeline includes health checks (automatic)

**3. Selenium tests timeout**
- **Cause:** Frontend/backend not ready
- **Solution:** Pipeline includes wait times and health checks

**4. Chrome version mismatch**
- **Cause:** ChromeDriver version doesn't match Chrome
- **Solution:** Pipeline installs latest stable Chrome

### Debugging Steps

1. **Check workflow logs:**
   - Click on failed job
   - Expand failed step
   - Read error messages

2. **Download artifacts:**
   - Build artifacts for inspection
   - Screenshots if UI tests failed

3. **Run tests locally:**
   ```bash
   # Backend unit tests
   cd backend
   npm test

   # Selenium tests (with servers running)
   npm run test:selenium
   ```

## Best Practices

### For Development:

1. **Run tests locally before pushing:**
   ```bash
   cd backend && npm test
   cd ../frontend && npm run build
   ```

2. **Fix linting errors:**
   ```bash
   cd frontend && npm run lint
   ```

3. **Keep dependencies updated:**
   ```bash
   npm outdated
   npm update
   ```

### For CI/CD:

1. ✅ Keep workflow file in `.github/workflows/`
2. ✅ Use `npm ci` instead of `npm install` (faster, more reliable)
3. ✅ Add health checks for services
4. ✅ Use artifacts for debugging
5. ✅ Set appropriate timeouts
6. ✅ Clean up resources (stop servers)

## Pipeline Stages Diagram

```
┌─────────────────────────────────────────────────────┐
│  TRIGGER (Push/PR/Manual)                          │
└─────────────────────┬───────────────────────────────┘
                      │
         ┌────────────┴─────────────┐
         │                          │
    ┌────▼──────┐            ┌──────▼─────┐
    │  Node 18  │            │  Node 20   │
    └────┬──────┘            └──────┬─────┘
         │                          │
         │  BUILD & UNIT TESTS      │
         │  ✓ Install dependencies  │
         │  ✓ Build frontend        │
         │  ✓ Run backend tests     │
         │  ✓ Lint frontend         │
         │  ✓ Upload artifacts      │
         │                          │
         └────────────┬─────────────┘
                      │
              ┌───────▼────────┐
              │ SELENIUM TESTS │
              ├────────────────┤
              │ ✓ Install Chrome
              │ ✓ Start MongoDB
              │ ✓ Start Backend
              │ ✓ Start Frontend
              │ ✓ Run UI Tests
              │ ✓ Cleanup
              └───────┬────────┘
                      │
              ┌───────▼────────┐
              │  REPORT        │
              │  Generate      │
              │  Summary       │
              └────────────────┘
```

## Success Criteria

A successful pipeline run means:

1. ✅ All dependencies installed
2. ✅ Frontend builds without errors
3. ✅ Backend unit tests pass (event.test.js, sample.test.js)
4. ✅ Frontend linting passes (or warnings only)
5. ✅ Selenium UI tests execute (11 tests)
6. ✅ Build artifacts uploaded
7. ✅ No critical errors in logs

## Demonstrating for Viva

### Steps to Show Successful Pipeline:

1. **Make a small change:**
   ```bash
   # Edit a file (e.g., add a comment in README.md)
   git add .
   git commit -m "test: trigger CI/CD pipeline"
   git push origin main
   ```

2. **Open GitHub Actions:**
   - Navigate to repository
   - Click "Actions" tab
   - Watch pipeline run in real-time

3. **Show Results:**
   - ✅ Green checkmarks for all jobs
   - ⏱️ Execution time (~5-9 minutes)
   - 📦 Build artifacts generated
   - 📊 Test summary report

4. **Explain Pipeline:**
   - Show workflow file structure
   - Explain each job's purpose
   - Demonstrate test coverage
   - Show how to debug failures

### Key Points to Mention:

- ✅ Automated build process
- ✅ Multiple Node.js version testing
- ✅ Unit tests + UI automation tests
- ✅ MongoDB service integration
- ✅ Artifact preservation
- ✅ Failure notifications
- ✅ Manual trigger capability

## Future Enhancements

Potential improvements:

1. **Code Coverage Reports**
   - Integrate Istanbul/NYC
   - Upload coverage to Codecov

2. **Deployment Stage**
   - Add deployment to staging/production
   - Use environment-specific configs

3. **Notifications**
   - Slack/Discord notifications
   - Email on failure

4. **Performance Testing**
   - Add load testing
   - API performance benchmarks

5. **Security Scanning**
   - npm audit
   - OWASP dependency check
   - SonarQube integration

## Support & Maintenance

**Workflow File Location:** `.github/workflows/ci-cd.yml`

**Update Workflow:**
```bash
git checkout main
# Edit .github/workflows/ci-cd.yml
git add .github/workflows/ci-cd.yml
git commit -m "ci: update pipeline configuration"
git push origin main
```

**Pipeline Logs:** Available in GitHub Actions for 90 days

**Artifacts:** Retained for 7 days (configurable)

---

**Last Updated:** October 30, 2025  
**Pipeline Version:** 1.0  
**Maintained by:** QA Team
