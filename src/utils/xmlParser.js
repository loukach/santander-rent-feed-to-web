export const parseXML = (xmlText) => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    // Check for parse errors
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      return { error: 'Invalid XML format', vehicles: [], brands: [] };
    }

    const anuncios = xmlDoc.getElementsByTagName('anuncio');

    if (anuncios.length === 0) {
      return { error: 'No vehicles found in XML', vehicles: [], brands: [] };
    }

    const vehicles = [];
    const brandSet = new Set();

    for (let i = 0; i < anuncios.length; i++) {
      const anuncio = anuncios[i];

      try {
        // Parse renting offers
        const rentingElement = anuncio.getElementsByTagName('renting')[0];
        let lowestPrice = null;
        let selectedOffer = { months: 36, km: 10000 };
        let allRentingOffers = [];

        if (rentingElement) {
          const rentingOffers = rentingElement.getElementsByTagName('ofertaRenting');

          for (let j = 0; j < rentingOffers.length; j++) {
            const offer = rentingOffers[j];
            const price = parseFloat(getXMLValue(offer, 'cuota'));
            const months = getXMLValue(offer, 'meses');
            const km = getXMLValue(offer, 'km');

            allRentingOffers.push({ price, months, km });

            if (!lowestPrice || price < lowestPrice) {
              lowestPrice = price;
              selectedOffer = { months, km };
            }
          }
        }

        // Parse images
        const images = [];
        const fotosElement = anuncio.getElementsByTagName('fotos')[0];
        if (fotosElement) {
          const fotos = fotosElement.getElementsByTagName('foto');
          for (let j = 0; j < fotos.length && j < 10; j++) {
            const imageUrl = cleanCDATA(fotos[j].textContent);
            if (imageUrl) {
              images.push(imageUrl);
            }
          }
        }

        // Parse fuel consumption
        let consumoMixto = null;
        const consumoElement = anuncio.getElementsByTagName('consumo')[0];
        if (consumoElement) {
          const mixtoElement = consumoElement.getElementsByTagName('mixto')[0];
          if (mixtoElement) {
            consumoMixto = cleanCDATA(mixtoElement.textContent);
          }
        }

        // Create vehicle object
        const vehicle = {
          id: getXMLValue(anuncio, 'motorflashID') || `vehicle-${i}`,
          dealerId: getXMLValue(anuncio, 'dealerID'),
          brand: getXMLValue(anuncio, 'marca'),
          model: getXMLValue(anuncio, 'modelo'),
          version: getXMLValue(anuncio, 'version'),
          price: lowestPrice,
          priceDetails: selectedOffer,
          images: images,
          mainImage: images[0] || null,
          fuel: getXMLValue(anuncio, 'combustible'),
          transmission: getXMLValue(anuncio, 'cambio'),
          seats: getXMLValue(anuncio, 'plazas'),
          doors: getXMLValue(anuncio, 'puertas'),
          color: getXMLValue(anuncio, 'color'),
          power: getXMLValue(anuncio, 'potencia'),
          kilometers: getXMLValue(anuncio, 'kilometros'),
          estado: getXMLValue(anuncio, 'estado'),
          disponible: getXMLValue(anuncio, 'disponible'),
          emisiones: getXMLValue(anuncio, 'emisiones'),
          distintivo: getXMLValue(anuncio, 'distintivo'),
          consumoMixto: consumoMixto,
          carroceria: getXMLValue(anuncio, 'carroceria'),
          promocion: getXMLValue(anuncio, 'vehiculo_en_promocion') === 'SI',
          allRentingOffers: allRentingOffers
        };

        if (vehicle.brand) {
          brandSet.add(vehicle.brand);
          vehicles.push(vehicle);
        }

      } catch (err) {
        console.error(`Error parsing vehicle ${i}:`, err);
        continue;
      }
    }

    return {
      vehicles,
      brands: Array.from(brandSet).sort(),
      error: null
    };

  } catch (err) {
    console.error('XML parsing error:', err);
    return {
      error: err.message,
      vehicles: [],
      brands: []
    };
  }
};

const getXMLValue = (parent, tagName) => {
  const element = parent.getElementsByTagName(tagName)[0];
  if (element && element.textContent) {
    return cleanCDATA(element.textContent);
  }
  return null;
};

const cleanCDATA = (text) => {
  if (!text) return null;
  return text
    .replace(/^\s*<!\[CDATA\[/, '')
    .replace(/\]\]>\s*$/, '')
    .trim() || null;
};