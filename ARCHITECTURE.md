# 🎓 Architecture & Design Document

## System Overview

Omni-DS is an agentic framework that uses Large Language Models to intelligently route data science problems through specialized agents, each handling a specific phase of the workflow.

```
┌──────────────────────────────────────────────────────────────────┐
│                        User Interface                             │
│                    (React + Vite + Tailwind)                     │
└──────────────────────────────────────────────────────────────────┘
                              ↓ HTTP + SSE
┌──────────────────────────────────────────────────────────────────┐
│                      Express Backend                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐           │
│  │ File Handler │  │ Route Layer  │  │ LLM Manager  │           │
│  └──────────────┘  └──────────────┘  └──────────────┘           │
└──────────────────────────────────────────────────────────────────┘
                              ↓ LLM API
┌──────────────────────────────────────────────────────────────────┐
│            Groq API - llama-3.3-70b-versatile                    │
│              (Agentic Multi-Agent Orchestration)                 │
└──────────────────────────────────────────────────────────────────┘
```

---

## Five-Phase Pipeline

### Phase 1: Contextual Intent Recognition
**Agent**: Reasoning Agent (powered by Groq LLM)

**Input**:
- Natural language problem statement
- Data preview (columns, types, sample rows)
- User expertise level

**Process**:
1. Parse user intent
2. Extract semantic meaning
3. Classify into domain (Classification/Regression/Clustering/TimeSeries)
4. Identify constraints and objectives

**Output**:
```json
{
  "taskDomain": "Classification",
  "intent": "Binary classification for customer churn",
  "recommendedModels": ["XGBoost", "RandomForest", "LogisticRegression"],
  "strategy": "Handle class imbalance with SMOTE, use ensemble..."
}
```

**LLM System Prompt**:
```
You are the Reasoning Agent. Parse the user's problem and:
1. Classify into task domain
2. Identify key data characteristics
3. Recommend initial strategy
Respond in JSON format.
```

---

### Phase 2: Adaptive Feature Engineering
**Agent**: Data Engineer Agent

**Input**:
- Task domain (from Phase 1)
- Data preview with statistics
- Initial recommendations

**Process**:
1. Analyze data structure
2. Identify missing values, outliers
3. Recommend feature engineering techniques
4. Generate feature creation code
5. Suggest encoding strategies for categorical vars

**Output**:
```python
# Python code snippets
df['age_group'] = pd.cut(df['age'], bins=[0, 25, 35, 50, 100])
df = pd.get_dummies(df, columns=['category'])
df = df.fillna(df.mean())
```

**Adaptive Behavior**:
- **Beginner**: High-level feature ideas with explanations
- **Expert**: Advanced techniques like SHAP interactions

---

### Phase 3: Intelligent Model Selection
**Agent**: Model Architect Agent

**Input**:
- Task domain
- Data characteristics (size, imbalance, features)
- Performance metric priority

**Process**:
1. Select ensemble of diverse models
2. Justify each model choice
3. Recommend hyperparameter starting points
4. Explain trade-offs

**Classification Example**:
```
Model 1: Logistic Regression
  - Why: Interpretable baseline, handles linear relationships
  - Hyperparams: C=1.0, solver='lbfgs'

Model 2: Random Forest
  - Why: Handles non-linearity, feature importance
  - Hyperparams: n_estimators=100, max_depth=10

Model 3: XGBoost
  - Why: State-of-the-art gradient boosting
  - Hyperparams: learning_rate=0.1, max_depth=6
```

---

### Phase 4: Executable Pipeline Generation
**Agent**: Pipeline Generator Agent

**Input**:
- All previous outputs (strategy, features, models)
- Complete data metadata
- User expertise level

**Process**:
1. Generate complete Python script
2. Include preprocessing pipeline
3. Add model training loops
4. Implement evaluation metrics
5. Add error handling

**Output**: Complete Python script

```python
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from xgboost import XGBClassifier
from sklearn.metrics import accuracy_score, f1_score

# Data loading
df = pd.read_csv('data.csv')
X = df.drop('target', axis=1)
y = df['target']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('model', XGBClassifier(max_depth=6))
])

# Training
pipeline.fit(X_train, y_train)

# Evaluation
y_pred = pipeline.predict(X_test)
print(f"F1-Score: {f1_score(y_test, y_pred)}")
```

---

### Phase 5: Insight & Explainability
**Agent**: Insights Agent

**Input**:
- Model performance metrics
- Model type and complexity
- User expertise level

**Process**:
1. Interpret model performance
2. Calculate feature importance
3. Generate SHAP explanations
4. Create business insights
5. Recommend next steps

**Output Formats**:

**For Beginners**:
```
📊 Your Model is 94.5% Accurate!

This means the model correctly predicts the outcome 
almost every time. It's ready for use.

💡 Most Important Factor: Customer Tenure
- Customers with tenure < 3 months have highest churn risk
- Recommendation: Focus retention efforts on new customers
```

**For Experts**:
```
Model: XGBoost Classifier
- Accuracy: 94.5% | Precision: 93.2% | Recall: 93.8%
- ROC-AUC: 0.972 | F1-Score: 0.935

SHAP Feature Importance (Top 5):
1. tenure (-0.45) - Negative correlation with churn
2. monthly_charges (0.32) - Higher charges → higher churn
3. contract_type (-0.28) - Long-term contracts reduce churn
4. tech_support (0.15)
5. internet_service (0.12)

Cross-validation (5-fold): 0.942 ± 0.008
```

---

## Self-Correction Loop

The system implements automatic error handling:

```
┌─────────────────────────────┐
│  Generate Code              │
│  (from LLM prompt)          │
└────────────┬────────────────┘
             ↓
┌─────────────────────────────┐
│  Execute Code               │
│  (in sandbox)               │
└────────────┬────────────────┘
             ↓
         ❌ Error?
        /  |  \
      Yes  │   No
       │   │    └─→ ✓ Success
       │   │
       ↓   └─→ ✓ Skip Correction
┌─────────────────────────────┐
│  Feed Error to LLM          │
│  "ValueError: NaN values    │
│   in input. Please handle   │
│   missing values."          │
└────────────┬────────────────┘
             ↓
┌─────────────────────────────┐
│  LLM Generates Fixed Code   │
│  (adds SimpleImputer)       │
└────────────┬────────────────┘
             ↓
         Re-execute
```

---

## Data Flow Example

```
User Input:
{
  "file": "customer_data.csv",
  "problem": "Predict customer churn",
  "targetVariable": "Churn",
  "expertise": "beginner"
}

↓ (File uploaded and profiled)

Data Profile:
{
  "rows": 10000,
  "columns": 20,
  "columnTypes": ["numerical", "categorical", ...],
  "missingValues": 2.3%,
  "classBalance": 73% | 27%
}

↓ (Sent to Reasoning Agent)

Phase 1 Output:
{
  "taskDomain": "Classification",
  "issue": "Class imbalance detected",
  "strategy": "Use SMOTE and ensemble models"
}

↓ (Processed by Data Engineer Agent)

Phase 2 Output:
{
  "features": [...],
  "code": "df = SMOTE(...)"
}

↓ (Passed to Model Architect)

Phase 3 Output:
{
  "models": ["XGBoost", "RandomForest", ...],
  "hyperparams": {...}
}

↓ (Sent to Pipeline Generator)

Phase 4 Output:
{
  "pythonCode": "complete executable script"
}

↓ (Analyzed by Insights Agent)

Phase 5 Output:
{
  "metrics": {
    "accuracy": 0.945,
    "f1": 0.935
  },
  "insights": "Most important factor is tenure",
  "recommendations": ["Monitor new customers", ...]
}

↓ (Displayed to User)

Results Dashboard
```

---

## Component Interaction Diagram

```
Frontend Components:
┌─────────────────────────────────────────┐
│  App.jsx (Main Orchestrator)            │
├─────────────────────────────────────────┤
│  ├─ DataUpload (Step 1)                 │
│  ├─ ProblemStatement (Step 2)           │
│  ├─ WorkflowVisualizer (Step 3)         │
│  ├─ Results (Step 4)                    │
│  └─ Chat (All Steps)                    │
└─────────────────────────────────────────┘
              ↓ useState
        Shared State:
        - step
        - data
        - problem
        - results
        - userExpertise

Backend Routes:
┌─────────────────────────────────────────┐
│  /api/analyze-intent                    │
│  /api/feature-engineering               │
│  /api/model-selection                   │
│  /api/generate-pipeline                 │
│  /api/generate-insights                 │
│  /api/chat                              │
│  /api/profile-data                      │
└─────────────────────────────────────────┘
              ↓ Groq LLM
┌─────────────────────────────────────────┐
│  LLM-powered Agent Responses            │
└─────────────────────────────────────────┘
```

---

## Error Handling Strategy

### Level 1: Frontend Validation
- CSV format check
- File size validation
- Required field checks

### Level 2: Backend Validation
- Column name validation
- Data type checking
- Missing value detection

### Level 3: LLM Error Recovery
- Catch generated code errors
- Feed errors back to LLM
- Automatically fix and retry

### Level 4: User Feedback
- Clear error messages
- Suggestions for fixing
- Log errors for debugging

---

## Performance Optimization

### Streaming Responses (SSE)
Instead of waiting for complete response:
```javascript
// ❌ Old way
const result = await fetch('/api/endpoint');
// Wait for complete response...

// ✅ New way
const response = await fetch('/api/endpoint');
const reader = response.body.getReader();
// Process chunks as they arrive
```

### Parallel Processing Opportunity
Future enhancement: Process multiple phases simultaneously instead of sequentially.

### Caching Strategy
- Cache feature engineering suggestions
- Cache model recommendations for similar data profiles
- Cache SHAP explanations

---

## Security Considerations

### File Upload Safety
- Maximum file size: 50MB
- Validate CSV format
- Sanitize column names
- Process in isolated directory

### API Security
- CORS configuration
- Input validation
- Rate limiting (recommended)
- API key rotation (Groq)

### Code Execution Safety
- Generated code runs client-side initially
- For production: Use containerized execution
- Implement code review workflow

---

## Scalability Strategy

### Horizontal Scaling
- Deploy multiple backend instances
- Use load balancer
- Shared file storage for uploads

### Vertical Scaling
- Increase server resources
- Implement caching layer (Redis)
- Database optimization (if added)

### LLM Optimization
- Batch requests to Groq
- Implement prompt caching
- Model selection based on complexity

---

## Future Enhancements

### Phase 2 Features
- [ ] Database integration (MongoDB)
- [ ] User authentication & projects
- [ ] Model persistence & versioning
- [ ] Automated ML (AutoML) pipeline
- [ ] GPU-accelerated training
- [ ] Real-time data streaming

### Phase 3 Features
- [ ] Advanced analytics dashboard
- [ ] Hyperparameter optimization UI
- [ ] Model deployment wizard
- [ ] A/B testing framework
- [ ] Data quality monitoring
- [ ] Custom metrics builder

---

**Architecture Version**: 1.0
**Last Updated**: May 18, 2024
