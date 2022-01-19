import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Button, Container, Stack } from '@mui/material';
import Papa from 'papaparse';
import hospital from '@/public/local_hospital_white_24dp.svg';

// const dataUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vSsF4Xsupk5Se4gvkl-DvZiWHiicujxV976aTyg4Y7fQrnKmpWfYqVJYow0nyT_7JSdwOEhEOJJMKH9/pub?gid=0&single=true&output=csv`
const sheetId = `2PACX-1vSsF4Xsupk5Se4gvkl-DvZiWHiicujxV976aTyg4Y7fQrnKmpWfYqVJYow0nyT_7JSdwOEhEOJJMKH9`;
const dataUrl = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=0&single=true&output=csv`;
interface DataRow {
  commune: string;
  name: string;
  address: string;
  coords?: string;
  link?: string;
  lat?: number;
  lng?: number;
}

export default function GoogleMap() {
  const googlemap = useRef(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [points, setPoints] = useState<DataRow[]>([]);
  const [userLat, setUserLat] = useState(-33.4513);
  const [userLng, setUserLng] = useState(-70.6653);

  useEffect(() => {
    // https://www.papaparse.com/docs#remote-files
    const parsedRows: DataRow[] = [];
    Papa.parse(dataUrl, {
      download: true,
      header: true,
      delimiter: `,`,
      skipEmptyLines: true,
      complete: (results) => setPoints(parsedRows as DataRow[]),
      error: (error) => console.log(error),
      step: ({ data: row }: { data: DataRow }) => {
        if (row.coords && row.coords !== ``) {
          // Remove trailing commas
          row.coords = row.coords.replace(/,$/g, ``);
          // Is valid coordinate
          if (
            row.coords.match(
              /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/gm,
            )
          ) {
            // Remove spaces
            row.coords = row.coords.replace(` `, ``);
            const [rowLat, rowLng] = row.coords.split(`,`);
            row.lat = Number(rowLat);
            row.lng = Number(rowLng);
            parsedRows.push(row);
          }
        }
      },
    });
  }, []);

  useEffect(() => {
    if (points && map) {
      const google = window.google;
      points.map((point) => {
        const { lat, lng, name: title } = point;
        new google.maps.Marker({
          position: { lat: lat as number, lng: lng as number },
          title,
          map,
          icon: {
            url: `https://maps.google.com/mapfiles/kml/paddle/grn-circle.png`,
            scaledSize: new google.maps.Size(30, 30),
          },
          optimized: true,
        });
      });
    }
  }, [points, map]);

  const setPositionOnMap = (lat: number, lng: number) => {
    if (map) {
      map?.panTo({ lat, lng });
      map?.setZoom(14);

      new google.maps.Marker({
        position: { lat, lng },
        title: `Tu ubicación actual`,
        map,
        optimized: true,
      });
    }
  };

  const askForPosition = () => {
    const google = window.google;
    if (`geolocation` in navigator && map) {
      console.log(`Available`);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setPositionOnMap(lat, lng);
          setUserLat(lat);
          setUserLng(lng);
        },
        (error) => {
          setPositionOnMap(userLat, userLng);
          console.log(error);
        },
      );
    } else {
      setPositionOnMap(userLat, userLng);
      console.log(`Not Available`);
    }
  };

  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: `weekly`,
    });
    let innerMap: google.maps.Map;
    loader.load().then(async () => {
      const lat = -33.48,
        lng = -71.5;
      const zoom = 8;
      const google = window.google;
      if (googlemap && googlemap.current) {
        innerMap = new google.maps.Map(googlemap.current, {
          center: { lat, lng },
          zoom,
          mapId: `1a80958d5f6f7a02`,
          fullscreenControl: false, // remove the top-right button
          mapTypeControl: true, // remove the top-left buttons
          streetViewControl: false, // remove the pegman
          zoomControl: true, // remove the bottom-right buttons
        });
        setMap(innerMap);
      }
    });
  }, []);

  return (
    <Container maxWidth="lg">
      <div id="map" ref={googlemap} style={{ minHeight: `50vh` }} />
      <Stack marginTop={2}>
        <Button
          variant="contained"
          sx={{ maxWidth: { md: `30%`, sm: `100%` }, margin: `0 auto` }}
          onClick={askForPosition}
        >
          Encontrar mi posición en el mapa
        </Button>
      </Stack>
    </Container>
  );
}
