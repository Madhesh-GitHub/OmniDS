import React, { useState } from 'react';

function DataUpload({ onNext, userExpertise, setUserExpertise }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (selectedFile.type === 'text/csv') {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split('\n').slice(0, 5);
        setPreview(lines.join('\n'));
      };
      reader.readAsText(selectedFile);
    } else {
      alert('Please upload a CSV file');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/profile-data', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        onNext({
          ...data,
          file,
          expertise: userExpertise,
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Section: Step Title */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Step 1: Upload Your Dataset</h2>
        <p className="text-gray-600 mt-2">Upload a CSV file containing your data. Omni-DS will automatically profile and analyze it.</p>
      </div>

      {/* INPUT SECTION */}
      <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">INPUT: Your Data</h3>
        
        {/* Expertise Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Select Your Expertise Level
          </label>
          <div className="flex gap-3 w-full">
            {['beginner', 'expert'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setUserExpertise(level)}
                className={`flex-1 p-3 rounded-lg border-2 transition-all font-medium text-sm cursor-pointer ${
                  userExpertise === level
                    ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-blue-500 hover:bg-gray-50'
                }`}
              >
                {level === 'beginner' ? '🧑‍💼 Beginner' : '👨‍🔬 Expert'}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-600 mt-2">
            {userExpertise === 'beginner' 
              ? '✓ Get simplified explanations and automated guidance'
              : '✓ Get technical details and granular control'}
          </p>
        </div>

        {/* File Upload Area */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors relative ${
            dragActive
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={(e) => handleFile(e.target.files[0])}
            className="hidden"
          />
          <label htmlFor="file-input" className="space-y-3 block cursor-pointer">
            <div className="text-3xl">📊</div>
            <div>
              <p className="text-gray-900 font-medium">Drag and drop your CSV file here</p>
              <p className="text-gray-600 text-sm mt-1">or click to browse from your computer</p>
            </div>
            <p className="text-xs text-gray-500">CSV format only • Max 50MB</p>
          </label>
        </div>

        {/* File Preview */}
        {preview && (
          <div className="mt-6 border border-gray-300 rounded-lg p-4 bg-white">
            <p className="text-sm font-medium text-gray-900 mb-2">File Preview</p>
            <pre className="bg-gray-100 p-3 rounded text-xs text-gray-700 overflow-auto max-h-40 font-mono">
              {preview}
            </pre>
            <p className="text-xs text-gray-600 mt-3">
              File: <span className="font-medium">{file?.name}</span>
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {loading ? '⏳ Uploading...' : '➤ Continue to Next Step'}
      </button>
    </div>
  );
}

export default DataUpload;
