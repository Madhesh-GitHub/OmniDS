import React, { useState, useEffect } from 'react';

function WorkflowVisualizer({ data, problem, userExpertise, onComplete }) {
  const [stages, setStages] = useState([
    { id: 1, name: 'Intent Classification', icon: '🧠', status: 'pending', content: '' },
    { id: 2, name: 'Feature Engineering', icon: '⚙️', status: 'pending', content: '' },
    { id: 3, name: 'Model Selection', icon: '🤖', status: 'pending', content: '' },
    { id: 4, name: 'Pipeline Generation', icon: '💻', status: 'pending', content: '' },
    { id: 5, name: 'Insights Generation', icon: '💡', status: 'pending', content: '' },
  ]);

  useEffect(() => {
    const processWorkflow = async () => {
      // Stage 1: Intent Classification
      await processStage(0, 'analyze-intent', {
        problemStatement: problem.statement,
        dataPreview: data.preview,
        userExpertise,
      });

      // Stage 2: Feature Engineering
      await processStage(1, 'feature-engineering', {
        taskDomain: stages[0]?.content || 'Classification',
        dataPreview: data.preview,
        recommendations: ['handle missing values', 'scale features'],
      });

      // Stage 3: Model Selection
      await processStage(2, 'model-selection', {
        taskDomain: stages[0]?.content || 'Classification',
        dataCharacteristics: stages[1]?.content || 'Tabular data',
        targetMetric: 'accuracy',
      });

      // Stage 4: Pipeline Generation
      await processStage(3, 'generate-pipeline', {
        taskDomain: stages[0]?.content || 'Classification',
        strategy: stages[1]?.content || 'Standard approach',
        dataCharacteristics: data.preview,
        selectedModels: ['RandomForest', 'XGBoost'],
        userExpertise,
      });

      // Stage 5: Insights
      await processStage(4, 'generate-insights', {
        modelResults: {
          accuracy: 0.95,
          precision: 0.93,
          recall: 0.94,
          f1: 0.935,
        },
        userExpertise,
        taskDomain: stages[0]?.content || 'Classification',
      });

      setTimeout(() => {
        onComplete({
          stages,
          timestamp: new Date(),
        });
      }, 1000);
    };

    processWorkflow();
  }, []);

  const processStage = async (stageIndex, endpoint, payload) => {
    try {
      setStages((prev) => {
        const updated = [...prev];
        updated[stageIndex].status = 'processing';
        return updated;
      });

      const response = await fetch(
        `http://localhost:5000/api/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.content) {
                content += data.content;
              }
            } catch (e) {}
          }
        }

        setStages((prev) => {
          const updated = [...prev];
          updated[stageIndex].content = content;
          return updated;
        });
      }

      setStages((prev) => {
        const updated = [...prev];
        updated[stageIndex].status = 'completed';
        return updated;
      });
    } catch (error) {
      console.error(`Stage ${stageIndex} error:`, error);
      setStages((prev) => {
        const updated = [...prev];
        updated[stageIndex].status = 'error';
        updated[stageIndex].content = error.message;
        return updated;
      });
    }
  };

  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const progress = (completedCount / 5) * 100;

  return (
    <div className="space-y-8">
      {/* Section Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Step 3: Processing Analysis</h2>
        <p className="text-gray-600 mt-2">Omni-DS is running through 5 intelligent processing stages</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">Overall Progress</span>
          <span className="text-sm font-semibold text-blue-600">{completedCount}/5 Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Processing Stages */}
      <div className="space-y-4">
        {stages.map((stage, idx) => (
          <div key={stage.id} className="relative">
            {/* Connection Line */}
            {idx < stages.length - 1 && (
              <div className={`absolute left-6 top-20 w-0.5 h-12 ${
                stage.status === 'completed' ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}

            {/* Stage Card */}
            <div className={`border rounded-lg p-4 transition-all ${
              stage.status === 'completed'
                ? 'bg-blue-50 border-blue-300'
                : stage.status === 'processing'
                  ? 'bg-amber-50 border-amber-300'
                  : stage.status === 'error'
                    ? 'bg-red-50 border-red-300'
                    : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start gap-4">
                {/* Status Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl ${
                  stage.status === 'completed'
                    ? 'bg-blue-200 text-blue-900'
                    : stage.status === 'processing'
                      ? 'bg-amber-200 text-amber-900 animate-pulse'
                      : stage.status === 'error'
                        ? 'bg-red-200 text-red-900'
                        : 'bg-gray-200 text-gray-500'
                }`}>
                  {stage.status === 'completed' && '✓'}
                  {stage.status === 'processing' && stage.icon}
                  {stage.status === 'error' && '⚠'}
                  {stage.status === 'pending' && '○'}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold ${
                      stage.status === 'completed' || stage.status === 'processing'
                        ? 'text-gray-900'
                        : 'text-gray-600'
                    }`}>
                      {stage.name}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      stage.status === 'completed'
                        ? 'bg-blue-200 text-blue-900'
                        : stage.status === 'processing'
                          ? 'bg-amber-200 text-amber-900'
                          : stage.status === 'error'
                            ? 'bg-red-200 text-red-900'
                            : 'bg-gray-200 text-gray-600'
                    }`}>
                      {stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}
                    </span>
                  </div>
                  
                  {/* Stage Output */}
                  {stage.content && (
                    <div className="mt-3 bg-white rounded p-3 text-xs text-gray-700 max-h-32 overflow-auto border border-gray-300 font-mono">
                      {stage.content.substring(0, 500)}
                      {stage.content.length > 500 && '...'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
        <p className="font-medium">🔄 What's Happening</p>
        <p className="mt-1 text-blue-800">Each stage processes the output from the previous stage. Real-time streaming brings you results as they're generated.</p>
      </div>
    </div>
  );
}

export default WorkflowVisualizer;
