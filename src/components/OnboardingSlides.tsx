import { useState } from "react";
import { Shield, Heart, MapPin, Siren, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { withHapticFeedback } from "./utils/hapticFeedback";

interface OnboardingSlidesProps {
  onComplete: () => void;
}

export function OnboardingSlides({ onComplete }: OnboardingSlidesProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Shield,
      title: "Meet Your SHEild",
      subtitle: "Wearable Safety Technology",
      description: "SHEild is a discreet, lightweight wearable device that monitors your safety 24/7. Wear it as a bracelet, necklace, or clip it to your clothing.",
      features: [
        "Waterproof design",
        "5-day battery life",
        "Instant connectivity"
      ],
      bgColor: "from-purple-100 to-purple-50"
    },
    {
      icon: Heart,
      title: "Smart Health Monitoring",
      subtitle: "Always Watching Over You",
      description: "Advanced sensors continuously track your heart rate, movement patterns, and detect unusual activity that could indicate distress.",
      features: [
        "Heart rate monitoring",
        "Movement detection",
        "Fall detection"
      ],
      bgColor: "from-red-100 to-red-50"
    },
    {
      icon: MapPin,
      title: "Instant Location Sharing",
      subtitle: "Help Finds You Faster",
      description: "When an emergency is detected, your precise location is immediately shared with emergency services and your trusted contacts.",
      features: [
        "GPS tracking",
        "Indoor positioning",
        "Real-time updates"
      ],
      bgColor: "from-blue-100 to-blue-50"
    },
    {
      icon: Siren,
      title: "Smart Deterrent System",
      subtitle: "Powerful Protection",
      description: "The device can emit a loud deterrent sound and message to scare off potential threats while alerting people nearby.",
      features: [
        "120dB alarm",
        "Voice warnings",
        "Bright LED flash"
      ],
      bgColor: "from-orange-100 to-orange-50"
    },
    {
      icon: Users,
      title: "Emergency Network",
      subtitle: "Never Face Danger Alone",
      description: "Your emergency contacts receive instant notifications with your location, audio recordings, and live updates during an incident.",
      features: [
        "Instant notifications",
        "Live audio sharing",
        "Two-way communication"
      ],
      bgColor: "from-green-100 to-green-50"
    }
  ];

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b ${currentSlideData.bgColor} p-4 flex flex-col justify-between`}>
      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2 mb-6 pt-4">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 bg-gray-800' 
                : index < currentSlide 
                  ? 'w-2 bg-gray-600' 
                  : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Icon */}
        <div className="bg-white p-6 rounded-full w-20 h-20 mb-6 flex items-center justify-center shadow-lg">
          <Icon className="h-10 w-10 text-gray-700" />
        </div>

        {/* Title and Subtitle */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {currentSlideData.title}
          </h1>
          <p className="text-lg text-gray-600">
            {currentSlideData.subtitle}
          </p>
        </div>

        {/* Description */}
        <Card className="p-6 mb-6 max-w-sm w-full bg-white/90 backdrop-blur-sm">
          <p className="text-gray-700 leading-relaxed text-center mb-4">
            {currentSlideData.description}
          </p>
          
          {/* Features */}
          <div className="space-y-2">
            {currentSlideData.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-gray-500 rounded-full"></div>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Slide Counter */}
        <Badge variant="secondary" className="bg-white/80">
          {currentSlide + 1} of {slides.length}
        </Badge>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-6">
        <Button
          onClick={withHapticFeedback(prevSlide, 'light')}
          variant="outline"
          className={`${currentSlide === 0 ? 'invisible' : 'visible'}`}
          size="lg"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>

        <Button
          onClick={withHapticFeedback(nextSlide, 'medium')}
          className="bg-gray-800 hover:bg-gray-900 text-white"
          size="lg"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}