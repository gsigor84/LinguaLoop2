'use client';

import { useState } from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';

const levels = ['Beginner', 'Intermediate', 'Advanced'];
const languages = ['Portuguese', 'Spanish', 'Italian', 'French', 'German'];


export default function LessonForm({ onLessonGenerated }) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [language, setLanguage] = useState('Spanish');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('https://lingualoop-backend.onrender.com/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, level, language }),
      });

      const data = await res.json();

      if (res.ok) {
        onLessonGenerated(data);
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6 rounded-2xl bg-white text-[var(--text-dark)]"
    >
      <h2 className="text-4xl font-semibold tracking-tight text-center">
        Create Your AI Lesson
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TextField
          label="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
          fullWidth
          variant="standard"
        />

        <TextField
          label="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          select
          fullWidth
          variant="standard"
        >
          {levels.map((lvl) => (
            <MenuItem key={lvl} value={lvl}>
              {lvl}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          select
          fullWidth
          variant="standard"
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang}
            </MenuItem>
          ))}
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
            'Generate Lesson'
          )}
        </button>
      </div>
    </form>
  );
}
