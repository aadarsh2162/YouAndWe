import { useState } from 'react';
import API from '../utils/api';
import Button from '../components/Button';

const TestAPI = () => {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testContactAPI = async () => {
    setLoading(true);
    try {
      // Test with a sample request ID (you'll need to replace with a real one)
      const response = await API.get('/requests/1/contact');
      setTestResults(prev => ({
        ...prev,
        contact: {
          success: true,
          data: response.data,
          message: 'Contact API working!'
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        contact: {
          success: false,
          error: error.response?.data || error.message,
          message: 'Contact API failed!'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testSupportOfferAPI = async () => {
    setLoading(true);
    try {
      const supportData = {
        requestId: 1,
        supporterId: 1,
        supporterName: "Test Supporter",
        supporterEmail: "supporter@test.com",
        supporterPhone: "+1234567890",
        message: "I can help with this request!",
        supportType: "in-person",
        availability: "Weekdays 6-8 PM",
        contactMethod: "phone"
      };

      const response = await API.post('/support-offers', supportData);
      setTestResults(prev => ({
        ...prev,
        support: {
          success: true,
          data: response.data,
          message: 'Support Offer API working!'
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        support: {
          success: false,
          error: error.response?.data || error.message,
          message: 'Support Offer API failed!'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const testRequestsAPI = async () => {
    setLoading(true);
    try {
      const response = await API.get('/requests');
      setTestResults(prev => ({
        ...prev,
        requests: {
          success: true,
          data: response.data,
          message: `Found ${response.data.length} requests!`
        }
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        requests: {
          success: false,
          error: error.response?.data || error.message,
          message: 'Requests API failed!'
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Backend API Test</h1>
          <p className="text-gray-600">Test the new contact and support offer APIs</p>
        </div>

        <div className="glass rounded-3xl shadow-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Button
              onClick={testRequestsAPI}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Testing...' : 'Test Requests API'}
            </Button>
            
            <Button
              onClick={testContactAPI}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Testing...' : 'Test Contact API'}
            </Button>
            
            <Button
              onClick={testSupportOfferAPI}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Testing...' : 'Test Support Offer API'}
            </Button>
          </div>

          <div className="space-y-6">
            {Object.entries(testResults).map(([key, result]) => (
              <div
                key={key}
                className={`p-6 rounded-2xl border-2 ${
                  result.success
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2 capitalize">
                  {key} API Test
                </h3>
                <p className={`font-medium mb-2 ${
                  result.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {result.message}
                </p>
                
                {result.success && result.data && (
                  <div className="bg-white p-4 rounded-xl mt-3">
                    <h4 className="font-semibold text-gray-900 mb-2">Response Data:</h4>
                    <pre className="text-sm text-gray-700 overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  </div>
                )}
                
                {!result.success && result.error && (
                  <div className="bg-white p-4 rounded-xl mt-3">
                    <h4 className="font-semibold text-red-900 mb-2">Error Details:</h4>
                    <pre className="text-sm text-red-700 overflow-auto">
                      {JSON.stringify(result.error, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {Object.keys(testResults).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">Click the buttons above to test the APIs</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAPI; 