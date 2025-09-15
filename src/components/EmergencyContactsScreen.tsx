import { MapPin, Phone, Mic, Clock, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { withHapticFeedback } from "./utils/hapticFeedback";
import { VoiceCommands } from "./utils/voiceCommands";
import { LocationMap } from "./utils/LocationMap";

interface EmergencyContactsScreenProps {
  onNext: () => void;
}

export function EmergencyContactsScreen({ onNext }: EmergencyContactsScreenProps) {
  const contacts = [
    { name: "Emergency Services", number: "911", status: "notified", time: "Just now" },
    { name: "Sarah (Sister)", number: "+1 (555) 123-4567", status: "notified", time: "Just now" },
    { name: "Mom", number: "+1 (555) 987-6543", status: "delivered", time: "1 min ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white p-4">
      {/* Voice Commands */}
      <VoiceCommands 
        isListening={true}
      />

      {/* Header */}
      <div className="text-center mb-6">
        <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Phone className="h-8 w-8 text-red-600" />
        </div>
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Emergency Alert Sent
        </h1>
        <p className="text-gray-600 text-sm">
          Your contacts have been notified with your location and situation
        </p>
      </div>

      {/* Enhanced Live Location */}
      <Card className="p-4 mb-6 bg-blue-50 border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <MapPin className="h-5 w-5 text-blue-600" />
          <span className="font-medium text-blue-800">Live Location Shared</span>
        </div>
        <LocationMap showFullDetails={true} isLive={true} />
      </Card>

      {/* Audio Recording */}
      <Card className="p-4 mb-6 bg-purple-50 border-purple-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Mic className="h-5 w-5 text-purple-600" />
            <span className="font-medium text-purple-800">Audio Recording</span>
          </div>
          <Badge className="bg-red-100 text-red-700">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
            Recording
          </Badge>
        </div>
        <p className="text-sm text-purple-700">
          Environment audio is being recorded and sent to your contacts
        </p>
      </Card>

      {/* Contact Notifications */}
      <div className="mb-8">
        <h3 className="font-medium mb-4 text-gray-800">Notification Status</h3>
        <div className="space-y-3">
          {contacts.map((contact, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    contact.status === 'delivered' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    <CheckCircle className={`h-4 w-4 ${
                      contact.status === 'delivered' ? 'text-green-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{contact.name}</p>
                    <p className="text-xs text-gray-500">{contact.number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={contact.status === 'delivered' ? 'default' : 'secondary'}
                    className={contact.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                  >
                    {contact.status === 'delivered' ? 'Delivered' : 'Sent'}
                  </Badge>
                  <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    <span>{contact.time}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <Button 
          onClick={withHapticFeedback(onNext, 'medium')}
          className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white"
          size="lg"
        >
          Continue to Deterrent
        </Button>
      </div>
    </div>
  );
}