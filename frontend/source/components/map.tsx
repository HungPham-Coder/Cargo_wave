import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ReactMapGl, {
  GeolocateControl,
  Marker,
  Source,
  Layer,
  NavigationControl,
} from "react-map-gl";

interface MapComponentProps {
  startLat: number;
  startLng: number;
  destLat: number;
  destLng: number;
  showRoute: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({
  startLat,
  startLng,
  destLat,
  destLng,
  showRoute,
}) => {
  const [routeData, setRouteData] = useState<any>(null);
  const mapRef = useRef<any>(null); // Reference to the Map component

  const fetchRoute = async () => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${destLng},${destLat}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    const data = await response.json();
    console.log("Fetched Route Data:", data); // Log the data to debug
    if (data.routes && data.routes.length > 0) {
      setRouteData(data.routes[0].geometry);
    }
  };

  useEffect(() => {
    if (showRoute) {
      fetchRoute();
    }
  }, [showRoute, startLat, startLng, destLat, destLng]);

  return (
    <div>
      <ReactMapGl
        ref={mapRef} // Attach the ref to the Map component
        initialViewState={{
          latitude: (startLat + destLat) / 2,
          longitude: (startLng + destLng) / 2,
          zoom: 5,
        }}
        // style={{ width: "100%", height: "45vh" }}
        style={{
          overflow: "hidden",
          height: "30rem",
        }}
        mapStyle="mapbox://styles/rilytoken/cm2h8o0tu00dx01ph1o736qj2"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        attributionControl={false}
      >
        {showRoute && routeData && (
          <Marker longitude={startLng} latitude={startLat} color="red" />
        )}
       
        {showRoute && routeData && (
          <Source id="route" type="geojson" data={routeData}>
            <Layer
              id="route"
              type="line"
              paint={{
                "line-color": "#007AFF",
                "line-width": 4,
              }}
            />
          </Source>
        )}
        <GeolocateControl></GeolocateControl>
      </ReactMapGl>
    </div>
  );
};

export default MapComponent;
