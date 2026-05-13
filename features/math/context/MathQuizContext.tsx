import { Question } from '@/services/types/question.types';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface QuizResult {
  isCorrect: boolean;
  finalScore: number;
}

interface MathQuizContextType {
  questions: Question[];
  userAnswers: Record<number, Record<number, string>>;
  userConnections: Record<number, { from: number, to: number }[]>;
  results: Record<number, QuizResult>;
  setQuestions: (qs: Question[]) => void;
  updateAnswer: (questionId: number, shapeId: number, value: string) => void;
  updateConnections: (questionId: number, connections: { from: number, to: number }[]) => void;
  submitQuiz: (calculateScoreFn: (q: Question, answers: Record<number, string>, conns: { from: number, to: number }[]) => QuizResult) => void;
  resetQuiz: () => void;
}

const MathQuizContext = createContext<MathQuizContextType | undefined>(undefined);

export const MathQuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, Record<number, string>>>({});
  const [userConnections, setUserConnections] = useState<Record<number, { from: number, to: number }[]>>({});
  const [results, setResults] = useState<Record<number, QuizResult>>({});

  const updateAnswer = (questionId: number, shapeId: number, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {}),
        [shapeId]: value
      }
    }));
  };

  const updateConnections = (questionId: number, connections: { from: number, to: number }[] = []) => {
    const safeConnections = connections || [];
    setUserConnections(prev => {
      // Tránh update nếu dữ liệu không thay đổi để ngăn loop render
      if (JSON.stringify(prev[questionId]) === JSON.stringify(safeConnections)) return prev;
      return {
        ...prev,
        [questionId]: safeConnections
      };
    });
  };

  const submitQuiz = (calculateScoreFn: (q: Question, answers: Record<number, string>, conns: { from: number, to: number }[]) => QuizResult) => {
    const newResults: Record<number, QuizResult> = {};
    questions.forEach(q => {
      newResults[q.id] = calculateScoreFn(q, userAnswers[q.id] || {}, userConnections[q.id] || []);
    });
    setResults(newResults);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setUserConnections({});
    setResults({});
  };

  return (
    <MathQuizContext.Provider value={{
      questions,
      userAnswers,
      userConnections,
      results,
      setQuestions,
      updateAnswer,
      updateConnections,
      submitQuiz,
      resetQuiz
    }}>
      {children}
    </MathQuizContext.Provider>
  );
};

export const useMathQuiz = () => {
  const context = useContext(MathQuizContext);
  if (!context) {
    throw new Error('useMathQuiz must be used within a MathQuizProvider');
  }
  return context;
};
