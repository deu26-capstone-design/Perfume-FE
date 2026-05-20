import { useState } from 'react';
import { questions } from './questions';
import type { AccordKey, TestAnswers, TestResult } from './types';

export const useScentTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswers>({});

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isComplete = Object.keys(answers).length === questions.length;

  const selectAnswer = (answerIndex: number) => {
    const next = { ...answers, [currentQuestion.id]: answerIndex };
    setAnswers(next);
    if (!isLast) setCurrentIndex((i) => i + 1);
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const getResult = (): TestResult[] => {
    const scores: Partial<Record<AccordKey, number>> = {};

    questions.forEach((q) => {
      const answerIndex = answers[q.id];
      if (answerIndex == null) return;
      const weights = q.answers[answerIndex].weights;
      Object.entries(weights).forEach(([accord, weight]) => {
        const key = accord as AccordKey;
        scores[key] = (scores[key] ?? 0) + weight;
      });
    });

    return (Object.entries(scores) as [AccordKey, number][])
      .map(([accord, score]) => ({ accord, score }))
      .sort((a, b) => b.score - a.score);
  };

  return {
    currentQuestion,
    currentIndex,
    totalCount: questions.length,
    answers,
    isLast,
    isComplete,
    selectAnswer,
    goBack,
    getResult,
  };
};
