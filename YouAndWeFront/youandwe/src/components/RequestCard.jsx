                                                                                                                                  import { MapPin, Calendar, User, Heart, Clock, Star, Eye, MessageCircle, TrendingUp, Sparkles } from 'lucide-react';
import Card from './Card';
import Button from './Button';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Configure dayjs for relative time
dayjs.extend(relativeTime);

const RequestCard = ({ request, onSupport, onViewDetails, onEdit, isOwnRequest = false, viewMode = 'grid' }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return dayjs(dateString).fromNow();
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: '🍽️',
      education: '📚',
      health: '🏥',
      medical: '🏥',
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
      medical: 'from-red-500 to-pink-500',
      housing: 'from-indigo-500 to-blue-500',
      transportation: 'from-yellow-500 to-orange-500',
      other: 'from-gray-500 to-slate-500'
    };
    return colors[category?.toLowerCase()] || 'from-blue-500 to-purple-500';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      open: { text: '🟢 Open', color: 'bg-green-100 text-green-800 border-green-200' },
      resolved: { text: '✅ Resolved', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      pending: { text: '🟡 Pending', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
      closed: { text: '🔴 Closed', color: 'bg-red-100 text-red-800 border-red-200' }
    };
    
    const config = statusConfig[status?.toLowerCase()] || statusConfig.open;
    return (
      <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-base font-semibold border ${config.color} shadow-sm`}>
        {config.text}
      </span>
    );
  };

  const isListMode = viewMode === 'list';

  if (isListMode) {
    return (
      <Card className="hover:shadow-2xl transition-all duration-300 group">
        <div className="flex items-center space-x-6">
          {/* Category Badge */}
          <div className="flex-shrink-0">
            <div className={`w-16 h-16 bg-gradient-to-br ${getCategoryColor(request.category)} rounded-2xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              {getCategoryIcon(request.category)}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {request.help || request.title}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-3">
                  {request.details || request.description || 'No description available'}
                </p>
              </div>
            </div>

            {/* Meta Information */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span className="font-medium">Posted by @{request.username}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{formatDate(request.requestPostedOn || request.createdAt)}</span>
              </div>
              <div className="flex items-center">
                {getStatusBadge(request.status)}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(request.id)}
              className="group-hover:border-blue-500 group-hover:text-blue-600"
            >
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            {!isOwnRequest && (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => onSupport(request.id)}
                className="group-hover:shadow-lg"
              >
                <Heart className="h-4 w-4 mr-1" />
                Support
              </Button>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Grid Mode (Default)
  return (
    <Card className="h-full flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      {/* Header with Category Badge */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <span className={`inline-flex items-center px-4 py-2 rounded-full text-base font-semibold bg-gradient-to-r ${getCategoryColor(request.category)} text-white shadow-md`}>
            <span className="mr-2 text-xl">{getCategoryIcon(request.category)}</span>
            #{request.category?.toLowerCase() || 'other'}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
        {request.help || request.title}
      </h3>

      {/* Description */}
      <div className="flex-1">
        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
          {request.details || request.description || 'No description available'}
        </p>

        {/* Request Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <User className="h-4 w-4" />
            <span className="font-medium">Posted by @{request.username}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(request.requestPostedOn || request.createdAt)}</span>
          </div>
          <div className="flex items-center mt-2">
            {getStatusBadge(request.status)}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-4 border-t border-gray-100">
        {isOwnRequest ? (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 group-hover:border-blue-500 group-hover:text-blue-600"
              onClick={() => onViewDetails(request.id)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => onEdit(request.id)}
              className="group-hover:shadow-lg"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 group-hover:border-blue-500 group-hover:text-blue-600"
              onClick={() => onViewDetails(request.id)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              onClick={() => onSupport(request.id)}
              className="group-hover:shadow-lg group-hover:scale-105 transition-transform"
            >
              <Heart className="h-4 w-4 mr-1" />
              Support Now
            </Button>
          </>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default RequestCard; 