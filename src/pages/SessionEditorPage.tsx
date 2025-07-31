import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Save, Share, Clock, CheckCircle, Dumbbell } from 'lucide-react';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://arvyax-2k3f.onrender.com/api';

interface Session {
  _id?: string;
  title: string;
  tags: string[];
  json_file_url: string;
  status: 'draft' | 'published';
}

const SessionEditorPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState<Session>({
    title: '',
    tags: [],
    json_file_url: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isEditingRef = useRef(false);

  useEffect(() => {
    if (id) {
      fetchSession();
    }
  }, [id]);

  useEffect(() => {
    setTagsInput(session.tags.join(', '));
  }, [session.tags]);

  useEffect(() => {
    // Auto-save functionality
    if (isEditingRef.current && session.title && session.json_file_url) {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      autoSaveTimeoutRef.current = setTimeout(() => {
        autoSave();
      }, 5000);
    }

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [session.title, session.json_file_url, tagsInput]);

  const fetchSession = async () => {
    setLoading(true);
    try {
      // For demo purposes, provide mock data if backend is not available
      if (!import.meta.env.VITE_API_BASE_URL) {
        const mockSession = {
          _id: id,
          title: 'Sample Workout',
          tags: ['strength', 'cardio'],
          json_file_url: 'https://example.com/sample-workout.json',
          status: 'draft' as const
        };
        setSession(mockSession);
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/my-sessions/${id}`);
      setSession(response.data.session);
    } catch (error: any) {
      toast.error('Failed to fetch session');
      navigate('/my-sessions');
    } finally {
      setLoading(false);
    }
  };

  const autoSave = async () => {
    if (!session.title || !session.json_file_url || autoSaving) return;

    // For demo purposes, simulate auto-save if backend is not available
    if (!import.meta.env.VITE_API_BASE_URL) {
      setAutoSaving(true);
      setTimeout(() => {
        setLastSaved(new Date());
        setAutoSaving(false);
        toast.success('Auto-saved successfully (Demo Mode)', { duration: 2000 });
      }, 1000);
      return;
    }

    setAutoSaving(true);
    try {
      const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
      await axios.post(`${API_BASE_URL}/my-sessions/save-draft`, {
        id: session._id,
        title: session.title,
        tags,
        json_file_url: session.json_file_url
      });
      setLastSaved(new Date());
      toast.success('Auto-saved successfully', { duration: 2000 });
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      setAutoSaving(false);
    }
  };

  const handleInputChange = (field: keyof Session, value: string) => {
    isEditingRef.current = true;
    setSession(prev => ({ ...prev, [field]: value }));
  };

  const handleTagsChange = (value: string) => {
    isEditingRef.current = true;
    setTagsInput(value);
  };

  const saveDraft = async () => {
    if (!session.title || !session.json_file_url) {
      toast.error('Title and JSON file URL are required');
      return;
    }

    // For demo purposes, simulate save if backend is not available
    if (!import.meta.env.VITE_API_BASE_URL) {
      setSaving(true);
      setTimeout(() => {
        const updatedSession = {
          ...session,
          _id: session._id || 'demo-' + Date.now(),
          tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
        };
        setSession(updatedSession);
        setLastSaved(new Date());
        setSaving(false);
        toast.success('Draft saved successfully (Demo Mode)');
        
        if (!id) {
          navigate(`/editor/${updatedSession._id}`);
        }
      }, 1000);
      return;
    }
    setSaving(true);
    try {
      const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
      const response = await axios.post(`${API_BASE_URL}/my-sessions/save-draft`, {
        id: session._id,
        title: session.title,
        tags,
        json_file_url: session.json_file_url
      });

      setSession(response.data.session);
      setLastSaved(new Date());
      toast.success('Draft saved successfully');
      
      if (!id) {
        navigate(`/editor/${response.data.session._id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save draft');
    } finally {
      setSaving(false);
    }
  };

  const publishSession = async () => {
    if (!session.title || !session.json_file_url) {
      toast.error('Title and JSON file URL are required');
      return;
    }

    // For demo purposes, simulate publish if backend is not available
    if (!import.meta.env.VITE_API_BASE_URL) {
      setPublishing(true);
      setTimeout(() => {
        const updatedSession = {
          ...session,
          _id: session._id || 'demo-' + Date.now(),
          status: 'published' as const,
          tags: tagsInput.split(',').map(tag => tag.trim()).filter(Boolean)
        };
        setSession(updatedSession);
        setLastSaved(new Date());
        setPublishing(false);
        toast.success('Session published successfully! (Demo Mode)');
        
        if (!id) {
          navigate(`/editor/${updatedSession._id}`);
        }
      }, 1000);
      return;
    }
    setPublishing(true);
    try {
      const tags = tagsInput.split(',').map(tag => tag.trim()).filter(Boolean);
      const response = await axios.post(`${API_BASE_URL}/my-sessions/publish`, {
        id: session._id,
        title: session.title,
        tags,
        json_file_url: session.json_file_url
      });

      setSession(response.data.session);
      setLastSaved(new Date());
      toast.success('Session published successfully!');
      
      if (!id) {
        navigate(`/editor/${response.data.session._id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to publish session');
    } finally {
      setPublishing(false);
    }
  };

  const formatLastSaved = (date: Date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-fitness-dark mb-2 flex items-center">
            <Dumbbell className="h-8 w-8 mr-2 text-fitness-primary" />
            <span className="bg-gradient-fitness bg-clip-text text-transparent">
              {id ? 'Edit Workout' : 'Create New Workout'}
            </span>
          </h1>
          <div className="flex items-center space-x-4 text-sm text-fitness-dark/70">
            <div className="flex items-center space-x-1">
              <span>Status:</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                session.status === 'published'
                  ? 'bg-fitness-secondary/20 text-fitness-secondary'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {session.status}
              </span>
            </div>
            
            {autoSaving && (
              <div className="flex items-center space-x-1 text-fitness-primary">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-fitness-primary"></div>
                <span>Auto-saving...</span>
              </div>
            )}
            
            {lastSaved && !autoSaving && (
              <div className="flex items-center space-x-1 text-fitness-secondary">
                <CheckCircle className="h-4 w-4" />
                <span>Last saved at {formatLastSaved(lastSaved)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-fitness-dark mb-2">
                Workout Title *
              </label>
              <input
                id="title"
                type="text"
                required
                value={session.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-200"
                placeholder="Enter your workout title..."
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-fitness-dark mb-2">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={tagsInput}
                onChange={(e) => handleTagsChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-200"
                placeholder="strength, cardio, hiit, yoga (comma-separated)"
              />
              <p className="text-sm text-fitness-dark/70 mt-1">
                Separate tags with commas. Example: strength, cardio, hiit, yoga
              </p>
            </div>

            {/* JSON File URL */}
            <div>
              <label htmlFor="json_file_url" className="block text-sm font-medium text-fitness-dark mb-2">
                JSON File URL *
              </label>
              <input
                id="json_file_url"
                type="url"
                required
                value={session.json_file_url}
                onChange={(e) => handleInputChange('json_file_url', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fitness-primary focus:border-transparent transition-all duration-200"
                placeholder="https://example.com/session-data.json"
              />
              <p className="text-sm text-fitness-dark/70 mt-1">
                URL to your workout's JSON configuration file
              </p>
            </div>

            {/* Auto-save Notice */}
            <div className="bg-fitness-primary/10 border border-fitness-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-fitness-primary" />
                <div>
                  <p className="text-sm font-medium text-fitness-dark">Auto-save enabled</p>
                  <p className="text-sm text-fitness-primary">
                    Your changes are automatically saved after 5 seconds of inactivity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-8 py-6 bg-fitness-light/50 border-t border-fitness-primary/10 rounded-b-xl">
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <button
                onClick={saveDraft}
                disabled={saving || !session.title || !session.json_file_url}
                className="flex items-center justify-center space-x-2 px-6 py-3 border border-fitness-primary text-fitness-primary rounded-lg font-medium hover:bg-fitness-primary hover:text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                ) : (
                  <Save className="h-4 w-4" />
                )}
                <span>{saving ? 'Saving...' : 'Save as Draft'}</span>
              </button>

              <button
                onClick={publishSession}
                disabled={publishing || !session.title || !session.json_file_url}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-fitness text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {publishing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <Share className="h-4 w-4" />
                )}
                <span>{publishing ? 'Publishing...' : 'Publish Workout'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionEditorPage;