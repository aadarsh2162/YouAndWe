import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Heart, Users, Clock, Star, Grid, List, Eye, TrendingUp, Calendar, User, Sparkles, AlertCircle } from 'lucide-react';
import RequestCard from '../components/RequestCard';
import Button from '../components/Button';
import API from '../utils/api';

const BrowseRequests = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');
  const [error, setError] = useState(null);

  const categories = [
    { value: '', label: 'All Categories', icon: '🌟', color: 'from-blue-500 to-purple-500' },
    { value: 'food', label: 'Food & Nutrition', icon: '🍽️', color: 'from-orange-500 to-red-500' },
    { value: 'education', label: 'Education', icon: '📚', color: 'from-green-500 to-teal-500' },
    { value: 'health', label: 'Health & Medical', icon: '🏥', color: 'from-red-500 to-pink-500' },
    { value: 'housing', label: 'Housing', icon: '🏠', color: 'from-indigo-500 to-blue-500' },
    { value: 'transportation', label: 'Transportation', icon: '🚗', color: 'from-yellow-500 to-orange-500' },
    { value: 'other', label: 'Other', icon: '💡', color: 'from-gray-500 to-slate-500' },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get('/requests');
        setRequests(res.data || []);
        setFilteredRequests(res.data || []);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError('Failed to load requests. Please try again.');
        setRequests([]);
        setFilteredRequests([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  useEffect(() => {
    let filtered = requests;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.help?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.username?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(request => 
        request.category === selectedCategory || 
        (selectedCategory === 'other' && !request.category)
      );
    }

    // Sort requests
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.requestPostedOn) - new Date(a.requestPostedOn);
        case 'username':
          return a.username.localeCompare(b.username);
        case 'urgent':
          return 0;
        default:
          return 0;
      }
    });

    setFilteredRequests(filtered);
  }, [requests, searchTerm, selectedCategory, sortBy]);

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'username', label: 'By Username' },
    { value: 'urgent', label: 'Most Urgent' },
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('recent');
  };

  

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="loading-spinner w-16 h-16 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Help Requests</h3>
          <p className="text-gray-600">Finding amazing people who need your help...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 p-8 rounded-3xl mb-6">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Requests</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
            Browse Help Requests
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover people in your community who need help. Every act of kindness creates a ripple effect of positive change.
          </p>
          <div className="flex items-center justify-center mt-6 space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>{requests.length} Total Requests</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              <span>{filteredRequests.length} Matching</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-3xl shadow-2xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Search */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Search Requests
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by help title, details, or username..."
                  className="input-field pl-12 group-hover:shadow-lg transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Sort by
              </label>
              <select
                className="input-field cursor-pointer hover:shadow-lg transition-all duration-300"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category.value
                      ? `bg-gradient-to-r ${category.color} text-white shadow-lg scale-105`
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(searchTerm || selectedCategory || sortBy !== 'recent') && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center transition-colors"
              >
                <Filter className="h-4 w-4 mr-1" />
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold text-gray-900">
                {filteredRequests.length} {filteredRequests.length === 1 ? 'Request' : 'Requests'} Found
              </h2>
              {filteredRequests.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-600">
                    Showing {filteredRequests.length} of {requests.length} requests
                  </span>
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            {filteredRequests.length > 0 && (
              <div className="flex items-center space-x-2 bg-white rounded-xl p-1 shadow-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {filteredRequests.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-3xl inline-block mb-8 shadow-lg">
                <Search className="h-20 w-20 text-blue-500 mx-auto mb-4" />
                <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto"></div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No requests found</h3>
              <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto leading-relaxed">
                {searchTerm 
                  ? "We couldn't find any requests matching your search. Try adjusting your search terms or browse all requests."
                  : "No help requests have been posted yet. Be the first to make a difference!"
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {searchTerm ? (
                  <Button onClick={clearFilters} className="text-lg px-8 py-4">
                    Clear Search
                  </Button>
                ) : (
                  <Button onClick={() => window.location.href = '/post-request'} className="text-lg px-8 py-4">
                    Post First Request
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/browse-requests'} 
                  className="text-lg px-8 py-4"
                >
                  Browse All Requests
                </Button>
              </div>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2' 
                : 'grid-cols-1'
            }`}>
              {filteredRequests.map((request, index) => (
                <div 
                  key={request.id} 
                  className="slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <RequestCard
                    request={request}
                    isOwnRequest={false}
                    viewMode={viewMode}
                    onViewDetails={(id) => navigate(`/request/${id}`)}
                    onSupport={(id) => navigate(`/request/${id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        {filteredRequests.length > 0 && (
          <div className="text-center py-12">
            <div className="glass rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Every act of kindness matters. Whether you can offer time, resources, or expertise, 
                your help can change someone's life for the better.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => window.location.href = '/post-request'} className="text-lg px-8 py-4">
                  Post Your Own Request
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/browse-requests'} className="text-lg px-8 py-4">
                  Browse All Requests
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Debug Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h4 className="font-semibold mb-2">Debug Info:</h4>
          <p>Loading: {loading.toString()}</p>
          <p>Error: {error || 'None'}</p>
          <p>Total requests: {requests.length}</p>
          <p>Filtered requests: {filteredRequests.length}</p>
          <p>Search term: "{searchTerm}"</p>
          <p>Selected category: "{selectedCategory}"</p>
          <p>Sort by: "{sortBy}"</p>
          <p>View mode: "{viewMode}"</p>
        </div>
      </div>
    </div>
  );
};

export default BrowseRequests; 