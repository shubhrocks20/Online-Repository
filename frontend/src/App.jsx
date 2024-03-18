import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CodeSubmissionForm from './pages/CodeSubmissionForm';
import GetSubmissions from './pages/GetSubmissions';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<CodeSubmissionForm />} />
        <Route path="/submissions" element={<GetSubmissions />} />
      </Routes>
    </Router>
  );
};

export default App;
