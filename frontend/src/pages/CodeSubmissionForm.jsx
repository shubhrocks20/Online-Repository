import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import { useNavigate } from 'react-router-dom';

const languageModes = {
  cpp: 'c_cpp',
  java: 'java',
  js: 'javascript',
  python: 'python'
};

const CodeSubmissionForm = () => {
  const [executionResult, setExecutionResult] = useState('');
  const [executionError, setExecutionError] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    language: 'cpp',
    stdin: '',
    sourceCode: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setExecutionResult('');
    setExecutionError('');
    try {
      const response = await axios.post('https://online-repository.onrender.com/api/page1', formData);
      setExecutionResult(response.data.output || '');
      setExecutionError(response.data.error || '');
    } catch (error) {
      setExecutionError(error.response.data.error.message);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-xl animate-fade-in-up">
      <button className="bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300 ease-in-out" onClick={() => navigate('/submissions')}>
        🔙 Submission Table
      </button>
      <h1 className="text-3xl font-semibold text-center text-gray-800 my-6">Code Submission Form</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-5">
            <label htmlFor="username" className="text-sm font-medium text-gray-900 block mb-2">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
          </div>
          <div className="mb-5">
            <label htmlFor="language" className="text-sm font-medium text-gray-900 block mb-2">Preferred Code Language:</label>
            <select id="language" name="language" value={formData.language} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="js">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>
          <div className="mb-5">
            <label htmlFor="stdin" className="text-sm font-medium text-gray-900 block mb-2">Standard Input:</label>
            <textarea id="stdin" name="stdin" value={formData.stdin} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="4"></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="sourceCode" className="text-sm font-medium text-gray-900 block mb-2">Source Code:</label>
            <AceEditor
              mode={languageModes[formData.language]}
              theme="github"
              onChange={(newCode) => setFormData({ ...formData, sourceCode: newCode })}
              name="sourceCode"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true
              }}
              className="w-full"
              height="200px"
            />
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-800 text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300 ease-in-out">
            Submit Code
          </button>
          {executionResult && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              <p className="text-sm">Execution Result:</p>
              <pre>{executionResult}</pre>
            </div>
          )}
          {executionError && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
              <p className="text-sm">Execution Error:</p>
              <pre>{executionError}</pre>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CodeSubmissionForm;
