import React, { useState } from 'react';
import Header from './components/Header';
import ProblemInput from './components/ProblemInput';
import QuickHelp from './components/QuickHelp';
import Solution from './components/Solution';
import LocationModal from './components/LocationModal';
import { generateSolution } from './utils/solutions';

interface ConversationEntry {
  problem: string;
  solution: string;
  timestamp: Date;
}

function App() {
  const [currentProblem, setCurrentProblem] = useState<string>('');
  const [currentSolution, setCurrentSolution] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleProblemSubmit = async (problem: string) => {
    setIsLoading(true);
    setCurrentProblem(problem);
    
    // Simulate AI thinking time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const solution = generateSolution(problem, conversationHistory);
    setCurrentSolution(solution);
    
    // Add to conversation history
    const newEntry: ConversationEntry = {
      problem,
      solution,
      timestamp: new Date()
    };
    setConversationHistory(prev => [...prev, newEntry]);
    
    // Check if solution mentions repair centers and we don't have location
    if (solution.includes('service center near me') && !userLocation) {
      setShowLocationModal(true);
    }
    
    setIsLoading(false);
  };

  const handleQuickSelect = (problem: string) => {
    handleProblemSubmit(problem);
  };

  const handleNewProblem = () => {
    setCurrentProblem('');
    setCurrentSolution('');
  };

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setShowLocationModal(false);
        },
        (error) => {
          console.error('Location access denied:', error);
          setShowLocationModal(false);
        }
      );
    } else {
      console.error('Geolocation not supported');
      setShowLocationModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-8">
        {!currentSolution ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Get Tech Help in Simple Steps
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Describe your computer, phone, or internet problem and I'll provide clear, 
                step-by-step solutions that anyone can follow.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <ProblemInput onSubmit={handleProblemSubmit} isLoading={isLoading} />
              <QuickHelp onSelectProblem={handleQuickSelect} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <button
              onClick={handleNewProblem}
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 transition-colors duration-200"
            >
              ← Ask about a different problem
            </button>
            
            <Solution 
              problem={currentProblem} 
              solution={currentSolution}
              userLocation={userLocation}
              conversationHistory={conversationHistory}
            />
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Need Help with Something Else?
              </h3>
              <button
                onClick={handleNewProblem}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200"
              >
                Ask Another Question
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Fixify - Your friendly AI tech support assistant
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Making technology simple for everyone, one step at a time.
            </p>
            <p className="text-xs text-gray-400">
              Built with Bolt.new 🚀
            </p>
          </div>
        </div>
      </footer>

      {/* Location Modal */}
      {showLocationModal && (
        <LocationModal
          onAllow={handleLocationAccess}
          onDeny={() => setShowLocationModal(false)}
        />
      )}
    </div>
  );
}

export default App;