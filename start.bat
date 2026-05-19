@echo off
REM OmniDS Quick Start Script for Windows

echo 🚀 Starting Omni-DS Application...
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed
    exit /b 1
)

echo ✅ Node.js found
echo.

REM Start Backend
echo 📦 Starting Backend Server...
cd backend
call npm install
start "Omni-DS Backend" npm start
cd ..
timeout /t 3
echo ✅ Backend started
echo.

REM Start Frontend
echo 🎨 Starting Frontend Server...
cd frontend
call npm install
start "Omni-DS Frontend" npm run dev
cd ..
echo ✅ Frontend started
echo.

REM Display URLs
echo ========================================
echo 🎉 Omni-DS is Ready!
echo ========================================
echo.
echo 📱 Frontend: http://localhost:5173
echo 🔌 Backend:  http://localhost:5000
echo.
echo Browser will open shortly...
echo.
timeout /t 2
start http://localhost:5173
