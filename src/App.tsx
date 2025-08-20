import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import VoterDashboard from './components/voter/VoterDashboard';
import AddCandidate from './components/admin/AddCandidate';
import NewElection from './components/admin/NewElection';
import CandidateRequests from './components/admin/CandidateRequests';
import Results from './components/Results';
import CastVote from './components/voter/CastVote';
import PendingElections from './components/voter/PendingElections';
import RequestCandidacy from './components/voter/RequestCandidacy';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/add-candidate" element={<ProtectedRoute role="admin"><AddCandidate /></ProtectedRoute>} />
            <Route path="/admin/candidate-requests" element={<ProtectedRoute role="admin"><CandidateRequests /></ProtectedRoute>} />
            <Route path="/admin/new-election" element={<ProtectedRoute role="admin"><NewElection /></ProtectedRoute>} />
            <Route path="/voter" element={<ProtectedRoute role="voter"><VoterDashboard /></ProtectedRoute>} />
            <Route path="/voter/cast-vote" element={<ProtectedRoute role="voter"><CastVote /></ProtectedRoute>} />
            <Route path="/voter/pending-elections" element={<ProtectedRoute role="voter"><PendingElections /></ProtectedRoute>} />
            <Route path="/voter/request-candidacy" element={<ProtectedRoute role="voter"><RequestCandidacy /></ProtectedRoute>} />
            <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function ProtectedRoute({ children, role }: { children: React.ReactNode; role?: string }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default App;