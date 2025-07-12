import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function LoginPage() {
  return <h2>Login Page</h2>;
}

function SignupPage() {
  return <h2>Signup Page</h2>;
}

function JournalDashboard() {
  return <h2>Journal Dashboard</h2>;
}

function NewEntryPage() {
  return <h2>New Entry Form</h2>;
}

function EntryDetailsPage() {
  return <h2>Entry Details / Edit Page</h2>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/journal" element={<JournalDashboard />} />
        <Route path="/journal/new" element={<NewEntryPage />} />
        <Route path="/journal/:id" element={<EntryDetailsPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
