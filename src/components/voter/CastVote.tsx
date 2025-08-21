import React, { useState } from 'react';
import Layout from '../shared/Layout';
import { Calendar, BarChart3, Home, Vote, Clock, Eye, User } from 'lucide-react';

const CastVote: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');

  const menuItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/voter' },
    { label: 'Cast Vote', icon: <Vote size={20} />, path: '/voter/cast-vote' },
    { label: 'Pending Elections', icon: <Clock size={20} />, path: '/voter/pending-elections' },
    { label: 'Results', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const candidates = [
    { id: '1', name: 'John Smith', party: 'Democratic Party', experience: '15 years in public service' },
    { id: '2', name: 'Sarah Johnson', party: 'Republican Party', experience: '12 years in business leadership' },
    { id: '3', name: 'Mike Brown', party: 'Independent', experience: '8 years in community organizing' },
    { id: '4', name: 'Lisa Davis', party: 'Green Party', experience: '10 years in environmental advocacy' },
  ];

  const handleVoteSubmit = () => {
    if (selectedCandidate) {
      const candidate = candidates.find(c => c.id === selectedCandidate);
      alert(`Vote cast for ${candidate?.name}!`);
      setSelectedCandidate('');
    } else {
      alert('Please select a candidate before submitting your vote.');
    }
  };

  const handleViewProfile = (candidateName: string) => {
    alert(`Viewing profile for ${candidateName}`);
  };

  return (
    <Layout menuItems={menuItems}>
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cast Your Vote</h1>
          <p className="text-gray-600">Presidential Election 2024</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Who should be leader?
            </h2>
            <p className="text-center text-gray-600">
              Select your preferred candidate for the Presidential Election 2024
            </p>
          </div>

          <div className="space-y-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`p-6 border-2 rounded-xl transition-all cursor-pointer ${
                  selectedCandidate === candidate.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id={candidate.id}
                        name="candidate"
                        value={candidate.id}
                        checked={selectedCandidate === candidate.id}
                        onChange={() => setSelectedCandidate(candidate.id)}
                        className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <User size={24} className="text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-gray-600">{candidate.party}</p>
                        <p className="text-xs text-gray-500">{candidate.experience}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewProfile(candidate.name);
                    }}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                  >
                    <Eye size={16} className="mr-2" />
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t">
            <div className="flex justify-center">
              <button
                onClick={handleVoteSubmit}
                disabled={!selectedCandidate}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Vote
              </button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Important:</strong> Your vote is anonymous and secure. Once submitted, it cannot be changed.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CastVote;