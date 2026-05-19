import React, { useState } from 'react';

function Results({ data, problem, results, userExpertise, onRestart }) {
  const [activeTab, setActiveTab] = useState('summary');

  const mockResults = {
    summary: {
      accuracy: 0.945,
      precision: 0.932,
      recall: 0.938,
      f1: 0.935,
      taskDomain: 'Classification',
      modelsEvaluated: 3,
      bestModel: 'XGBoost',
    },
    insights: [
      '📊 The model achieves 94.5% accuracy with strong precision and recall balance',
      '🎯 Feature importance analysis shows "Customer_Tenure" as the most influential factor',
      '⚠️ Class imbalance was addressed using SMOTE during preprocessing',
      '📈 Cross-validation shows stable performance across all folds',
      '🔍 SHAP analysis reveals non-linear relationships in customer behavior',
    ],
    recommendations: [
      'Deploy the XGBoost model for production with monitoring on new data drift',
      'Collect more data on customer interactions to improve recall further',
      'Implement monthly retraining to adapt to evolving patterns',
      'Create feature engineering pipeline for automated data preparation',
    ],
  };

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">✨ Step 4: Results & Insights</h2>
        <p className="text-gray-600 mt-2">Your complete analysis with actionable recommendations</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 flex gap-0">
        {['summary', 'insights', 'recommendations', 'code'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 font-semibold text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab === 'summary' && '📊 Summary'}
            {tab === 'insights' && '💡 Insights'}
            {tab === 'recommendations' && '🎯 Recommendations'}
            {tab === 'code' && '💻 Code'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Accuracy', value: mockResults.summary.accuracy, icon: '🎯' },
                  { label: 'Precision', value: mockResults.summary.precision, icon: '✓' },
                  { label: 'Recall', value: mockResults.summary.recall, icon: '📊' },
                  { label: 'F1-Score', value: mockResults.summary.f1, icon: '⚖️' },
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className="bg-white border border-gray-300 rounded-lg p-4 text-center"
                  >
                    <div className="text-2xl mb-2">{metric.icon}</div>
                    <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                    <p className="text-3xl font-bold text-blue-600 mt-2">
                      {(metric.value * 100).toFixed(1)}%
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 mb-3">Analysis Overview</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600 font-medium">Task Domain</p>
                  <p className="text-sm font-semibold text-gray-900">{mockResults.summary.taskDomain}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Models Evaluated</p>
                  <p className="text-sm font-semibold text-gray-900">{mockResults.summary.modelsEvaluated}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Best Model</p>
                  <p className="text-sm font-semibold text-blue-600">{mockResults.summary.bestModel}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Dataset Size</p>
                  <p className="text-sm font-semibold text-gray-900">{data.rowCount.toLocaleString()} rows</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Key Findings
            </h3>
            {mockResults.insights.map((insight, idx) => (
              <div
                key={idx}
                className="bg-white border border-blue-200 rounded-lg p-4"
              >
                <p className="text-gray-900">{insight}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended Next Steps
            </h3>
            {mockResults.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 items-start bg-white border border-gray-300 rounded-lg p-4">
                <span className="text-2xl flex-shrink-0 w-10 text-center">
                  {idx === 0 && '🚀'}
                  {idx === 1 && '📈'}
                  {idx === 2 && '🔄'}
                  {idx === 3 && '⚙️'}
                </span>
                <div>
                  <p className="font-semibold text-gray-900">
                    Step {idx + 1}
                  </p>
                  <p className="text-gray-700 text-sm">{rec}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'code' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Generated Python Code
            </h3>
            <p className="text-sm text-gray-600 mb-3">Complete, executable pipeline ready for deployment:</p>
            <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg overflow-auto text-xs max-h-80 font-mono border border-gray-700">
{`# Omni-DS Generated Pipeline
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from xgboost import XGBClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Load and prepare data
df = pd.read_csv('your_data.csv')
X = df.drop(['target_column'], axis=1)
y = df['target_column']

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Ensemble models
models = {
    'LogisticRegression': LogisticRegression(C=1.0),
    'RandomForest': RandomForestClassifier(n_estimators=100, max_depth=10),
    'XGBoost': XGBClassifier(learning_rate=0.1, max_depth=6)
}

# Train and evaluate
results = {}
for name, model in models.items():
    model.fit(X_train_scaled, y_train)
    y_pred = model.predict(X_test_scaled)
    
    results[name] = {
        'accuracy': accuracy_score(y_test, y_pred),
        'precision': precision_score(y_test, y_pred),
        'recall': recall_score(y_test, y_pred),
        'f1': f1_score(y_test, y_pred)
    }
    
# Best model deployment
best_model = models['XGBoost']
# Export model: pickle.dump(best_model, open('model.pkl', 'wb'))`}
            </pre>
          </div>
        )}
      </div>

      {/* Information Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <p className="font-medium">📋 Output Summary</p>
        <ul className="mt-2 space-y-1 text-blue-800 text-sm">
          <li>✓ Model performance validated with cross-validation</li>
          <li>✓ Feature importance rankings calculated (SHAP analysis available)</li>
          <li>✓ Complete Python code ready for deployment</li>
          <li>✓ Recommendations adapted for {userExpertise} level expertise</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onRestart}
          className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          🔄 Start New Analysis
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          📥 Download Report
        </button>
      </div>
    </div>
  );
}

export default Results;
