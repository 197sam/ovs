import React, { useState } from 'react';
import Layout from '../shared/Layout';
import { Calendar, BarChart3, Home, Vote, Clock, User, FileText, Send, Upload } from 'lucide-react';

const RequestCandidacy: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    electionType: '',
    party: '',
    manifesto: '',
    experience: '',
    photo: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const menuItems = [
    { label: 'Dashboard', icon: <Home size={20} />, path: '/voter' },
    { label: 'Cast Vote', icon: <Vote size={20} />, path: '/voter/cast-vote' },
    { label: 'Pending Elections', icon: <Clock size={20} />, path: '/voter/pending-elections' },
    { label: 'Request Candidacy', icon: <User size={20} />, path: '/voter/request-candidacy' },
    { label: 'Results', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.electionType) newErrors.electionType = 'Election type is required';
    if (!formData.party.trim()) newErrors.party = 'Party affiliation is required';
    if (!formData.manifesto.trim()) newErrors.manifesto = 'Manifesto is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate sending request to admin
      console.log('Candidate request submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          fullName: '',
          studentId: '',
          email: '',
          phone: '',
          electionType: '',
          party: '',
          manifesto: '',
          experience: '',
          photo: null
        });
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <Layout menuItems={menuItems}>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm border text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted Successfully!</h1>
            <p className="text-gray-600 mb-4">
              Your candidacy request has been sent to the admin for review. You will be notified once your application is processed.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Next Steps:</strong> The admin will review your application and contact you within 2-3 business days.
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout menuItems={menuItems}>
      <div className="max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Request Candidacy</h1>
          <p className="text-gray-600">Apply to become a candidate in upcoming elections</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.fullName ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
                </div>

                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                    Student ID
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.studentId ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your student ID"
                  />
                  {errors.studentId && <p className="mt-1 text-sm text-red-600">{errors.studentId}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Election Details */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Election Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="electionType" className="block text-sm font-medium text-gray-700 mb-2">
                    Election Type
                  </label>
                  <select
                    id="electionType"
                    name="electionType"
                    value={formData.electionType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.electionType ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select Election Type</option>
                    <option value="student-president">Student Body President</option>
                    <option value="student-vice-president">Student Body Vice President</option>
                    <option value="student-secretary">Student Secretary</option>
                    <option value="student-treasurer">Student Treasurer</option>
                    <option value="class-representative">Class Representative</option>
                    <option value="department-representative">Department Representative</option>
                    <option value="student-council">Student Council Member</option>
                    <option value="cultural-secretary">Cultural Secretary</option>
                    <option value="sports-secretary">Sports Secretary</option>
                  </select>
                  {errors.electionType && <p className="mt-1 text-sm text-red-600">{errors.electionType}</p>}
                </div>

                <div>
                  <label htmlFor="party" className="block text-sm font-medium text-gray-700 mb-2">
                    Party Affiliation
                  </label>
                  <input
                    type="text"
                    id="party"
                    name="party"
                    value={formData.party}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                      errors.party ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Enter your party or 'Independent'"
                  />
                  {errors.party && <p className="mt-1 text-sm text-red-600">{errors.party}</p>}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                    Relevant Experience
                  </label>
                  <textarea
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                      errors.experience ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Describe your relevant experience and qualifications"
                  />
                  {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                </div>

                <div>
                  <label htmlFor="manifesto" className="block text-sm font-medium text-gray-700 mb-2">
                    Campaign Manifesto
                  </label>
                  <textarea
                    id="manifesto"
                    name="manifesto"
                    value={formData.manifesto}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                      errors.manifesto ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
                    }`}
                    placeholder="Outline your campaign goals and what you hope to achieve"
                  />
                  {errors.manifesto && <p className="mt-1 text-sm text-red-600">{errors.manifesto}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload size={16} className="inline mr-2" />
                    Profile Photo
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.photo && (
                    <p className="mt-1 text-sm text-green-600">Selected: {formData.photo.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
              >
                <Send size={20} className="mr-2" />
                Submit Request
              </button>
              <button
                type="button"
                onClick={() => setFormData({
                  fullName: '',
                  studentId: '',
                  email: '',
                  phone: '',
                  electionType: '',
                  party: '',
                  manifesto: '',
                  experience: '',
                  photo: null
                })}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Clear Form
              </button>
            </div>
          </form>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> All candidacy requests are subject to admin approval. Please ensure all information is accurate and complete.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestCandidacy;