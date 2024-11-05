import React from 'react';
import { Brain } from 'lucide-react';
import type { MBTIResult } from '../types';

interface ResultProps {
  result: MBTIResult;
  onRestart: () => void;
}

export function Result({ result, onRestart }: ResultProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <Brain className="text-blue-600" size={48} />
      </div>
      <h2 className="text-3xl font-bold text-center mb-2">
        あなたのパーソナリティタイプは
      </h2>
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        {result.type}
      </h1>
      <p className="text-gray-700 mb-8 text-center leading-relaxed">
        {result.description}
      </p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-3">長所</h3>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            {result.strengths.map((strength, index) => (
              <li key={index}>{strength}</li>
            ))}
          </ul>
        </div>
        
        <div className="bg-red-50 p-6 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-3">短所</h3>
          <ul className="list-disc list-inside space-y-2 text-red-700">
            {result.weaknesses.map((weakness, index) => (
              <li key={index}>{weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        もう一度診断する
      </button>
    </div>
  );
}