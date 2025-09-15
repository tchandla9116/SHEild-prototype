import { CheckCircle, MapPin, Phone, Clock, Home } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { withHapticFeedback } from "./utils/hapticFeedback";
import { VoiceCommands } from "./utils/voiceCommands";

interface ConfirmationScreenProps {
  onReturnHome: () => void;
}

export function ConfirmationScreen({ onReturnHome }: ConfirmationScreenProps) {
  const notifications = [
    { 
      contact: "Emergency Services", 
      status: "Received", 
      time: "2 min ago",
      response: "Unit dispatched to your location"
    },
    { 
      contact: "Sarah (Sister)", 
      status: "Received", 
      time: "2 min ago",
      response: "On my way! Are you okay?"
    },
    { 
      contact: "Mom", 
      status: "Received", 
      time: "3 min ago",
      response: "Calling you now!"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-white p-4">
      {/* Voice Commands */}
      <VoiceCommands 
        onHome={onReturnHome}
        isListening={true}
      />

      {/* Success Header */}
      <div className="text-center mb-6">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-30"></div>
          <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-6 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-xl">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
        </div>
        <h1 className="font-bold text-gray-800 mb-2">
          Alert Successfully Sent
        </h1>
        <p className="text-gray-600 text-sm leading-relaxed">
          Your emergency contacts have received your alert and are responding
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="p-4 text-center bg-white/80 backdrop-blur-sm shadow-sm border-0">
          <div className="font-bold text-emerald-600">3</div>
          <div className="text-xs text-gray-600">Contacts Notified</div>
        </Card>
        <Card className="p-4 text-center bg-white/80 backdrop-blur-sm shadow-sm border-0">
          <div className="font-bold text-teal-600">100%</div>
          <div className="text-xs text-gray-600">Delivery Rate</div>
        </Card>
      </div>

      {/* Response Status */}
      <div className="mb-6">
        <h3 className="font-medium mb-4 text-gray-800">Contact Responses</h3>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{notification.contact}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-100 text-green-700">
                  {notification.status}
                </Badge>
              </div>
              <div className="bg-gray-50 p-2 rounded text-sm text-gray-700 ml-7">
                "{notification.response}"
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Features */}
      <Card className="p-4 mb-6">
        <h3 className="font-medium mb-3 text-gray-800">Currently Active</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-500" />
              <span>Live Location Sharing</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600">Active</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-green-500" />
              <span>Emergency Call Ready</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-600">Ready</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Safety Tips */}
      <Card className="p-4 mb-8 bg-blue-50 border-blue-200">
        <h3 className="font-medium mb-2 text-blue-800">Safety Reminder</h3>
        <p className="text-sm text-blue-700">
          Stay in a safe location if possible. Help is on the way. Your location is being shared with emergency services and your contacts.
        </p>
      </Card>

      {/* Return to Home */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button 
          onClick={withHapticFeedback(onReturnHome, 'light')}
          className="w-full h-14 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-xl"
          size="lg"
        >
          <Home className="h-5 w-5 mr-2" />
          <span className="font-semibold">Return to Dashboard</span>
        </Button>
      </div>
    </div>
  );
}