# OmniDS - Adaptive Data Science Language Model Framework

## 🎯 Overview

**Omni-DS** is an innovative MERN-based platform that harnesses Large Language Models (Groq LLaMA) to create adaptive, agentic data science workflows. It intelligently transitions across regression, classification, clustering, and time-series analysis tasks by understanding the semantic intent of your problem and automatically generating production-ready data science pipelines.

## ✨ Key Features

### 🧠 Multi-Agent Architecture
- **Reasoning Agent**: Intent classification & problem understanding
- **Data Engineer Agent**: Intelligent feature engineering & preprocessing
- **Model Architect Agent**: Diverse ensemble model selection
- **Pipeline Generator Agent**: Executable code generation
- **Insights Agent**: SHAP analysis & business insights

### 🔄 Self-Correction Loop
The system employs a crucial reflection mechanism:
- Generated code errors are captured
- Error traces fed back to LLM
- Automatic code correction and re-execution
- Guaranteed mathematically sound outputs

### 🎓 Adaptive Interface
- **Beginner Mode**: Plain-English explanations, visual dashboards
- **Expert Mode**: Granular control, advanced metrics, hyperparameter tuning

### 📊 Task Support
- **Classification**: Binary/Multi-class problems
- **Regression**: Continuous value prediction
- **Clustering**: Unsupervised pattern discovery
- **Time-Series**: Temporal forecasting

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Upload    │→ │   Problem    │→ │  Workflow    │      │
│  │    Data     │  │ Definition   │  │  Visualizer  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                              ↓                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Chat Assistant (Real-time)               │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │ (HTTP + SSE)
┌──────────────────────────────┴──────────────────────────────┐
│                  Backend (Express.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Intent    │→ │   Feature    │→ │    Model    │      │
│  │ Analysis    │  │ Engineering  │  │ Selection   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         ↓              ↓                    ↓               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Pipeline   │  │   Insights   │  │    Chat     │      │
│  │ Generation  │  │  Generation  │  │  Endpoint   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────────────┬──────────────────────────────┘
                               │ (LLM API)
┌──────────────────────────────┴──────────────────────────────┐
│           Groq API (llama-3.3-70b-versatile)               │
│  High-speed LLM inference for all reasoning & generation  │
└──────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
```bash
node -v  # v16+
npm -v   # v8+
```

### 1. Backend
```bash
cd backend
npm install
npm start
# → Runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
# → Runs on http://localhost:5173
```

### 3. Access
Open browser: `http://localhost:5173`

## 📖 User Workflow

### Step 1: Upload Data
- Drag & drop CSV file
- Select expertise level (Beginner/Expert)
- View data preview

### Step 2: Define Problem
- Write natural language problem statement
- Select target variable
- System understands intent

### Step 3: Processing (5 Stages)
```
1. Intent Classification     → "This is a Classification task"
2. Feature Engineering      → "Suggested features: tenure_bins, age_groups"
3. Model Selection          → "Ensemble: XGBoost, RandomForest, LR"
4. Pipeline Generation      → "Executable Python code ready"
5. Insights Generation      → "Feature importance, SHAP values, recommendations"
```

### Step 4: Results
- Performance metrics (Accuracy, Precision, Recall, F1)
- Business insights & explanations
- Actionable recommendations
- Downloadable code & report

## 💡 Example Use Cases

### 1. Customer Churn Prediction
**Input**: Customer data (age, tenure, charges)
**Problem**: "Predict which customers will churn"
**Output**: 
- Churn probability scores
- Top factors: Tenure (most important), Monthly Charges
- Recommendation: Target retention for low-tenure customers

### 2. Sales Forecasting
**Input**: Historical sales data (monthly)
**Problem**: "Forecast sales for next quarter"
**Output**:
- Quarterly predictions with confidence intervals
- Seasonal patterns identified
- Trend analysis

### 3. Customer Segmentation
**Input**: Customer behavior data
**Problem**: "Segment customers into groups"
**Output**:
- 4-5 customer segments identified
- Segment profiles & characteristics
- Marketing recommendations per segment

## 🔧 API Endpoints

### Intent Analysis
```
POST /api/analyze-intent
```

### Feature Engineering
```
POST /api/feature-engineering
```

### Model Selection
```
POST /api/model-selection
```

### Pipeline Generation
```
POST /api/generate-pipeline
```

### Insights Generation
```
POST /api/generate-insights
```

### Chat
```
POST /api/chat
```

All endpoints return Server-Sent Events (SSE) for streaming responses.

## 🎨 UI Features

- **Gradient Design**: Modern purple/blue theme
- **Progress Tracking**: Visual step indicators
- **Real-time Chat**: Integrated assistant panel
- **Data Preview**: File preview before processing
- **Results Dashboard**: Comprehensive metrics display
- **Responsive Design**: Mobile-friendly interface

## 🔐 Security

- Input validation on file uploads
- CORS configured
- API key secured in .env
- Rate limiting ready for production

## 📦 Tech Stack

**Frontend**
- React 19.2.6
- Vite 8.0.12
- Tailwind CSS 4.3.0

**Backend**
- Express.js 4.18.2
- Node.js (v16+)
- Groq SDK 0.3.2

**AI/ML**
- Groq API (llama-3.3-70b-versatile)
- Server-Sent Events (SSE)

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Backend
vercel deploy --cwd backend

# Frontend
vercel deploy --cwd frontend
```

### Alternative: Docker
```bash
docker build -t omnids-backend ./backend
docker build -t omnids-frontend ./frontend
docker-compose up
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 5000 already in use | `lsof -ti:5000 \| xargs kill -9` |
| GROQ API error | Verify API key in `.env` |
| CORS error | Ensure both servers running |
| Data upload fails | Check CSV format & size < 50MB |

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup instructions
- [API Reference](./API.md) - Endpoint documentation
- [Architecture](./ARCHITECTURE.md) - System design

## 🎓 Learning Resources

- [Groq Documentation](https://console.groq.com/docs)
- [React Hooks](https://react.dev/reference/react)
- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)
- [LLM Prompting](https://www.promptengineering.org/)

## 🏆 Hackathon Submission Checklist

- ✅ MERN stack implemented
- ✅ Multi-agent architecture
- ✅ LLM integration (Groq)
- ✅ Task domain classification
- ✅ Pipeline generation
- ✅ Results visualization
- ✅ Chat assistant
- ✅ Responsive UI
- ✅ Error handling
- ✅ Documentation

## 📞 Support & Feedback

For issues or feedback:
1. Check documentation first
2. Review error messages carefully
3. Check browser console (F12)
4. Verify all services running
5. Review API responses

## 📝 License

Built for ABB EngineeredX Hackathon 2024

## 🙏 Acknowledgments

- Groq for blazing-fast LLM inference
- React & Vite communities
- Open-source ML libraries

---

**Ready to revolutionize data science workflows? 🚀**

Start uploading your data and let Omni-DS work its magic!
