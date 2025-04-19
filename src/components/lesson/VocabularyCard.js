'use client';

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import Image from 'next/image';

export default function VocabularyCard({ word, translation, image, language }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = () => {
    if (typeof window === 'undefined') return;

    const utterance = new SpeechSynthesisUtterance(translation);
    utterance.lang = getLanguageCode(language);
    setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const getLanguageCode = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'spanish': return 'es-ES';
      case 'french': return 'fr-FR';
      case 'german': return 'de-DE';
      case 'italian': return 'it-IT';
      case 'japanese': return 'ja-JP';
      default: return 'en-US';
    }
  };

  return (
    <div
      className="flex flex-col items-center text-center rounded-3xl p-5 transition duration-300"
      style={{ backgroundColor: '#EDEDED' }}
    >
      {/* Image with soft shadow */}
      <div className="relative w-24 h-24 mb-4 rounded-xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <Image
          src={image || '/placeholder.jpg'}
          alt={word}
          fill
          className="object-cover"
        />
      </div>

      {/* Translation (target language) */}
      <span className="text-lg font-bold text-[var(--text-dark)] mb-1">
        {translation}
      </span>

      {/* English word (reference) */}
      <span className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full uppercase tracking-wide">
        {word}
      </span>

      {/* Speaker button */}
      <button
        onClick={speak}
        disabled={isPlaying}
        aria-disabled={isPlaying}
        className="mt-3 bg-[var(--accent-yellow)] hover:bg-[#FBE073] text-[var(--text-dark)] p-2 rounded-full transition"
        title="Hear pronunciation"
      >
        <Volume2 size={20} strokeWidth={2.25} />
      </button>
    </div>
  );
}
