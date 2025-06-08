import React from 'react';
import { Wrench, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Fixify
              <Sparkles className="w-5 h-5 text-blue-500" />
            </h1>
            <p className="text-gray-600 text-sm">Your friendly AI tech support assistant</p>
          </div>
        </div>
      </div>
    </header>
  );
}