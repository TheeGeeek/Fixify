import React from 'react';
import { MapPin, X } from 'lucide-react';

interface LocationModalProps {
  onAllow: () => void;
  onDeny: () => void;
}

export default function LocationModal({ onAllow, onDeny }: LocationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Find Nearby Repair Centers
            </h3>
          </div>
          <button
            onClick={onDeny}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          To help find the nearest authorized repair center, please allow location access. 
          This will help me provide you with specific repair shops in your area.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onAllow}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
          >
            Allow Location
          </button>
          <button
            onClick={onDeny}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200"
          >
            Not Now
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-3 text-center">
          Your location is only used to find nearby repair centers and is not stored.
        </p>
      </div>
    </div>
  );
}