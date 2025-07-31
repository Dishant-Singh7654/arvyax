import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Dumbbell, BookOpen, PlusCircle, User, LogOut } from 'lucide-react';
import fitnessLogo from '../assets/images/arvyax-logo.svg';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <nav className="bg-fitness-light shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <img src={fitnessLogo} alt="ArvyaX Logo" className="h-10 w-10" />
            <span className="text-xl font-bold bg-gradient-fitness bg-clip-text text-transparent">
              ArvyaX
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/dashboard')
                  ? 'text-fitness-primary bg-fitness-primary/10'
                  : 'text-fitness-dark hover:text-fitness-primary hover:bg-fitness-primary/10'
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>All Sessions</span>
            </Link>

            <Link
              to="/my-sessions"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/my-sessions')
                  ? 'text-fitness-primary bg-fitness-primary/10'
                  : 'text-fitness-dark hover:text-fitness-primary hover:bg-fitness-primary/10'
              }`}
            >
              <span>My Sessions</span>
            </Link>

            <Link
              to="/editor"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/editor')
                  ? 'text-fitness-primary bg-fitness-primary/10'
                  : 'text-fitness-dark hover:text-fitness-primary hover:bg-fitness-primary/10'
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              <span>New Session</span>
            </Link>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <Link
                to="/profile"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/profile')
                    ? 'text-fitness-primary bg-fitness-primary/10'
                    : 'text-fitness-dark hover:text-fitness-primary hover:bg-fitness-primary/10'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-fitness-dark hover:text-fitness-secondary hover:bg-fitness-secondary/10 rounded-md transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;