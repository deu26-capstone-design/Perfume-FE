import { useState, useEffect } from 'react';
import { questions as localQuestions } from './questions';
import type { AccordKey, TestAnswers, TestResult } from './types';
import {
  getQuestions,
  getProgress,
  saveProgress,
  submitTest,
  type ApiQuestion,
  type OptionKey,
} from '../api/scentTestApi';

const OPTION_KEYS: OptionKey[] = ['A', 'B', 'C', 'D'];

const indexToKey = (index: number): OptionKey => OPTION_KEYS[index];
const keyToIndex = (key: OptionKey): number => OPTION_KEYS.indexOf(key);

const toApiAnswers = (answers: TestAnswers): Record<string, OptionKey> =>
  Object.fromEntries(Object.entries(answers).map(([qId, idx]) => [qId, indexToKey(idx)]));

const fromApiAnswers = (apiAnswers: Record<string, OptionKey>): TestAnswers =>
  Object.fromEntries(
    Object.entries(apiAnswers).map(([qId, key]) => [Number(qId), keyToIndex(key)]),
  );

export const useScentTest = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<TestAnswers>({});
  const [isTestLoading, setIsTestLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [apiQuestions, setApiQuestions] = useState<ApiQuestion[] | null>(null);

  const displayQuestions = apiQuestions
    ? apiQuestions.map((aq, i) => {
        const local = localQuestions[i];
        return {
          ...local,
          question: aq.question,
          answers: local.answers.map((a, j) => ({
            ...a,
            text: aq.options[OPTION_KEYS[j]] ?? a.text,
          })),
        };
      })
    : localQuestions;

  useEffect(() => {
    let cancelled = false;

    Promise.all([getQuestions(), getProgress()])
      .then(([questionsRes, progressRes]) => {
        if (cancelled) return;

        setApiQuestions(questionsRes.data);

        const { testCompleted, answers: savedAnswers } = progressRes.data;

        if (testCompleted) {
          setIsComplete(true);
          return;
        }

        if (Object.keys(savedAnswers).length > 0) {
          const restored = fromApiAnswers(savedAnswers);
          setAnswers(restored);
          setCurrentIndex(Math.min(Object.keys(savedAnswers).length, localQuestions.length - 1));
        }
      })
      .catch(() => {
        // 로드 실패 시 로컬 질문으로 처음부터 시작
      })
      .finally(() => {
        if (!cancelled) setIsTestLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const currentQuestion = displayQuestions[currentIndex];
  const isLast = currentIndex === displayQuestions.length - 1;

  const selectAnswer = (answerIndex: number) => {
    const next: TestAnswers = { ...answers, [currentQuestion.id]: answerIndex };
    setAnswers(next);

    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      saveProgress(toApiAnswers(next)).catch(() => {});
      return;
    }

    // 마지막 문항: 제출
    if (Object.keys(next).length === displayQuestions.length) {
      setIsSubmitting(true);
      submitTest(toApiAnswers(next))
        .catch((err) => {
          // 409: 이미 완료된 테스트도 완료 처리
          if (err?.response?.status !== 409) throw err;
        })
        .finally(() => {
          setIsSubmitting(false);
          setIsComplete(true);
        });
    }
  };

  const goBack = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const getResult = (): TestResult[] => {
    const scores: Partial<Record<AccordKey, number>> = {};
    localQuestions.forEach((q) => {
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
    totalCount: displayQuestions.length,
    answers,
    isLast,
    isComplete,
    isTestLoading,
    isSubmitting,
    selectAnswer,
    goBack,
    getResult,
  };
};
