import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostRequest from './pages/PostRequest';
import BrowseRequests from './pages/BrowseRequests';
import RequestDetail from './pages/RequestDetail';
import TestAPI from './pages/TestAPI';
import EditRequest from './pages/EditRequest';
import VerifyOtp from './pages/VerifyOtp';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
    
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    } else {
      setIsAuthenticated(!!token);
    }
  }, []);

  const handleLogin = (userData) => {

    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (!isAuthenticated) {
      return <Navigate to={`/login?redirectedFrom=${encodeURIComponent(location.pathname)}`} replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/browse-requests" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/register" 
              element={
                isAuthenticated ? 
                <Navigate to="/browse-requests" replace /> : 
                <Register onRegister={handleRegister} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard user={user} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/post-request" 
              element={
                <ProtectedRoute>
                  <PostRequest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/browse-requests" 
              element={<BrowseRequests />}
            />
            <Route 
              path="/request/:id" 
              element={
                <ProtectedRoute>
                  <RequestDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-request/:id" 
              element={
                <ProtectedRoute>
                  <EditRequest />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/test-api" 
              element={<TestAPI />}
            />
            <Route 
              path="/verify-otp" 
              element={<VerifyOtp />} 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
