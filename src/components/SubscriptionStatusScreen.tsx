import { useState } from 'react';
import { ArrowLeft, Crown, Calendar, Shield, Check, AlertCircle, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { withHapticFeedback } from './utils/hapticFeedback';
import { usePremium } from './utils/premiumContext';

interface SubscriptionStatusScreenProps {
  onBack: () => void;
  onUpgrade: () => void;
}

export function SubscriptionStatusScreen({ onBack, onUpgrade }: SubscriptionStatusScreenProps) {
  const [isYearly, setIsYearly] = useState(false);
  const { isPremium, isTrialActive, trialDaysLeft, hasTrialExpired, upgradeToPremium } = usePremium();
  
  const trialProgress = ((7 - trialDaysLeft) / 7) * 100;

  const handleUpgrade = () => {
    upgradeToPremium();
    onBack();
  };

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
          <h1 className="bg-gradient-to-r from-teal-600 to-pink-600 bg-clip-text text-transparent font-semibold">Subscription</h1>
        </div>
        <div className="w-16" /> {/* Spacer */}
      </div>

      {/* Current Status */}
      {isPremium && (
        <Card className="p-6 mb-6 bg-gradient-to-r from-teal-50 to-pink-50 border-teal-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="h-8 w-8 text-white" />
            </div>
            <Badge className="bg-gradient-to-r from-teal-500 to-pink-500 text-white mb-3">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium Active
            </Badge>
            <h3 className="font-semibold text-gray-800 mb-2">Full Protection Activated</h3>
            <p className="text-sm text-gray-600">
              You have access to all premium safety features
            </p>
          </div>
        </Card>
      )}

      {/* Trial Status */}
      {isTrialActive && !isPremium && (
        <Card className="p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <Badge className="bg-green-500 text-white mb-3">
              Free Trial Active
            </Badge>
            <h3 className="font-semibold text-gray-800 mb-2">
              Your Free Trial: {trialDaysLeft} Days Left
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Enjoying premium features? Upgrade to continue your protection.
            </p>
          </div>
          
          {/* Trial Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Trial Progress</span>
              <span>{7 - trialDaysLeft} of 7 days used</span>
            </div>
            <Progress value={trialProgress} className="h-2" />
          </div>
        </Card>
      )}

      {/* Trial Expired */}
      {hasTrialExpired && !isPremium && (
        <Card className="p-6 mb-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="h-8 w-8 text-white" />
            </div>
            <Badge className="bg-orange-500 text-white mb-3">
              Trial Expired
            </Badge>
            <h3 className="font-semibold text-gray-800 mb-2">
              Upgrade to Continue Premium Protection
            </h3>
            <p className="text-sm text-gray-600">
              Your trial has ended. Upgrade now to keep using premium safety features.
            </p>
          </div>
        </Card>
      )}

      {/* Premium Features Summary */}
      <Card className="p-5 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <h3 className="font-semibold text-gray-800 mb-4">Premium Features</h3>
        <div className="space-y-3">
          {[
            'Fake Call Generator',
            'Advanced Route Prediction',
            '24/7 Virtual Guardian',
            'Cloud Storage (30 days)'
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                isPremium || isTrialActive 
                  ? 'bg-gradient-to-r from-teal-500 to-pink-500' 
                  : 'bg-gray-200'
              }`}>
                <Check className={`h-3 w-3 ${
                  isPremium || isTrialActive ? 'text-white' : 'text-gray-400'
                }`} />
              </div>
              <span className={`text-sm ${
                isPremium || isTrialActive ? 'text-gray-700' : 'text-gray-400'
              }`}>
                {feature}
              </span>
              {!isPremium && !isTrialActive && (
                <Badge variant="outline" className="text-xs">Locked</Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Pricing Section (if not premium) */}
      {!isPremium && (
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
          <div className="text-center mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Upgrade to Premium</h3>
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

          <div className="text-center mb-6">
            <div className="mb-2">
              <span className="text-3xl font-bold text-gray-800">
                ${isYearly ? '71.99' : '9.99'}
              </span>
              <span className="text-gray-500 ml-1">
                /{isYearly ? 'year' : 'month'}
              </span>
            </div>
            {isYearly && (
              <p className="text-sm text-gray-500">
                Just $5.99/month • Billed annually
              </p>
            )}
          </div>

          {/* Upgrade Button */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-pink-600 rounded-2xl blur-lg opacity-75"></div>
            <Button 
              onClick={withHapticFeedback(handleUpgrade, 'heavy')}
              className="relative w-full h-14 bg-gradient-to-r from-teal-600 to-pink-600 hover:from-teal-700 hover:to-pink-700 text-white rounded-2xl shadow-xl border-0"
              size="lg"
            >
              <Crown className="h-5 w-5 mr-2" />
              <span className="font-bold">
                {hasTrialExpired ? 'Upgrade Now' : 'Start Premium'}
              </span>
            </Button>
          </div>
        </Card>
      )}

      {/* Current Plan Details */}
      <Card className="p-5 mb-6 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <h3 className="font-semibold text-gray-800 mb-4">Plan Details</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Current Plan</span>
            <span className="font-medium">
              {isPremium ? 'Premium' : isTrialActive ? 'Free Trial' : 'Free'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status</span>
            <Badge className={`text-xs ${
              isPremium 
                ? 'bg-green-100 text-green-700' 
                : isTrialActive 
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
            }`}>
              {isPremium ? 'Active' : isTrialActive ? 'Trial' : 'Free'}
            </Badge>
          </div>
          {isTrialActive && (
            <div className="flex justify-between">
              <span className="text-gray-600">Trial Ends</span>
              <span className="font-medium text-orange-600">
                In {trialDaysLeft} days
              </span>
            </div>
          )}
          {isPremium && (
            <div className="flex justify-between">
              <span className="text-gray-600">Next Billing</span>
              <span className="font-medium">Jan 15, 2025</span>
            </div>
          )}
        </div>
      </Card>

      {/* Support */}
      <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-sm border-0">
        <div className="text-center">
          <Shield className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <h4 className="font-medium text-gray-800 mb-1">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-3">
            Contact our support team for assistance with your subscription
          </p>
          <Button variant="outline" size="sm">
            Contact Support
          </Button>
        </div>
      </Card>
    </div>
  );
}