'use client';

import { useState } from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import QuizSection from '@/components/lesson/quiz/QuizSection';

export default function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [level, setLevel] = useState('Beginner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateQuiz = async () => {
    setError('');
    setQuiz(null);  // Clear previous quiz while loading
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level, language }),
      });

      const data = await res.json();
      if (res.ok) {
        setQuiz(data.quiz);
      } else {
        setError(data.error || 'Something went wrong');
        setQuiz(null);
      }
    } catch (err) {
      console.error('❌ Quiz fetch failed:', err);
      setError('Server error. Please try again.');
      setQuiz(null);
    } finally {
      setLoading(false);
    }
  };

  // Optional: clear quiz on change
  const handleTopicChange = (e) => {
    setTopic(e.target.value);
    setQuiz(null);
  };
  const handleLevelChange = (e) => {
    setLevel(e.target.value);
    setQuiz(null);
  };
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setQuiz(null);
  };

  return (
    <main className="min-h-screen px-6 py-12 bg-[var(--background)] text-[var(--foreground)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerateQuiz();
        }}
        className="w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6 rounded-2xl bg-white text-[var(--text-dark)]"
      >
        <h2 className="text-4xl font-semibold tracking-tight text-center">
          Create Your AI Quiz
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            label="Topic"
            value={topic}
            onChange={handleTopicChange}
            required
            fullWidth
            variant="standard"
          />

          <TextField
            label="Level"
            value={level}
            onChange={handleLevelChange}
            select
            fullWidth
            variant="standard"
          >
            <MenuItem value="Beginner">Beginner</MenuItem>
            <MenuItem value="Intermediate">Intermediate</MenuItem>
            <MenuItem value="Advanced">Advanced</MenuItem>
          </TextField>

          <TextField
            label="Language"
            value={language}
            onChange={handleLanguageChange}
            select
            fullWidth
            variant="standard"
          >
            <MenuItem value="Portuguese">Portuguese</MenuItem>
            <MenuItem value="Spanish">Spanish</MenuItem>
            <MenuItem value="Italian">Italian</MenuItem>
            <MenuItem value="French">French</MenuItem>
            <MenuItem value="German">German</MenuItem>

          </TextField>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 rounded-full bg-[var(--accent-yellow)] text-[var(--text-dark)] font-semibold text-lg transition hover:bg-[var(--accent-yellow-light)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent-yellow)]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <CircularProgress size={20} color="inherit" />
                Generating...
              </span>
            ) : (
              'Generate Quiz'
            )}
          </button>
        </div>
      </form>

      {quiz && (
        <section className="mt-16">
          <QuizSection quiz={quiz} />
        </section>
      )}

      {/* Optional: Show a message or illustration if no quiz generated yet */}
      {!quiz && !loading && !error && (
        <section className="mt-16 text-center text-gray-500">
          <p>Click &quot;Start&quot; to begin the quiz.</p>

        </section>
      )}
    </main>
  );
}
