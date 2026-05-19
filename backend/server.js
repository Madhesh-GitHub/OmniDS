import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import { Groq } from 'groq-sdk';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Groq Client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Upload directory
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ============ ROUTES ============

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!', timestamp: new Date() });
});

// 1. Intent Classification + EDA Strategy
app.post('/api/analyze-intent', async (req, res) => {
  try {
    const { problemStatement, dataPreview, userExpertise } = req.body;

    const systemPrompt = `You are the "Reasoning Agent" for Omni-DS. Your task is to:
1. Parse the user's natural language problem statement
2. Classify the task domain (Regression, Classification, Clustering, Time-Series)
3. Identify key data characteristics from the preview
4. Recommend initial strategy

Respond in JSON format with:
{
  "taskDomain": "Classification|Regression|Clustering|TimeSeries",
  "intent": "Brief interpretation",
  "recommendedModels": ["Model1", "Model2", ...],
  "dataCharacteristics": "Observations about the data",
  "strategy": "Step-by-step approach"
}`;

    const userMessage = `
Problem Statement: ${problemStatement}

Data Preview (first few rows and info):
${dataPreview}

User Expertise Level: ${userExpertise}

Please analyze this and provide the classification and strategy.`;

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 2048,
      stream: true,
    });

    let fullResponse = '';
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        fullResponse += content;
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    // Send completion marker
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Intent analysis error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. Feature Engineering Strategy
app.post('/api/feature-engineering', async (req, res) => {
  try {
    const { taskDomain, dataPreview, recommendations } = req.body;

    const systemPrompt = `You are the "Data Engineer Agent" for Omni-DS. Your task is to:
1. Analyze the data structure
2. Recommend feature engineering techniques specific to the task domain
3. Generate executable Python code snippets
4. Handle missing values and outliers

Respond with actionable feature engineering strategies and code snippets.`;

    const userMessage = `
Task Domain: ${taskDomain}
Recommendations: ${JSON.stringify(recommendations)}

Data Preview:
${dataPreview}

Please provide feature engineering strategies and Python code snippets (using pandas/numpy).`;

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 2048,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Feature engineering error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. Model Selection & Ensemble Strategy
app.post('/api/model-selection', async (req, res) => {
  try {
    const { taskDomain, dataCharacteristics, targetMetric } = req.body;

    const systemPrompt = `You are the "Model Architect Agent" for Omni-DS. Your task is to:
1. Select diverse ensemble of models appropriate for the task
2. Explain why each model is chosen
3. Provide hyperparameter suggestions
4. Generate Python code using scikit-learn/xgboost

Respond with model selections and code snippets.`;

    const userMessage = `
Task Domain: ${taskDomain}
Data Characteristics: ${dataCharacteristics}
Target Metric: ${targetMetric}

Please recommend an ensemble of models with justification and Python implementation code.`;

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 2048,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Model selection error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. Data Profiling (Process CSV data)
app.post('/api/profile-data', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').slice(0, 10);
    const preview = lines.join('\n');

    // Get basic stats
    const allLines = fileContent.split('\n');
    const rowCount = allLines.length - 1;
    const headers = allLines[0]?.split(',') || [];

    res.json({
      success: true,
      fileName: req.file.originalname,
      rowCount,
      columnCount: headers.length,
      columns: headers,
      preview,
      filePath: `/api/download/${req.file.filename}`,
    });
  } catch (error) {
    console.error('Data profiling error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 5. Generate Analysis Pipeline
app.post('/api/generate-pipeline', async (req, res) => {
  try {
    const {
      taskDomain,
      strategy,
      dataCharacteristics,
      selectedModels,
      userExpertise,
    } = req.body;

    const systemPrompt = `You are the "Pipeline Generator Agent" for Omni-DS. Generate a complete, executable Python analysis pipeline.
The output should be production-ready code using pandas, scikit-learn, xgboost, and Prophet (for time-series).
Include:
1. Data loading and cleaning
2. Feature engineering
3. Model training
4. Evaluation
5. Visualization

For ${userExpertise} users, ${
      userExpertise === 'beginner'
        ? 'include detailed comments and explanations'
        : 'focus on advanced techniques and optimization'
    }`;

    const userMessage = `
Generate a complete pipeline for:
- Task: ${taskDomain}
- Strategy: ${strategy}
- Data Characteristics: ${dataCharacteristics}
- Models to use: ${selectedModels.join(', ')}

Provide the complete, executable Python code.`;

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 3000,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Pipeline generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 6. Explainability & Insights
app.post('/api/generate-insights', async (req, res) => {
  try {
    const { modelResults, userExpertise, taskDomain } = req.body;

    const systemPrompt = `You are the "Insights Agent" for Omni-DS. Your task is to:
1. Interpret model results and performance metrics
2. Provide actionable business insights
3. Explain model decisions and feature importance
4. Recommend next steps

${
  userExpertise === 'beginner'
    ? 'Keep explanations simple, business-focused, avoid technical jargon'
    : 'Provide detailed technical analysis with statistical justification'
}`;

    const userMessage = `
Generate insights for a ${taskDomain} model with results:
${JSON.stringify(modelResults, null, 2)}

Provide business insights and recommendations.`;

    const stream = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userMessage,
        },
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 2048,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Insights generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// 7. Chat endpoint for real-time interaction
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [], systemRole } = req.body;

    const defaultSystemPrompt = 'You are a helpful data science assistant. Help users understand data science concepts and workflows.';
    const systemPrompt = systemRole || defaultSystemPrompt;

    const messages = [
      {
        role: 'system',
        content: systemPrompt,
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message,
      },
    ];

    const stream = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_completion_tokens: 1500,
      stream: true,
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Omni-DS Backend running on http://localhost:${PORT}`);
  console.log(`📊 Using Groq API for LLM tasks`);
});
