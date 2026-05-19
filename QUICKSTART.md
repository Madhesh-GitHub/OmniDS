# 🎯 OMNI-DS: Complete Quick-Start Guide for Windows

## ⚡ 60-Second Setup (Fastest Way!)

### Option 1: Use Batch Script (Recommended for Windows)
```powershell
# From OmniDS root directory
.\start.bat
```
This will automatically:
- Install dependencies
- Start backend on port 5000
- Start frontend on port 5173
- Open browser

---

## 📋 Manual Setup (If Above Doesn't Work)

### Prerequisites Check
```powershell
# Open PowerShell and verify:
node -v      # Should show v16 or higher
npm -v       # Should show v8 or higher
```

### Step 1: Backend Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies
npm install

# Verify .env file exists and has GROQ_API_KEY
type .env
# Should output: GROQ_API_KEY=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
```

**Start Backend:**
```powershell
npm start
```

**Expected Output:**
```
🚀 Omni-DS Backend running on http://localhost:5000
📊 Using Groq API for LLM tasks
```

✅ Leave this terminal running!

---

### Step 2: Frontend Setup (NEW TERMINAL)

```powershell
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v8.0.12  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ Leave this terminal running!

---

### Step 3: Open Browser

Navigate to: **http://localhost:5173**

🎉 You should see the Omni-DS interface!

---

## 🔍 Verification Checklist

```powershell
# In another terminal, verify both services running:

# Check backend
curl http://localhost:5000/api/health
# Should return: {"status":"Backend is running!","timestamp":"..."}

# Check frontend
curl http://localhost:5173
# Should return HTML
```

---

## 📊 First Use: Complete Workflow

### 1. Upload Sample Data
- Download [sample_data.csv](./sample_data.csv)
- Click "Upload Data" on the UI
- Drag & drop the CSV file
- Select expertise: **Beginner** (recommended for first try)
- Click "📤 Upload & Continue"

### 2. Define Problem
- Problem Statement: `"Predict customer churn based on their historical behavior and tenure"`
- Target Variable: `Churn`
- Click "Analyze Problem →"

### 3. Watch the Magic ✨
The system will process through 5 stages:
1. ✓ Intent Classification (30 sec)
2. ✓ Feature Engineering (30 sec)
3. ✓ Model Selection (30 sec)
4. ✓ Pipeline Generation (60 sec)
5. ✓ Insights Generation (30 sec)

Total: ~3-4 minutes

### 4. View Results
- Performance metrics (Accuracy ~95%)
- Business insights
- Recommendations
- Python code
- Download report

---

## 🐛 Troubleshooting

### Issue: "Backend not running"
```powershell
# Check if port 5000 is in use
netstat -ano | findstr :5000

# If yes, kill the process
taskkill /PID <PID_NUMBER> /F

# Try again
cd backend
npm start
```

### Issue: "CORS error in browser"
```
Ensure BOTH servers are running:
✓ Backend: http://localhost:5000
✓ Frontend: http://localhost:5173
```

### Issue: "Cannot find module groq-sdk"
```powershell
cd backend
npm install groq-sdk
```

### Issue: "Port 5173 already in use"
```powershell
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F

# Or use different port
npm run dev -- --port 3000
```

### Issue: "GROQ API error"
```
1. Check .env has valid GROQ_API_KEY
2. Get new key from https://console.groq.com/
3. Update backend/.env
4. Restart backend
```

---

## 🎯 Testing Different Scenarios

### Scenario 1: Classification (Churn Prediction)
```
Data: sample_data.csv
Problem: "Predict which customers will churn"
Result: Churn probability with feature importance
```

### Scenario 2: Regression (Sales Forecasting)
```
Create sales_data.csv with numerical target
Problem: "Forecast monthly sales"
Result: Sales predictions with confidence intervals
```

### Scenario 3: Time-Series (Stock Price)
```
Create time_series_data.csv with date column
Problem: "Predict stock prices for next month"
Result: Future prices with trend analysis
```

---

## 💬 Using Chat Assistant

The right panel has an AI chat assistant:
- Ask questions anytime
- Get explanations on metrics
- Learn about data science
- Type and press Enter to chat

Example questions:
- "What does F1-score mean?"
- "How is feature importance calculated?"
- "What's SHAP analysis?"

---

## 📊 Data Upload Requirements

### CSV Format
- Headers in first row
- Numerical or categorical data
- UTF-8 encoding
- Size: < 50MB

### Example Structure
```csv
Feature1,Feature2,Feature3,Target
1.2,2.3,A,0
2.1,3.2,B,1
3.0,4.1,C,0
```

---

## 🚀 Production Deployment

### Deploy to Vercel

**Backend:**
```powershell
# Install vercel CLI
npm install -g vercel

# From backend folder
cd backend
vercel deploy

# Note the URL: https://your-backend-url.vercel.app
```

**Frontend:**
```powershell
# From frontend folder
cd frontend

# Update API URL in src/components/Chat.jsx and others
# Change: http://localhost:5000 → https://your-backend-url.vercel.app

vercel deploy
```

### Using Docker Compose

```powershell
# From root directory
docker-compose up

# Access at http://localhost:5173
```

---

## 📁 Project Structure

```
OmniDS/
├── backend/                 # Express server
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   ├── .env                # Environment variables
│   ├── uploads/            # Uploaded CSV files
│   └── Dockerfile          # Docker configuration
│
├── frontend/               # React app
│   ├── src/
│   │   ├── App.jsx         # Main component
│   │   ├── components/     # React components
│   │   │   ├── DataUpload.jsx
│   │   │   ├── ProblemStatement.jsx
│   │   │   ├── WorkflowVisualizer.jsx
│   │   │   ├── Results.jsx
│   │   │   └── Chat.jsx
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Styles
│   ├── package.json        # Dependencies
│   ├── vite.config.js      # Vite configuration
│   └── Dockerfile          # Docker configuration
│
├── README.md               # Project overview
├── SETUP_GUIDE.md         # Detailed setup
├── API_REFERENCE.md       # API documentation
├── start.bat              # Windows startup script
├── start.sh               # Unix startup script
└── sample_data.csv        # Example dataset
```

---

## 🔑 Environment Variables

### Backend (.env)
```
GROQ_API_KEY=your_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (set in Dockerfile)
```
VITE_API_URL=http://localhost:5000
```

---

## 📞 Getting Help

1. **Browser Console**: Press F12 to see errors
2. **Backend Logs**: Check terminal where npm start runs
3. **API Status**: Visit http://localhost:5000/api/health
4. **Check Documentation**:
   - [API Reference](./API_REFERENCE.md)
   - [Setup Guide](./SETUP_GUIDE.md)
   - [README](./README.md)

---

## ✅ Pre-Submission Checklist

- [ ] Backend running on localhost:5000
- [ ] Frontend running on localhost:5173
- [ ] Can upload CSV files
- [ ] Problem statement works
- [ ] All 5 processing stages complete
- [ ] Results display correctly
- [ ] Chat assistant responds
- [ ] No console errors
- [ ] GROQ API working
- [ ] Documentation complete

---

## 🎓 What's Happening Under the Hood

```
User Upload CSV
       ↓
┌─────────────────────────────────────┐
│  Backend Receives File              │
│  - Profiles data (columns, rows)    │
└─────────────────────────────────────┘
       ↓
User Describes Problem + Selects Target
       ↓
┌─────────────────────────────────────┐
│  5 Agents Process in Sequence       │
│  1. Classify task type              │
│  2. Recommend features              │
│  3. Select models                   │
│  4. Generate code                   │
│  5. Create insights                 │
│  Each agent uses Groq LLM           │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  Results Displayed                  │
│  - Metrics dashboard                │
│  - Code snippets                    │
│  - Business insights                │
│  - Actionable recommendations       │
└─────────────────────────────────────┘
```

---

## 🏆 Hackathon Highlights

✅ **Multi-Agent System**: 5 specialized AI agents working together
✅ **Adaptive UI**: Different views for beginner vs expert users
✅ **Real-time Processing**: Server-Sent Events for streaming responses
✅ **Production-Ready**: Generated code ready to deploy
✅ **Full MERN Stack**: Modern web application
✅ **LLM Integration**: Groq's fastest inference
✅ **Beautiful UI**: Modern gradient design with Tailwind CSS

---

## 🎉 You're All Set!

Run `.\start.bat` and start analyzing data!

For questions or issues, check the documentation or the code comments.

**Good luck with your hackathon! 🚀**

---

**Last Updated**: May 18, 2024
**Version**: 1.0.0
