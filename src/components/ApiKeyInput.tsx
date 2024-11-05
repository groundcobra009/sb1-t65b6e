import React from 'react';
import { KeyRound } from 'lucide-react';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  onSubmit: () => void;
}

export function ApiKeyInput({ apiKey, setApiKey, onSubmit }: ApiKeyInputProps) {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="OpenAI APIキーを入力"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={onSubmit}
        disabled={!apiKey}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        診断を開始
      </button>
      <p className="mt-2 text-sm text-gray-600 text-center">
        ※APIキーは安全に処理され、診断以外の目的では使用されません
      </p>
    </div>
  );
}