import { Shield, Crown } from 'lucide-react';
import { Badge } from './ui/badge';
import { usePremium } from './utils/premiumContext';

interface PremiumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon' | 'minimal';
}

export function PremiumBadge({ size = 'md', variant = 'full' }: PremiumBadgeProps) {
  const { isPremium, isTrialActive } = usePremium();

  if (!isPremium && !isTrialActive) {
    return null;
  }

  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4', 
    lg: 'h-5 w-5'
  };

  const badgeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base'
  };

  if (variant === 'icon') {
    return (
      <div className={`bg-gradient-to-r from-teal-500 to-pink-500 rounded-full p-1 ${
        size === 'sm' ? 'w-5 h-5' : size === 'md' ? 'w-6 h-6' : 'w-7 h-7'
      }`}>
        <div className="bg-white rounded-full w-full h-full flex items-center justify-center">
          <span className={`font-bold text-transparent bg-gradient-to-r from-teal-500 to-pink-500 bg-clip-text ${
            size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
          }`}>
            P+
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-1">
        <Shield className={`${sizeClasses[size]} text-teal-600`} />
        <span className={`font-medium text-teal-700 ${
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
        }`}>
          {isPremium ? 'P+' : 'Trial'}
        </span>
      </div>
    );
  }

  return (
    <Badge className={`bg-gradient-to-r from-teal-100 to-pink-100 text-teal-700 border-teal-200 ${badgeClasses[size]}`}>
      <Crown className={`${sizeClasses[size]} mr-1`} />
      {isPremium ? 'Premium' : 'Trial'}
    </Badge>
  );
}