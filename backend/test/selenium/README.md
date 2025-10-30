# Selenium UI Tests for MERN Application

This directory contains automated Selenium UI tests for the MERN stack application.

## Test Files

1. **adminLogin.test.js** - Tests for Admin Login functionality
2. **createEvent.test.js** - Tests for Event Creation functionality

## Prerequisites

Before running the tests, ensure you have:

1. **Node.js** installed (v14 or higher)
2. **Chrome browser** installed
3. **Backend server** running on `http://localhost:5000`
4. **Frontend server** running on `http://localhost:5173`

## Setup

1. Install dependencies (already done if you ran `npm install` in backend):
   ```bash
   cd backend
   npm install
   ```

2. The following packages are required:
   - `selenium-webdriver`
   - `chromedriver`
   - `mocha` (test runner)

## Running the Tests

### Option 1: Run all Selenium tests
```bash
cd backend
npm run test:selenium
```

### Option 2: Run individual test files
```bash
# Run Admin Login tests
npx mocha test/selenium/adminLogin.test.js --timeout 30000 --exit

# Run Create Event tests
npx mocha test/selenium/createEvent.test.js --timeout 30000 --exit
```

## Test Scenarios

### Admin Login Tests (adminLogin.test.js)
1. **Load login page** - Verifies the login page loads successfully
2. **Empty field validation** - Tests error handling for empty credentials
3. **Valid login** - Tests successful login with correct credentials
4. **Invalid credentials** - Tests error message for wrong credentials
5. **Form elements** - Verifies all required form elements are present

### Create Event Tests (createEvent.test.js)
1. **Load dashboard** - Verifies events dashboard loads after login
2. **Open modal** - Tests opening the create event modal
3. **Empty form validation** - Tests validation for empty form submission
4. **Create event** - Tests successful event creation with valid data
5. **Form fields** - Verifies all required form fields are present
6. **Close modal** - Tests modal close functionality

## Important Notes

### Before Running Tests:

1. **Start Backend Server:**
   ```bash
   cd backend
   npm start
   ```
   Backend should be running on `http://localhost:5000`

2. **Start Frontend Server:**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend should be running on `http://localhost:5173`

3. **Database Setup:**
   - Ensure MongoDB is running
   - Create an admin user with credentials:
     - Email: `admin@example.com`
     - Password: `admin123`
   
   You can create an admin user by:
   - Using the signup page at `http://localhost:5173/admin/signup`
   - Or by running the admin signup endpoint directly

### Test Configuration

The tests are configured to run in **headless mode** by default, which means no browser window will open. The tests include:

- Automatic waits for elements to load
- Error handling for network issues
- Console logging for test progress
- 30-second timeout for each test

### Troubleshooting

**If tests fail:**

1. **Check servers are running:**
   - Backend: `http://localhost:5000`
   - Frontend: `http://localhost:5173`

2. **Check ChromeDriver:**
   - ChromeDriver version should match your Chrome browser version
   - Reinstall if needed: `npm install chromedriver@latest`

3. **Check admin credentials:**
   - Ensure admin user exists in database
   - Email: `admin@example.com`
   - Password: `admin123`

4. **Database connection:**
   - Verify MongoDB is running
   - Check `.env` file in backend has correct database URL

5. **Port conflicts:**
   - Ensure no other services are using ports 5000 or 5173

## Test Output

When tests run successfully, you'll see output like:
```
Admin Login UI Tests
    ✓ should load the login page successfully
    ✓ should show error message when fields are empty
    ✓ should successfully login with valid credentials
    ✓ should show error with invalid credentials
    ✓ should verify all form elements are present

Create Event UI Tests
    ✓ should load the events dashboard page after login
    ✓ should open create event modal when clicking add button
    ✓ should show validation error when submitting empty event form
    ✓ should successfully create a new event with valid data
    ✓ should verify all required fields in create event form
    ✓ should close the modal when clicking close button

  11 passing (25s)
```

## Continuous Integration

These tests can be integrated into CI/CD pipelines. For CI environments:

1. Use headless mode (already configured)
2. Ensure Chrome is installed in CI environment
3. Start backend and frontend servers before running tests
4. Use appropriate wait times for slower CI environments

## Additional Notes

- Tests use **Mocha** as the test framework
- Tests run in **headless Chrome** by default for faster execution
- Each test file includes setup and teardown hooks
- Tests are independent and can run in any order
- Timeout is set to 30 seconds per test to account for page loads
