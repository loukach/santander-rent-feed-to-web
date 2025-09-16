import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import FilterBar from './components/FilterBar';
import VehicleGrid from './components/VehicleGrid';
import { parseXML } from './utils/xmlParser';
import { Car } from 'lucide-react';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  // Filter states
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const result = parseXML(text);

      if (result.error) {
        throw new Error(result.error);
      }

      setVehicles(result.vehicles);
      setBrands(result.brands);
      setFileInfo({
        name: file.name,
        vehicleCount: result.vehicles.length,
        brandCount: result.brands.length,
        uploadTime: new Date().toLocaleString()
      });

    } catch (err) {
      setError(err.message);
      console.error('Error processing file:', err);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Santander Consumer Renting
                </h1>
                <p className="text-sm text-gray-600">Catálogo de Vehículos</p>
              </div>
            </div>

            {fileInfo && (
              <div className="text-right text-sm text-gray-600">
                <p className="font-medium">{fileInfo.vehicleCount} vehículos</p>
                <p className="text-xs">{fileInfo.name}</p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      {vehicles.length === 0 ? (
        <FileUploader
          onFileUpload={handleFileUpload}
          loading={loading}
          error={error}
        />
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
            onNewFile={() => {
              setVehicles([]);
              setFileInfo(null);
            }}
          />

          <VehicleGrid vehicles={filteredVehicles} />
        </>
      )}
    </div>
  );
}

export default App;