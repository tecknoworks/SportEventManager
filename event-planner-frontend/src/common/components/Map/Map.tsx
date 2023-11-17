import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
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

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '',
  });

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <Marker position={center} />
        </GoogleMap>
      )}
    </div>
  );
};

export default React.memo(MapComponent);
