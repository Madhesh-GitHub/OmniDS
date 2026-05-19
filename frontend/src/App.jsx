
import React, { useState } from 'react';
import DataUpload from './components/DataUpload';
import ProblemStatement from './components/ProblemStatement';
import WorkflowVisualizer from './components/WorkflowVisualizer';
import Chat from './components/Chat';
import Results from './components/Results';

function App() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(null);
  const [problem, setProblem] = useState('');
  const [results, setResults] = useState(null);
  const [userExpertise, setUserExpertise] = useState('beginner');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Omni-DS</h1>
              <p className="text-sm text-gray-600 mt-1">Adaptive Data Science Language Model Framework</p>
            </div>
            <div className="text-right">
              <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-xs font-semibold text-blue-900">Mode: {userExpertise.charAt(0).toUpperCase() + userExpertise.slice(1)}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Upload Data', icon: '📤' },
              { num: 2, label: 'Problem Definition', icon: '📝' },
              { num: 3, label: 'Processing', icon: '⚙️' },
              { num: 4, label: 'Results', icon: '📊' }
            ].map((item, idx) => (
              <React.Fragment key={item.num}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                    step >= item.num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > item.num ? '✓' : item.num}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${
                    step >= item.num ? 'text-gray-900' : 'text-gray-500'
                  }`}>{item.label}</span>
                </div>
                {idx < 3 && (
                  <div className={`flex-1 h-1 mx-4 transition-all ${
                    step > item.num ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Panel (Spans 3 columns) */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-gray-200 rounded-lg p-8">
              {step === 1 && (
                <DataUpload
                  onNext={(uploadedData) => {
                    setData(uploadedData);
                    setStep(2);
                  }}
                  userExpertise={userExpertise}
                  setUserExpertise={setUserExpertise}
                />
              )}
              {step === 2 && (
                <ProblemStatement
                  data={data}
                  onNext={(problemDesc) => {
                    setProblem(problemDesc);
                    setStep(3);
                  }}
                  onBack={() => setStep(1)}
                />
              )}
              {step === 3 && (
                <WorkflowVisualizer
                  data={data}
                  problem={problem}
                  userExpertise={userExpertise}
                  onComplete={(analysisResults) => {
                    setResults(analysisResults);
                    setStep(4);
                  }}
                />
              )}
              {step === 4 && (
                <Results
                  data={data}
                  problem={problem}
                  results={results}
                  userExpertise={userExpertise}
                  onRestart={() => {
                    setStep(1);
                    setData(null);
                    setProblem('');
                    setResults(null);
                  }}
                />
              )}
            </div>
          </div>

          {/* Chat Panel (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg h-fit sticky top-24">
              <Chat
                visible={true}
                context={{
                  step,
                  data,
                  problem,
                  results,
                  userExpertise,
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About Omni-DS</h3>
              <p className="text-sm text-gray-600">
                An adaptive agentic language model framework that automatically transforms raw data into actionable insights using multi-agent orchestration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multi-task classification (Regression, Classification, Clustering, Time-Series)</li>
                <li>• Automatic feature engineering</li>
                <li>• Adaptive model selection</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-sm text-gray-600">
                Built for ABB EngineeredX Hackathon 2024
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
            <p>© 2024 Omni-DS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
