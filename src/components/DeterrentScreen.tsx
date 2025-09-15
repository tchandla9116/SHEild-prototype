import { Volume2, Shield, Siren } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState, useEffect } from "react";
import { withHapticFeedback } from "./utils/hapticFeedback";
import { VoiceCommands } from "./utils/voiceCommands";

interface DeterrentScreenProps {
  onNext: () => void;
}

export function DeterrentScreen({ onNext }: DeterrentScreenProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [playCount, setPlayCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayCount(prev => prev + 1);
    }, 3000);

    // Auto advance after 15 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onNext]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-4 flex flex-col items-center justify-center">
      {/* Voice Commands */}
      <VoiceCommands 
        isListening={true}
      />

      {/* Siren Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-orange-600 p-6 rounded-full">
          <Siren className="h-12 w-12 text-white" />
        </div>
      </div>

      {/* Main Message */}
      <Card className="p-6 mb-8 text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold text-orange-700 mb-4">
          Deterrent Audio Active
        </h2>
        
        {/* Audio Message Display */}
        <div className="bg-orange-100 p-4 rounded-lg mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Volume2 className="h-5 w-5 text-orange-600" />
            <span className="font-medium text-orange-800">Now Playing</span>
          </div>
          <p className="text-lg font-semibold text-orange-800 mb-2">
            "BACK OFF! POLICE ALERTED!"
          </p>
          <p className="text-sm text-orange-600">
            Loud deterrent message playing from device
          </p>
        </div>

        {/* Play Status */}
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-4">
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
          <span>Played {playCount} times</span>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-sm text-gray-600">Volume:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((level) => (
              <div 
                key={level}
                className={`w-2 h-6 rounded ${
                  level <= 5 ? 'bg-orange-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-orange-600">MAX</span>
        </div>
      </Card>

      {/* Device Status */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4 text-green-500" />
            <span>Device Connected</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>Emergency Mode</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 w-full max-w-sm">
        <Button 
          onClick={withHapticFeedback(() => setIsPlaying(!isPlaying), isPlaying ? 'light' : 'medium')}
          variant={isPlaying ? "destructive" : "default"}
          className="w-full h-12"
          size="lg"
        >
          <Volume2 className="h-5 w-5 mr-2" />
          {isPlaying ? "Stop Audio" : "Resume Audio"}
        </Button>
        
        <Button 
          onClick={withHapticFeedback(onNext, 'medium')}
          variant="outline"
          className="w-full h-12"
          size="lg"
        >
          Continue to Status
        </Button>
      </div>

      {/* Auto-advance indicator */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        Will automatically continue in a few seconds
      </p>
    </div>
  );
}