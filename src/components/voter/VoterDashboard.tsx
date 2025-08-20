import React from 'react';
import Layout from '../shared/Layout';
import { Calendar, BarChart3, Home, Vote, Clock, CheckCircle, Users, User } from 'lucide-react';

const VoterDashboard: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/voter' },
    { label: 'Cast Vote', icon: <Vote size={20} />, path: '/voter/cast-vote' },
    { label: 'Pending Elections', icon: <Clock size={20} />, path: '/voter/pending-elections' },
    { label: 'Request Candidacy', icon: <User size={20} />, path: '/voter/request-candidacy' },
    { label: 'Results', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  return (
    <Layout menuItems={menuItems}>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Voter Dashboard</h1>
          <p className="text-gray-600">Welcome! Cast your vote and stay informed about elections</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Vote className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">3</h3>
                <p className="text-gray-600 text-sm">Available Elections</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">2</h3>
                <p className="text-gray-600 text-sm">Votes Cast</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">1</h3>
                <p className="text-gray-600 text-sm">Pending Elections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Election Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Elections</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-blue-900">Presidential Election 2024</h3>
                    <p className="text-sm text-blue-700">Ends: March 15, 2024</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                    Vote Now
                  </button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Senate Election 2024</h3>
                    <p className="text-sm text-gray-600">Completed</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Voted
                  </span>
                </div>
              </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default VoterDashboard;