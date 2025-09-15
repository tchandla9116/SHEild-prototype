import { useState, useEffect } from 'react';
import { MapPin, Navigation, AlertTriangle, CheckCircle, Clock, ArrowLeft, Phone, Shield } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { withHapticFeedback } from './utils/hapticFeedback';
import { VoiceCommands } from './utils/voiceCommands';

interface SafeRouteScreenProps {
  onBack: () => void;
  onEmergency: () => void;
}

export function SafeRouteScreen({ onBack, onEmergency }: SafeRouteScreenProps) {
  const [isIdleDialogOpen, setIsIdleDialogOpen] = useState(false);
  const [isOffRoute, setIsOffRoute] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [routeProgress, setRouteProgress] = useState(0);
  
  // Mock data for safe route
  const routeData = {
    destination: "Home - 123 Oak Street",
    estimatedTime: "12 min",
    distance: "0.8 miles",
    safetyScore: "High",
    checkpoints: [
      { id: 1, name: "Police Station", distance: "0.1 mi", status: "passed", icon: "🚔" },
      { id: 2, name: "24/7 Store", distance: "0.3 mi", status: "current", icon: "🏪" },
      { id: 3, name: "Bus Stop", distance: "0.5 mi", status: "upcoming", icon: "🚌" },
      { id: 4, name: "School Zone", distance: "0.7 mi", status: "upcoming", icon: "🏫" }
    ]
  };

  // Simulate route progress
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setRouteProgress(prev => Math.min(prev + 1, 100));
    }, 2000);

    return () => clearInterval(progressTimer);
  }, []);

  // Idle detection (2 minutes)
  useEffect(() => {
    const idleTimer = setInterval(() => {
      if (Date.now() - lastActivity > 120000) { // 2 minutes
        setIsIdleDialogOpen(true);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(idleTimer);
  }, [lastActivity]);

  // Simulate route deviation occasionally
  useEffect(() => {
    const deviationTimer = setTimeout(() => {
      if (Math.random() > 0.7) {
        setIsOffRoute(true);
        setTimeout(() => setIsOffRoute(false), 10000); // Clear after 10 seconds
      }
    }, 15000);

    return () => clearTimeout(deviationTimer);
  }, []);

  const handleActivity = () => {
    setLastActivity(Date.now());
    setIsIdleDialogOpen(false);
  };

  const handleIdleResponse = (isSafe: boolean) => {
    setIsIdleDialogOpen(false);
    setLastActivity(Date.now());
    if (!isSafe) {
      onEmergency();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-pink-50 p-4" onClick={handleActivity}>
      {/* Voice Commands */}
      <VoiceCommands 
        onEmergency={onEmergency}
        onHelp={() => setIsIdleDialogOpen(true)}
        isListening={true}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={withHapticFeedback(onBack, 'light')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-teal-500 to-pink-500 rounded-xl">
            <Navigation className="h-5 w-5 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent font-semibold">Safe Route</h1>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={withHapticFeedback(onEmergency, 'heavy')}
          className="text-red-600 hover:text-red-700"
        >
          <Phone className="h-4 w-4" />
        </Button>
      </div>

      {/* Route Deviation Warning */}
      {isOffRoute && (
        <Card className="p-4 mb-4 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200 animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <div className="flex-1">
              <p className="font-medium text-orange-800">Route Deviation Detected</p>
              <p className="text-sm text-orange-600">You've left the recommended safe route</p>
            </div>
            <Button 
              size="sm" 
              className="bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => setIsOffRoute(false)}
            >
              Get Back On Route
            </Button>
          </div>
        </Card>
      )}

      {/* Expanded Map View */}
      <Card className="mb-6 overflow-hidden bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="relative h-64 bg-gradient-to-br from-teal-100 via-cyan-100 to-blue-100">
          {/* Enhanced map visualization */}
          <div className="absolute inset-0">
            {/* Street grid with more detail */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-white/60 rounded"></div>
            <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-white/80 rounded"></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-white/60 rounded"></div>
            <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-white/60 rounded"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-1.5 bg-white/80 rounded"></div>
            <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-white/60 rounded"></div>
            
            {/* Safe route path (green line) */}
            <svg className="absolute inset-0 w-full h-full">
              <path 
                d="M 20 80 Q 60 60 120 100 T 240 120" 
                stroke="#10b981" 
                strokeWidth="4" 
                fill="none"
                strokeDasharray="8,4"
                className="animate-pulse"
              />
            </svg>
            
            {/* Current location */}
            <div className="absolute top-20 left-5 transform">
              <div className="relative">
                <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                <div className="absolute inset-0 w-4 h-4 bg-blue-600 rounded-full animate-ping opacity-50"></div>
              </div>
            </div>
            
            {/* Destination */}
            <div className="absolute bottom-8 right-8">
              <div className="w-6 h-6 bg-green-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <CheckCircle className="h-3 w-3 text-white" />
              </div>
            </div>
            
            {/* Safe checkpoints */}
            <div className="absolute top-16 left-16 w-3 h-3 bg-emerald-500 rounded-full border border-white animate-pulse"></div>
            <div className="absolute top-24 left-32 w-3 h-3 bg-emerald-500 rounded-full border border-white"></div>
            <div className="absolute bottom-16 left-24 w-3 h-3 bg-gray-400 rounded-full border border-white"></div>
            <div className="absolute bottom-12 right-20 w-3 h-3 bg-gray-400 rounded-full border border-white"></div>
            
            {/* Unsafe zones (red heatmap areas) */}
            <div className="absolute top-8 right-8 w-12 h-8 bg-red-400 opacity-30 rounded-lg"></div>
            <div className="absolute bottom-20 left-12 w-8 h-6 bg-red-400 opacity-30 rounded-lg"></div>
          </div>
          
          {/* Route progress overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Route Progress</span>
                <span className="text-sm text-gray-500">{routeProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${routeProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Route Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-800">{routeData.destination}</h3>
              <p className="text-sm text-gray-500">Safest route recommended</p>
            </div>
            <Badge className="bg-green-100 text-green-700">
              <Shield className="h-3 w-3 mr-1" />
              {routeData.safetyScore} Safety
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{routeData.estimatedTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">{routeData.distance}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Safe Checkpoints */}
      <Card className="mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-4">Safe Checkpoints</h3>
          <div className="space-y-3">
            {routeData.checkpoints.map((checkpoint) => (
              <div 
                key={checkpoint.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  checkpoint.status === 'passed' ? 'bg-green-50' :
                  checkpoint.status === 'current' ? 'bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{checkpoint.icon}</span>
                  <div>
                    <p className={`font-medium ${
                      checkpoint.status === 'passed' ? 'text-green-700' :
                      checkpoint.status === 'current' ? 'text-blue-700' : 'text-gray-700'
                    }`}>
                      {checkpoint.name}
                    </p>
                    <p className="text-sm text-gray-500">{checkpoint.distance}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {checkpoint.status === 'passed' && (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  )}
                  {checkpoint.status === 'current' && (
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                  )}
                  {checkpoint.status === 'upcoming' && (
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Emergency Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
          <Button 
            onClick={withHapticFeedback(onEmergency, 'heavy')}
            className="relative w-full h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl shadow-xl border-2 border-red-500 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <AlertTriangle className="h-6 w-6 mr-3 animate-bounce" />
            <span className="font-bold tracking-wide">EMERGENCY</span>
          </Button>
        </div>
      </div>

      {/* Idle Detection Dialog */}
      <Dialog open={isIdleDialogOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-orange-700">Safety Check</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-orange-600 animate-pulse" />
            </div>
            <p className="text-gray-700 mb-6">
              We haven't detected movement for 2 minutes. Are you safe?
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => handleIdleResponse(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Yes, I'm Safe
              </Button>
              <Button 
                onClick={() => handleIdleResponse(false)}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                No, Send Help
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}