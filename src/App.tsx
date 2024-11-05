import React, { useState } from 'react';
import OpenAI from 'openai';
import { Brain } from 'lucide-react';
import { ApiKeyInput } from './components/ApiKeyInput';
import { Question } from './components/Question';
import { Result } from './components/Result';
import type { Question as QuestionType, Answer, MBTIResult } from './types';

const questions: QuestionType[] = [
  { id: 1, text: "新しい環境や状況に置かれたとき、すぐに適応できる方だ" },
  { id: 2, text: "グループでの活動よりも、一人で作業する方が好きだ" },
  { id: 3, text: "物事を決める際、感情よりも論理的な判断を重視する" },
  { id: 4, text: "計画を立てて行動するよりも、その場の状況に応じて柔軟に対応する方が好きだ" },
  // 必要に応じて質問を追加
];

function App() {
  const [apiKey, setApiKey] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<MBTIResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleStart = () => {
    setCurrentStep(1);
  };

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, { questionId: questions[currentStep - 1].id, answer }];
    setAnswers(newAnswers);

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setLoading(true);
      try {
        const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
        
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "あなたはMBTI診断の専門家です。ユーザーの回答から最適なMBTIタイプを判定し、その特徴を説明してください。"
            },
            {
              role: "user",
              content: `以下の質問への回答からMBTIタイプを判定してください：${JSON.stringify(newAnswers)}`
            }
          ]
        });

        const mbtiResult = response.choices[0].message.content;
        // Note: 実際のプロダクションでは、より構造化されたレスポンスを使用すべきです
        setResult({
          type: "INFJ", // APIレスポンスからパースすべき
          description: mbtiResult || "分析的で洞察力のある理想主義者",
          strengths: ["共感力が高い", "創造的", "決断力がある"],
          weaknesses: ["完璧主義", "批判に敏感", "人と距離を置きがち"]
        });
      } catch (error) {
        console.error('Error:', error);
        alert('エラーが発生しました。もう一度お試しください。');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
    setApiKey('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex flex-col items-center mb-8">
          <Brain className="text-blue-600 mb-4" size={48} />
          <h1 className="text-3xl font-bold text-center text-gray-800">
            MBTI パーソナリティ診断
          </h1>
          <p className="text-gray-600 text-center mt-2">
            あなたの性格タイプを AI が分析します
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">分析中...</p>
          </div>
        ) : currentStep === 0 ? (
          <ApiKeyInput
            apiKey={apiKey}
            setApiKey={setApiKey}
            onSubmit={handleStart}
          />
        ) : result ? (
          <Result result={result} onRestart={handleRestart} />
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full mb-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                      進捗
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {Math.round((currentStep / questions.length) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${(currentStep / questions.length) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600 transition-all duration-500"
                  ></div>
                </div>
              </div>
            </div>
            <Question
              question={questions[currentStep - 1]}
              onAnswer={handleAnswer}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;