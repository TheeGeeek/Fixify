import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ProblemInputProps {
  onSubmit: (problem: string) => void;
  isLoading: boolean;
}

export default function ProblemInput({ onSubmit, isLoading }: ProblemInputProps) {
  const [problem, setProblem] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      onSubmit(problem.trim());
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        What's the issue you're experiencing?
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your problem in simple terms (e.g., 'My laptop is running very slowly' or 'I can't connect to WiFi')"
            className="w-full p-4 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            rows={4}
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={!problem.trim() || isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Getting solutions...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Get Help
            </>
          )}
        </button>
      </form>
    </div>
  );
}