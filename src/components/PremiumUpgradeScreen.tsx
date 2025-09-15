import { useState } from 'react';
import { ArrowLeft, Shield, Phone, Route, Bot, Cloud, Check, Crown, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { withHapticFeedback } from './utils/hapticFeedback';
import { usePremium } from './utils/premiumContext';

interface PremiumUpgradeScreenProps {
  onBack: () => void;
  onStartTrial: () => void;
}

export function PremiumUpgradeScreen({ onBack, onStartTrial }: PremiumUpgradeScreenProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { isPremium, isTrialActive } = usePremium();

  const premiumFeatures = [
    {
      icon: Phone,
      title: 'Fake Call Generator',
      description: 'Escape unsafe situations with realistic incoming calls',
      color: 'from-purple-100 to-pink-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: Route,
      title: 'Advanced Route Prediction',
      description: 'AI suggests safest real-time paths based on live data',
      color: 'from-blue-100 to-cyan-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Bot,
      title: '24/7 Virtual Guardian',
      description: 'AI monitors inactivity and suspicious movement patterns',
      color: 'from-green-100 to-emerald-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Cloud,
      title: 'Cloud Storage',
      description: 'Emergency audio clips stored securely for up to 30 days',
      color: 'from-orange-100 to-yellow-100',
      iconColor: 'text-orange-600'
    }
  ];

  const handleStartTrial = () => {
    onStartTrial();
    onBack();
  };

  if (isPremium || isTrialActive) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-pink-50 p-4">
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
          <Badge className="bg-gradient-to-r from-teal-100 to-pink-100 text-teal-700 border-teal-200">
            <Crown className="h-3 w-3 mr-1" />
            {isPremium ? 'Premium Active' : 'Trial Active'}
          </Badge>
        </div>

        {/* Success Message */}
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-12 w-12 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent font-bold mb-4">
            You're Protected!
          </h1>
          <p className="text-gray-600 max-w-sm mx-auto">
            {isPremium 
              ? 'Enjoy full access to all premium safety features.'
              : `Your free trial is active. Enjoy premium features for ${7} more days.`
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-pink-50 p-4">
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
            <Crown className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-pink-100 px-4 py-2 rounded-full mb-4">
          <Sparkles className="h-4 w-4 text-teal-600" />
          <span className="text-sm font-medium text-teal-700">Premium Safety</span>
        </div>
        <h1 className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent font-bold mb-3">
          Go Premium, Stay Safer
        </h1>
        <p className="text-gray-600 max-w-sm mx-auto">
          Unlock advanced AI-powered safety features designed to keep you protected in any situation.
        </p>
      </div>

      {/* Features List */}
      <div className="space-y-4 mb-8">
        {premiumFeatures.map((feature, index) => (
          <Card key={index} className="p-5 bg-white/80 backdrop-blur-sm shadow-sm border-0">
            <div className="flex items-start gap-4">
              <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-xl shrink-0`}>
                <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
              <div className="shrink-0">
                <div className="w-6 h-6 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pricing Section */}
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="text-center mb-6">
          <h3 className="font-semibold text-gray-800 mb-2">Choose Your Plan</h3>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isYearly ? 'font-medium text-gray-800' : 'text-gray-500'}`}>Monthly</span>
            <Switch 
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-teal-500 data-[state=checked]:to-pink-500"
            />
            <span className={`text-sm ${isYearly ? 'font-medium text-gray-800' : 'text-gray-500'}`}>Yearly</span>
            {isYearly && (
              <Badge className="bg-green-100 text-green-700 text-xs">Save 40%</Badge>
            )}
          </div>
        </div>

        <div className="text-center">
          <div className="mb-4">
            <span className="text-3xl font-bold text-gray-800">
              ${isYearly ? '71.99' : '9.99'}
            </span>
            <span className="text-gray-500 ml-1">
              /{isYearly ? 'year' : 'month'}
            </span>
          </div>
          {isYearly && (
            <p className="text-sm text-gray-500 mb-4">
              Just $5.99/month • Billed annually
            </p>
          )}
        </div>
      </Card>

      {/* Trial Badge */}
      <Card className="p-4 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="font-medium text-green-700">7-Day Free Trial</span>
        </div>
        <p className="text-sm text-green-600 text-center mt-1">
          Try all premium features risk-free
        </p>
      </Card>

      {/* CTA Button */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-pink-600 rounded-2xl blur-lg opacity-75"></div>
          <Button 
            onClick={withHapticFeedback(handleStartTrial, 'heavy')}
            className="relative w-full h-16 bg-gradient-to-r from-teal-600 to-pink-600 hover:from-teal-700 hover:to-pink-700 text-white rounded-2xl shadow-xl border-0 transition-all duration-200 transform hover:scale-105"
            size="lg"
          >
            <Crown className="h-6 w-6 mr-3" />
            <span className="font-bold tracking-wide">START FREE TRIAL</span>
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Cancel anytime during trial. After trial, subscription continues at regular price unless cancelled.
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-3 gap-4 text-center text-xs text-gray-500 mb-8">
        <div className="flex flex-col items-center gap-1">
          <Shield className="h-4 w-4 text-gray-400" />
          <span>Secure Payment</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Check className="h-4 w-4 text-gray-400" />
          <span>Cancel Anytime</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Crown className="h-4 w-4 text-gray-400" />
          <span>Premium Support</span>
        </div>
      </div>
    </div>
  );
}