import { useState } from "react";
import { MapPin, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationPickerProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  selectedLocation?: { lat: number; lng: number; address: string };
}

const LocationPicker = ({ onLocationSelect, selectedLocation }: LocationPickerProps) => {
  const [isLoading, setIsLoading] = useState(false);

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
          Delivery Location
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
          {isLoading ? "Getting..." : "Use My Location"}
        </Button>
      </div>
  
      {selectedLocation && (
        <div className="bg-muted/50 rounded-lg p-3 border border-primary/10">
          <p className="text-xs font-medium text-muted-foreground mb-1">Selected Location:</p>
          <p className="text-sm text-foreground">{selectedLocation.address}</p>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        📍 Click "Use My Location" to automatically fetch your current location
      </p>
    </div>
  );
};

export default LocationPicker;
