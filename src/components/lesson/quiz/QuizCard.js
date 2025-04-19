'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function QuizCard({ question, options, correctAnswer, onAnswer, disabled, image }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    if (disabled) return;
    setSelected(option);
    onAnswer(option === correctAnswer);
  };

  const getStyle = (option) => {
    if (!disabled) return '';
    if (option === correctAnswer) return 'border-green-500';
    if (option === selected && option !== correctAnswer) return 'border-red-500';
    return 'opacity-60';
  };

  const isValidImage = (url) => {
    if (!url) return false;
    return url.startsWith('http') && /\.(jpg|jpeg|png|webp|svg)$/.test(url.toLowerCase());
  };

  return (
    <div className="max-w-3xl mx-auto bg-[#EDEDED] p-6 rounded-2xl shadow-md">
      {/* Question */}
      <h4 className="text-lg font-semibold text-[var(--text-dark)] mb-6 text-center leading-relaxed">
        {question || 'No question provided'}
      </h4>

      {/* Image Block (always shows something) */}
      <div className="mb-6 flex flex-col items-center">
        <span className="text-sm text-gray-500 mb-2">Image reference</span>
        <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
          <Image
            src={isValidImage(image) ? image : '/placeholder.jpg'}
            alt={question || 'Quiz illustration'}
            width={192}
            height={192}
            className="object-contain rounded-xl"
          />
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-4">
        {options?.map((option, index) => (
          <div key={`${option}-${index}`} className="w-full max-w-xs mx-auto">
            <button
              onClick={() => handleSelect(option)}
              disabled={disabled}
              aria-disabled={disabled}
              className={`w-full py-2 px-4 rounded-full bg-[var(--accent-yellow)] text-[var(--text-dark)] font-medium transition-all hover:brightness-105 border-2 ${getStyle(option)} ${selected === option ? 'ring-2 ring-black/30' : ''}`}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
