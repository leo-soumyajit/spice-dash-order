import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  selectedLocation?: { lat: number; lng: number; address: string };
}

const LocationPicker = ({ onLocationSelect, selectedLocation }: LocationPickerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([12.9716, 77.5946], 12); // Bangalore, India as default

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Add click handler to select location
    map.current.on("click", async (e) => {
      const { lat, lng } = e.latlng;
      updateMarker(lat, lng);
      await reverseGeocode(lat, lng);
    });

    // If there's a selected location, show it
    if (selectedLocation) {
      updateMarker(selectedLocation.lat, selectedLocation.lng);
      map.current.setView([selectedLocation.lat, selectedLocation.lng], 15);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const updateMarker = (lat: number, lng: number) => {
    if (!map.current) return;

    if (marker.current) {
      marker.current.setLatLng([lat, lng]);
    } else {
      // Create custom red marker icon
      const redIcon = L.icon({
        iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      marker.current = L.marker([lat, lng], { 
        icon: redIcon,
        draggable: true 
      }).addTo(map.current);

      marker.current.on("dragend", async () => {
        const latlng = marker.current!.getLatLng();
        await reverseGeocode(latlng.lat, latlng.lng);
      });
    }
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      
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
          map.current?.setView([latitude, longitude], 15);
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
