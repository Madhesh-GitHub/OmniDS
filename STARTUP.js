#!/usr/bin/env node

/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                     🚀 OMNI-DS v1.0.0                        ║
 * ║   Adaptive Data Science Language Model Framework             ║
 * ║          MERN Stack + Groq LLM Multi-Agent System            ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * PROJECT INITIALIZATION COMPLETE ✅
 * 
 * Built for: ABB EngineeredX Hackathon 2024
 * Created: May 18, 2024
 */

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                    ⚡ QUICK START GUIDE ⚡                   ║
╚════════════════════════════════════════════════════════════════╝

📍 You are in: c:\\Users\\madhe\\My Dev\\ABB EngineeredX\\OmniDS

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 OPTION 1: ONE-COMMAND START (Windows)
   
   .\start.bat
   
   This will:
   ✓ Install all dependencies
   ✓ Start backend on port 5000
   ✓ Start frontend on port 5173
   ✓ Open browser automatically

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 OPTION 2: MANUAL SETUP (PowerShell)
   
   # Terminal 1 - Backend
   cd backend
   npm install
   npm start
   
   # Terminal 2 - Frontend (while Terminal 1 running)
   cd frontend
   npm install
   npm run dev
   
   # Then open: http://localhost:5173

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 DOCUMENTATION FILES (Read these!)
   
   START HERE:
   📄 QUICKSTART.md - 60-second setup guide
   
   MAIN DOCS:
   📄 README.md - Project overview
   📄 PROJECT_COMPLETE.md - What was built
   
   DETAILED:
   📄 SETUP_GUIDE.md - Full setup instructions
   📄 API_REFERENCE.md - All API endpoints
   📄 ARCHITECTURE.md - System design

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ WHAT'S BEEN CREATED
   
   Backend (Express.js):
   ✅ 7 API endpoints (5 LLM-powered)
   ✅ Multi-agent LLM architecture
   ✅ File upload & CSV profiling
   ✅ Server-Sent Events (SSE) streaming
   ✅ Groq LLM integration (already configured!)
   
   Frontend (React + Vite):
   ✅ 4-step workflow UI
   ✅ 5 React components
   ✅ Real-time chat assistant
   ✅ Beautiful gradient design
   ✅ Responsive mobile-friendly
   
   Documentation:
   ✅ 5 comprehensive markdown guides
   ✅ Full API reference
   ✅ Architecture documentation
   ✅ Quick start & troubleshooting

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧠 5-AGENT LLM PIPELINE
   
   1. Reasoning Agent
      → Understands problem intent
      → Classifies task domain
      → Recommends initial strategy
   
   2. Data Engineer Agent
      → Analyzes data structure
      → Recommends features
      → Handles missing values
   
   3. Model Architect Agent
      → Selects ensemble models
      → Suggests hyperparameters
      → Explains trade-offs
   
   4. Pipeline Generator Agent
      → Creates executable Python code
      → Includes preprocessing
      → Adds error handling
   
   5. Insights Agent
      → Calculates feature importance
      → Generates SHAP explanations
      → Creates business insights

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧪 TEST THE SYSTEM
   
   After starting services:
   
   1. Open: http://localhost:5173
   
   2. Upload test data:
      Use: sample_data.csv (included)
      Or: Create your own CSV
   
   3. Define problem:
      "Predict customer churn"
      Target: Churn column
      Expertise: Beginner (first time)
   
   4. Watch processing:
      5 stages, ~3-4 minutes
   
   5. View results:
      Metrics, insights, code, recommendations

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ IMPORTANT NOTES
   
   ✓ GROQ_API_KEY already in backend/.env
   ✓ No setup needed for LLM
   ✓ All dependencies in package.json
   ✓ Just run npm install & start
   
   Ports Used:
   • Backend: 5000
   • Frontend: 5173
   • MongoDB: 27017 (optional)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐛 IF SOMETHING BREAKS
   
   1. Check browser console: Press F12
   2. Check backend logs: Terminal where npm start runs
   3. Verify ports: Both :5000 and :5173 running
   4. Read: QUICKSTART.md troubleshooting section
   
   Common fixes:
   • Port in use: taskkill /PID <PID> /F
   • Module missing: npm install <module>
   • CORS error: Check both servers running
   • API error: Verify GROQ_API_KEY in .env

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚀 READY TO GO!
   
   Your complete hackathon-ready prototype is built!
   
   Next: Run .\start.bat and let Omni-DS work its magic!
   
   Questions? Check the comprehensive documentation files.

╔════════════════════════════════════════════════════════════════╗
║  Good luck with your hackathon! 🎉                            ║
╚════════════════════════════════════════════════════════════════╝
`);
