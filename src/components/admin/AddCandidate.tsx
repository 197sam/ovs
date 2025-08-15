import React, { useState } from 'react';
import Layout from '../shared/Layout';
import { UserPlus, Calendar, BarChart3, Upload, User, MapPin, Phone, Users } from 'lucide-react';

const AddCandidate: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
    photo: null as File | null
  });

  const menuItems = [
    { label: 'Dashboard', icon: <Users size={20} />, path: '/admin' },
    { label: 'Add Candidate', icon: <UserPlus size={20} />, path: '/admin/add-candidate' },
    { label: 'Add New Elections', icon: <Calendar size={20} />, path: '/admin/new-election' },
    { label: 'View Election Result', icon: <BarChart3 size={20} />, path: '/results' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Candidate data:', formData);
    alert('Candidate added successfully!');
    setFormData({
      name: '',
      address: '',
      mobile: '',
      photo: null
    });
  };

  const handleUpload = () => {
    if (formData.photo) {
      alert(`Photo "${formData.photo.name}" uploaded successfully!`);
    } else {
      alert('Please select a photo first.');
    }
  };

  return (
    <Layout menuItems={menuItems}>
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Candidate</h1>
          <p className="text-gray-600">Register a new candidate for upcoming elections</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-sm border">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="mr-2" />
                Candidate Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter candidate's full name"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <MapPin size={16} className="mr-2" />
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                placeholder="Enter candidate's address"
                required
              />
            </div>

            <div>
              <label htmlFor="mobile" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="mr-2" />
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Upload size={16} className="mr-2" />
                Candidate Photo
              </label>
              <div className="space-y-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                  type="button"
                  onClick={handleUpload}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  disabled={!formData.photo}
                >
                  Upload Photo
                </button>
                {formData.photo && (
                  <p className="text-sm text-green-600">Selected: {formData.photo.name}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Add Candidate
              </button>
              <button
                type="button"
                onClick={() => setFormData({ name: '', address: '', mobile: '', photo: null })}
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

export default AddCandidate;