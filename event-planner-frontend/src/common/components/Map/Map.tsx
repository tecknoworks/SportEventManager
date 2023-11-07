import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { LatLng } from './models';

const containerStyle = {
  width: '400px',
  height: '400px',
};

type Props = {
  center: LatLng;
};

const MapComponent = ({ center }: Props) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '';
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(MapComponent);
