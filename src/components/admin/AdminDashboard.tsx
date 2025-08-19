import React from 'react';
import Layout from '../shared/Layout';
import { UserPlus, Calendar, BarChart3, Users, TrendingUp, Clock } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <Users size={20} />, path: '/admin' },
    { label: 'Add Candidate', icon: <UserPlus size={20} />, path: '/admin/add-candidate' },
    { label: 'Add New Elections', icon: <Calendar size={20} />, path: '/admin/new-election' },
    { label: 'View Election Result', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  return (
    <Layout menuItems={menuItems}>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage elections, candidates, and view results</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">24</h3>
                <p className="text-gray-600 text-sm">Total Candidates</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Calendar className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">3</h3>
                <p className="text-gray-600 text-sm">Active Elections</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="text-purple-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">1,247</h3>
                <p className="text-gray-600 text-sm">Total Votes</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="text-orange-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">2</h3>
                <p className="text-gray-600 text-sm">Pending Elections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Elections</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Presidential Election 2024</h3>
                  <p className="text-sm text-gray-600">Status: Active</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                  Live
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">Senate Election 2024</h3>
                  <p className="text-sm text-gray-600">Status: Completed</p>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                  Completed
                </span>
              </div>
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;