import React from 'react';
import { Search, Filter, RefreshCw, Upload, X } from 'lucide-react';

const FilterBar = ({
  brands,
  selectedBrand,
  setSelectedBrand,
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  vehicleCount,
  totalCount,
  onReset,
  onNewFile
}) => {
  return (
    <div className="bg-white border-b sticky top-[73px] z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* First Row: Search and Stats */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por marca, modelo o versión..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Mostrando <span className="font-semibold">{vehicleCount}</span> de {totalCount} vehículos
            </span>
          </div>
        </div>

        {/* Second Row: Filters */}
        <div className="flex flex-wrap gap-3">
          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">Todas las marcas</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min €"
              value={priceRange.min || ''}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max €"
              value={priceRange.max === 9999 ? '' : priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 9999 }))}
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="brand-asc">Marca: A-Z</option>
            <option value="brand-desc">Marca: Z-A</option>
          </select>

          {/* Action Buttons */}
          <button
            onClick={onReset}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Limpiar
          </button>

          <button
            onClick={onNewFile}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Nuevo XML
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;