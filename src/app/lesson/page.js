'use client';

import { useState } from 'react';
import LessonForm from '@/components/lesson/LessonForm';
import VocabularyCard from '@/components/lesson/VocabularyCard';
import DialogueBlock from '@/components/lesson/DialogueBlock';
import ToolkitSection from '@/components/lesson/ToolkitSection';

export default function LessonPage() {
  const [lesson, setLesson] = useState(null);

  const handleLessonGenerated = (data) => {
    setLesson(data);
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-[var(--background)] text-[var(--foreground)]">
      <LessonForm onLessonGenerated={handleLessonGenerated} />

      {lesson && (
        <div className="mt-16 space-y-16">
          {/* Vocabulary Section */}
          <section>
            <h3 className="text-3xl font-semibold mb-6 text-center">Vocabulary</h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
              {lesson.vocab.map((item, index) => {
                const { english, translation, image } = item;

                return (
                  <VocabularyCard
                    key={index}
                    word={translation}
                    translation={english}
                    image={image}
                    language={lesson.language}
                  />
                );
              })}
            </div>
          </section>

          {/* Dialogue Section */}
          <DialogueBlock dialogue={lesson.dialogue} />

          {/* Toolkit Section */}
          <ToolkitSection toolkit={lesson.toolkit} />
        </div>
      )}
    </main>
  );
}
