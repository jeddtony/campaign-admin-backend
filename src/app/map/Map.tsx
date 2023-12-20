'use client';
import React, {useState, useEffect} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getStudents } from '@/api/Api';


interface MapProps {
  apiKey: string;
}

interface Contact {
    id: string,
    position: any,
    title: string
}


const Map: React.FC<MapProps> = ({ apiKey }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const [students, setStudents] = useState<Contact[]>();

  useEffect(() => {
      async function fetch() {
          let result = await getStudents();
          console.log(result);
          let parsedElement = parseStudents(result.data);
        //   console.log(parsedElement);
          setStudents(parseStudents(result.data));
      }

      fetch();
  }, [])

  const parseStudents = (data: any[]) => {
    let dataToReturn : Contact[] = []
    data.forEach(element => {
        const [lat, lng] = element.geo_cord.split(',');
        dataToReturn.push({
            id: element.id,
            position: {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            },
            title: element.name
        })
    });
    return dataToReturn;
  }

  const center = {
    lat: 5.5300723, // Latitude of the map center
    lng: -0.4277713, // Longitude of the map center
  };

//   const markers = [
//     { id: 1, position: { lat: 37.7749, lng: -122.4194 }, title: 'Marker 1' },
//     { id: 2, position: { lat: 37.7893, lng: -122.4224 }, title: 'Marker 2' },
//     { id: 3, position: { lat: 37.7749, lng: -122.4307 }, title: 'Marker 3' },
//   ];

  return (
    
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
        {students?.map((marker) => (
          <Marker key={marker.id} position={marker.position} title={marker.title} />
        ))}
      </GoogleMap>
    </LoadScript>
    
  );
};

export default Map;
