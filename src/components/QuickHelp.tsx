import React from 'react';
import { Wifi, Laptop, Smartphone, Monitor, Volume2, Settings } from 'lucide-react';

interface QuickHelpProps {
  onSelectProblem: (problem: string) => void;
}

const commonProblems = [
  {
    icon: Wifi,
    title: "WiFi Connection Issues",
    problem: "I can't connect to WiFi",
    color: "bg-blue-50 text-blue-600"
  },
  {
    icon: Laptop,
    title: "Slow Computer",
    problem: "My laptop is running very slowly",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Smartphone,
    title: "Phone Problems",
    problem: "My phone keeps freezing and crashing",
    color: "bg-purple-50 text-purple-600"
  },
  {
    icon: Monitor,
    title: "Display Issues",
    problem: "My screen is flickering or has strange colors",
    color: "bg-orange-50 text-orange-600"
  },
  {
    icon: Volume2,
    title: "Audio Problems",
    problem: "I have no sound coming from my speakers",
    color: "bg-red-50 text-red-600"
  },
  {
    icon: Settings,
    title: "Software Issues",
    problem: "A program won't open or keeps crashing",
    color: "bg-indigo-50 text-indigo-600"
  }
];

export default function QuickHelp({ onSelectProblem }: QuickHelpProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Quick Help - Common Issues
      </h2>
      <p className="text-gray-600 mb-6">
        Click on any of these common problems to get instant help:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {commonProblems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => onSelectProblem(item.problem)}
              className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className={`w-10 h-10 rounded-lg ${item.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-medium text-gray-900 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.problem}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}