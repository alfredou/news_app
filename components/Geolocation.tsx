import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { LocationData } from '@/types';

interface GeoLocationProps {
  onLocationUpdate: (locationData: LocationData) => void;
}

const GeoLocation: React.FC<GeoLocationProps> = ({ onLocationUpdate }) => {
  const apiKey: string | undefined = process.env.NEXT_PUBLIC_OPENCAGE_API_KEY; 
  const geoLocationApiUrl : string | undefined = process.env.NEXT_PUBLIC_GEOLOCATION_API_URL;

  const fetchGeoLocation = () =>
    new Promise<{ latitude: number; longitude: number }>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
          error => reject(error)
        );
      } else {
        reject(new Error("Geolocalización no es compatible en este navegador."));
      }
    });

  const { data: geoLocationData, error: geoLocationError } = useSWR(
    'getGeoLocation',
    fetchGeoLocation,
    {
      onSuccess: (position) => {
        const { latitude, longitude } = position;
        const apiUrl = `${geoLocationApiUrl}?q=${latitude}+${longitude}&key=${apiKey}`;

        axios.get(apiUrl)
          .then(response => {
            const locationData: LocationData = {
              city: response.data.results[0].components.city,
              country: response.data.results[0].components.country,
            };
            onLocationUpdate(locationData);
          })
          .catch(error => {
            console.error("Error al obtener información de ubicación:", error);
          });
      },
      revalidateOnMount: true,
    }
  );

  return (
    <>
      {geoLocationError && <p>Error al obtener la ubicación: {geoLocationError.message}</p>}
    </>
  );
};

export default GeoLocation;
