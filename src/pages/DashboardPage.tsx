import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Clock, Tag, User, Search, Filter, Dumbbell } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

interface Workout {
  _id: string;
  title: string;
  tags: string[];
  json_file_url: string;
  status: 'draft' | 'published';
  author: {
    email: string;
  };
  created_at: string;
  updated_at: string;
  published_at?: string;
}

const DashboardPage: React.FC = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      // For demo purposes, provide mock data if backend is not available
      if (!import.meta.env.VITE_API_BASE_URL) {
        const mockSessions = [
          {
            _id: '1',
            title: 'Morning HIIT Workout',
            tags: ['hiit', 'morning', 'cardio'],
            json_file_url: 'https://example.com/morning-hiit.json',
            status: 'published' as const,
            author: { email: 'trainer@arvyax.com' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date().toISOString()
          },
          {
            _id: '2',
            title: 'Yoga Flow Session',
            tags: ['yoga', 'flexibility', 'strength'],
            json_file_url: 'https://example.com/yoga-flow.json',
            status: 'published' as const,
            author: { email: 'yoga@arvyax.com' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date().toISOString()
          },
          {
            _id: '3',
            title: 'Strength Training Basics',
            tags: ['strength', 'weights', 'beginner'],
            json_file_url: 'https://example.com/strength-basics.json',
            status: 'published' as const,
            author: { email: 'coach@arvyax.com' },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            published_at: new Date().toISOString()
          }
        ];
        setWorkouts(mockSessions);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/sessions`);
      setWorkouts(response.data.sessions);
    } catch (error: any) {
      toast.error('Failed to fetch sessions');
      console.error('Fetch sessions error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAllTags = () => {
    const tags = workouts.flatMap(workout => workout.tags);
    return [...new Set(tags)].filter(Boolean);
  };

  const filteredSessions = workouts.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.author.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || session.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fitness-dark mb-2 flex items-center">
            <Dumbbell className="h-8 w-8 mr-2 text-fitness-primary" />
            <span className="bg-gradient-fitness bg-clip-text text-transparent">Fitness Sessions</span>
          </h1>
          <p className="text-fitness-dark">Discover transformative fitness sessions from our expert trainers</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sessions or authors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="sm:w-64">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Tags</option>
                  {getAllTags().map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        {filteredSessions.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h3 className="text-lg font-medium text-fitness-dark mb-2">No sessions found</h3>
              <p className="text-fitness-dark/70">
                {searchTerm || selectedTag 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Be the first to publish a fitness session!'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map(session => (
              <div key={session._id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-fitness-dark mb-3 group-hover:text-fitness-primary transition-colors">
                    {session.title}
                  </h3>
                  
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

                  <div className="flex items-center justify-between text-sm text-fitness-dark/70">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{session.author.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(session.published_at || session.created_at)}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <a
                      href={session.json_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gradient-fitness text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                    >
                      View Workout
                    </a>
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

export default DashboardPage;