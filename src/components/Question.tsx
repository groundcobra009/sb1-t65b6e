import React from 'react';
import type { Question as QuestionType } from '../types';

interface QuestionProps {
  question: QuestionType;
  onAnswer: (answer: string) => void;
}

export function Question({ question, onAnswer }: QuestionProps) {
  return (
    <div className="w-full max-w-2xl">
      <h3 className="text-xl font-semibold mb-6">{question.text}</h3>
      <div className="space-y-4">
        <button
          onClick={() => onAnswer("はい")}
          className="w-full p-4 text-left border rounded-lg hover:bg-blue-50 transition-colors"
        >
          はい
        </button>
        <button
          onClick={() => onAnswer("いいえ")}
          className="w-full p-4 text-left border rounded-lg hover:bg-blue-50 transition-colors"
        >
          いいえ
        </button>
      </div>
    </div>
  );
}