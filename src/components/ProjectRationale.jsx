import React, { useState } from 'react';
import { Lightbulb, Brain, Code, ChartBar, Wifi, MapPin, Layers } from 'lucide-react';

const ProjectRationale = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8 border border-gray-200">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
          Project Rationale & Problem Statement
        </h2>
        <button className="text-blue-600 font-medium">
          {expanded ? 'Show Less' : 'Read More'}
        </button>
      </div>

      {expanded && (
        <div className="mt-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-blue-800 mb-2 flex items-center">
              <Brain className="w-5 h-5 mr-2" />
              The Problem
            </h3>
            <p className="text-gray-700">
              As a college student, I often struggled with managing my monthly expenses, bills, and subscriptions. 
              The challenges I faced included:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Forgetting due dates for various bills and subscriptions</li>
              <li>No clear visibility of spending patterns</li>
              <li>Difficulty tracking shared expenses with roommates</li>
              <li>Lack of financial awareness leading to poor spending decisions</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-green-800 mb-2 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              The Solution
            </h3>
            <p className="text-gray-700">
              I built <span className="font-semibold">FinanceTracker+</span> - an intelligent bill management system that helps users:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-700">
              <li>Track and manage all bills and subscriptions in one place</li>
              <li>Get reminders for upcoming due dates</li>
              <li>Visualize spending patterns with analytics</li>
              <li>Make informed financial decisions</li>
            </ul>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg text-purple-800 mb-2 flex items-center">
              <ChartBar className="w-5 h-5 mr-2" />
              Web APIs Used
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              <div className="flex items-start p-3 bg-white rounded border border-gray-200">
                <Wifi className="w-5 h-5 mt-0.5 mr-2 text-blue-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Network Information API</h4>
                  <p className="text-sm text-gray-600">Optimizes data usage by adjusting UI/UX based on network conditions</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-white rounded border border-gray-200">
                <MapPin className="w-5 h-5 mt-0.5 mr-2 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Geolocation API</h4>
                  <p className="text-sm text-gray-600">Provides location-based insights and currency/language preferences</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-white rounded border border-gray-200">
                <Layers className="w-5 h-5 mt-0.5 mr-2 text-purple-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Background Tasks API</h4>
                  <p className="text-sm text-gray-600">Ensures smooth performance by offloading non-critical tasks</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-white rounded border border-gray-200">
                <svg className="w-5 h-5 mt-0.5 mr-2 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <div>
                  <h4 className="font-medium">Intersection Observer API</h4>
                  <p className="text-sm text-gray-600">Implements lazy loading and performance optimizations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectRationale;
