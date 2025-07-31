import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, Tag, Edit, PlusCircle, FileText, Globe, Dumbbell } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://arvyax-2k3f.onrender.com/api';

interface Session {
  _id: string;
  title: string;
  tags: string[];
  json_file_url: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  published_at?: string;
}

const MySessionsPage: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'drafts' | 'published'>('all');

  useEffect(() => {
    fetchMySessions();
  }, []);

  const fetchMySessions = async () => {
    try {
      // For demo purposes, provide mock data if backend is not available
      if (!import.meta.env.VITE_API_BASE_URL) {
        const mockSessions = [
          {
            _id: '1',
            title: 'My Morning HIIT Routine',
            tags: ['hiit', 'cardio', 'energy'],
            json_file_url: 'https://example.com/my-morning-hiit.json',
            status: 'published' as const,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            updated_at: new Date(Date.now() - 86400000).toISOString(),
            published_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            _id: '2',
            title: 'Lunch Break Strength Training',
            tags: ['strength', 'weights', 'quick'],
            json_file_url: 'https://example.com/lunch-strength.json',
            status: 'draft' as const,
            created_at: new Date(Date.now() - 3600000).toISOString(),
            updated_at: new Date(Date.now() - 1800000).toISOString()
          }
        ];
        setSessions(mockSessions);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/my-sessions`);
      setSessions(response.data.sessions);
    } catch (error: any) {
      toast.error('Failed to fetch your sessions');
      console.error('Fetch my sessions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (activeTab === 'drafts') return session.status === 'draft';
    if (activeTab === 'published') return session.status === 'published';
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTabCount = (status: 'all' | 'drafts' | 'published') => {
    if (status === 'drafts') return sessions.filter(s => s.status === 'draft').length;
    if (status === 'published') return sessions.filter(s => s.status === 'published').length;
    return sessions.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fitness-light bg-fitness-pattern flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fitness-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fitness-light bg-fitness-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-fitness-dark mb-2 flex items-center">
              <Dumbbell className="h-8 w-8 mr-2 text-fitness-primary" />
              <span className="bg-gradient-fitness bg-clip-text text-transparent">My Workouts</span>
            </h1>
            <p className="text-fitness-dark">Manage your fitness workouts and training plans</p>
          </div>
          <Link
            to="/editor"
            className="inline-flex items-center px-6 py-3 bg-gradient-fitness text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 space-x-2"
          >
            <PlusCircle className="h-5 w-5" />
            <span>New Session</span>
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Sessions', icon: FileText },
                { key: 'drafts', label: 'Drafts', icon: Edit },
                { key: 'published', label: 'Published', icon: Globe }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-fitness-primary text-fitness-primary'
                      : 'border-transparent text-fitness-dark/70 hover:text-fitness-dark hover:border-fitness-primary/30'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === key
                      ? 'bg-fitness-primary/20 text-fitness-primary'
                      : 'bg-gray-100 text-fitness-dark/70'
                  }`}>
                    {getTabCount(key as any)}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-lg font-medium text-fitness-dark mb-2">
                {activeTab === 'drafts' ? 'No drafts yet' : 
                 activeTab === 'published' ? 'No published sessions yet' : 
                 'No sessions yet'}
              </h3>
              <p className="text-fitness-dark/70 mb-6">
                {activeTab === 'drafts' ? 'Start creating your first fitness session draft.' :
                 activeTab === 'published' ? 'Publish your first session to share with the community.' :
                 'Create your first fitness session to get started.'}
              </p>
              <Link
                to="/editor"
                className="inline-flex items-center px-6 py-3 bg-gradient-fitness text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105 space-x-2"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Create First Session</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map(session => (
              <div key={session._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-fitness-dark group-hover:text-fitness-primary transition-colors">
                      {session.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.status === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {session.status}
                    </span>
                  </div>
                  
                  {session.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {session.tags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fitness-primary/20 text-fitness-primary"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="text-sm text-fitness-dark/70 mb-4">
                    <div className="flex items-center space-x-1 mb-1">
                      <Clock className="h-4 w-4" />
                      <span>Updated: {formatDate(session.updated_at)}</span>
                    </div>
                    {session.published_at && (
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4" />
                        <span>Published: {formatDate(session.published_at)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      to={`/editor/${session._id}`}
                      className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-fitness-primary text-fitness-primary rounded-lg font-medium hover:bg-fitness-primary hover:text-white transition-all duration-200"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    {session.status === 'published' && (
                      <a
                        href={session.json_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-fitness text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        View
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySessionsPage;