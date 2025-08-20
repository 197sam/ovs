import React from 'react';
import Layout from '../shared/Layout';
import { Calendar, BarChart3, Home, Vote, Clock, Users, User } from 'lucide-react';

const PendingElections: React.FC = () => {
  const menuItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/voter' },
    { label: 'Cast Vote', icon: <Vote size={20} />, path: '/voter/cast-vote' },
    { label: 'Pending Elections', icon: <Clock size={20} />, path: '/voter/pending-elections' },
    { label: 'Request Candidacy', icon: <User size={20} />, path: '/voter/request-candidacy' },
    { label: 'Results', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const pendingElections = [
    {
      id: 'GOV2024',
      title: 'Governor Election 2024',
      date: '2024-04-15',
      description: 'Elect the next Governor for the state',
      candidates: 4,
      status: 'upcoming'
    },
    {
      id: 'MAYOR2024',
      title: 'Mayor Election 2024',
      date: '2024-05-20',
      description: 'Choose the next Mayor for the city',
      candidates: 6,
      status: 'registration'
    },
    {
      id: 'SENATE2024',
      title: 'Senate Election 2024',
      date: '2024-06-10',
      description: 'Select representatives for the Senate',
      candidates: 8,
      status: 'upcoming'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'registration':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'Voting Soon';
      case 'registration':
        return 'Registration Open';
      default:
        return 'Pending';
    }
  };

  return (
    <Layout menuItems={menuItems}>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pending Elections</h1>
          <p className="text-gray-600">Upcoming elections you can participate in</p>
        </div>

        <div className="grid gap-6">
          {pendingElections.map((election) => (
            <div key={election.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    {election.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Election ID: {election.id}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(election.status)}`}>
                  {getStatusText(election.status)}
                </span>
              </div>

              <p className="text-gray-700 mb-4">
                {election.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <Calendar size={20} className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Election Date</p>
                    <p className="font-medium">{new Date(election.date).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users size={20} className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Candidates</p>
                    <p className="font-medium">{election.candidates} candidates</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock size={20} className="text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-600">Time Remaining</p>
                    <p className="font-medium">
                      {Math.ceil((new Date(election.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                {election.status === 'upcoming' ? (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Vote Now
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed font-medium" disabled>
                    Registration Period
                  </button>
                )}
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {pendingElections.length === 0 && (
          <div className="bg-white p-12 rounded-xl shadow-sm border text-center">
            <Clock size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Elections</h3>
            <p className="text-gray-600">
              There are currently no upcoming elections available for voting.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PendingElections;