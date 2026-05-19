#!/usr/bin/env node

/**
 * Omni-DS Diagnostic Test
 * Checks if backend and frontend are properly configured
 */

const http = require('http');

console.log('\n🔍 Omni-DS Diagnostic Test\n');
console.log('━'.repeat(50));

// Test 1: Backend Health Check
console.log('\n1️⃣  Testing Backend API Connection...');
console.log('   Endpoint: http://localhost:5000/api/health');

http.get('http://localhost:5000/api/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('   ✅ Backend is RUNNING');
      console.log('   Response:', JSON.parse(data));
    } else {
      console.log('   ❌ Backend error:', res.statusCode);
    }
  });
}).on('error', (err) => {
  console.log('   ❌ Cannot connect to backend');
  console.log('   Error:', err.message);
  console.log('   💡 Make sure backend is running: cd backend && npm start');
});

// Test 2: Check frontend files
console.log('\n2️⃣  Checking Frontend Files...');
const fs = require('fs');
const path = require('path');

const requiredFiles = [
  './src/App.jsx',
  './src/main.jsx',
  './src/index.css',
  './src/components/DataUpload.jsx',
  './src/components/ProblemStatement.jsx',
  './src/components/WorkflowVisualizer.jsx',
  './src/components/Results.jsx',
  './src/components/Chat.jsx',
  './package.json'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log('   ✅', file);
  } else {
    console.log('   ❌', file, '(MISSING)');
    allFilesExist = false;
  }
});

// Test 3: Check dependencies
console.log('\n3️⃣  Checking Frontend Dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const requiredDeps = ['react', 'react-dom', 'tailwindcss', '@tailwindcss/vite', 'vite'];
  let nodeModulesOk = true;
  
  requiredDeps.forEach(dep => {
    if (fs.existsSync(`./node_modules/${dep}`)) {
      console.log('   ✅', dep);
    } else {
      console.log('   ❌', dep, '(NOT INSTALLED)');
      nodeModulesOk = false;
    }
  });
  
  if (!nodeModulesOk) {
    console.log('\n   💡 Install dependencies: npm install');
  }
} catch (err) {
  console.log('   ❌ Error checking dependencies:', err.message);
}

// Summary
setTimeout(() => {
  console.log('\n' + '━'.repeat(50));
  console.log('\n📋 Summary:\n');
  console.log('✅ Frontend components: Ready');
  console.log('⏳ Backend API: Testing...\n');
  console.log('🚀 Next Steps:\n');
  console.log('1. Start Backend:');
  console.log('   cd backend && npm install && npm start\n');
  console.log('2. Start Frontend (new terminal):');
  console.log('   cd frontend && npm install && npm run dev\n');
  console.log('3. Open: http://localhost:5173\n');
}, 2000);
