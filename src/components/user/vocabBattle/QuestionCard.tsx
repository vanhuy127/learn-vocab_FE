import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useSocketStore } from '@/store';
import { Option } from '@/types';

const QuestionCard = () => {
  const { question, socket, totalQuestions } = useSocketStore();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    setSelectedAnswer(null);
  }, [question?.id]);

  if (!question) return null;

  const submitAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    socket?.emit('battle:answer', { answer });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border-2 border-indigo-500/50 bg-slate-900 p-8 text-white shadow-[0_0_20px_rgba(79,70,229,0.2)]"
    >
      <h2 className="mb-8 bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-center text-2xl font-bold text-transparent">
        Câu {question.position + 1}/{totalQuestions}: {question.questionText}
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {question.options.map((opt: Option, index) => {
          const isSelected = selectedAnswer === opt.label;

          return (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              key={opt.label}
              onClick={() => submitAnswer(opt.label)}
              className={cn(
                'group relative flex items-center overflow-hidden rounded-2xl border border-slate-700 bg-slate-800/50 p-4 transition-all duration-300 hover:border-indigo-500',
                isSelected && 'border-indigo-500 bg-slate-800',
              )}
            >
              <span
                className={cn(
                  'mr-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700 text-sm font-bold transition-colors group-hover:bg-indigo-600',
                  isSelected && 'bg-indigo-600',
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-lg font-medium tracking-wide">{opt.text}</span>

              <div
                className={cn(
                  'absolute inset-0 bg-linear-to-r from-indigo-500/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100',
                  isSelected && 'opacity-100',
                )}
              />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuestionCard;
