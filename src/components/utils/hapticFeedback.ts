// Haptic feedback simulation for button presses
export const triggerHapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'error' = 'medium') => {
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  try {
    // Create visual feedback
    const feedbackElement = document.createElement('div');
    feedbackElement.className = `fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 rounded-full text-white text-sm font-medium transition-all duration-300 ${
      type === 'error' ? 'bg-red-500' : 
      type === 'heavy' ? 'bg-purple-500' : 
      type === 'medium' ? 'bg-blue-500' : 'bg-green-500'
    }`;
    
    const messages = {
      light: '◦',
      medium: '◉',
      heavy: '●●●',
      error: '⚠'
    };
    
    feedbackElement.textContent = messages[type];
    feedbackElement.style.opacity = '0';
    feedbackElement.style.transform = 'translate(-50%, -20px)';
    
    document.body.appendChild(feedbackElement);
    
    // Animate in
    requestAnimationFrame(() => {
      feedbackElement.style.opacity = '1';
      feedbackElement.style.transform = 'translate(-50%, 0)';
    });
    
    // Remove after animation
    setTimeout(() => {
      if (feedbackElement.parentNode) {
        feedbackElement.style.opacity = '0';
        feedbackElement.style.transform = 'translate(-50%, -20px)';
        setTimeout(() => {
          if (feedbackElement.parentNode) {
            document.body.removeChild(feedbackElement);
          }
        }, 300);
      }
    }, 1000);
    
    // Try to trigger actual haptic feedback if available
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [50],
        heavy: [100, 50, 100],
        error: [200, 100, 200, 100, 200]
      };
      navigator.vibrate(patterns[type]);
    }
  } catch (error) {
    // Silently fail if DOM manipulation fails
    console.warn('Haptic feedback failed:', error);
  }
};

// Enhanced button component with haptic feedback
export const withHapticFeedback = (onClick: () => void, hapticType: 'light' | 'medium' | 'heavy' | 'error' = 'medium') => {
  return () => {
    triggerHapticFeedback(hapticType);
    onClick();
  };
};