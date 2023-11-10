import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { LatLng } from './models';

type Props = {
  center: LatLng;
  isResizable: boolean;
};

const MapComponent = ({ isResizable, center }: Props) => {
  const containerStyle = {
    width: !isResizable ? '50%' : '100%',
    height: '250px',
    marginTop: !isResizable ? '0' : '20px',
  };
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
