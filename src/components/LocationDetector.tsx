
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface LocationData {
  latitude: number | null;
  longitude: number | null;
  address: string;
}

interface LocationDetectorProps {
  onLocationChange: (location: LocationData) => void;
  initialLocation?: LocationData;
}

export default function LocationDetector({ 
  onLocationChange,
  initialLocation = { latitude: null, longitude: null, address: '' }
}: LocationDetectorProps) {
  const [location, setLocation] = useState<LocationData>(initialLocation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });
      
      const { latitude, longitude } = position.coords;
      
      // Attempt to get address using reverse geocoding
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        
        const address = data.display_name || 'Address not found';
        
        const newLocation = { latitude, longitude, address };
        setLocation(newLocation);
        onLocationChange(newLocation);
      } catch (error) {
        // If geocoding fails, still save coordinates
        const newLocation = { 
          latitude, 
          longitude, 
          address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}` 
        };
        setLocation(newLocation);
        onLocationChange(newLocation);
      }
    } catch (error) {
      let message = "Failed to detect location";
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        }
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-detect on first render if no location is provided
  useEffect(() => {
    if (!initialLocation.latitude && !initialLocation.longitude) {
      detectLocation();
    }
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={detectLocation} 
          disabled={loading}
          className="w-full"
        >
          <MapPin className="mr-2 h-4 w-4" />
          {loading ? "Detecting..." : "Detect My Location"}
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {location.latitude && location.longitude && (
        <div className="text-sm text-muted-foreground">
          <div><strong>Current Location:</strong> {location.address}</div>
        </div>
      )}
    </div>
  );
}
