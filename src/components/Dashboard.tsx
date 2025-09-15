import { Heart, MapPin, Shield, Wifi, AlertTriangle, Volume2, VolumeX, Navigation, Phone, Crown } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { withHapticFeedback } from "./utils/hapticFeedback";
import { VoiceCommands } from "./utils/voiceCommands";
import { LocationMap } from "./utils/LocationMap";
import { PremiumBadge } from "./PremiumBadge";
import { usePremium } from "./utils/premiumContext";
import { useState } from "react";

interface DashboardProps {
  onPanicPress: () => void;
  onSafeRoute: () => void;
  onFakeCall: () => void;
  onPremiumUpgrade?: () => void;
  onSubscriptionStatus?: () => void;
}

export function Dashboard({ onPanicPress, onSafeRoute, onFakeCall, onPremiumUpgrade, onSubscriptionStatus }: DashboardProps) {
  const [silentMode, setSilentMode] = useState(false);
  const { isPremium, isTrialActive } = usePremium();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-pink-50 p-4">
      {/* Voice Commands */}
      <VoiceCommands 
        onEmergency={onPanicPress}
        onHelp={onPanicPress}
        isListening={true}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-teal-500 to-pink-500 rounded-xl">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <h1 className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent font-semibold">SHEild</h1>
            <PremiumBadge size="sm" variant="icon" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1">
            <Wifi className="h-3 w-3 mr-1" />
            Connected
          </Badge>
          {(isPremium || isTrialActive) && onSubscriptionStatus && (
            <Button
              variant="ghost"
              size="sm"
              onClick={withHapticFeedback(onSubscriptionStatus, 'light')}
              className="p-2"
            >
              <PremiumBadge size="sm" variant="minimal" />
            </Button>
          )}
        </div>
      </div>

      {/* Silent/Loud Mode Toggle */}
      <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full transition-colors ${silentMode ? 'bg-blue-100' : 'bg-orange-100'}`}>
              {silentMode ? (
                <VolumeX className="h-5 w-5 text-blue-600" />
              ) : (
                <Volume2 className="h-5 w-5 text-orange-600" />
              )}
            </div>
            <div>
              <p className="font-medium">{silentMode ? 'Silent Mode' : 'Loud Mode'}</p>
              <p className="text-sm text-gray-500">
                {silentMode ? 'Location shared quietly' : 'Audio deterrent active'}
              </p>
            </div>
          </div>
          <Switch 
            checked={silentMode}
            onCheckedChange={setSilentMode}
            className="data-[state=checked]:bg-blue-500"
          />
        </div>
      </Card>

      {/* Status Cards */}
      <div className="space-y-4 mb-8">
        {/* Wearable Connection */}
        <Card className="p-5 bg-white/80 backdrop-blur-sm shadow-sm border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Wearable Device</p>
                <p className="text-sm text-gray-500">Connected & Active</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <Badge className="bg-emerald-100 text-emerald-700 text-xs px-2">ACTIVE</Badge>
            </div>
          </div>
        </Card>

        {/* Heart Rate */}
        <Card className="p-5 bg-white/80 backdrop-blur-sm shadow-sm border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl">
                <Heart className="h-6 w-6 text-rose-600 animate-pulse" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Heart Rate</p>
                <p className="text-sm text-gray-500">Normal Range</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-rose-600">72</span>
              <p className="text-xs text-gray-500">BPM</p>
            </div>
          </div>
        </Card>

        {/* Location with Enhanced Details */}
        <Card className="p-5 bg-white/80 backdrop-blur-sm shadow-sm border-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Location Tracking</p>
                <p className="text-sm text-gray-500">GPS Active • High Accuracy</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <Badge className="bg-blue-100 text-blue-700 text-xs px-2">LIVE</Badge>
            </div>
          </div>
          <LocationMap showFullDetails={false} isLive={true} />
        </Card>
      </div>

      {/* Emergency Contacts */}
      <Card className="p-5 mb-8 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <h3 className="font-semibold text-gray-800 mb-4">Emergency Contacts</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="font-medium">Emergency Services</span>
            </div>
            <Badge className="bg-red-100 text-red-700 text-xs">911</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Sarah (Sister)</span>
            </div>
            <Badge className="bg-green-100 text-green-700 text-xs">ACTIVE</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="font-medium">Mom</span>
            </div>
            <Badge className="bg-green-100 text-green-700 text-xs">ACTIVE</Badge>
          </div>
        </div>
      </Card>

      {/* Safe Route Navigation */}
      <Card className="p-5 mb-24 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <Button
            onClick={withHapticFeedback(onSafeRoute, 'medium')}
            className="w-full h-14 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white shadow-lg border-0 justify-start"
            size="lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Navigation className="h-5 w-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Start Safe Route</p>
                <p className="text-sm text-white/80">Get guided navigation home</p>
              </div>
            </div>
          </Button>
          
          <Button
            onClick={withHapticFeedback(onFakeCall, 'medium')}
            className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg border-0 justify-start"
            size="lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              <div className="text-left flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">Fake Call</p>
                  {!isPremium && !isTrialActive && <PremiumBadge size="sm" variant="icon" />}
                </div>
                <p className="text-sm text-white/80">Exit situations discretely</p>
              </div>
            </div>
          </Button>

          {!isPremium && !isTrialActive && onPremiumUpgrade && (
            <Button
              onClick={withHapticFeedback(onPremiumUpgrade, 'medium')}
              className="w-full h-14 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-lg border-0 justify-start"
              size="lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Crown className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-semibold">Go Premium</p>
                  <p className="text-sm text-white/80">Unlock advanced safety features</p>
                </div>
              </div>
            </Button>
          )}
        </div>
      </Card>

      {/* Emergency Panic Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
          <Button 
            onClick={withHapticFeedback(onPanicPress, 'heavy')}
            className="relative w-full h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl shadow-xl border-2 border-red-500 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <AlertTriangle className="h-6 w-6 mr-3 animate-bounce" />
            <span className="font-bold tracking-wide">EMERGENCY</span>
          </Button>
        </div>
      </div>
    </div>
  );
}