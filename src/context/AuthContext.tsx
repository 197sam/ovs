import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  role: 'admin' | 'voter';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (id: string, password: string): boolean => {
    // Mock authentication
    if (id === 'admin' && password === 'admin123') {
      setUser({ id: 'admin', role: 'admin', name: 'Administrator' });
      return true;
    } else if (id.startsWith('voter') && password === 'voter123') {
      setUser({ id, role: 'voter', name: `Voter ${id}` });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};