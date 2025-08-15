import React, { useState } from 'react';
import { User, Lock, IdCard, Hash, ArrowLeft } from 'lucide-react';

interface StudentRegistrationProps {
  onBack: () => void;
}

const StudentRegistration: React.FC<StudentRegistrationProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    userId: '',
    password: '',
    ila: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.userId.trim()) {
      newErrors.userId = 'User ID is required';
    } else if (formData.userId.length < 3) {
      newErrors.userId = 'User ID must be at least 3 characters';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.ila.trim()) {
      newErrors.ila = 'ILA is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log('Student registration data:', formData);
      alert(`Student registered successfully!\nName: ${formData.name}\nUser ID: ${formData.userId}\nILA: ${formData.ila}`);
      
      // Reset form
      setFormData({
        name: '',
        userId: '',
        password: '',
        ila: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center mb-6">
          <button
            onClick={onBack}
            className="mr-3 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Student Registration</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <User size={16} className="mr-2" />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="userId" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <IdCard size={16} className="mr-2" />
              User ID
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.userId ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Create a unique user ID"
            />
            {errors.userId && <p className="mt-1 text-sm text-red-600">{errors.userId}</p>}
          </div>

          <div>
            <label htmlFor="password" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Lock size={16} className="mr-2" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Create a secure password"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="ila" className="flex items-center text-sm font-medium text-gray-700 mb-2">
              <Hash size={16} className="mr-2" />
              ILA Number
            </label>
            <input
              type="text"
              id="ila"
              name="ila"
              value={formData.ila}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.ila ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter your ILA number"
            />
            {errors.ila && <p className="mt-1 text-sm text-red-600">{errors.ila}</p>}
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Register Student
            </button>
            <button
              type="button"
              onClick={() => setFormData({ name: '', userId: '', password: '', ila: '' })}
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Clear Form
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Please keep your login credentials secure. You'll need them to access the voting system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;