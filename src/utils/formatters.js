export const formatPrice = (price) => {
  if (!price) return 'Consultar';
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return price;
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(numPrice);
};

export const getTransmissionLabel = (transmission) => {
  if (!transmission) return 'N/A';
  const lower = transmission.toLowerCase();
  if (lower.includes('manual')) return 'Manual';
  if (lower.includes('automático') || lower.includes('automatico')) return 'Automático';
  return transmission;
};

export const getEmissionsLabel = (distintivo) => {
  if (!distintivo) return null;

  const labels = {
    'C': { label: 'C', className: 'bg-green-100 text-green-800' },
    'B': { label: 'B', className: 'bg-blue-100 text-blue-800' },
    'ECO': { label: 'ECO', className: 'bg-teal-100 text-teal-800' },
    'CERO': { label: '0', className: 'bg-purple-100 text-purple-800' },
  };

  return labels[distintivo] || null;
};