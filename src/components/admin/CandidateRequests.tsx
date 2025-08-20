import React, { useState } from 'react';
import Layout from '../shared/Layout';
import { UserPlus, Calendar, BarChart3, Users, Check, X, Eye, Mail, Phone, FileText } from 'lucide-react';

const CandidateRequests: React.FC = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      fullName: 'Alice Johnson',
      studentId: 'STU001',
      email: 'alice.johnson@university.edu',
      phone: '+1-555-0123',
      electionType: 'Student Council',
      party: 'Progressive Students',
      experience: '2 years as class representative, organized 5 campus events',
      manifesto: 'Focus on improving campus facilities and student welfare programs',
      status: 'pending',
      submittedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 2,
      fullName: 'Michael Chen',
      studentId: 'STU002',
      email: 'michael.chen@university.edu',
      phone: '+1-555-0124',
      electionType: 'Presidential',
      party: 'Independent',
      experience: 'Former debate team captain, volunteer coordinator',
      manifesto: 'Promote transparency and accountability in student governance',
      status: 'pending',
      submittedAt: '2024-01-14T14:20:00Z'
    },
    {
      id: 3,
      fullName: 'Sarah Williams',
      studentId: 'STU003',
      email: 'sarah.williams@university.edu',
      phone: '+1-555-0125',
      electionType: 'Senate',
      party: 'Student Unity Party',
      experience: 'Student newspaper editor, academic excellence award recipient',
      manifesto: 'Bridge the gap between students and administration',
      status: 'approved',
      submittedAt: '2024-01-13T09:15:00Z'
    }
  ]);

  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const menuItems = [
    { label: 'Dashboard', icon: <Users size={20} />, path: '/admin' },
    { label: 'Add Candidate', icon: <UserPlus size={20} />, path: '/admin/add-candidate' },
    { label: 'Candidate Requests', icon: <FileText size={20} />, path: '/admin/candidate-requests' },
    { label: 'Add New Elections', icon: <Calendar size={20} />, path: '/admin/new-election' },
    { label: 'View Election Result', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' } : req
    ));
    alert('Candidate request approved successfully!');
  };

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' } : req
    ));
    alert('Candidate request rejected.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');

  return (
    <Layout menuItems={menuItems}>
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Candidate Requests</h1>
          <p className="text-gray-600">Review and manage candidacy applications from students</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FileText className="text-yellow-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">{pendingRequests.length}</h3>
                <p className="text-gray-600 text-sm">Pending Requests</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg">
                <Check className="text-green-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {requests.filter(r => r.status === 'approved').length}
                </h3>
                <p className="text-gray-600 text-sm">Approved</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-lg">
                <X className="text-red-600" size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {requests.filter(r => r.status === 'rejected').length}
                </h3>
                <p className="text-gray-600 text-sm">Rejected</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Requests</h2>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="bg-white p-6 rounded-xl shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.fullName}</h3>
                      <p className="text-sm text-gray-600">Student ID: {request.studentId}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{request.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{request.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{request.electionType}</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{request.party}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-700 line-clamp-2">{request.manifesto}</p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedRequest(request)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center"
                    >
                      <Eye size={16} className="mr-2" />
                      View Details
                    </button>
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center"
                    >
                      <Check size={16} className="mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
                    >
                      <X size={16} className="mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Processed Requests */}
        {processedRequests.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Processed Requests</h2>
            <div className="space-y-4">
              {processedRequests.map((request) => (
                <div key={request.id} className="bg-white p-6 rounded-xl shadow-sm border opacity-75">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.fullName}</h3>
                      <p className="text-sm text-gray-600">{request.electionType} - {request.party}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Candidate Details</h2>
                  <button
                    onClick={() => setSelectedRequest(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium">{selectedRequest.fullName}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Student ID:</span>
                        <p className="font-medium">{selectedRequest.studentId}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <p className="font-medium">{selectedRequest.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <p className="font-medium">{selectedRequest.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Election Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Election Type:</span>
                        <p className="font-medium">{selectedRequest.electionType}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Party:</span>
                        <p className="font-medium">{selectedRequest.party}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                    <p className="text-sm text-gray-700">{selectedRequest.experience}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Campaign Manifesto</h3>
                    <p className="text-sm text-gray-700">{selectedRequest.manifesto}</p>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button
                      onClick={() => {
                        handleApprove(selectedRequest.id);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <Check size={20} className="mr-2" />
                      Approve Request
                    </button>
                    <button
                      onClick={() => {
                        handleReject(selectedRequest.id);
                        setSelectedRequest(null);
                      }}
                      className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <X size={20} className="mr-2" />
                      Reject Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CandidateRequests;