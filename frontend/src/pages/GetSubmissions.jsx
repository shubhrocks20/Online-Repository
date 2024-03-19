import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('https://online-repository.onrender.com/api/page2');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="container mx-auto p-8">
        <button className='bg-gray-700 text-lg px-4 py-2 rounded-md text-white' onClick={()=>{navigate('/')}}>🔙 Submission Form</button>
      <h2 className="text-4xl font-bold mb-4 text-center">Submissions</h2>
      <table className="min-w-full table-auto shadow-md">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2 border-r-2 border-white">Username</th>
            <th className="px-4 py-2 border-r-2 border-white">Language</th>
            <th className="px-4 py-2 border-r-2 border-white">Stdin</th>
            <th className="px-4 py-2 border-r-2 border-white">Source Code</th>
            <th className="px-4 py-2 border-r-2 border-white">Output</th>
            <th className="px-4 py-2 ">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((submission, index) => (
            <tr key={index} className="bg-gray-100 border-b">
              <td className="px-4 py-2 border-r-2 border-white">{submission.username}</td>
              <td className="px-4 py-2 border-r-2 border-white">{submission.language}</td>
              <td className="px-4 py-2 border-r-2 border-white">{submission.stdin || 'No Inputs'}</td>
              <td className="px-4 py-2 border-r-2 border-white">{submission.sourceCode}</td>
              <td className="px-4 py-2 border-r-2 border-white">{submission.codeOutput}</td>
              <td className="px-4 py-2">{submission.createdAt}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GetSubmissions;
