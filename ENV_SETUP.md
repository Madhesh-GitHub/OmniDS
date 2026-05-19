# Environment Configuration

## Backend (.env)

# API Configuration
PORT=5000
NODE_ENV=development

# Groq API
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Database (Optional)
MONGODB_URI=mongodb://root:omnids123@localhost:27017/omnids

# File Upload
MAX_FILE_SIZE=52428800  # 50MB

# CORS
CORS_ORIGIN=http://localhost:5173

# Logging
LOG_LEVEL=debug

---

## Frontend (.env.local)

VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Omni-DS
VITE_APP_VERSION=1.0.0

---

## Getting Groq API Key

1. Visit https://console.groq.com/
2. Sign up / Login
3. Go to "Keys" section
4. Click "Create New API Key"
5. Copy the key
6. Paste into backend/.env

Example:
GROQ_API_KEY=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

---

## Important Notes

⚠️ Never commit .env files to git
✅ Use .env.example as template
✅ Rotate API keys regularly
✅ Use environment variables in production
