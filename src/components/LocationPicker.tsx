import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapPin, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";

// Using Mapbox public token - users can replace with their own
mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNTVxdGdyYzBjMGoya3M3Mms3ZmI0ZmoifQ.8vJkj6FdLZNO9KxQz9xQtQ";

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  selectedLocation?: { lat: number; lng: number; address: string };
}

const LocationPicker = ({ onLocationSelect, selectedLocation }: LocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [77.5946, 12.9716], // Bangalore, India as default
      zoom: 12,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

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

    return () => {
      map.current?.remove();
    };
  }, []);

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
    </div>
  );
};

export default LocationPicker;
