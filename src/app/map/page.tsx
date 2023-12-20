'use client';
import React from 'react';
import Map from './Map';
import SideMenu from '../sidemenu';

const Home: React.FC = () => {
  const googleMapsApiKey = 'AIzaSyBiXz29836jS-9X7CzlG3lXCepKJOh2Rfw';

  return (
    <SideMenu active='map'>
      <h1>Contacts on a Map</h1>
      <Map apiKey={googleMapsApiKey} />
      </SideMenu>
  );
};

export default Home;
