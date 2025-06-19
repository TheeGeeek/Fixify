import React, { useState, useEffect } from 'react';
import { Lightbulb, Navigation, ExternalLink, Volume2, MapPin, HelpCircle, VolumeX } from 'lucide-react';
import { readAloudWithWebSpeech, stopSpeech } from '../utils/speech';

interface ConversationEntry {
  problem: string;
  solution: string;
  timestamp: Date;
}

interface SolutionProps {
  problem: string;
  solution: string;
  userLocation?: { lat: number; lng: number } | null;
  conversationHistory?: ConversationEntry[];
}

export default function Solution({ problem, solution, userLocation, conversationHistory }: SolutionProps) {
  const [isSpeaking, setIsSpeaking] = React.useState(false);

  // Cleanup speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const formatSolution = (text: string) => {
    const lines = text.split('\n');
    const formatted = [];
    let currentStep = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Check for step headers
      const stepMatch = line.match(/^([📱🔧⚠️💾🔄🔊🎵🖥️🎧🧹📍📶🚀⬆️🔍💡🔌🎨]+)\s*Step\s+(\d+):\s*(.+)/);
      if (stepMatch) {
        if (currentStep) {
          formatted.push(currentStep);
        }
        currentStep = {
          type: 'step',
          emoji: stepMatch[1],
          number: stepMatch[2],
          content: stepMatch[3],
          navigation: '',
          visualCue: '',
          officialLink: ''
        };
      }
      // Check for navigation paths
      else if (line.includes('📍 Navigation:')) {
        if (currentStep) {
          currentStep.navigation = line.replace('📍 Navigation:', '').trim();
        }
      }
      // Check for visual cues
      else if (line.includes('👀 What to look for:')) {
        if (currentStep) {
          currentStep.visualCue = line.replace('👀 What to look for:', '').trim();
        }
      }
      // Check for official links
      else if (line.includes('🔗 Official Guide:')) {
        if (currentStep) {
          currentStep.officialLink = line.replace('🔗 Official Guide:', '').trim();
        }
      }
      // Check for regular text content
      else if (line && !line.includes('📚 Official Resources:') && !stepMatch) {
        if (currentStep) {
          formatted.push(currentStep);
          currentStep = null;
        }
        formatted.push({
          type: 'text',
          content: line
        });
      }
    }

    if (currentStep) {
      formatted.push(currentStep);
    }

    return formatted;
  };

  const extractOfficialResources = (text: string) => {
    const resourcesMatch = text.match(/📚 Official Resources:([\s\S]*?)(?=\n\n|$)/);
    if (!resourcesMatch) return [];

    const resourcesText = resourcesMatch[1];
    const resourceLines = resourcesText.split('\n').filter(line => line.trim().startsWith('•'));
    
    return resourceLines.map(line => {
      const match = line.match(/• (.+?): \[(.+?)\]\((.+?)\)/);
      if (match) {
        return {
          platform: match[1],
          title: match[2],
          url: match[3]
        };
      }
      return null;
    }).filter(Boolean);
  };

  const formattedSolution = formatSolution(solution);
  const officialResources = extractOfficialResources(solution);
  const isHardwareIssue = solution.includes('hardware') || solution.includes('professional') || solution.includes('repair center');

  const handleVoiceRead = async () => {
    if (isSpeaking) {
      // Stop current speech
      stopSpeech();
      setIsSpeaking(false);
      return;
    }

    try {
      setIsSpeaking(true);
      // Clean the text for better speech synthesis
      const cleanedText = solution
        .replace(/[📱🔧⚠️💾🔄🔊🎵🖥️🎧🧹📍📶🚀⬆️🔍💡🔌🎨👀📍🔗📚•]/g, '')
        .replace(/\*\*/g, '')
        .replace(/Step \d+:/g, 'Step')
        .replace(/Navigation:/g, 'To navigate:')
        .replace(/What to look for:/g, 'Look for:')
        .replace(/Official Guide:/g, 'For more help, check the official guide.')
        .replace(/Official Resources:/g, 'Additional resources are available.')
        .trim();
      
      await readAloudWithWebSpeech(cleanedText);
    } catch (err) {
      console.error("Failed to read aloud:", err);
      alert("Sorry, text-to-speech is not available in your browser or an error occurred.");
    } finally {
      setIsSpeaking(false);
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
              <div key={index} className="border border-gray-200 rounded-xl p-5 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-semibold text-sm flex-shrink-0">
                    {item.number}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="font-semibold text-gray-900">Step {item.number}</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{item.content}</p>
                    
                    {item.navigation && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Navigation className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900 text-sm">Navigation Path:</span>
                        </div>
                        <p className="text-blue-800 text-sm font-mono">{item.navigation}</p>
                      </div>
                    )}
                    
                    {item.visualCue && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-green-600">👀</span>
                          <span className="font-medium text-green-900 text-sm">What to Look For:</span>
                        </div>
                        <p className="text-green-800 text-sm">{item.visualCue}</p>
                      </div>
                    )}
                    
                    {item.officialLink && (
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <ExternalLink className="w-4 h-4 text-purple-600" />
                          <a 
                            href={item.officialLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium text-purple-900 text-sm hover:text-purple-700 transition-colors"
                          >
                            Official Guide
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          } else {
            const isWarning = item.content.includes('⚠️') || item.content.includes('Important:');
            const isAdditionalHelp = item.content.includes('💡') || item.content.includes('Additional Help:');
            
            return (
              <div key={index} className={`text-gray-700 leading-relaxed p-4 rounded-lg ${
                isWarning ? 'bg-orange-50 border border-orange-200 font-medium text-orange-900' :
                isAdditionalHelp ? 'bg-blue-50 border border-blue-200 text-blue-900' :
                'bg-gray-50'
              }`}>
                {item.content}
              </div>
            );
          }
        })}
      </div>

      {/* Official Resources */}
      {officialResources.length > 0 && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-xl border border-indigo-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">📚</span>
            <span className="font-semibold text-indigo-900">Official Resources</span>
          </div>
          <div className="space-y-2">
            {officialResources.map((resource, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm font-medium text-indigo-700 min-w-[80px]">{resource.platform}:</span>
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors flex items-center gap-1"
                >
                  {resource.title}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Reading Option */}
      <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isSpeaking ? (
              <VolumeX className="w-5 h-5 text-blue-600" />
            ) : (
              <Volume2 className="w-5 h-5 text-blue-600" />
            )}
            <span className="font-medium text-blue-900">Voice Assistant</span>
          </div>
          <button
            onClick={handleVoiceRead}
            className={`${
              isSpeaking 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-200`}
          >
            {isSpeaking ? 'Stop Reading' : 'Read Aloud'}
          </button>
        </div>
        <p className="text-blue-800 text-sm mt-2">
          {isSpeaking 
            ? 'Click "Stop Reading" to pause the voice assistant.'
            : 'Click "Read Aloud" to have these instructions spoken to you step by step using your browser\'s built-in voice.'
          }
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