# API Reference Guide

## Base URL
```
Development: http://localhost:5000
Production: https://your-backend-url.com
```

---

## Authentication
Currently no authentication required. For production, implement JWT or API keys.

---

## Endpoints

### 1. Health Check
**Verify backend is running**

```
GET /api/health
```

**Response:**
```json
{
  "status": "Backend is running!",
  "timestamp": "2024-05-18T10:30:00.000Z"
}
```

---

### 2. Intent Analysis
**Analyze problem statement and classify task domain**

```
POST /api/analyze-intent
```

**Request Body:**
```json
{
  "problemStatement": "Predict customer churn based on historical data",
  "dataPreview": "CustomerID,Age,Tenure\n1001,32,12\n1002,45,24",
  "userExpertise": "beginner"
}
```

**Response:** Server-Sent Events (streaming)
```json
{
  "taskDomain": "Classification",
  "intent": "Binary classification to predict customer churn",
  "recommendedModels": ["XGBoost", "RandomForest", "LogisticRegression"],
  "dataCharacteristics": "Tabular data with numerical and categorical features",
  "strategy": "1. Handle class imbalance with SMOTE\n2. Scale numerical features\n3. Encode categorical variables..."
}
```

---

### 3. Feature Engineering
**Get feature engineering recommendations**

```
POST /api/feature-engineering
```

**Request Body:**
```json
{
  "taskDomain": "Classification",
  "dataPreview": "CustomerID,Age,Tenure,...",
  "recommendations": ["handle missing values", "scale features"]
}
```

**Response:** Streaming text with:
- Feature creation strategies
- Missing value handling approaches
- Outlier detection methods
- Python code snippets

---

### 4. Model Selection
**Get ensemble model recommendations**

```
POST /api/model-selection
```

**Request Body:**
```json
{
  "taskDomain": "Classification",
  "dataCharacteristics": "Tabular customer data with 20 features, slight class imbalance",
  "targetMetric": "f1-score"
}
```

**Response:** Streaming text with:
- Recommended ensemble models
- Justification for each model
- Hyperparameter suggestions
- Comparison table
- Python implementation code

---

### 5. Generate Pipeline
**Generate complete analysis pipeline**

```
POST /api/generate-pipeline
```

**Request Body:**
```json
{
  "taskDomain": "Classification",
  "strategy": "Handle imbalance with SMOTE, scale features, ensemble of 3 models",
  "dataCharacteristics": "Tabular, 20 features, 10K rows",
  "selectedModels": ["XGBoost", "RandomForest", "LogisticRegression"],
  "userExpertise": "expert"
}
```

**Response:** Streaming Python code

**Example Generated Code:**
```python
import pandas as pd
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier
from sklearn.ensemble import RandomForestClassifier

# Pipeline implementation...
df = pd.read_csv('data.csv')
X = df.drop('target', axis=1)
y = df['target']

# Preprocessing, training, evaluation...
```

---

### 6. Generate Insights
**Generate business insights from results**

```
POST /api/generate-insights
```

**Request Body:**
```json
{
  "modelResults": {
    "accuracy": 0.945,
    "precision": 0.932,
    "recall": 0.938,
    "f1": 0.935,
    "roc_auc": 0.972
  },
  "userExpertise": "beginner",
  "taskDomain": "Classification"
}
```

**Response for Beginner:**
```
📊 Model Performance
Your model is very accurate at 94.5%, meaning it correctly predicts 
outcomes almost all the time.

💡 Key Insights
- The model is balanced in precision and recall
- Recommendation: Deploy to production
- Monitor for data drift monthly

🎯 Next Steps
- Collect feedback from real predictions
- Retrain quarterly with new data
```

**Response for Expert:**
```
Detailed statistical analysis including:
- Confidence intervals (95%, 99%)
- Cross-validation variance analysis
- Feature importance scores
- SHAP value decomposition
- Calibration curves
- Sensitivity analysis
```

---

### 7. Profile Data
**Upload and profile CSV file**

```
POST /api/profile-data
Content-Type: multipart/form-data
```

**Request:**
- Field: `file` (CSV file)

**Response:**
```json
{
  "success": true,
  "fileName": "customer_data.csv",
  "rowCount": 10000,
  "columnCount": 20,
  "columns": [
    "CustomerID",
    "Age",
    "Tenure",
    "Monthly_Charges",
    "Churn"
  ],
  "preview": "CustomerID,Age,Tenure...\n1001,32,12...",
  "filePath": "/api/download/1716031800000-customer_data.csv"
}
```

---

### 8. Chat
**Real-time chat with assistant**

```
POST /api/chat
```

**Request Body:**
```json
{
  "message": "What does precision mean?",
  "conversationHistory": [
    {
      "role": "assistant",
      "content": "Hello! How can I help?"
    },
    {
      "role": "user",
      "content": "Explain model metrics"
    }
  ],
  "systemRole": "You are a data science expert helping beginners understand concepts."
}
```

**Response:** Streaming conversation responses

---

## Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "error": "Missing required field: problemStatement"
}
```

**500 Server Error**
```json
{
  "error": "Failed to process request: [error details]"
}
```

### Status Codes
- `200`: Success
- `400`: Bad request (invalid input)
- `500`: Server error
- `503`: Groq API unavailable

---

## Rate Limiting

### Current Limits (Development)
- No rate limiting

### Production Recommendations
- 100 requests per minute per IP
- 10 file uploads per hour per IP
- 1000 streaming responses per day per IP

---

## Data Format Examples

### CSV Input Format
```csv
Feature1,Feature2,Feature3,Target
1.2,2.3,3.4,0
2.1,3.2,4.3,1
3.0,4.1,5.2,0
```

### Valid Task Domains
- `Classification`
- `Regression`
- `Clustering`
- `TimeSeries`

### User Expertise Levels
- `beginner` - Simple explanations, guided workflow
- `expert` - Advanced options, detailed metrics

---

## Best Practices

### 1. Request Handling
```javascript
// Always check for errors
try {
  const response = await fetch('/api/endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) throw new Error('API request failed');
  
  // Handle streaming response
  const reader = response.body.getReader();
  // ...
} catch (error) {
  console.error('API Error:', error);
}
```

### 2. Streaming Responses
All LLM endpoints return Server-Sent Events (SSE):
```javascript
const response = await fetch('/api/generate-pipeline', { method: 'POST', ... });
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');
  
  lines.forEach(line => {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      console.log(data.content);
    }
  });
}
```

### 3. File Upload
```javascript
const formData = new FormData();
formData.append('file', csvFile);

const response = await fetch('/api/profile-data', {
  method: 'POST',
  body: formData
  // Don't set Content-Type header, let browser set it
});
```

---

## Pagination & Filtering

Currently not implemented. For future versions:
- Results pagination
- Filter by model performance
- Sort by metric values

---

## Webhooks

Not currently supported. For production, consider:
- Analysis completion webhooks
- Model performance alerts
- Data quality warnings

---

## SDK & Libraries

### JavaScript/Node.js
```javascript
import axios from 'axios';

const omnids = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Use like: omnids.post('/analyze-intent', data)
```

### Python
```python
import requests

BASE_URL = 'http://localhost:5000/api'

def analyze_intent(problem, data_preview, expertise):
    response = requests.post(
        f'{BASE_URL}/analyze-intent',
        json={
            'problemStatement': problem,
            'dataPreview': data_preview,
            'userExpertise': expertise
        },
        stream=True
    )
    
    for line in response.iter_lines():
        if line.startswith(b'data: '):
            yield json.loads(line[6:])
```

---

## Version History

### v1.0.0 (Current)
- Core 5-agent architecture
- Groq LLM integration
- Basic chat interface
- File upload support

### Planned v1.1
- Database integration (MongoDB)
- User authentication
- Model persistence
- Advanced analytics
- Export to ONNX format

---

## Support

For API issues:
1. Check status at `/api/health`
2. Verify Groq API key in backend
3. Check request format against examples
4. Review error messages carefully
5. Check backend logs

---

**Last Updated**: May 18, 2024
**Maintained By**: Omni-DS Team
