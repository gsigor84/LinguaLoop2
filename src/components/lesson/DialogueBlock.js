'use client';

import { Volume2 } from 'lucide-react';

export default function DialogueBlock({ dialogue }) {
  if (!dialogue) return null;

  const lines = dialogue.split('\n').filter(Boolean);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'auto';
    speechSynthesis.speak(utterance);
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-16 px-4">
      <div className="rounded-2xl p-6" style={{ backgroundColor: '#EDEDED' }}>
        <h3 className="text-2xl font-semibold text-[var(--text-dark)] mb-4">Dialogue</h3>

        <div className="space-y-4">
          {lines.map((line, index) => {
            const [speaker, ...rest] = line.split(':');
            const text = rest.join(':').trim();

            return (
              <div
                key={index}
                className="flex items-start justify-between bg-white rounded-xl px-4 py-3"
              >
                <div className="flex items-start gap-3 flex-1">
                  {/* Speaker Badge */}
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700 font-medium">
                    {speaker.trim()}
                  </span>

                  {/* Dialogue Line */}
                  <p className="text-base text-[var(--foreground)] leading-relaxed">
                    {text}
                  </p>
                </div>

                {/* Speak Button */}
                <button
                  onClick={() => speak(text)}
                  className="text-[var(--accent-yellow)] hover:scale-110 transition"
                  title={`Play ${speaker.trim()}'s line`}
                >
                  <Volume2 size={20} strokeWidth={2.2} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
