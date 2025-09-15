import { MapPin, Navigation, Clock, Wifi } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface LocationMapProps {
  showFullDetails?: boolean;
  isLive?: boolean;
}

export function LocationMap({ showFullDetails = false, isLive = false }: LocationMapProps) {
  // Mock location data
  const locationData = {
    address: "123 Main Street",
    city: "Downtown Area",
    state: "CA",
    zipCode: "90210",
    coordinates: {
      lat: 34.0522,
      lng: -118.2437
    },
    accuracy: "±3 meters",
    lastUpdate: "2 seconds ago",
    nearby: [
      "Starbucks Coffee - 50m",
      "Metro Station - 120m", 
      "Police Station - 300m"
    ]
  };

  return (
    <div className="space-y-3">
      {/* Map Visualization */}
      <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
        <div className="relative h-32 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-lg overflow-hidden">
          {/* Simplified map representation */}
          <div className="absolute inset-0">
            {/* Street grid */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/60"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/60"></div>
            <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-white/40"></div>
            <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-white/40"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-white/40"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-white/40"></div>
          </div>
          
          {/* User location pin */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className={`relative ${isLive ? 'animate-pulse' : ''}`}>
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
              {isLive && (
                <div className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
              )}
            </div>
          </div>
          
          {/* Nearby landmarks */}
          <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="absolute top-2/3 left-1/3 w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full"></div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-teal-600" />
            <span className="font-medium text-teal-800">Live Location</span>
          </div>
          {isLive && (
            <Badge className="bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-700 text-xs border-teal-200">
              <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse mr-1"></div>
              LIVE
            </Badge>
          )}
        </div>
      </Card>

      {/* Address Details */}
      <Card className="p-4">
        <div className="space-y-3">
          <div>
            <h4 className="font-medium text-gray-800 mb-1">Current Address</h4>
            <p className="text-sm text-gray-600">
              {locationData.address}<br />
              {locationData.city}, {locationData.state} {locationData.zipCode}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-500">Coordinates</span>
              <p className="font-mono text-gray-700">
                {locationData.coordinates.lat.toFixed(4)},<br />
                {locationData.coordinates.lng.toFixed(4)}
              </p>
            </div>
            <div>
              <span className="text-gray-500">Accuracy</span>
              <p className="text-gray-700">{locationData.accuracy}</p>
            </div>
          </div>
          
          {isLive && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>Updated {locationData.lastUpdate}</span>
              <Wifi className="h-3 w-3 text-green-500" />
            </div>
          )}
        </div>
      </Card>

      {/* Nearby Landmarks */}
      {showFullDetails && (
        <Card className="p-4">
          <h4 className="font-medium text-gray-800 mb-3">Nearby Landmarks</h4>
          <div className="space-y-2">
            {locationData.nearby.map((landmark, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <Navigation className="h-3 w-3 text-gray-400" />
                <span className="text-gray-600">{landmark}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* GPS Status */}
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
          <span>GPS Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
          <span>Network Location</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
          <span>Bluetooth Beacons</span>
        </div>
      </div>
    </div>
  );
}