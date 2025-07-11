import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Heart, Clock, CheckCircle, AlertCircle, TrendingUp, Users } from 'lucide-react';
import RequestCard from '../components/RequestCard';
import Button from '../components/Button';
import API from '../utils/api';

const Dashboard = ({ user }) => {

  const navigate = useNavigate();
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get user data from localStorage if not passed as prop - memoized to prevent re-renders
  const currentUser = useCallback(() => {
    const userData = user || JSON.parse(localStorage.getItem('user') || '{}');
    
    // Validate user data structure
    if (!userData || typeof userData !== 'object') {

      return null;
    }
    
    // Ensure we have at least one identifier
    const hasValidIdentifier = userData.id || userData.username || userData.email || userData.usernameOrEmailOrMobileNo;
    if (!hasValidIdentifier) {
      
      return null;
    }
    
    return userData;
  }, [user]);
  
  // Get display name (name, email, or username)
  const getDisplayName = useCallback(() => {
    const userData = currentUser();
    if (userData?.name) return userData.name;
    if (userData?.email) return userData.email;
    if (userData?.username) return userData.username;
    if (userData?.usernameOrEmailOrMobileNo) return userData.usernameOrEmailOrMobileNo;
    return 'User';
  }, [currentUser]);

  // Check if a request belongs to the current user
  const isUserRequest = useCallback((request, userData) => {
    if (!userData || !request) {
  
      return false;
    }
    

    
    // Primary check: user ID match (most reliable)
    if (userData.id && request.userId) {
      const matches = String(userData.id) === String(request.userId);

      if (matches) return true;
    }
    
    // Secondary check: user object ID match
    if (userData.id && request.user?.id) {
      const matches = String(userData.id) === String(request.user.id);

      if (matches) return true;
    }
    
    // Fallback check: username match
    if (userData.username && request.username) {
      const matches = String(userData.username).toLowerCase() === String(request.username).toLowerCase();

      if (matches) return true;
    }
    
    // Additional check: email match
    if (userData.email && request.user?.email) {
      const matches = String(userData.email).toLowerCase() === String(request.user.email).toLowerCase();

      if (matches) return true;
    }
    

    return false;
  }, []);

  const handleEdit = (requestId) => {
    // Navigate to edit page or open edit modal
    const editUrl = `/edit-request/${requestId}`;
    navigate(editUrl);
  };

  useEffect(() => {
    const fetchDashboardData = async () => {

      try {
        setLoading(true);
        setError(null);

        const userData = currentUser();

        
        if (!userData || !userData.usernameOrEmailOrMobileNo) {

          setMyRequests([]);
          setLoading(false);
          return;
        }

        // Fetch dashboard data from correct backend endpoint
        try {
          const myRequestsRes = await API.get('/requests/my');
          setMyRequests(myRequestsRes.data || []);
          
          // Use the first request's user data to identify the current user correctly
          if (myRequestsRes.data && myRequestsRes.data.length > 0) {
            const firstRequest = myRequestsRes.data[0];

            // Update the currentUser function to use this data
            const backendUserData = {
              id: firstRequest.userId,
              username: firstRequest.username,
              email: currentUser()?.email || userData.email
            };

          }
        } catch (myRequestsError) {

          setMyRequests([]);
        }
      } catch (error) {
        console.error('Error in Dashboard useEffect:', error);
        setError('Failed to load dashboard data');
        setMyRequests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentUser]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen gradient-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h3>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  // Fallback render to prevent blank screen
  return (
    <div className="min-h-screen gradient-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome back, {getDisplayName()}! 👋
              </h1>
              <p className="text-xl text-gray-600">
                Here's an overview of your community activity and impact.
              </p>
            </div>
            <div className="mt-6 sm:mt-0 flex flex-col sm:flex-row gap-4">
              <Link to="/post-request">
                <Button className="flex items-center text-lg px-6 py-3">
                  <Plus className="h-5 w-5 mr-2" />
                  Post New Request
                </Button>
              </Link>
              <Link to="/browse-requests">
                <Button variant="outline" className="flex items-center text-lg px-6 py-3">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Requests
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-3xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">My Requests</p>
                <p className="text-3xl font-bold text-gray-900">{myRequests.length}</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-3xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-2xl">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900">{myRequests.length}</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-3xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Requests</p>
                <p className="text-3xl font-bold text-gray-900">
                  {myRequests.filter(r => r.status === 'active' || r.status === 'OPEN').length}
                </p>
              </div>
            </div>
          </div>
          <div className="glass rounded-3xl p-6 hover:scale-105 transition-all duration-300">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 rounded-2xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900">
                  {myRequests.filter(r => r.status === 'completed' || r.status === 'CLOSED').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* My Requests Section */}
        <div className="glass rounded-3xl shadow-2xl mb-8 overflow-hidden">
          <div className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <nav className="flex space-x-8 px-8">
              <div className="py-6 px-1 border-b-2 border-blue-500 font-semibold text-lg text-blue-600">
                My Help Requests ({myRequests.length})
              </div>
            </nav>
          </div>

          <div className="p-8">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  My Help Requests ({myRequests.length})
                </h2>
                <Link to="/post-request">
                  <Button size="lg" className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    New Request
                  </Button>
                </Link>
              </div>
              
              {myRequests.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl inline-block mb-6">
                    <Heart className="h-16 w-16 text-blue-500 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No requests yet</h3>
                  <p className="text-gray-600 mb-8 text-lg">Start by posting your first help request to connect with your community</p>
                  <Link to="/post-request">
                    <Button size="lg" className="text-lg px-8 py-4">
                      Post Your First Request
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myRequests.map((request) => {
            
                    // Use the request's own userId for comparison since these are already filtered by the backend
                    const isOwn = true; // Since these are from /api/requests/my, they are all the user's own requests
                    
                    return (
                      <RequestCard
                        key={request.id}
                        request={request}
                        isOwnRequest={isOwn}
                        onViewDetails={(id) => navigate(`/request/${id}`)}
                        onSupport={(id) => navigate(`/request/${id}`)}
                        onEdit={() => handleEdit(request.id)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 