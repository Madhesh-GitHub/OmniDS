import React, { useState } from 'react';

function ProblemStatement({ data, onNext, onBack }) {
  const [statement, setStatement] = useState('');
  const [targetVariable, setTargetVariable] = useState('');

  const handleNext = () => {
    if (!statement || !targetVariable) {
      alert('Please fill in all fields');
      return;
    }

    onNext({
      statement,
      targetVariable,
      timestamp: new Date(),
    });
  };

  const suggestions = [
    'Predict customer churn based on their historical behavior',
    'Segment customers into behavioral groups',
    'Forecast sales for the next quarter',
    'Classify loan applications as approved or rejected',
  ];

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Step 2: Define Your Problem</h2>
        <p className="text-gray-600 mt-2">Describe your data science objective in natural language.</p>
      </div>

      {/* INPUT SECTION */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">INPUT: Problem Specification</h3>
        
        {/* Data Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <p className="text-xs text-gray-600 font-medium">Total Rows</p>
            <p className="text-2xl font-bold text-gray-900">{data?.rowCount?.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium">Total Columns</p>
            <p className="text-2xl font-bold text-gray-900">{data?.columnCount}</p>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Problem Statement
          </label>
          <textarea
            value={statement}
            onChange={(e) => setStatement(e.target.value)}
            placeholder="Example: Predict which customers will churn in the next 6 months..."
            className="w-full bg-white border border-gray-300 rounded-lg p-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 h-28 font-medium"
          />
        </div>

        {/* Quick Suggestions */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-600 mb-2">Or choose an example:</p>
          <div className="grid grid-cols-1 gap-2">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => setStatement(suggestion)}
                className="text-left p-3 bg-white border border-gray-300 hover:border-blue-600 hover:bg-blue-50 rounded-lg text-sm text-gray-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Target Variable */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Target Variable (Dependent Variable)
          </label>
          <select
            value={targetVariable}
            onChange={(e) => setTargetVariable(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg p-3 text-gray-900 focus:outline-none focus:border-blue-500 font-medium"
          >
            <option value="">Select the column you want to predict...</option>
            {data?.columns?.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
            <option value="none">Not applicable (Unsupervised)</option>
          </select>
        </div>
      </div>

      {/* OUTPUT SECTION */}
      <div className="border border-gray-200 rounded-lg p-6 bg-blue-50">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">WHAT HAPPENS NEXT</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Omni-DS will classify your problem as Classification, Regression, Clustering, or Time-Series</li>
          <li>✓ Analyze your data characteristics (imbalance, outliers, etc.)</li>
          <li>✓ Recommend appropriate features and models</li>
          <li>✓ Generate executable Python code</li>
          <li>✓ Provide actionable insights and recommendations</li>
        </ul>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          ← Go Back
        </button>
        <button
          onClick={handleNext}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Analyze Problem →
        </button>
      </div>
    </div>
  );
}

export default ProblemStatement;
