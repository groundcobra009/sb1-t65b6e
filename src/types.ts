export interface Question {
  id: number;
  text: string;
}

export interface Answer {
  questionId: number;
  answer: string;
}

export interface MBTIResult {
  type: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
}