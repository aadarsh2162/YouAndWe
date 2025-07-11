import { Search, Filter, MapPin, X } from 'lucide-react';

const FilterBar = ({ 
  category, 
  setCategory, 
  location, 
  setLocation, 
  onSearch,
  onClear 
}) => {
  const categories = [
    { value: '', label: 'All Categories', icon: '🌟' },
    { value: 'food', label: 'Food & Nutrition', icon: '🍽️' },
    { value: 'education', label: 'Education', icon: '📚' },
    { value: 'health', label: 'Health & Medical', icon: '🏥' },
    { value: 'housing', label: 'Housing', icon: '🏠' },
    { value: 'transportation', label: 'Transportation', icon: '🚗' },
    { value: 'other', label: 'Other', icon: '💡' },
  ];

  const hasFilters = category || location;

  return (
    <div className="glass rounded-3xl shadow-2xl p-8 mb-8 fade-in">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Search Requests
          </label>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search by title, description, or location..."
              className="input-field pl-12 group-hover:shadow-lg transition-all duration-300"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:w-64">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Category
          </label>
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field pl-12 appearance-none cursor-pointer group-hover:shadow-lg transition-all duration-300"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="lg:w-auto flex items-end">
          <button
            onClick={onSearch}
            className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Search
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasFilters && (
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-700">Active Filters:</span>
              {category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {categories.find(cat => cat.value === category)?.icon} {categories.find(cat => cat.value === category)?.label}
                  <button
                    onClick={() => setCategory('')}
                    className="ml-2 hover:text-blue-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
              {location && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <MapPin className="h-3 w-3 mr-1" />
                  {location}
                  <button
                    onClick={() => setLocation('')}
                    className="ml-2 hover:text-green-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              )}
            </div>
            <button
              onClick={onClear}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center transition-colors"
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar; 