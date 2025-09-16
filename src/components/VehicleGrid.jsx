import React from 'react';
import VehicleCard from './VehicleCard';

const VehicleGrid = ({ vehicles }) => {
  if (vehicles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-600">No se encontraron vehículos con los filtros aplicados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle, index) => (
          <VehicleCard key={vehicle.id || index} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehicleGrid;