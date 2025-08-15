import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Vote, 
  UserPlus, 
  Calendar, 
  BarChart3, 
  LogOut, 
  Users,
  Home,
  CheckCircle
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  menuItems: Array<{
    label: string;
    icon: React.ReactNode;
    path: string;
  }>;
}

const Layout: React.FC<LayoutProps> = ({ children, menuItems }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center">
            <Vote size={28} className="text-blue-600 mr-3" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">ElectionApp</h1>
              <p className="text-sm text-gray-600">{user?.name}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="w-full flex items-center p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-8"
          >
            <LogOut size={20} className="mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default Layout;