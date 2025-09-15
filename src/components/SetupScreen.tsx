import { useState } from "react";
import { Shield, Bluetooth, Users, MapPin, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { withHapticFeedback } from "./utils/hapticFeedback";

interface SetupScreenProps {
  onComplete: () => void;
}

export function SetupScreen({ onComplete }: SetupScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);

  const steps = [
    {
      title: "Connect Your Device",
      description: "Pair your SHEild wearable with this app",
      component: "device"
    },
    {
      title: "Set Up Emergency Contacts",
      description: "Add trusted contacts for emergencies",
      component: "contacts"
    },
    {
      title: "Enable Location Services",
      description: "Allow location access for safety features",
      component: "location"
    },
    {
      title: "Test Your Setup",
      description: "Verify everything is working correctly",
      component: "test"
    }
  ];

  const handleDeviceConnect = () => {
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setCurrentStep(1);
    }, 3000);
  };

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case "device":
        return (
          <div className="text-center">
            <div className="bg-blue-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Bluetooth className="h-10 w-10 text-blue-600" />
            </div>
            
            {!isConnecting ? (
              <>
                <Card className="p-6 mb-6 bg-gray-50">
                  <h3 className="font-semibold mb-3">Device Setup Instructions</h3>
                  <div className="text-left space-y-2 text-sm text-gray-600">
                    <div className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span>Press and hold the button on your SHEild device for 3 seconds</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span>Look for the blue blinking light</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span>Tap "Connect Device" below</span>
                    </div>
                  </div>
                </Card>
                
                <Button onClick={withHapticFeedback(handleDeviceConnect, 'medium')} className="w-full" size="lg">
                  <Bluetooth className="h-5 w-5 mr-2" />
                  Connect Device
                </Button>
              </>
            ) : (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <div className="text-center">
                  <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <h3 className="font-semibold text-blue-800 mb-2">Connecting...</h3>
                  <p className="text-sm text-blue-600">Pairing with your SHEild device</p>
                  <Progress value={66} className="mt-4" />
                </div>
              </Card>
            )}
          </div>
        );

      case "contacts":
        return (
          <div className="text-center">
            <div className="bg-green-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-10 w-10 text-green-600" />
            </div>
            
            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4">Emergency Contacts</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Emergency Services</p>
                      <p className="text-xs text-gray-500">911</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Default</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Sarah (Sister)</p>
                      <p className="text-xs text-gray-500">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Added</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="text-left">
                      <p className="font-medium text-sm">Mom</p>
                      <p className="text-xs text-gray-500">+1 (555) 987-6543</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700">Added</Badge>
                </div>
              </div>
            </Card>
            
            <Button onClick={withHapticFeedback(() => setCurrentStep(2), 'medium')} className="w-full" size="lg">
              Continue
            </Button>
          </div>
        );

      case "location":
        return (
          <div className="text-center">
            <div className="bg-purple-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <MapPin className="h-10 w-10 text-purple-600" />
            </div>
            
            <Card className="p-6 mb-6 bg-purple-50 border-purple-200">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Location Services Enabled</h3>
              </div>
              <p className="text-sm text-purple-700 mb-4">
                Your location will be shared with emergency contacts only when an alert is triggered.
              </p>
              <div className="text-left space-y-2 text-sm text-purple-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Precise GPS tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Indoor location detection</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  <span>Real-time location updates</span>
                </div>
              </div>
            </Card>
            
            <Button onClick={withHapticFeedback(() => setCurrentStep(3), 'medium')} className="w-full" size="lg">
              Continue
            </Button>
          </div>
        );

      case "test":
        return (
          <div className="text-center">
            <div className="bg-red-100 p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <Shield className="h-10 w-10 text-red-600" />
            </div>
            
            <Card className="p-6 mb-6">
              <h3 className="font-semibold mb-4 text-green-800">Setup Complete!</h3>
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Device paired successfully</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Emergency contacts configured</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Location services enabled</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-yellow-800">Safety Reminder</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This is a prototype demonstration. In a real emergency, always call 911 directly.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            <Button onClick={withHapticFeedback(onComplete, 'heavy')} className="w-full bg-green-600 hover:bg-green-700" size="lg">
              <Shield className="h-5 w-5 mr-2" />
              Enter SHEild Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-semibold text-gray-800">SHEild Setup</h1>
        </div>
        
        {/* Progress */}
        <div className="max-w-sm mx-auto">
          <Progress value={(currentStep / (steps.length - 1)) * 100} className="mb-2" />
          <p className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>
      </div>

      {/* Current Step */}
      <div className="max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm text-gray-600">
            {steps[currentStep].description}
          </p>
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
}