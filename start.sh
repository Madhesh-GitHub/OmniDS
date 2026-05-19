#!/bin/bash

# OmniDS Quick Start Script
# Run this to start the entire project

echo "🚀 Starting Omni-DS Application..."
echo ""

# Check Node.js
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed"
    exit 1
fi

echo "✅ Node.js $(node -v) found"
echo ""

# Start Backend
echo "📦 Starting Backend Server..."
cd backend
npm install 2>/dev/null
npm start &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""

# Wait for backend to start
sleep 3

# Start Frontend
echo "🎨 Starting Frontend Server..."
cd ../frontend
npm install 2>/dev/null
npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend started (PID: $FRONTEND_PID)"
echo ""

# Display URLs
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎉 Omni-DS is Ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 Frontend: http://localhost:5173"
echo "🔌 Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for processes
wait
