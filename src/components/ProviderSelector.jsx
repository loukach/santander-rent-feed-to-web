import React from 'react';
import { Building2, Check } from 'lucide-react';

const ProviderSelector = ({ selectedProviders, onProviderToggle }) => {
  const providers = [
    {
      id: 'santander',
      name: 'Santander Consumer Renting',
      logo: null, // We'll use a placeholder for now
      description: 'Flexible long-term rental solutions'
    }
  ];

  return (
    <div className="text-center">
      <h2 className="text-lg font-bold text-white mb-1">
        Choose Your Rental Provider
      </h2>
      <p className="text-gray-400 text-sm mb-4">
        Select from our trusted automotive partners to see available vehicles
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {providers.map((provider) => {
          const isSelected = selectedProviders.has(provider.id);

          return (
            <div key={provider.id} className="relative">
              <button
                onClick={() => onProviderToggle(provider.id)}
                className={`group relative p-3 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                  isSelected
                    ? 'border-red-500 bg-red-900 bg-opacity-20 shadow-lg shadow-red-500/20'
                    : 'border-gray-600 bg-gray-800 hover:border-red-400 hover:bg-gray-700'
                }`}
              >
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Logo placeholder */}
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-red-600' : 'bg-gray-700 group-hover:bg-gray-600'
                  } transition-colors duration-300`}>
                    <Building2 className={`w-5 h-5 ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`} />
                  </div>

                  <div className="text-center">
                    <h3 className={`font-semibold text-sm ${
                      isSelected ? 'text-white' : 'text-gray-200 group-hover:text-white'
                    } transition-colors duration-300`}>
                      {provider.name}
                    </h3>
                    <p className={`text-xs ${
                      isSelected ? 'text-gray-300' : 'text-gray-400'
                    }`}>
                      {provider.description}
                    </p>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-600/0 to-red-600/0 group-hover:from-red-600/5 group-hover:to-red-500/5 transition-all duration-300 pointer-events-none" />
              </button>
            </div>
          );
        })}
      </div>

      {selectedProviders.size > 0 && (
        <div className="mt-3 text-center">
          <p className="text-green-400 text-xs">
            ✓ {selectedProviders.size} provider{selectedProviders.size > 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  );
};

export default ProviderSelector;