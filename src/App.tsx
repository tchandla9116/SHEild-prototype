import { useState } from "react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { OnboardingSlides } from "./components/OnboardingSlides";
import { SetupScreen } from "./components/SetupScreen";
import { Dashboard } from "./components/Dashboard";
import { SafeRouteScreen } from "./components/SafeRouteScreen";
import { FakeCallScreen } from "./components/FakeCallScreen";
import { PremiumUpgradeScreen } from "./components/PremiumUpgradeScreen";
import { SubscriptionStatusScreen } from "./components/SubscriptionStatusScreen";
import { AlertScreen } from "./components/AlertScreen";
import { EmergencyContactsScreen } from "./components/EmergencyContactsScreen";
import { DeterrentScreen } from "./components/DeterrentScreen";
import { ConfirmationScreen } from "./components/ConfirmationScreen";
import { PremiumProvider } from "./components/utils/premiumContext";

type ScreenType = "welcome" | "onboarding" | "setup" | "dashboard" | "safe-route" | "fake-call" | "premium-upgrade" | "subscription-status" | "alert" | "contacts" | "deterrent" | "confirmation";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>("welcome");

  const handleWelcomeComplete = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("setup");
  };

  const handleSetupComplete = () => {
    setCurrentScreen("dashboard");
  };

  const handlePanicPress = () => {
    setCurrentScreen("alert");
  };

  const handleSafeRouteAccess = () => {
    setCurrentScreen("safe-route");
  };

  const handleSafeRouteBack = () => {
    setCurrentScreen("dashboard");
  };

  const handleFakeCallAccess = () => {
    setCurrentScreen("fake-call");
  };

  const handleFakeCallBack = () => {
    setCurrentScreen("dashboard");
  };

  const handlePremiumUpgradeAccess = () => {
    setCurrentScreen("premium-upgrade");
  };

  const handleSubscriptionStatusAccess = () => {
    setCurrentScreen("subscription-status");
  };

  const handleStartTrial = () => {
    // Trial logic handled in context
  };

  const handleAlertCancel = () => {
    setCurrentScreen("dashboard");
  };

  const handleAlertConfirm = () => {
    setCurrentScreen("contacts");
  };

  const handleContactsNext = () => {
    setCurrentScreen("deterrent");
  };

  const handleDeterrentNext = () => {
    setCurrentScreen("confirmation");
  };

  const handleReturnHome = () => {
    setCurrentScreen("dashboard");
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "welcome":
        return <WelcomeScreen onGetStarted={handleWelcomeComplete} />;
      case "onboarding":
        return <OnboardingSlides onComplete={handleOnboardingComplete} />;
      case "setup":
        return <SetupScreen onComplete={handleSetupComplete} />;
      case "dashboard":
        return <Dashboard onPanicPress={handlePanicPress} onSafeRoute={handleSafeRouteAccess} onFakeCall={handleFakeCallAccess} onPremiumUpgrade={handlePremiumUpgradeAccess} onSubscriptionStatus={handleSubscriptionStatusAccess} />;
      case "safe-route":
        return <SafeRouteScreen onBack={handleSafeRouteBack} onEmergency={handlePanicPress} />;
      case "fake-call":
        return <FakeCallScreen onBack={handleFakeCallBack} onEmergency={handlePanicPress} onUpgrade={handlePremiumUpgradeAccess} />;
      case "alert":
        return <AlertScreen onCancel={handleAlertCancel} onConfirm={handleAlertConfirm} />;
      case "contacts":
        return <EmergencyContactsScreen onNext={handleContactsNext} />;
      case "deterrent":
        return <DeterrentScreen onNext={handleDeterrentNext} />;
      case "confirmation":
        return <ConfirmationScreen onReturnHome={handleReturnHome} />;
      case "premium-upgrade":
        return <PremiumUpgradeScreen onBack={handleReturnHome} onStartTrial={handleStartTrial} />;
      case "subscription-status":
        return <SubscriptionStatusScreen onBack={handleReturnHome} onUpgrade={handlePremiumUpgradeAccess} />;
      default:
        return <WelcomeScreen onGetStarted={handleWelcomeComplete} />;
    }
  };

  return (
    <PremiumProvider>
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {renderScreen()}
      </div>
    </PremiumProvider>
  );
}