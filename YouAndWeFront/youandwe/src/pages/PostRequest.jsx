import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api';
import Button from '../components/Button';

const PostRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    help: '',
    details: '',
    location: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  
  const categories = [
    { value: 'food', label: 'Food & Groceries' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'housing', label: 'Housing' },
    { value: 'health', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'employment', label: 'Employment' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'other', label: 'Other' },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.help.trim()) newErrors.help = 'Help title is required';
    if (!formData.details.trim()) newErrors.details = 'Details are required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await API.post('/requests/post-request', {
        title: formData.help,
        description: formData.details,
        category: formData.category,
        location: formData.location,
        status: 'open'
      });
      navigate('/browse-requests');
    } catch (error) {
      setErrors({ general: error.response?.data?.error || error.response?.data?.message || 'Failed to post request.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-8">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">Post a Help Request</h1>
        {errors.general && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-center">{errors.general}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="help" className="block font-semibold mb-1">Help Title *</label>
            <input
              id="help"
              name="help"
              type="text"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.help ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100'}`}
              placeholder="e.g., Need help with groceries this week"
              value={formData.help}
              onChange={handleChange}
            />
            {errors.help && <p className="text-red-500 text-sm mt-1">{errors.help}</p>}
          </div>
          <div>
            <label htmlFor="details" className="block font-semibold mb-1">Details *</label>
            <textarea
              id="details"
              name="details"
              rows={4}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 resize-none ${errors.details ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100'}`}
              placeholder="Please provide a detailed description of what you need help with."
              value={formData.details}
              onChange={handleChange}
            />
            {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
          </div>
          <div>
            <label htmlFor="location" className="block font-semibold mb-1">Location *</label>
            <input
              id="location"
              name="location"
              type="text"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.location ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100'}`}
              placeholder="e.g., New York, NY or Brooklyn, NY"
              value={formData.location}
              onChange={handleChange}
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
          </div>
          <div>
            <label htmlFor="category" className="block font-semibold mb-1">Category *</label>
            <select
              id="category"
              name="category"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${errors.category ? 'border-red-400 focus:ring-red-100' : 'border-gray-300 focus:ring-blue-100'}`}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="px-8 py-3 text-lg" loading={loading}>
              {loading ? 'Posting...' : 'Post Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostRequest; 