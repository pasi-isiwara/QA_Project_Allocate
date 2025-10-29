# GitHub Actions Workflow Validator

This script helps validate the GitHub Actions workflow file before pushing.

## Validate Workflow

### Option 1: Using actionlint (Recommended)

Install actionlint:
```bash
# Windows (PowerShell)
Invoke-WebRequest -Uri "https://github.com/rhysd/actionlint/releases/latest/download/actionlint_windows_amd64.zip" -OutFile actionlint.zip
Expand-Archive actionlint.zip
Move-Item actionlint/actionlint.exe C:\Windows\System32\
```

Run validation:
```bash
actionlint .github/workflows/ci-cd.yml
```

### Option 2: Using GitHub CLI

Install GitHub CLI:
```bash
# Windows
winget install --id GitHub.cli
```

Validate workflow:
```bash
gh workflow view ci-cd.yml
```

### Option 3: Using VS Code Extension

Install extension:
- **GitHub Actions** by GitHub

Features:
- ✅ Syntax highlighting
- ✅ Auto-completion
- ✅ Inline validation
- ✅ Workflow visualization

## Manual Validation Checklist

Before pushing workflow changes:

- [ ] YAML syntax is correct (proper indentation)
- [ ] All job names are unique
- [ ] All step names are descriptive
- [ ] Required actions have correct versions (@v4, etc.)
- [ ] working-directory paths are correct
- [ ] Environment variables are set where needed
- [ ] Services (MongoDB) are properly configured
- [ ] Artifact upload/download paths exist
- [ ] Timeout values are reasonable
- [ ] Cleanup steps included (stop servers)

## Common Issues

### Issue: "Invalid workflow file"
**Fix:** Check YAML indentation (2 spaces, not tabs)

### Issue: "npm ci failed"
**Fix:** Ensure package-lock.json is committed

### Issue: "Service unhealthy"
**Fix:** Check health-cmd and increase health-retries

### Issue: "Step timeout"
**Fix:** Increase timeout in step or job

## Test Workflow Locally

Using **act** (GitHub Actions local runner):

Install:
```bash
# Windows (Chocolatey)
choco install act-cli

# Or download from: https://github.com/nektos/act
```

Run specific job:
```bash
# Dry run
act -n

# Run build-and-test job
act -j build-and-test

# Run with secrets
act -j build-and-test -s GITHUB_TOKEN=your_token
```

## Workflow Visualization

View workflow graph:
```bash
# Using GitHub CLI
gh workflow view ci-cd.yml --web
```

Or visit:
```
https://github.com/ChamodiBandara/QAproject/actions/workflows/ci-cd.yml
```

## Debugging Tips

1. **Enable debug logging:**
   - Repository Settings → Secrets → Add:
   - `ACTIONS_RUNNER_DEBUG` = `true`
   - `ACTIONS_STEP_DEBUG` = `true`

2. **Add debug steps:**
   ```yaml
   - name: Debug Info
     run: |
       echo "Node: $(node --version)"
       echo "NPM: $(npm --version)"
       echo "PWD: $(pwd)"
       ls -la
   ```

3. **Check service logs:**
   ```yaml
   - name: Check MongoDB
     run: mongosh --eval 'db.runCommand({ ping: 1 })'
   ```

## Workflow Status

Check status:
```bash
# List workflows
gh workflow list

# View workflow runs
gh run list --workflow=ci-cd.yml

# View specific run
gh run view <run-id>

# Watch run in real-time
gh run watch
```

## Best Practices

✅ **DO:**
- Use specific action versions (@v4)
- Set timeouts for long-running steps
- Use `npm ci` instead of `npm install`
- Cache dependencies
- Clean up resources (stop servers)
- Upload artifacts for debugging
- Use environment variables
- Add health checks for services

❌ **DON'T:**
- Hardcode secrets in workflow
- Use `npm install` (slower than `npm ci`)
- Forget to specify working-directory
- Skip cleanup steps
- Use overly long timeouts
- Run all tests in one job (split if needed)

## Performance Optimization

Implemented optimizations:
- ✅ npm dependency caching
- ✅ Parallel job execution (matrix strategy)
- ✅ `npm ci` for faster installs
- ✅ Conditional steps (continue-on-error)
- ✅ Service health checks (avoid waiting)
- ✅ Targeted artifact uploads

## Security Considerations

✅ **Implemented:**
- No hardcoded secrets
- Service isolation (Docker containers)
- Clean environment for each run
- Artifact retention limits (7 days)

🔒 **To Add (if needed):**
- Secrets for production deployments
- Repository secret protection
- Branch protection rules
- Required status checks

---

**Quick Validation Command:**
```bash
# Validate YAML syntax
yamllint .github/workflows/ci-cd.yml

# Test workflow locally
act -j build-and-test -n

# Push and monitor
git push && gh run watch
```
