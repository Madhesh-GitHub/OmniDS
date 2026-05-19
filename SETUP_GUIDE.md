# 🚀 OMNI-DS: Setup & Run Guide

## Quick Start (5 Minutes)

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Git

---

## Step-by-Step Setup

### 1. **Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Verify .env has GROQ_API_KEY
cat .env
# Should show: GROQ_API_KEY=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

# Start backend server
npm start
```

**Expected Output:**
```
🚀 Omni-DS Backend running on http://localhost:5000
📊 Using Groq API for LLM tasks
```

### 2. **Frontend Setup** (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

**Expected Output:**
```
  VITE v8.0.12  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### 3. **Access the Application**

Open browser: **http://localhost:5173/**

---

## 📊 How to Use Omni-DS

### Workflow Overview

```
┌─────────────────────────────────────────────────┐
│  Step 1: Upload CSV Data                        │
│  - Select your dataset                          │
│  - Choose expertise level (Beginner/Expert)     │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Step 2: Define Problem                         │
│  - Describe your data science challenge         │
│  - Select target variable                       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Step 3: Processing (5 Agent Stages)            │
│  1. Intent Classification                       │
│  2. Feature Engineering                         │
│  3. Model Selection                             │
│  4. Pipeline Generation                         │
│  5. Insights & Evaluation                       │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Step 4: View Results                           │
│  - Model Performance Metrics                    │
│  - Key Insights                                 │
│  - Actionable Recommendations                   │
│  - Generated Python Code                        │
└─────────────────────────────────────────────────┘
```

### Example Workflow

1. **Upload Data**: Use sample_data.csv (see below)
2. **Problem**: "Predict customer churn based on historical behavior"
3. **Target**: Select "Churn" column
4. **Let it Process**: Watch all 5 agents work
5. **Get Results**: Review insights and download report

---

## 📝 Sample Data Format

Create `sample_data.csv`:

```csv
CustomerID,Age,Tenure,Monthly_Charges,Total_Charges,Churn
1001,32,12,65.5,786,0
1002,45,24,89.2,2140,0
1003,28,3,45.0,135,1
1004,56,36,110.8,3989,0
1005,38,8,72.3,578,1
```

---

## 🔑 Agent Roles & Responsibilities

| Agent | Role | Function |
|-------|------|----------|
| **Reasoning Agent** | Intent Classification | Parses problem → Classifies task domain (Regression/Classification/Clustering/TimeSeries) |
| **Data Engineer Agent** | Feature Engineering | Generates feature strategies, handles missing values, outlier detection |
| **Model Architect Agent** | Model Selection | Builds diverse ensemble, recommends hyperparameters |
| **Pipeline Generator Agent** | Code Generation | Creates executable Python pipelines using scikit-learn/xgboost |
| **Insights Agent** | Explainability | SHAP analysis, business insights, recommendations |

---

## 🛠️ Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -an | grep 5000

# Kill process on port 5000
lsof -ti:5000 | xargs kill -9  # macOS/Linux
taskkill /PID <PID> /F  # Windows

# Restart backend
npm start
```

### GROQ API errors
```bash
# Verify API key in .env
echo $GROQ_API_KEY

# Get new key from https://console.groq.com/
# Update .env file
nano .env
```

### CORS errors
```bash
# Ensure both servers running:
# Backend: http://localhost:5000
# Frontend: http://localhost:5173
```

### Data upload fails
- Check file is CSV format
- Ensure file < 50MB
- Check backend is running

---

## 📚 API Endpoints Reference

### 1. Intent Analysis
```
POST /api/analyze-intent
Body: {
  "problemStatement": "string",
  "dataPreview": "string",
  "userExpertise": "beginner|expert"
}
Returns: Stream (Server-Sent Events)
```

### 2. Feature Engineering
```
POST /api/feature-engineering
Body: {
  "taskDomain": "Classification|Regression|Clustering|TimeSeries",
  "dataPreview": "string",
  "recommendations": ["string"]
}
Returns: Stream (Server-Sent Events)
```

### 3. Model Selection
```
POST /api/model-selection
Body: {
  "taskDomain": "string",
  "dataCharacteristics": "string",
  "targetMetric": "string"
}
Returns: Stream (Server-Sent Events)
```

### 4. Generate Pipeline
```
POST /api/generate-pipeline
Body: {
  "taskDomain": "string",
  "strategy": "string",
  "dataCharacteristics": "string",
  "selectedModels": ["string"],
  "userExpertise": "beginner|expert"
}
Returns: Stream (Server-Sent Events)
```

### 5. Chat
```
POST /api/chat
Body: {
  "message": "string",
  "conversationHistory": [{ role, content }],
  "systemRole": "string"
}
Returns: Stream (Server-Sent Events)
```

---

## 🎯 Architecture Overview

```
Frontend (React + Vite)
├── DataUpload Component
├── ProblemStatement Component
├── WorkflowVisualizer Component
├── Results Component
└── Chat Component

        ↕ HTTP + SSE

Backend (Express.js)
├── Intent Classification Endpoint
├── Feature Engineering Endpoint
├── Model Selection Endpoint
├── Pipeline Generation Endpoint
├── Insights Endpoint
└── Chat Endpoint

        ↕ LLM API Calls

Groq API (llama-3.3-70b-versatile)
├── Intent Reasoning
├── Feature Recommendations
├── Model Strategy
├── Code Generation
├── Insights & Explanations
└── Chat Responses
```

---

## 🚀 Deployment

### Deploy Backend to Vercel/Render

```bash
# Add to backend/vercel.json
{
  "version": 2,
  "builds": [
    { "src": "server.js", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "server.js" }
  ]
}

# Deploy
vercel deploy
```

### Deploy Frontend to Vercel

```bash
# Install vercel CLI
npm install -g vercel

# Deploy from frontend directory
vercel

# Update API calls to prod backend
# In frontend components, change localhost:5000 → your-backend-url
```

---

## 📊 Example Use Cases

### 1. Classification: Customer Churn
```
Problem: Predict which customers will churn
Task Domain: Classification
Models: XGBoost, Random Forest, Logistic Regression
Output: Churn probability, feature importance, retention insights
```

### 2. Regression: Sales Forecasting
```
Problem: Forecast monthly sales for next quarter
Task Domain: Regression
Models: Linear Regression, Gradient Boosting, SVR
Output: Sales predictions, confidence intervals, trend analysis
```

### 3. Time-Series: Stock Price
```
Problem: Predict stock prices based on historical data
Task Domain: TimeSeries
Models: ARIMA, Prophet, LSTMs
Output: Price forecasts, seasonality patterns, anomalies
```

### 4. Clustering: Customer Segmentation
```
Problem: Group customers by behavior
Task Domain: Clustering
Models: K-Means, DBSCAN, Hierarchical
Output: Customer segments, profiles, recommendations
```

---

## 🔒 Security Notes

- Never commit `.env` to git
- Rotate GROQ API keys regularly
- Use environment variables for secrets
- Validate file uploads on backend
- Implement rate limiting for production

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review API endpoint docs
3. Check browser console (F12) for errors
4. Check backend logs for API errors
5. Verify GROQ API key is valid

---

## 🎓 Learning Resources

- [Groq API Documentation](https://console.groq.com/docs)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Scikit-learn Documentation](https://scikit-learn.org)
- [XGBoost Documentation](https://xgboost.readthedocs.io)

---

## ✅ Checklist Before Submitting

- [ ] Backend running on localhost:5000
- [ ] Frontend running on localhost:5173
- [ ] Can upload CSV files
- [ ] Problem statement input works
- [ ] All 5 processing stages complete
- [ ] Results page displays properly
- [ ] Chat assistant responds
- [ ] No console errors
- [ ] GROQ API key valid
- [ ] README and docs complete

---

**Good luck with your hackathon! 🚀**
