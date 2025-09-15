import { useState, useEffect } from 'react';
import { Phone, ArrowLeft, Clock, User, PhoneCall, X, Volume2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { withHapticFeedback } from './utils/hapticFeedback';
import { VoiceCommands } from './utils/voiceCommands';
import { PaywallModal } from './PaywallModal';
import { usePremium } from './utils/premiumContext';

interface FakeCallScreenProps {
  onBack: () => void;
  onEmergency: () => void;
  onUpgrade?: () => void;
}

export function FakeCallScreen({ onBack, onEmergency, onUpgrade }: FakeCallScreenProps) {
  const [selectedCaller, setSelectedCaller] = useState('Mom');
  const [customName, setCustomName] = useState('');
  const [selectedTimer, setSelectedTimer] = useState(10);
  const [isCallActive, setIsCallActive] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const { checkFeatureAccess } = usePremium();

  const callerOptions = [
    { value: 'Mom', label: 'Mom', emoji: '👩‍💼' },
    { value: 'Dad', label: 'Dad', emoji: '👨‍💼' },
    { value: 'Boss', label: 'Boss', emoji: '💼' },
    { value: 'Sister', label: 'Sister', emoji: '👭' },
    { value: 'Police', label: 'Police', emoji: '👮‍♀️' },
    { value: 'Doctor', label: 'Doctor', emoji: '👩‍⚕️' },
    { value: 'custom', label: 'Custom', emoji: '👤' }
  ];

  const timerOptions = [
    { value: 10, label: '10 seconds' },
    { value: 30, label: '30 seconds' },
    { value: 60, label: '1 minute' },
    { value: 300, label: '5 minutes' }
  ];

  const getCurrentCaller = () => {
    if (selectedCaller === 'custom') {
      return customName || 'Unknown';
    }
    return selectedCaller;
  };

  const getCurrentEmoji = () => {
    const caller = callerOptions.find(c => c.value === selectedCaller);
    return caller?.emoji || '👤';
  };

  const startFakeCall = () => {
    if (!checkFeatureAccess('fake-call-generator')) {
      setShowPaywall(true);
      return;
    }
    setIsCallActive(true);
    setCountdown(selectedTimer);
  };

  const cancelFakeCall = () => {
    setIsCallActive(false);
    setShowIncomingCall(false);
    setCountdown(0);
  };

  const answerCall = () => {
    setShowIncomingCall(false);
    // In a real app, this would show a call interface
    setTimeout(() => {
      setIsCallActive(false);
    }, 2000);
  };

  const declineCall = () => {
    setShowIncomingCall(false);
    setIsCallActive(false);
  };

  // Countdown timer
  useEffect(() => {
    if (isCallActive && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isCallActive && countdown === 0) {
      setShowIncomingCall(true);
    }
  }, [isCallActive, countdown]);

  // Incoming Call UI
  if (showIncomingCall) {
    return (
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black"></div>
        
        {/* Caller Avatar */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
          <div className="mb-8">
            <div className="w-32 h-32 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center text-6xl animate-pulse">
              {getCurrentEmoji()}
            </div>
          </div>
          
          {/* Caller Info */}
          <div className="text-center mb-4">
            <h2 className="text-3xl font-light text-white mb-2">{getCurrentCaller()}</h2>
            <p className="text-lg text-gray-300">calling...</p>
          </div>
          
          {/* Ringtone Animation */}
          <div className="mb-12">
            <div className="flex items-center gap-2 animate-pulse">
              <Volume2 className="h-5 w-5 text-gray-400" />
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-gray-400 rounded animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-6 bg-gray-400 rounded animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-4 bg-gray-400 rounded animate-bounce" style={{ animationDelay: '300ms' }}></div>
                <div className="w-1 h-6 bg-gray-400 rounded animate-bounce" style={{ animationDelay: '450ms' }}></div>
                <div className="w-1 h-4 bg-gray-400 rounded animate-bounce" style={{ animationDelay: '600ms' }}></div>
              </div>
            </div>
          </div>
          
          {/* Call Actions */}
          <div className="flex items-center justify-between w-full max-w-xs">
            {/* Decline */}
            <button
              onClick={declineCall}
              className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform active:scale-95 transition-transform"
            >
              <X className="h-8 w-8 text-white" />
            </button>
            
            {/* Answer */}
            <button
              onClick={answerCall}
              className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg transform active:scale-95 transition-transform animate-pulse"
            >
              <Phone className="h-8 w-8 text-white" />
            </button>
          </div>
          
          {/* Bottom hint */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-sm text-gray-500">Swipe up for more options</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-pink-50 p-4">
      {/* Voice Commands */}
      <VoiceCommands 
        onEmergency={onEmergency}
        onHelp={() => {}}
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
            <Phone className="h-5 w-5 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent font-semibold">Fake Call</h1>
        </div>
        <div className="w-16" /> {/* Spacer for centering */}
      </div>

      {/* Instructions */}
      <Card className="p-4 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Phone className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Safety Feature</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Use this to get out of unsafe situations without raising suspicion. Set up a fake incoming call that will appear realistic to help you exit uncomfortable scenarios.
            </p>
          </div>
        </div>
      </Card>

      {/* Caller Selection */}
      <Card className="p-5 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">Choose Caller</h3>
        </div>
        
        <Select value={selectedCaller} onValueChange={setSelectedCaller}>
          <SelectTrigger className="w-full">
            <SelectValue>
              <div className="flex items-center gap-2">
                <span>{getCurrentEmoji()}</span>
                <span>{selectedCaller === 'custom' ? 'Custom' : selectedCaller}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {callerOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                <div className="flex items-center gap-2">
                  <span>{option.emoji}</span>
                  <span>{option.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCaller === 'custom' && (
          <div className="mt-4">
            <Label htmlFor="customName" className="text-sm text-gray-600">Custom Name</Label>
            <Input
              id="customName"
              type="text"
              placeholder="Enter caller name..."
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="mt-1"
            />
          </div>
        )}
      </Card>

      {/* Timer Selection */}
      <Card className="p-5 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">Call Timer</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {timerOptions.map((option) => (
            <Button
              key={option.value}
              variant={selectedTimer === option.value ? "default" : "outline"}
              onClick={() => setSelectedTimer(option.value)}
              className={selectedTimer === option.value ? 
                "bg-gradient-to-r from-teal-500 to-cyan-500 text-white" : 
                "border-gray-200 hover:bg-gray-50"
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-5 mb-8 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <h3 className="font-semibold text-gray-800 mb-4">Call Preview</h3>
        
        <div className="bg-gradient-to-b from-gray-900 to-black rounded-2xl p-6 text-white min-h-48 flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center text-2xl mb-4">
            {getCurrentEmoji()}
          </div>
          <h4 className="font-medium text-lg mb-1">{getCurrentCaller()}</h4>
          <p className="text-sm text-gray-400 mb-4">calling...</p>
          
          <div className="flex items-center gap-2 mb-6">
            <Volume2 className="h-4 w-4 text-gray-400" />
            <div className="flex gap-1">
              <div className="w-1 h-3 bg-gray-400 rounded"></div>
              <div className="w-1 h-4 bg-gray-400 rounded"></div>
              <div className="w-1 h-3 bg-gray-400 rounded"></div>
              <div className="w-1 h-4 bg-gray-400 rounded"></div>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <X className="h-6 w-6" />
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Phone className="h-6 w-6" />
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      {!isCallActive ? (
        <div className="space-y-4 mb-24">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl blur-lg opacity-75"></div>
            <Button 
              onClick={withHapticFeedback(startFakeCall, 'heavy')}
              className="relative w-full h-16 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white rounded-2xl shadow-xl border-0 transition-all duration-200 transform hover:scale-105"
              size="lg"
            >
              <PhoneCall className="h-6 w-6 mr-3" />
              <span className="font-bold tracking-wide">START FAKE CALL</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 mb-24">
          {/* Countdown Display */}
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="h-6 w-6 text-orange-600 animate-pulse" />
              <h3 className="font-semibold text-orange-800">Fake Call Starting...</h3>
            </div>
            <div className="text-3xl font-bold text-orange-700 mb-2">{countdown}s</div>
            <p className="text-sm text-orange-600">Get ready to receive your call</p>
          </Card>
          
          {/* Cancel Button */}
          <Button 
            onClick={withHapticFeedback(cancelFakeCall, 'medium')}
            variant="outline"
            className="w-full h-14 border-2 border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-gray-50"
            size="lg"
          >
            <X className="h-5 w-5 mr-2" />
            <span className="font-semibold">CANCEL CALL</span>
          </Button>
        </div>
      )}

      {/* Emergency Button */}
      <div className="fixed bottom-6 left-4 right-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
          <Button 
            onClick={withHapticFeedback(onEmergency, 'heavy')}
            className="relative w-full h-16 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl shadow-xl border-2 border-red-500 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Phone className="h-6 w-6 mr-3 animate-bounce" />
            <span className="font-bold tracking-wide">REAL EMERGENCY</span>
          </Button>
        </div>
      </div>

      {/* Paywall Modal */}
      <PaywallModal
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        onUpgrade={() => {
          setShowPaywall(false);
          if (onUpgrade) onUpgrade();
        }}
        featureTitle="Fake Call Generator"
        featureDescription="Create realistic incoming calls to help you exit unsafe situations discretely. Choose custom callers, set timers, and maintain your safety without raising suspicion."
        featureIcon={Phone}
      />
    </div>
  );
}