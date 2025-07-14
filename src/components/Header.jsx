import React from 'react';
import { MapPin, Wifi, WifiOff } from 'lucide-react';

const Header = ({ locationData, networkInfo, isProcessing }) => {
  const getNetworkStatusColor = () => {
    if (!networkInfo.isOnline) return 'text-red-600';
    if (networkInfo.effectiveType === '4g') return 'text-green-600';
    if (networkInfo.effectiveType === '3g') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">FinanceTracker Pro</h1>
            <p className="text-sm text-gray-600 mt-1">Smart Bill Management & Analytics</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">{locationData.city}, {locationData.country}</span>
            </div>
            <div className="flex items-center space-x-2">
              {networkInfo.isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              <span className={`text-sm font-medium ${getNetworkStatusColor()}`}>
                {networkInfo.isOnline ? `${networkInfo.effectiveType?.toUpperCase()}` : 'Offline'}
              </span>
            </div>
            {isProcessing && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600">Processing...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
