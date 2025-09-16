import React, { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import VehicleGrid from './components/VehicleGrid';
import ProviderSelector from './components/ProviderSelector';
import { parseXML } from './utils/xmlParser';
import { RefreshCw } from 'lucide-react';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Filter states
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [selectedProviders, setSelectedProviders] = useState(new Set());

  const fetchVehicleData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Use different URLs for development vs production
      const apiUrl = import.meta.env.DEV
        ? '/api/motorflash/rentingSantanderConsumer/xml.php'
        : `https://cors-proxy-loukach.onrender.com/proxy?url=${encodeURIComponent('https://api.motorflash.com/rentingSantanderConsumer/xml.php')}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();
      const result = parseXML(xmlText);

      if (result.error) {
        throw new Error(result.error);
      }

      setVehicles(result.vehicles);
      setBrands(result.brands);
      setLastUpdated(new Date().toLocaleString());

    } catch (err) {
      setError(`Error cargando datos: ${err.message}`);
      console.error('Error fetching vehicle data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on app start
  useEffect(() => {
    fetchVehicleData();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...vehicles];

    // Brand filter
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(v => v.brand === selectedBrand);
    }

    // Price filter
    filtered = filtered.filter(v => {
      const price = v.price || 0;
      return price >= priceRange.min && price <= priceRange.max;
    });

    // Search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(v =>
        v.brand?.toLowerCase().includes(search) ||
        v.model?.toLowerCase().includes(search) ||
        v.version?.toLowerCase().includes(search)
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return (a.price || 0) - (b.price || 0);
        case 'price-desc':
          return (b.price || 0) - (a.price || 0);
        case 'brand-asc':
          return (a.brand || '').localeCompare(b.brand || '');
        case 'brand-desc':
          return (b.brand || '').localeCompare(a.brand || '');
        default:
          return 0;
      }
    });

    setFilteredVehicles(filtered);
  }, [vehicles, selectedBrand, priceRange, searchTerm, sortBy]);

  const resetFilters = () => {
    setSelectedBrand('all');
    setPriceRange({ min: 0, max: 9999 });
    setSearchTerm('');
    setSortBy('price-asc');
  };

  const shouldShowVehicles = selectedProviders.size > 0;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Title */}
            <div className="flex items-center gap-4">
              <div>
                <div className="inline-flex items-center px-2 py-1 bg-red-600 bg-opacity-20 border border-red-500 rounded text-red-400 text-xs font-medium mb-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-1"></span>
                  Digital Showroom
                </div>
                <h1 className="text-xl md:text-2xl font-bold">
                  <span className="text-white">Long Term</span>
                  <span className="text-red-500 ml-2">Rental</span>
                </h1>
              </div>
            </div>

            {/* Right side - Provider selector and info */}
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <div className="text-xs text-gray-400 text-right hidden md:block">
                  <div>{vehicles.length} vehicles</div>
                  <div>Updated: {new Date(lastUpdated).toLocaleTimeString()}</div>
                </div>
              )}

              {/* Compact Provider Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 hidden sm:inline">Provider:</span>
                <button
                  onClick={() => {
                    const newSelected = new Set(selectedProviders);
                    if (newSelected.has('santander')) {
                      newSelected.delete('santander');
                    } else {
                      newSelected.add('santander');
                    }
                    setSelectedProviders(newSelected);
                  }}
                  className={`relative rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                    selectedProviders.has('santander')
                      ? 'border-red-500 bg-red-900 bg-opacity-20 shadow-md'
                      : 'border-gray-600 bg-gray-800 hover:border-red-400'
                  }`}
                  style={{width: '80px', height: '80px'}}
                  title="Toggle Santander Consumer Renting"
                >
                  <img
                    src="https://ae-renting.es/wp-content/uploads/2020/06/santander.png"
                    alt="Santander"
                    className="w-full h-full object-contain p-1 rounded"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center text-xs font-semibold text-gray-300" style={{display: 'none'}}>
                    S
                  </div>
                  {selectedProviders.has('santander') && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </button>
              </div>

              <button
                onClick={fetchVehicleData}
                disabled={loading}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{loading ? 'Loading...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="bg-gray-900 min-h-screen">
        {loading && vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96 text-center text-white">
            <RefreshCw className="h-12 w-12 text-red-500 animate-spin mb-4" />
            <h2 className="text-xl font-semibold mb-2">
              Loading vehicle catalog...
            </h2>
            <p className="text-gray-400">
              Getting the latest data from Motorflash
            </p>
          </div>
        ) : error && vehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-96 text-center">
            <div className="bg-red-900 bg-opacity-50 border border-red-600 rounded-lg p-6 max-w-md">
              <h2 className="text-xl font-semibold text-red-400 mb-2">
                Error loading catalog
              </h2>
              <p className="text-red-300 mb-4">{error}</p>
              <button
                onClick={fetchVehicleData}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mx-auto"
              >
                <RefreshCw className="h-4 w-4" />
                Retry
              </button>
            </div>
          </div>
        ) : !shouldShowVehicles ? (
          <div className="flex flex-col items-center justify-center min-h-96 text-center text-white">
            <div className="max-w-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-300">
                Ready to find your dream car?
              </h2>
              <p className="text-lg text-gray-400 mb-6">
                To find the car of your dreams, select at least one provider above.
              </p>
              <div className="text-sm text-gray-500">
                {vehicles.length} vehicles ready to be discovered
              </div>
            </div>
          </div>
        ) : (
          <>
            <FilterBar
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              vehicleCount={filteredVehicles.length}
              totalCount={vehicles.length}
              onReset={resetFilters}
              onRefresh={fetchVehicleData}
            />

            <VehicleGrid vehicles={filteredVehicles} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;