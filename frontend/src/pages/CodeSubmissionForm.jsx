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
      setExecutionError(error.message);
    }
  };

  return (
    <div className="container mx-auto py-2 px-8 animate-fade-in-up">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-500 hover:scale-105" onClick={() => { navigate('/submissions') }}>🔙 Submission Table</button>
      <h1 className="font-bold text-4xl text-center mt-8 mb-6">Code Submission Form</h1>
      <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <form onSubmit={handleSubmit} className="bg-white p-8 animate-fade-in-down">
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label htmlFor="language" className="block text-gray-700 text-sm font-bold mb-2">Preferred Code Language:</label>
            <select id="language" name="language" value={formData.language} onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="js">JavaScript</option>
              <option value="python">Python</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="stdin" className="block text-gray-700 text-sm font-bold mb-2">Standard Input:</label>
            <textarea id="stdin" name="stdin" value={formData.stdin} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="4"></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="sourceCode" className="block text-gray-700 text-sm font-bold mb-2">Source Code:</label>
            <AceEditor
              mode={languageModes[formData.language]}
              theme="github"
              onChange={(newCode) => setFormData({ ...formData, sourceCode: newCode })}
              name="sourceCode"
              editorProps={{ $blockScrolling: true }}
              value={formData.sourceCode}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
              }}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-500 hover:scale-105" type="submit">
              Submit Code
            </button>
          </div>
        </form>
      </div>
      {executionResult && (
        <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <p>Output:</p>
          <pre>{executionResult}</pre>
        </div>
      )}
      {executionError && (
        <div className="mt-4 p-4 bg-red-100 border-l-4 border-red-500 text-red-700">
          <p>Error:</p>
          <pre>{'Something Wrong in the Code!'}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeSubmissionForm;
