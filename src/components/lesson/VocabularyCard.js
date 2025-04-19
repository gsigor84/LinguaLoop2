'use client';

import { useState } from 'react';
import { Volume2 } from 'lucide-react';
import Image from 'next/image';

export default function VocabularyCard({ word, translation, image, language }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    image?.startsWith('http') ? image : '/placeholder.jpg'
  );

  const speak = () => {
    if (typeof window === 'undefined') return;

    const utterance = new SpeechSynthesisUtterance(translation);
    utterance.lang = getLanguageCode(language);
    setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const getLanguageCode = (lang) => {
    switch (lang?.toLowerCase()) {
      case 'portuguese':
        return 'pt-PT';
      case 'spanish':
        return 'es-ES';
      case 'italian':
        return 'it-IT';
      case 'french':
        return 'fr-FR';
      case 'german':
        return 'de-DE';
      default:
        return 'en-US';
    }
  };

  return (
    <div
      className="flex flex-col items-center text-center rounded-3xl p-5 transition duration-300"
      style={{ backgroundColor: '#EDEDED' }}
    >
      {/* Image with fallback */}
      <div className="relative w-24 h-24 mb-4 rounded-xl overflow-hidden shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <Image
          src={imgSrc}
          alt={translation || word || 'Vocabulary image'}
          fill
          loading="lazy"
          className="object-cover"
          onError={() => setImgSrc('/placeholder.jpg')}
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
