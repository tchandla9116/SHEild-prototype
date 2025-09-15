import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PremiumContextType {
  isPremium: boolean;
  trialDaysLeft: number;
  isTrialActive: boolean;
  hasTrialExpired: boolean;
  startTrial: () => void;
  upgradeToPremium: () => void;
  checkFeatureAccess: (feature: string) => boolean;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

interface PremiumProviderProps {
  children: ReactNode;
}

export function PremiumProvider({ children }: PremiumProviderProps) {
  const [isPremium, setIsPremium] = useState(false);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [hasTrialExpired, setHasTrialExpired] = useState(false);

  const startTrial = () => {
    setIsTrialActive(true);
    setTrialDaysLeft(7);
    setHasTrialExpired(false);
  };

  const upgradeToPremium = () => {
    setIsPremium(true);
    setIsTrialActive(false);
    setHasTrialExpired(false);
  };

  const checkFeatureAccess = (feature: string): boolean => {
    const premiumFeatures = [
      'advanced-route-prediction',
      'virtual-guardian',
      'cloud-storage',
      'fake-call-generator'
    ];
    
    if (!premiumFeatures.includes(feature)) {
      return true; // Free feature
    }
    
    return isPremium || isTrialActive;
  };

  return (
    <PremiumContext.Provider value={{
      isPremium,
      trialDaysLeft,
      isTrialActive,
      hasTrialExpired,
      startTrial,
      upgradeToPremium,
      checkFeatureAccess
    }}>
      {children}
    </PremiumContext.Provider>
  );
}

export function usePremium() {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
}