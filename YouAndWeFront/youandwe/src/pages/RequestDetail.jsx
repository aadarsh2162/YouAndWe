import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, User, Heart, MessageCircle, Share2, ArrowLeft, AlertCircle, Phone, Mail, MapPin as LocationIcon, Clock, Users, Star, TrendingUp, X, Send, CheckCircle, Shield, Clock as TimeIcon } from 'lucide-react';
import Button from '../components/Button';
import Toast from '../components/Toast';
import API from '../utils/api';

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [supporting, setSupporting] = useState(false);
  const [showSupportMessage, setShowSupportMessage] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/requests/${id}`);
        setRequest(res.data);
        
        // Get current user info
        const user = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching request:', error);
        setRequest(null);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSupport = async () => {
    setSupporting(true);
    try {
      // Get current user info
      let user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Please log in to offer support.');
        return;
      }

      // If user data is incomplete, try to fetch complete profile
      if (!user.id || !user.email) {
        try {
          const profileRes = await API.get('/auth/profile');
          user = { ...user, ...profileRes.data };
          localStorage.setItem('user', JSON.stringify(user));
        } catch (profileError) {

        }
      }

      // Send support offer with user's contact details
      // This will trigger email notification to request creator
      const supportData = {
        requestId: parseInt(id),
        supporterId: user?.id || 1,
        supporterName: user?.name || user?.usernameOrEmailOrMobileNo || user?.username || 'Anonymous',
        supporterEmail: user?.email || user?.usernameOrEmailOrMobileNo || 'supporter@example.com',
        supporterPhone: user?.phone || user?.mobileNo || 'Not provided',
        message: `I would like to offer support for your request: "${request.help || request.title || 'this request'}"`,
        supportType: 'general',
        availability: 'Contact me for availability',
        contactMethod: 'email'
      };



      const res = await API.post('/support-offers', supportData);

      
      setToastMessage(`Support offer sent successfully! ${request.username} will contact you soon.`);
      setToastType('success');
      setShowToast(true);
      setShowSupportMessage(true);
      setTimeout(() => setShowSupportMessage(false), 5000);
    } catch (error) {
      console.error('Error offering support:', error);
      
      let errorMessage = 'Failed to offer support. Please try again.';
      
      if (error.response) {
        // Server responded with error status
        console.error('Error response:', error.response.data);
        if (error.response.status === 401) {
          errorMessage = 'Please log in to offer support.';
        } else if (error.response.status === 404) {
          errorMessage = 'Request not found.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
    } finally {
      setSupporting(false);
    }
  };

  const handleContact = async () => {
    setShowContactModal(true);
    try {
      // Fetch contact information from backend
      // Expected response format:
      // {
      //   phone: "string",
      //   email: "string", 
      //   whatsapp: "string",
      //   location: "string",
      //   preferredTime: "string",
      //   address: "string"
      // }
      const res = await API.get(`/requests/${id}/contact`);
      setContactInfo(res.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      // Fallback contact info if API fails
      setContactInfo({
        phone: request.phone || 'Not available',
        email: request.email || `${request.username}@example.com`,
        location: request.location || 'Local Community',
        preferredTime: request.preferredTime || 'Contact for availability',
        whatsapp: request.whatsapp || request.phone || 'Not available'
      });
    }
  };

  const isOwnRequest = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    return currentUser && request && request.username === currentUser.usernameOrEmailorMobileNo;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍽️',
      education: '📚',
      health: '🏥',
      housing: '🏠',
      transportation: '🚗',
      other: '💡'
    };
    return icons[category?.toLowerCase()] || '🌟';
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: 'from-orange-500 to-red-500',
      education: 'from-green-500 to-teal-500',
      health: 'from-red-500 to-pink-500',
      housing: 'from-indigo-500 to-blue-500',
      transportation: 'from-yellow-500 to-orange-500',
      other: 'from-gray-500 to-slate-500'
    };
    return colors[category?.toLowerCase()] || 'from-blue-500 to-purple-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="loading-spinner w-16 h-16 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-blue-500 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Request Details</h3>
          <p className="text-gray-600">Getting all the information you need...</p>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen gradient-bg py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="bg-red-50 p-8 rounded-3xl mb-6">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Not Found</h2>
            <p className="text-gray-600 mb-6">The request you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/browse-requests')}>
              Browse Other Requests
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-8">
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/browse-requests')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Requests
          </button>
        </div>

        {/* Support Message */}
        {showSupportMessage && (
          <div className="mb-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-3xl shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-800 mb-1">
                  Support Offer Sent Successfully! 🎉
                </h3>
                <p className="text-green-700">
                  Thank you for offering to help! An email notification with your contact details has been sent to <span className="font-semibold">@{request.username}</span>. 
                  They will contact you soon to coordinate the support.
                </p>
              </div>
              <button
                onClick={() => setShowSupportMessage(false)}
                className="flex-shrink-0 text-green-500 hover:text-green-700 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl shadow-2xl p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-base font-semibold bg-gradient-to-r ${getCategoryColor(request.category)} text-white shadow-md`}>
                        <span className="mr-2 text-xl">{getCategoryIcon(request.category)}</span>
                        {request.category?.toUpperCase() || 'OTHER'}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        🟢 Active
                      </span>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{request.help || request.title}</h1>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span className="font-medium">@{request.username}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(request.requestPostedOn)}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Posted {new Date(request.requestPostedOn).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Creator Information */}
              <div className="mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {request.username?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">@{request.username}</h3>
                      <p className="text-gray-600">Request Creator</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Posted on</div>
                      <div className="font-semibold text-gray-900">{formatDate(request.requestPostedOn)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 mb-1">15</div>
                      <div className="text-sm text-gray-600">Requests Posted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 mb-1">8</div>
                      <div className="text-sm text-gray-600">Helped Others</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">4.8</div>
                      <div className="text-sm text-gray-600">Rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-blue-500" />
                  Complete Request Details
                </h2>
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {request.details || request.description || 'No description available'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Metadata */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  Request Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {request.category && (
                    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-2">{getCategoryIcon(request.category)}</span>
                        <span className="font-medium text-gray-900">Category</span>
                      </div>
                      <p className="text-gray-600 capitalize font-semibold">{request.category}</p>
                    </div>
                  )}
                  <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Calendar className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium text-gray-900">Posted Date</span>
                    </div>
                    <p className="text-gray-600 font-semibold">{formatDate(request.requestPostedOn)}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <Clock className="h-5 w-5 text-orange-500 mr-2" />
                      <span className="font-medium text-gray-900">Time Posted</span>
                    </div>
                    <p className="text-gray-600 font-semibold">{new Date(request.requestPostedOn).toLocaleTimeString()}</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <span className="text-blue-500 font-bold mr-2">#</span>
                      <span className="font-medium text-gray-900">Request ID</span>
                    </div>
                    <p className="text-gray-600 font-semibold">{request.id}</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                {!isOwnRequest() ? (
                  <>
                    <Button
                      onClick={handleSupport}
                      loading={supporting}
                      className="flex-1 flex items-center justify-center"
                    >
                      <Heart className="h-5 w-5 mr-2" />
                      {supporting ? 'Sending...' : 'Offer Support'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleContact}
                      className="flex items-center justify-center"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Contact Creator
                    </Button>
                  </>
                ) : (
                  <div className="w-full text-center">
                    <p className="text-gray-600 mb-4">This is your help request</p>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/browse-requests')}
                    >
                      View My Requests
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Share */}
            <div className="glass rounded-3xl shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share This Request</h3>
              <Button
                variant="outline"
                onClick={() => {
                  navigator.share ? navigator.share({
                    title: request.help,
                    text: request.details,
                    url: window.location.href
                  }) : navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied to clipboard!'))
                }}
                className="w-full flex items-center justify-center"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share Request
              </Button>
            </div>

            {/* Community Stats */}
            <div className="glass rounded-3xl shadow-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Impact</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Views:</span>
                  <span className="font-medium text-gray-900">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Supporters:</span>
                  <span className="font-medium text-gray-900">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">🟢 Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && contactInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4 mb-6">
              {contactInfo.phone && contactInfo.phone !== 'Not available' && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{contactInfo.phone}</div>
                    <div className="text-sm text-gray-600">Phone Number</div>
                  </div>
                  <button
                    onClick={() => window.open(`tel:${contactInfo.phone}`)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {contactInfo.email && contactInfo.email !== 'Not available' && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <Mail className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{contactInfo.email}</div>
                    <div className="text-sm text-gray-600">Email Address</div>
                  </div>
                  <button
                    onClick={() => window.open(`mailto:${contactInfo.email}`)}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                  </button>
                </div>
              )}
              
              {contactInfo.whatsapp && contactInfo.whatsapp !== 'Not available' && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="h-5 w-5 text-green-500 flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{contactInfo.whatsapp}</div>
                    <div className="text-sm text-gray-600">WhatsApp</div>
                  </div>
                  <button
                    onClick={() => window.open(`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, '')}`)}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <span className="text-white text-sm">WhatsApp</span>
                  </button>
                </div>
              )}
              
              {contactInfo.location && contactInfo.location !== 'Not available' && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <LocationIcon className="h-5 w-5 text-red-500" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{contactInfo.location}</div>
                    <div className="text-sm text-gray-600">Location</div>
                  </div>
                </div>
              )}
              
              {contactInfo.preferredTime && contactInfo.preferredTime !== 'Not available' && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <TimeIcon className="h-5 w-5 text-purple-500" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{contactInfo.preferredTime}</div>
                    <div className="text-sm text-gray-600">Best Time to Contact</div>
                  </div>
                </div>
              )}
              
              {contactInfo.address && (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{contactInfo.address}</div>
                    <div className="text-sm text-gray-600">Address</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowContactModal(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  const contactText = [
                    contactInfo.phone && `Phone: ${contactInfo.phone}`,
                    contactInfo.email && `Email: ${contactInfo.email}`,
                    contactInfo.whatsapp && `WhatsApp: ${contactInfo.whatsapp}`,
                    contactInfo.location && `Location: ${contactInfo.location}`,
                    contactInfo.preferredTime && `Best Time: ${contactInfo.preferredTime}`
                  ].filter(Boolean).join('\n');
                  
                  navigator.clipboard.writeText(contactText);
                  alert('Contact information copied to clipboard!');
                }}
                className="flex-1"
              >
                Copy All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetail; 