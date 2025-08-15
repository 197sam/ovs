import React, { useState } from 'react';
import Layout from '../shared/Layout';
import { UserPlus, Calendar, BarChart3, Users, Plus, Minus } from 'lucide-react';

const NewElection: React.FC = () => {
  const [electionData, setElectionData] = useState({
    electionId: '',
    electionType: '',
    numberOfCandidates: 2,
    electionDate: '',
    candidates: ['', '']
  });

  const menuItems = [
    { label: 'Dashboard', icon: <Users size={20} />, path: '/admin' },
    { label: 'Add Candidate', icon: <UserPlus size={20} />, path: '/admin/add-candidate' },
    { label: 'Add New Elections', icon: <Calendar size={20} />, path: '/admin/new-election' },
    { label: 'View Election Result', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'numberOfCandidates') {
      const numCandidates = parseInt(value);
      const newCandidates = Array(numCandidates).fill('').map((_, index) => 
        electionData.candidates[index] || ''
      );
      setElectionData(prev => ({
        ...prev,
        [name]: numCandidates,
        candidates: newCandidates
      }));
    } else {
      setElectionData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCandidateChange = (index: number, value: string) => {
    const newCandidates = [...electionData.candidates];
    newCandidates[index] = value;
    setElectionData(prev => ({
      ...prev,
      candidates: newCandidates
    }));
  };

  const addCandidate = () => {
    if (electionData.numberOfCandidates < 10) {
      setElectionData(prev => ({
        ...prev,
        numberOfCandidates: prev.numberOfCandidates + 1,
        candidates: [...prev.candidates, '']
      }));
    }
  };

  const removeCandidate = () => {
    if (electionData.numberOfCandidates > 2) {
      setElectionData(prev => ({
        ...prev,
        numberOfCandidates: prev.numberOfCandidates - 1,
        candidates: prev.candidates.slice(0, -1)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Election data:', electionData);
    alert('Election created successfully!');
    setElectionData({
      electionId: '',
      electionType: '',
      numberOfCandidates: 2,
      electionDate: '',
      candidates: ['', '']
    });
  };

  return (
    <Layout menuItems={menuItems}>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Election</h1>
          <p className="text-gray-600">Set up a new election with candidates and schedule</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="electionId" className="block text-sm font-medium text-gray-700 mb-2">
                  Election ID
                </label>
                <input
                  type="text"
                  id="electionId"
                  name="electionId"
                  value={electionData.electionId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="e.g., PRES2024"
                  required
                />
              </div>

              <div>
                <label htmlFor="electionType" className="block text-sm font-medium text-gray-700 mb-2">
                  Election Type
                </label>
                <select
                  id="electionType"
                  name="electionType"
                  value={electionData.electionType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                >
                  <option value="">Select Election Type</option>
                  <option value="presidential">Presidential</option>
                  <option value="senate">Senate</option>
                  <option value="house">House of Representatives</option>
                  <option value="local">Local Government</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="electionDate" className="block text-sm font-medium text-gray-700 mb-2">
                Election Date
              </label>
              <input
                type="date"
                id="electionDate"
                name="electionDate"
                value={electionData.electionDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Candidates: {electionData.numberOfCandidates}
                </label>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={removeCandidate}
                    disabled={electionData.numberOfCandidates <= 2}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">
                    {electionData.numberOfCandidates}
                  </span>
                  <button
                    type="button"
                    onClick={addCandidate}
                    disabled={electionData.numberOfCandidates >= 10}
                    className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {electionData.candidates.map((candidate, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Candidate {index + 1}
                    </label>
                    <input
                      type="text"
                      value={candidate}
                      onChange={(e) => handleCandidateChange(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder={`Enter candidate ${index + 1} name`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Create Election
              </button>
              <button
                type="button"
                onClick={() => setElectionData({
                  electionId: '',
                  electionType: '',
                  numberOfCandidates: 2,
                  electionDate: '',
                  candidates: ['', '']
                })}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewElection;