import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Vote, Lock, User } from 'lucide-react';

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (login(id, password)) {
      if (id === 'admin') {
        navigate('/admin');
      } else {
        navigate('/voter');
      }
    } else {
      setError('Invalid credentials. Try admin/admin123 or voter1/voter123');
    }
  };

  const handleCancel = () => {
    setId('');
    setPassword('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="flex w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-80 bg-gradient-to-b from-blue-600 to-indigo-700 p-8 text-white">
          <div className="flex items-center mb-12">
            <Vote size={32} className="mr-3" />
            <h1 className="text-2xl font-bold">ElectionApp</h1>
          </div>
          
          <nav className="space-y-4">
            <div className="flex items-center p-3 rounded-lg bg-white/20 backdrop-blur-sm">
              <User size={20} className="mr-3" />
              <span>New Registration</span>
            </div>
            <div className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
              <Lock size={20} className="mr-3" />
              <span>Logout</span>
            </div>
          </nav>

          <div className="mt-12 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
            <h3 className="font-semibold mb-2">Demo Credentials</h3>
            <div className="text-sm space-y-1 opacity-90">
              <p>Admin: admin / admin123</p>
              <p>Voter: voter1 / voter123</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Please sign in to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-2">
                  User ID
                </label>
                <input
                  type="text"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your ID"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;