import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://arvyax-2k3f.onrender.com/api';

interface User {
  id: string;
  email: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
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
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('arvyax_token');
    const storedUser = localStorage.getItem('arvyax_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // For demo purposes, simulate successful login if backend is not available
      if (!import.meta.env.VITE_API_BASE_URL) {
        const mockUser = {
          id: 'demo-user',
          email: email,
          created_at: new Date().toISOString()
        };
        const mockToken = 'demo-token-' + Date.now();
        
        setToken(mockToken);
        setUser(mockUser);
        
        localStorage.setItem('arvyax_token', mockToken);
        localStorage.setItem('arvyax_user', JSON.stringify(mockUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        
        toast.success('Welcome back! (Demo Mode)');
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      
      localStorage.setItem('arvyax_token', newToken);
      localStorage.setItem('arvyax_user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      toast.success('Welcome back!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw new Error(message);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      // For demo purposes, simulate successful registration if backend is not available
      if (!import.meta.env.VITE_API_BASE_URL) {
        const mockUser = {
          id: 'demo-user',
          email: email,
          created_at: new Date().toISOString()
        };
        const mockToken = 'demo-token-' + Date.now();
        
        setToken(mockToken);
        setUser(mockUser);
        
        localStorage.setItem('arvyax_token', mockToken);
        localStorage.setItem('arvyax_user', JSON.stringify(mockUser));
        axios.defaults.headers.common['Authorization'] = `Bearer ${mockToken}`;
        
        toast.success('Account created successfully! (Demo Mode)');
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email,
        password
      });

      const { token: newToken, user: userData } = response.data;
      
      setToken(newToken);
      setUser(userData);
      
      localStorage.setItem('arvyax_token', newToken);
      localStorage.setItem('arvyax_user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      throw new Error(message);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('arvyax_token');
    localStorage.removeItem('arvyax_user');
    delete axios.defaults.headers.common['Authorization'];
    toast.success('Logged out successfully');
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};