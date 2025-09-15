import { Crown, X, Check, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { withHapticFeedback } from './utils/hapticFeedback';
import { usePremium } from './utils/premiumContext';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  featureTitle: string;
  featureDescription: string;
  featureIcon: React.ComponentType<{ className?: string }>;
}

export function PaywallModal({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  featureTitle, 
  featureDescription, 
  featureIcon: FeatureIcon 
}: PaywallModalProps) {
  const { startTrial } = usePremium();

  const handleStartTrial = () => {
    startTrial();
    onClose();
  };

  const handleUpgrade = () => {
    onUpgrade();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm mx-auto bg-white rounded-2xl border-0 shadow-2xl">
        <DialogHeader className="text-center pb-0">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-teal-100 to-pink-100 rounded-xl">
              <FeatureIcon className="h-6 w-6 text-teal-600" />
            </div>
            <div className="p-2 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg">
              <Crown className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <DialogTitle className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-pink-100 px-3 py-1 rounded-full mb-2">
              <Sparkles className="h-3 w-3 text-teal-600" />
              <span className="text-xs font-medium text-teal-700">Premium Feature</span>
            </div>
            <h3 className="font-semibold text-gray-800">{featureTitle}</h3>
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
            {featureDescription}
          </p>
          
          {/* Premium Benefits */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
              <div className="w-5 h-5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-gray-700">Access to all premium safety features</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-gray-700">24/7 AI-powered protection</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
              <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shrink-0">
                <Check className="h-3 w-3 text-white" />
              </div>
              <span className="text-sm text-gray-700">7-day free trial included</span>
            </div>
          </div>

          {/* Trial Badge */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl mb-6 text-center">
            <Badge className="bg-green-500 text-white mb-2">
              Free Trial
            </Badge>
            <p className="text-sm text-green-700 font-medium">
              Try all premium features free for 7 days
            </p>
            <p className="text-xs text-green-600 mt-1">
              Cancel anytime, no commitment
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-pink-600 rounded-xl blur-lg opacity-75"></div>
              <Button 
                onClick={withHapticFeedback(handleStartTrial, 'heavy')}
                className="relative w-full h-12 bg-gradient-to-r from-teal-600 to-pink-600 hover:from-teal-700 hover:to-pink-700 text-white rounded-xl shadow-xl border-0"
                size="lg"
              >
                <Crown className="h-4 w-4 mr-2" />
                <span className="font-semibold">Start Free Trial</span>
              </Button>
            </div>
            
            <Button 
              onClick={withHapticFeedback(onClose, 'light')}
              variant="ghost"
              className="w-full text-gray-500 hover:text-gray-700"
            >
              Maybe Later
            </Button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}