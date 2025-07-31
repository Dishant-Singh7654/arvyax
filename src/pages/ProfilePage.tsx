import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, Mail, Check, AlertCircle, Dumbbell } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const ProfilePage: React.FC = () => {
  const { user, token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // For demo purposes, simulate successful password change if backend is not available
      if (!import.meta.env.VITE_API_BASE_URL) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setSuccess('Password changed successfully (Demo Mode)');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        toast.success('Password changed successfully (Demo Mode)');
        setLoading(false);
        return;
      }

      // Real API call
      const response = await axios.post(
        `${API_BASE_URL}/auth/change-password`,
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setSuccess(response.data.message || 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toast.success(response.data.message || 'Password changed successfully');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to change password';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-fitness-light bg-fitness-pattern py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-fitness-dark mb-2 flex items-center justify-center">
            <Dumbbell className="h-8 w-8 mr-2 text-fitness-primary animate-pulse-slow" />
            <span className="bg-gradient-fitness bg-clip-text text-transparent">Your ArvyaX Profile</span>
          </h1>
          <p className="text-lg text-fitness-dark/70">Manage your account information and security</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-fitness px-6 py-8 text-white">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-4 rounded-full">
                <User className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.email.split('@')[0]}</h2>
                <p className="opacity-80">Member since {new Date(user.created_at).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-fitness-dark mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-fitness-primary" />
                Account Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-fitness-dark mb-1">User ID</label>
                  <div className="bg-fitness-light/50 px-4 py-3 rounded-lg text-fitness-dark font-mono text-sm break-all">
                    {user.id}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fitness-dark mb-1">Email Address</label>
                  <div className="flex items-center bg-fitness-light/50 px-4 py-3 rounded-lg">
                    <Mail className="h-5 w-5 text-fitness-primary/70 mr-2" />
                    <span className="text-fitness-dark">{user.email}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-fitness-dark mb-1">Account Created</label>
                  <div className="bg-fitness-light/50 px-4 py-3 rounded-lg text-fitness-dark">
                    {new Date(user.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <h3 className="text-xl font-semibold text-fitness-dark mb-4 flex items-center">
                <Lock className="h-5 w-5 mr-2 text-fitness-primary" />
                Change Password
              </h3>
              
              <form onSubmit={handlePasswordChange} className="space-y-4">
                {error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                
                {success && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-start">
                    <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{success}</span>
                  </div>
                )}
                
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-fitness-dark mb-1">
                    Current Password
                  </label>
                  <input
                    id="currentPassword"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-fitness-dark mb-1">
                    New Password
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-fitness-dark mb-1">
                    Confirm New Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-fitness text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;