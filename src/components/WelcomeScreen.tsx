import { Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { withHapticFeedback } from "./utils/hapticFeedback";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 flex flex-col items-center justify-center p-6">
      {/* Logo and Brand */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg">
          <Shield className="h-12 w-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          SHEild
        </h1>
        <p className="text-lg text-gray-600">
          Your Personal Safety Companion
        </p>
      </div>

      {/* Welcome Message */}
      <Card className="p-6 mb-8 max-w-sm w-full text-center bg-white/80 backdrop-blur-sm border-purple-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Welcome to SHEild
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Experience the future of personal safety with our innovative wearable technology and smart app integration.
        </p>
      </Card>

      {/* Key Features Preview */}
      <div className="grid grid-cols-1 gap-3 mb-8 w-full max-w-sm">
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Real-time health monitoring</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
          <span>Instant emergency alerts</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          <span>Smart deterrent technology</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-700">
          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
          <span>Live location sharing</span>
        </div>
      </div>

      {/* Get Started Button */}
      <Button 
        onClick={withHapticFeedback(onGetStarted, 'medium')}
        className="w-full max-w-sm h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
        size="lg"
      >
        Get Started
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>

      {/* Footer */}
      <p className="text-xs text-gray-500 mt-8 text-center">
        This is a prototype demonstration<br />
        of the SHEild safety wearable system
      </p>
    </div>
  );
}