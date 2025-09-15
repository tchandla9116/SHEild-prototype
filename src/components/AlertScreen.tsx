import { AlertTriangle, X, Volume2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState, useEffect } from "react";
import { withHapticFeedback } from "./utils/hapticFeedback";
import { VoiceCommands } from "./utils/voiceCommands";

interface AlertScreenProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export function AlertScreen({ onCancel, onConfirm }: AlertScreenProps) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onConfirm();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onConfirm]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-orange-50 to-yellow-50 flex flex-col items-center justify-center p-4">
      {/* Voice Commands */}
      <VoiceCommands 
        onEmergency={onConfirm}
        onCancel={onCancel}
        isListening={true}
      />

      {/* Alert Icon */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
        <div className="absolute inset-2 bg-orange-500 rounded-full animate-ping opacity-50"></div>
        <div className="relative bg-gradient-to-r from-red-600 to-red-700 p-8 rounded-full shadow-2xl">
          <AlertTriangle className="h-14 w-14 text-white animate-pulse" />
        </div>
      </div>

      {/* Alert Message */}
      <Card className="p-6 mb-8 text-center max-w-sm w-full bg-white/90 backdrop-blur-sm shadow-xl border-0">
        <h2 className="font-bold text-red-700 mb-3">
          Unusual Activity Detected
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Your SHEild device has detected unusual movement patterns. Emergency contacts will be notified in:
        </p>
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-50"></div>
          <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white p-4 rounded-full">
            <span className="font-black">{countdown}s</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
          <Volume2 className="h-4 w-4" />
          <span>Deterrent audio will activate</span>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-4 w-full max-w-sm">
        <div className="relative">
          <div className="absolute inset-0 bg-red-600 rounded-xl blur-lg opacity-75 animate-pulse"></div>
          <Button 
            onClick={withHapticFeedback(onConfirm, 'heavy')}
            className="relative w-full h-14 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-xl border-2 border-red-500"
            size="lg"
          >
            <AlertTriangle className="h-5 w-5 mr-2 animate-bounce" />
            <span className="font-bold">SEND ALERT NOW</span>
          </Button>
        </div>
        
        <Button 
          onClick={withHapticFeedback(onCancel, 'medium')}
          variant="outline"
          className="w-full h-14 border-2 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-gray-50"
          size="lg"
        >
          <X className="h-5 w-5 mr-2" />
          <span className="font-semibold">I'M SAFE - CANCEL</span>
        </Button>
      </div>

      {/* Status Indicators */}
      <div className="mt-8 flex items-center gap-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>GPS Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span>Recording Audio</span>
        </div>
      </div>
    </div>
  );
}