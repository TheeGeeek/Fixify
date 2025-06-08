import React from 'react';
import { CheckCircle, AlertCircle, HelpCircle, Lightbulb, Volume2, MapPin } from 'lucide-react';

interface ConversationEntry {
  problem: string;
  solution: string;
  timestamp: Date;
}

interface SolutionProps {
  problem: string;
  solution: string;
  userLocation?: {lat: number, lng: number} | null;
  conversationHistory?: ConversationEntry[];
}

export default function Solution({ problem, solution, userLocation, conversationHistory }: SolutionProps) {
  const formatSolution = (text: string) => {
    // Split by numbered steps
    const parts = text.split(/(\d+\.)/);
    const formatted = [];
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (/^\d+\.$/.test(part)) {
        // This is a step number
        const stepContent = parts[i + 1];
        if (stepContent) {
          // Extract emoji and content
          const emojiMatch = stepContent.match(/^[\s]*([^\s\w]+)[\s]*(.*)/);
          if (emojiMatch) {
            formatted.push({
              type: 'step',
              number: part.replace('.', ''),
              emoji: emojiMatch[1],
              content: emojiMatch[2]
            });
          } else {
            formatted.push({
              type: 'step',
              number: part.replace('.', ''),
              emoji: '📋',
              content: stepContent
            });
          }
          i++; // Skip the next part as we've already processed it
        }
      } else if (part.trim() && !(/^\d+\.$/.test(parts[i - 1]))) {
        // This is regular text (diagnosis or encouragement)
        formatted.push({
          type: 'text',
          content: part.trim()
        });
      }
    }
    
    return formatted;
  };

  const formattedSolution = formatSolution(solution);
  const isHardwareIssue = solution.includes('hardware') || solution.includes('professional') || solution.includes('repair center');

  const handleVoiceRead = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(solution.replace(/[📱🔧⚠️💾🔄🔊🎵🖥️🎧🧹📍📶🚀⬆️🔍💡]/g, ''));
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const findRepairCenters = () => {
    const deviceBrand = problem.toLowerCase().includes('iphone') || problem.toLowerCase().includes('apple') ? 'Apple' :
                       problem.toLowerCase().includes('samsung') ? 'Samsung' :
                       problem.toLowerCase().includes('dell') ? 'Dell' :
                       problem.toLowerCase().includes('hp') ? 'HP' :
                       problem.toLowerCase().includes('lenovo') ? 'Lenovo' : 'computer';
    
    if (userLocation) {
      window.open(`https://www.google.com/maps/search/${deviceBrand}+service+center/@${userLocation.lat},${userLocation.lng},15z`, '_blank');
    } else {
      window.open(`https://www.google.com/search?q=${deviceBrand}+service+center+near+me`, '_blank');
    }
  };

  // Check for conversation context
  const hasRelatedHistory = conversationHistory && conversationHistory.length > 0;
  const contextualNote = hasRelatedHistory ? 
    "Based on our previous conversation, here's what I recommend:" : "";

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-start gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
          <Lightbulb className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Solution for:</h2>
          <p className="text-gray-700 italic">"{problem}"</p>
          {contextualNote && (
            <p className="text-sm text-blue-600 mt-1">{contextualNote}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {formattedSolution.map((item, index) => {
          if (item.type === 'step') {
            return (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-semibold text-sm">
                  {item.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="font-medium text-gray-900">Step {item.number}</span>
                  </div>
                  <p className="text-gray-700">{item.content}</p>
                </div>
              </div>
            );
          } else {
            const isWarning = item.content.includes('hardware') || item.content.includes('professional') || item.content.includes('serious');
            return (
              <div key={index} className={`text-gray-700 leading-relaxed ${isWarning ? 'font-medium' : ''}`}>
                {item.content}
              </div>
            );
          }
        })}
      </div>

      {/* Voice Reading Option */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">Voice Assistant</span>
          </div>
          <button
            onClick={handleVoiceRead}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200"
          >
            Read Aloud
          </button>
        </div>
        <p className="text-blue-800 text-sm mt-2">
          Click "Read Aloud" to have these instructions spoken to you step by step.
        </p>
      </div>

      {/* Repair Center Finder */}
      {isHardwareIssue && (
        <div className="mt-4 p-4 bg-orange-50 rounded-xl border border-orange-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <span className="font-medium text-orange-900">Find Repair Centers</span>
            </div>
            <button
              onClick={findRepairCenters}
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200"
            >
              Find Nearby
            </button>
          </div>
          <p className="text-orange-800 text-sm mt-2">
            {userLocation ? 
              "Click to find authorized repair centers near your location." :
              "Click to search for authorized repair centers in your area."
            }
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-green-600" />
          <span className="font-medium text-green-900">Need More Help?</span>
        </div>
        <p className="text-green-800 text-sm">
          Let me know if this worked or if you need assistance with the next step! I remember our conversation and can provide follow-up help 😊
        </p>
      </div>
    </div>
  );
}