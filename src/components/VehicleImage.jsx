import React, { useState } from 'react';
import { Car } from 'lucide-react';

const VehicleImage = ({ src, alt, brand, model }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Your deployed CORS proxy
  const CORS_PROXY = 'https://cors-proxy-loukach.onrender.com/proxy?url=';

  // Fallback placeholder
  const placeholderUrl = `https://via.placeholder.com/400x300/ef4444/ffffff?text=${encodeURIComponent(brand || 'Vehicle')}`;

  const getImageUrl = () => {
    if (!src || imageError) {
      return placeholderUrl;
    }

    // Use CORS proxy for external images
    if (src.startsWith('http')) {
      return CORS_PROXY + encodeURIComponent(src);
    }

    return src;
  };

  const handleImageError = () => {
    console.log('Image failed to load:', src);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <Car className="h-8 w-8 text-gray-400 animate-pulse mx-auto mb-2" />
            <p className="text-xs text-gray-500">Cargando...</p>
          </div>
        </div>
      )}

      <img
        src={getImageUrl()}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        } group-hover:scale-110 transition-transform duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </>
  );
};

export default VehicleImage;