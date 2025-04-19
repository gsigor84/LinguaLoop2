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

  return (
    <div className="max-w-3xl mx-auto bg-[#EDEDED] p-6 rounded-2xl shadow-md">
      {/* Question Text */}
      <h4 className="text-lg font-semibold text-[var(--text-dark)] mb-4 text-center">
        {question || "No question provided"}
      </h4>

      {/* Optional Image */}
      {image && (
        <div className="mb-6 flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">Image reference</span>
          <Image
            src={image}
            alt={question || "Quiz illustration"}
            width={192}
            height={192}
            className="object-contain rounded-xl shadow"
          />
        </div>
      )}

      {/* Options */}
      <div className="flex flex-col gap-4">
        {options && options.map((option, index) => (
          <div key={`${option}-${index}`} className="w-full max-w-sm mx-auto">
            <button
              onClick={() => handleSelect(option)}
              disabled={disabled}
              aria-disabled={disabled}
              className={`w-full py-2 px-4 rounded-full bg-[var(--accent-yellow)] text-[var(--text-dark)] font-medium transition-all duration-150 hover:brightness-105 border-2 ${getStyle(option)} ${selected === option ? 'ring-2 ring-black/30' : ''
                }`}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
