import { useState, useEffect, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Badge } from '../ui/badge';

interface VoiceCommandsProps {
  onEmergency?: () => void;
  onCancel?: () => void;
  onHelp?: () => void;
  onHome?: () => void;
  isListening?: boolean;
}

export function VoiceCommands({ onEmergency, onCancel, onHelp, onHome, isListening = true }: VoiceCommandsProps) {
  const [isActive, setIsActive] = useState(false);
  const [lastCommand, setLastCommand] = useState<string>('');
  const [confidence, setConfidence] = useState(0);

  // Simulate voice recognition
  const simulateVoiceRecognition = useCallback(() => {
    if (!isListening || !isActive) return;

    try {
      // Simulate random voice command detection
      const commands = [
        { text: 'emergency', action: onEmergency, confidence: 0.95 },
        { text: 'help me', action: onHelp, confidence: 0.92 },
        { text: 'cancel', action: onCancel, confidence: 0.88 },
        { text: 'go home', action: onHome, confidence: 0.90 },
      ].filter(cmd => cmd.action); // Only include commands with valid actions

      // Randomly trigger command detection (for demo purposes)
      if (Math.random() > 0.98 && commands.length > 0) { // 2% chance per check
        const randomCommand = commands[Math.floor(Math.random() * commands.length)];
        if (randomCommand && randomCommand.action) {
          setLastCommand(randomCommand.text);
          setConfidence(randomCommand.confidence);
          
          // Execute command after brief delay
          setTimeout(() => {
            try {
              randomCommand.action!();
              setLastCommand('');
            } catch (error) {
              console.warn('Voice command execution failed:', error);
              setLastCommand('');
            }
          }, 1500);
        }
      }
    } catch (error) {
      console.warn('Voice recognition simulation failed:', error);
    }
  }, [isListening, isActive, onEmergency, onCancel, onHelp, onHome]);

  useEffect(() => {
    if (!isListening) return;

    const interval = setInterval(simulateVoiceRecognition, 100);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [simulateVoiceRecognition, isListening]);

  if (!isListening) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex flex-col items-end gap-2">
        {/* Voice Status Indicator */}
        <Badge 
          className={`flex items-center gap-2 cursor-pointer ${
            isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <Mic className="h-3 w-3 animate-pulse" />
          ) : (
            <MicOff className="h-3 w-3" />
          )}
          <span className="text-xs">Voice {isActive ? 'On' : 'Off'}</span>
        </Badge>

        {/* Command Detection */}
        {lastCommand && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-2 min-w-32">
            <div className="text-xs text-green-800 font-medium">
              Heard: "{lastCommand}"
            </div>
            <div className="text-xs text-green-600">
              {Math.round(confidence * 100)}% confidence
            </div>
          </div>
        )}

        {/* Available Commands */}
        {isActive && !lastCommand && (
          <div className="bg-white border border-gray-200 rounded-lg p-2 shadow-lg max-w-40">
            <div className="text-xs font-medium text-gray-700 mb-1">Say:</div>
            <div className="space-y-0.5 text-xs text-gray-600">
              {onEmergency && <div>• "Emergency"</div>}
              {onHelp && <div>• "Help me"</div>}
              {onCancel && <div>• "Cancel"</div>}
              {onHome && <div>• "Go home"</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Hook for voice commands
export function useVoiceCommands(commands: VoiceCommandsProps) {
  return <VoiceCommands {...commands} />;
}