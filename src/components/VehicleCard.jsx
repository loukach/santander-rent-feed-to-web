import React, { useState } from 'react';
import { Fuel, Settings, Users, Gauge, Calendar, Euro, Image, ChevronRight } from 'lucide-react';
import VehicleImage from './VehicleImage';
import { formatPrice, getTransmissionLabel, getEmissionsLabel } from '../utils/formatters';

const VehicleCard = ({ vehicle }) => {
  const [showDetails, setShowDetails] = useState(false);
  const emissions = getEmissionsLabel(vehicle.distintivo);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Promotion Banner */}
      {vehicle.promocion && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1 text-center">
          PROMOCIÓN ESPECIAL
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <VehicleImage
          src={vehicle.mainImage}
          alt={`${vehicle.brand} ${vehicle.model}`}
          brand={vehicle.brand}
          model={vehicle.model}
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {vehicle.estado && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium uppercase">
              {vehicle.estado}
            </span>
          )}
          {emissions && (
            <span className={`px-2 py-1 rounded text-xs font-medium ${emissions.className}`}>
              {emissions.label}
            </span>
          )}
        </div>

        {/* Provider Logo */}
        <div className="absolute top-2 right-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-1" style={{width: '50px', height: '50px'}}>
            <img
              src="https://ae-renting.es/wp-content/uploads/2020/06/santander.png"
              alt="Santander"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold" style={{display: 'none'}}>
              S
            </div>
          </div>
        </div>

        {/* Image Counter */}
        {vehicle.images && vehicle.images.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
            <Image className="h-3 w-3" />
            {vehicle.images.length}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {vehicle.brand || 'Sin marca'} {vehicle.model || ''}
        </h3>

        {vehicle.version && (
          <p className="text-xs text-gray-600 truncate mb-3" title={vehicle.version}>
            {vehicle.version}
          </p>
        )}

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-red-600">
              {formatPrice(vehicle.price)}
            </span>
            <span className="text-gray-600">/mes</span>
          </div>
          {vehicle.priceDetails && (
            <p className="text-xs text-gray-500 mt-1">
              {vehicle.priceDetails.months} meses • {parseInt(vehicle.priceDetails.km).toLocaleString()} km/año
            </p>
          )}
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {vehicle.fuel && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Fuel className="h-3 w-3" />
              <span className="truncate">{vehicle.fuel}</span>
            </div>
          )}
          {vehicle.transmission && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Settings className="h-3 w-3" />
              <span>{getTransmissionLabel(vehicle.transmission)}</span>
            </div>
          )}
          {vehicle.seats && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Users className="h-3 w-3" />
              <span>{vehicle.seats} plazas</span>
            </div>
          )}
          {vehicle.power && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Gauge className="h-3 w-3" />
              <span>{vehicle.power} CV</span>
            </div>
          )}
        </div>

        {/* Additional Info Pills */}
        <div className="flex flex-wrap gap-1 mb-3">
          {vehicle.color && (
            <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded">
              {vehicle.color}
            </span>
          )}
          {vehicle.consumoMixto && (
            <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded">
              {vehicle.consumoMixto} L/100km
            </span>
          )}
          {vehicle.doors && (
            <span className="inline-block text-xs bg-gray-100 px-2 py-1 rounded">
              {vehicle.doors} puertas
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
        >
          <span>Ver detalles</span>
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Rental Options */}
        {vehicle.allRentingOffers && vehicle.allRentingOffers.length > 0 && (
          <p className="text-xs text-center text-gray-500 mt-2">
            {vehicle.allRentingOffers.length} opciones de renting
          </p>
        )}
      </div>

      {/* Expanded Details - Financing Table */}
      {showDetails && (
        <div className="border-t px-4 py-3 bg-gray-50">
          {vehicle.allRentingOffers && vehicle.allRentingOffers.length > 0 ? (
            <div>
              <h4 className="font-semibold text-xs text-gray-800 mb-2">
                Opciones de financiación (€/mes):
              </h4>
              {(() => {
                // Organize data by duration and km
                const dataByDuration = {};
                const kmValues = new Set();

                vehicle.allRentingOffers.forEach(offer => {
                  const duration = `${offer.months}m`;
                  const km = parseInt(offer.km);

                  if (!dataByDuration[duration]) {
                    dataByDuration[duration] = {};
                  }
                  dataByDuration[duration][km] = offer.price;
                  kmValues.add(km);
                });

                const sortedKm = Array.from(kmValues).sort((a, b) => a - b);
                const sortedDurations = Object.keys(dataByDuration).sort((a, b) => {
                  const aNum = parseInt(a.replace('m', ''));
                  const bNum = parseInt(b.replace('m', ''));
                  return aNum - bNum;
                });

                return (
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-gray-300">
                          <th className="text-left py-1 px-1 font-medium text-gray-700">km/año</th>
                          {sortedDurations.map(duration => (
                            <th key={duration} className="text-center py-1 px-1 font-medium text-gray-700">
                              {duration}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sortedKm.map(km => (
                          <tr key={km} className="border-b border-gray-200">
                            <td className="py-1 px-1 font-medium text-gray-800">
                              {km.toLocaleString()}
                            </td>
                            {sortedDurations.map(duration => {
                              const price = dataByDuration[duration][km];
                              return (
                                <td key={`${km}-${duration}`} className="text-center py-1 px-1">
                                  {price ? (
                                    <span className="text-red-600 font-medium">
                                      {formatPrice(price)}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">-</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                );
              })()}
            </div>
          ) : (
            <p className="text-xs text-gray-600">
              No hay opciones de financiación disponibles
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default VehicleCard;