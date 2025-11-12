import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Locate, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  selectedLocation?: { lat: number; lng: number; address: string };
}

const LocationPicker = ({ onLocationSelect, selectedLocation }: LocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [mapboxToken, setMapboxToken] = useState("");
  const [tokenError, setTokenError] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current || !mapboxToken) return;

    // Set the access token
    mapboxgl.accessToken = mapboxToken;

    // Initialize map
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [77.5946, 12.9716], // Bangalore, India as default
        zoom: 12,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Handle map load errors
      map.current.on('error', (e) => {
        console.error('Map error:', e);
        setTokenError(true);
      });

      map.current.on('load', () => {
        setTokenError(false);
      });

      // Add click handler to select location
      map.current.on("click", async (e) => {
        const { lng, lat } = e.lngLat;
        updateMarker(lat, lng);
        await reverseGeocode(lat, lng);
      });

      // If there's a selected location, show it
      if (selectedLocation) {
        updateMarker(selectedLocation.lat, selectedLocation.lng);
        map.current.setCenter([selectedLocation.lng, selectedLocation.lat]);
      }
    } catch (error) {
      console.error('Failed to initialize map:', error);
      setTokenError(true);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  const updateMarker = (lat: number, lng: number) => {
    if (!map.current) return;

    if (marker.current) {
      marker.current.setLngLat([lng, lat]);
    } else {
      marker.current = new mapboxgl.Marker({ color: "#ef4444", draggable: true })
        .setLngLat([lng, lat])
        .addTo(map.current);

      marker.current.on("dragend", async () => {
        const lngLat = marker.current!.getLngLat();
        await reverseGeocode(lngLat.lat, lngLat.lng);
      });
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      const address = data.features[0]?.place_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      
      onLocationSelect({ lat, lng, address });
    } catch (error) {
      console.error("Geocoding error:", error);
      onLocationSelect({ lat, lng, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` });
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          map.current?.flyTo({ center: [longitude, latitude], zoom: 15 });
          updateMarker(latitude, longitude);
          await reverseGeocode(latitude, longitude);
          setIsLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {!mapboxToken && (
        <div className="bg-muted/50 rounded-lg p-4 border border-primary/20">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Key className="w-4 h-4" />
            Enter Your Mapbox Public Token
          </label>
          <Input
            type="text"
            placeholder="pk.eyJ1Ijoi..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="font-mono text-xs"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Get your free token at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a> → Dashboard → Tokens
          </p>
        </div>
      )}

      {mapboxToken && (
        <>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm font-medium">
              <MapPin className="w-4 h-4" />
              Select Delivery Location
            </label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={getCurrentLocation}
              disabled={isLoading}
              className="gap-2"
            >
              <Locate className="w-4 h-4" />
              {isLoading ? "Getting..." : "My Location"}
            </Button>
          </div>
          
          {tokenError && (
            <div className="bg-destructive/10 text-destructive text-xs p-2 rounded-lg border border-destructive/20">
              Invalid token. Please check your Mapbox token and try again.
            </div>
          )}
          
          <div 
            ref={mapContainer} 
            className="w-full h-[280px] rounded-lg border-2 border-primary/20 overflow-hidden"
          />
      
          {selectedLocation && (
            <div className="bg-muted/50 rounded-lg p-3 border border-primary/10">
              <p className="text-xs font-medium text-muted-foreground mb-1">Selected Location:</p>
              <p className="text-sm text-foreground line-clamp-2">{selectedLocation.address}</p>
            </div>
          )}
          
          <p className="text-xs text-muted-foreground">
            📍 Click on the map or drag the pin to select your exact delivery location
          </p>
        </>
      )}
    </div>
  );
};

export default LocationPicker;
