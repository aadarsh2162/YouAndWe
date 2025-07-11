import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, Users, HandHeart, ArrowRight, Sparkles, Star, Globe, Shield, 
  CheckCircle, Zap, Award, TrendingUp, Clock, MapPin, Phone, Mail,
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, User, Search, Handshake
} from 'lucide-react';
import Button from '../components/Button';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Heart,
      title: 'Connect Communities',
      description: 'Bridge the gap between those who need help and those who can provide it.',
      color: 'from-pink-500 to-rose-500',
      gradient: 'bg-gradient-to-r from-pink-500 to-rose-500',
      stats: '10,000+ connections made'
    },
    {
      icon: Users,
      title: 'Build Relationships',
      description: 'Create meaningful connections and support networks within your community.',
      color: 'from-blue-500 to-indigo-500',
      gradient: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      stats: '5,000+ active members'
    },
    {
      icon: HandHeart,
      title: 'Make a Difference',
      description: 'Every act of kindness, no matter how small, creates a ripple effect of positive change.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
      stats: '15,000+ acts of kindness'
    },
  ];

  const stats = [
    { number: '15,234', label: 'Requests Helped', icon: Heart, suffix: '+', color: 'from-pink-500 to-rose-500' },
    { number: '8,567', label: 'Active Supporters', icon: Users, suffix: '+', color: 'from-blue-500 to-indigo-500' },
    { number: '156', label: 'Communities Served', icon: Globe, suffix: '+', color: 'from-green-500 to-emerald-500' },
    { number: '99.8', label: 'Success Rate', icon: CheckCircle, suffix: '%', color: 'from-purple-500 to-pink-500' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Community Member',
      content: 'YouandWe helped me find support when I needed it most. The community is amazing and the platform is incredibly user-friendly!',
      rating: 5,
      avatar: 'SJ',
      location: 'New York, NY'
    },
    {
      name: 'Mike Chen',
      role: 'Volunteer',
      content: 'I love being able to help others in my community. This platform makes it so easy to connect and make a real difference.',
      rating: 5,
      avatar: 'MC',
      location: 'San Francisco, CA'
    },
    {
      name: 'Lisa Brown',
      role: 'Local Business Owner',
      content: 'The connections I\'ve made through YouandWe have been invaluable to my business and personal growth.',
      rating: 5,
      avatar: 'LB',
      location: 'Austin, TX'
    },
  ];

  const benefits = [
    { icon: Shield, title: 'Safe & Secure', description: 'Your privacy and security are our top priorities' },
    { icon: Zap, title: 'Instant Connection', description: 'Connect with helpers in your area within minutes' },
    { icon: Award, title: 'Verified Members', description: 'All community members are verified for your safety' },
    { icon: Clock, title: '24/7 Support', description: 'Get help whenever you need it, day or night' },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Create Your Profile',
      description: 'Sign up and tell us about yourself and how you can help others.',
      icon: User,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      step: '02',
      title: 'Browse Requests',
      description: 'Find people in your community who need assistance.',
      icon: Search,
      color: 'from-purple-500 to-pink-500'
    },
    {
      step: '03',
      title: 'Connect & Help',
      description: 'Reach out and provide the support they need.',
      icon: Handshake,
      color: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen gradient-bg overflow-hidden flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="text-center">
            {/* Animated Logo */}
            <div className={`flex justify-center mb-12 ${isVisible ? 'bounce-in' : ''}`}>
              <div className="relative group">
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 rounded-3xl shadow-2xl group-hover:scale-110 transition-all duration-500">
                  {React.createElement(Heart, { className: 'h-20 w-20 text-white animate-pulse' })}
                </div>
                <div className="absolute -top-3 -right-3 bg-yellow-400 p-3 rounded-full animate-bounce">
                  {React.createElement(Sparkles, { className: 'h-5 w-5 text-white' })}
                </div>
                <div className="absolute -bottom-2 -left-2 bg-green-400 p-2 rounded-full animate-ping">
                  {React.createElement(Star, { className: 'h-4 w-4 text-white' })}
                </div>
              </div>
            </div>
            
            {/* Main Heading */}
            <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 mb-8 leading-tight ${isVisible ? 'fade-in' : ''}`}>
              <span className="block">Together</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
                We Can
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
                Make a
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 animate-gradient">
                Difference
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className={`text-2xl md:text-3xl text-gray-600 mb-16 max-w-5xl mx-auto leading-relaxed font-light ${isVisible ? 'slide-up' : ''}`}>
              YouandWe connects communities through mutual support. Whether you need help or want to offer assistance, 
              we're here to bring people together and create positive change in the world.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-8 justify-center items-center ${isVisible ? 'slide-up' : ''}`}>
              <Link to="/register">
                <Button size="xl" className="group text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                  {React.createElement(Sparkles, { className: 'h-6 w-6 mr-3 group-hover:rotate-180 transition-transform duration-500' })}
                  Get Started Today
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/browse-requests">
                <Button variant="outline" size="xl" className="group text-xl px-12 py-6 border-2 hover:bg-white hover:text-gray-900 transform hover:scale-105 transition-all duration-300">
                  {React.createElement(Globe, { className: 'h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300' })}
                  Explore Requests
                  <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className={`mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-500 ${isVisible ? 'fade-in' : ''}`}>
              <div className="flex items-center gap-2">
                {React.createElement(Shield, { className: 'h-5 w-5 text-green-500' })}
                <span className="text-sm font-medium">100% Secure</span>
              </div>
              <div className="flex items-center gap-2">
                {React.createElement(Users, { className: 'h-5 w-5 text-blue-500' })}
                <span className="text-sm font-medium">15K+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                {React.createElement(CheckCircle, { className: 'h-5 w-5 text-purple-500' })}
                <span className="text-sm font-medium">Verified Community</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              See YouandWe in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Watch how our platform brings communities together and creates meaningful connections.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  {React.createElement(Play, { className: 'h-20 w-20 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300' })}
                  <p className="text-xl font-semibold">Watch Demo Video</p>
                  <p className="text-blue-100">See how YouandWe works</p>
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                  {isMuted ? React.createElement(VolumeX, { className: 'h-5 w-5' }) : React.createElement(Volume2, { className: 'h-5 w-5' })}
                </button>
                <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors">
                  {React.createElement(Maximize2, { className: 'h-5 w-5' })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-dots-pattern"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Impact by the Numbers
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real results from real people making a difference in their communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-2xl">
                  <div className={`bg-gradient-to-r ${stat.color} p-4 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(stat.icon, { className: 'h-10 w-10 text-white' })}
                  </div>
                  <div className="text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}<span className="text-3xl">{stat.suffix}</span>
                  </div>
                  <div className="text-blue-100 font-medium text-lg">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How YouandWe Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to connect with others in your community and provide mutual support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white rounded-3xl p-10 h-full shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-4 border border-gray-100">
                  <div className={`${feature.gradient} p-8 rounded-3xl shadow-lg mb-8 inline-block group-hover:scale-110 transition-transform duration-500`}>
                    {React.createElement(feature.icon, { className: 'h-16 w-16 text-white' })}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg mb-6">{feature.description}</p>
                  <div className="text-sm font-semibold text-gray-500">{feature.stats}</div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Get Started in 3 Simple Steps
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our community and start making a difference today.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white rounded-3xl p-10 h-full shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-4">
                  <div className={`bg-gradient-to-r ${step.color} p-6 rounded-2xl shadow-lg mb-8 inline-block group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-3xl font-black text-white">{step.step}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connection Line */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from real people who have experienced the power of community support.
            </p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 shadow-2xl">
              <div className="text-center">
                <div className="flex justify-center mb-8">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-8 w-8 text-yellow-400 fill-current mx-1" />
                  ))}
                </div>
                
                <blockquote className="text-2xl text-gray-700 mb-8 italic leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mr-6">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-900 text-xl">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                    <p className="text-gray-500 text-sm flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {testimonials[currentTestimonial].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-dots-pattern"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Why Choose YouandWe?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're committed to making community support accessible, safe, and effective.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border border-white/20 hover:bg-white/20 transition-all duration-500 group-hover:-translate-y-4">
                  <div className="bg-white/20 p-6 rounded-2xl inline-block mb-6 group-hover:scale-110 transition-transform duration-300">
                    {React.createElement(benefit.icon, { className: 'h-12 w-12 text-white' })}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-blue-100 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Ready to Make a Difference?
          </h2>
          <p className="text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join thousands of people who are already helping each other in their communities. 
            Start your journey today and be part of something bigger than yourself!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
            <Link to="/register">
              <Button size="xl" className="group text-xl px-12 py-6 bg-white text-blue-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                {React.createElement(Sparkles, { className: 'h-6 w-6 mr-3 group-hover:rotate-180 transition-transform duration-500' })}
                Join Our Community
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="xl" className="group text-xl px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600 transform hover:scale-105 transition-all duration-300">
                {React.createElement(Globe, { className: 'h-6 w-6 mr-3 group-hover:rotate-12 transition-transform duration-300' })}
                Learn More
                <ArrowRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 text-blue-100">
            <div className="flex items-center gap-2">
              {React.createElement(CheckCircle, { className: 'h-5 w-5 text-green-300' })}
              <span className="text-sm font-medium">Free to Join</span>
            </div>
            <div className="flex items-center gap-2">
              {React.createElement(Clock, { className: 'h-5 w-5 text-blue-300' })}
              <span className="text-sm font-medium">Setup in 2 Minutes</span>
            </div>
            <div className="flex items-center gap-2">
              {React.createElement(Shield, { className: 'h-5 w-5 text-purple-300' })}
              <span className="text-sm font-medium">100% Secure</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 