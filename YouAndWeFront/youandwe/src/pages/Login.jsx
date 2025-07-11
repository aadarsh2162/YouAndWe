import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Heart, Sparkles, User, Phone, AtSign } from 'lucide-react';
import Button from '../components/Button';
import API from '../utils/api';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedFrom = new URLSearchParams(location.search).get('redirectedFrom');
  const [formData, setFormData] = useState({
    usernameOrEmailOrMobileNo: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showVerifyLink, setShowVerifyLink] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.usernameOrEmailOrMobileNo) {
      newErrors.usernameOrEmailOrMobileNo = 'Email, mobile number, or username is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    try {
      const res = await API.post('/auth/login', {
        usernameOrEmailOrMobileNo: formData.usernameOrEmailOrMobileNo,
        password: formData.password,
      });
      localStorage.setItem('token', res.data.accessToken);
      
      // Store complete user data from response
      const userData = res.data.user || {
        usernameOrEmailOrMobileNo: formData.usernameOrEmailOrMobileNo,
        id: res.data.userId || 1,
        email: res.data.email || formData.usernameOrEmailOrMobileNo,
        phone: res.data.mobileNo || 'Not provided',
        name: res.data.name || formData.usernameOrEmailOrMobileNo
      };
      
      onLogin && onLogin(userData);
      navigate('/browse-requests');
    } catch (error) {
      const errMsg = error.response?.data?.error || error.response?.data?.message || 'Invalid credentials';
      setErrors({ general: errMsg });
      if (errMsg.toLowerCase().includes('verify your email')) {
        // Only show verify link if message does NOT mention 'sign up again'
        setShowVerifyLink(!errMsg.toLowerCase().includes('sign up again'));
      } else {
        setShowVerifyLink(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-3xl shadow-2xl">
                <Heart className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Welcome Back</h2>
          <p className="text-xl text-gray-600">Sign in to your YouandWe account</p>
        </div>
        <div className="glass rounded-3xl shadow-2xl p-8">
          {redirectedFrom && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <span className="text-blue-700 text-sm">Please log in to access that page.</span>
            </div>
          )}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
              <span className="text-red-700 text-sm">{errors.general}</span>
              {showVerifyLink && (
                <button
                  className="ml-2 text-blue-600 underline text-sm"
                  onClick={() => navigate('/verify-otp', { state: { email: formData.usernameOrEmailOrMobileNo } })}
                >
                  Verify Now
                </button>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="usernameOrEmailOrMobileNo" className="block text-sm font-semibold text-gray-700 mb-3">
                Email, Mobile Number, or Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="usernameOrEmailOrMobileNo"
                  name="usernameOrEmailOrMobileNo"
                  type="text"
                  autoComplete="username"
                  required
                  className={`input-field pl-12 ${errors.usernameOrEmailOrMobileNo ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
                  placeholder="Enter your email, mobile number, or username"
                  value={formData.usernameOrEmailOrMobileNo}
                  onChange={handleChange}
                />
              </div>
              {errors.usernameOrEmailOrMobileNo && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.usernameOrEmailOrMobileNo}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className={`input-field pl-12 pr-12 ${errors.password ? 'border-red-300 focus:ring-red-100 focus:border-red-500' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium transition-colors duration-200">
                Forgot password?
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full text-lg py-4"
              loading={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 