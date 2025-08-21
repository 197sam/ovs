import React, { useState } from 'react';
import Layout from './shared/Layout';
import { useAuth } from '../context/AuthContext';
import { BarChart3, Calendar, Home, UserPlus, Users, Vote, Clock, TrendingUp, FileText } from 'lucide-react';

const Results: React.FC = () => {
  const { user } = useAuth();
  const [selectedElection, setSelectedElection] = useState('PRES2024');

  const adminMenuItems = [
    { label: 'Dashboard', icon: <Users size={20} />, path: '/admin' },
    { label: 'Add Candidate', icon: <UserPlus size={20} />, path: '/admin/add-candidate' },
    { label: 'Candidate Requests', icon: <FileText size={20} />, path: '/admin/candidate-requests' },
    { label: 'Add New Elections', icon: <Calendar size={20} />, path: '/admin/new-election' },
    { label: 'View Election Result', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const voterMenuItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/voter' },
    { label: 'Cast Vote', icon: <Vote size={20} />, path: '/voter/cast-vote' },
    { label: 'Pending Elections', icon: <Clock size={20} />, path: '/voter/pending-elections' },
    { label: 'Results', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : voterMenuItems;

  const elections = [
    { id: 'PRES2024', name: 'Presidential Election 2024', status: 'completed' },
    { id: 'SEN2024', name: 'Senate Election 2024', status: 'completed' },
    { id: 'GOV2024', name: 'Governor Election 2024', status: 'ongoing' }
  ];

  const results = {
    'PRES2024': {
      totalVotes: 1247,
      candidates: [
        { name: 'John Smith', party: 'Democratic Party', votes: 523, percentage: 41.9 },
        { name: 'Sarah Johnson', party: 'Republican Party', votes: 456, percentage: 36.6 },
        { name: 'Mike Brown', party: 'Independent', votes: 187, percentage: 15.0 },
        { name: 'Lisa Davis', party: 'Green Party', votes: 81, percentage: 6.5 }
      ]
    },
    'SEN2024': {
      totalVotes: 892,
      candidates: [
        { name: 'Robert Wilson', party: 'Republican Party', votes: 445, percentage: 49.9 },
        { name: 'Emily Chen', party: 'Democratic Party', votes: 389, percentage: 43.6 },
        { name: 'David Martinez', party: 'Independent', votes: 58, percentage: 6.5 }
      ]
    },
    'GOV2024': {
      totalVotes: 756,
      candidates: [
        { name: 'Maria Rodriguez', party: 'Democratic Party', votes: 387, percentage: 51.2 },
        { name: 'James Thompson', party: 'Republican Party', votes: 289, percentage: 38.2 },
        { name: 'Ann Parker', party: 'Independent', votes: 80, percentage: 10.6 }
      ]
    }
  };

  const currentResults = results[selectedElection as keyof typeof results];
  const sortedCandidates = [...currentResults.candidates].sort((a, b) => b.votes - a.votes);
  const winner = sortedCandidates[0];

  return (
    <Layout menuItems={menuItems}>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Election Results</h1>
          <p className="text-gray-600">View detailed results for completed and ongoing elections</p>
        </div>

        {/* Election Selector */}
        <div className="mb-8">
          <label htmlFor="election-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Election
          </label>
          <select
            id="election-select"
            value={selectedElection}
            onChange={(e) => setSelectedElection(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            {elections.map((election) => (
              <option key={election.id} value={election.id}>
                {election.name} ({election.status})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Election Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <TrendingUp size={20} className="text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Total Votes Cast</p>
                    <p className="text-xl font-bold text-gray-900">{currentResults.totalVotes.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users size={20} className="text-green-500 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Number of Candidates</p>
                    <p className="text-xl font-bold text-gray-900">{currentResults.candidates.length}</p>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium text-gray-900 mb-2">Leading Candidate</p>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="font-semibold text-gray-900">{winner.name}</p>
                      <p className="text-sm text-gray-600">{winner.party}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm border">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Vote Distribution</h2>
              
              <div className="space-y-4">
                {sortedCandidates.map((candidate, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600">{candidate.party}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{candidate.votes.toLocaleString()} votes</p>
                        <p className="text-sm text-gray-600">{candidate.percentage}%</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 
                          index === 2 ? 'bg-yellow-500' : 'bg-gray-400'
                        }`}
                        style={{ width: `${candidate.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {elections.find(e => e.id === selectedElection)?.status === 'ongoing' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This election is still ongoing. Results are preliminary and will update in real-time.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Results;