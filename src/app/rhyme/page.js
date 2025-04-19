'use client';

import { useState } from 'react';
import { TextField, MenuItem, CircularProgress } from '@mui/material';
import RhymeCard from '../../components/lesson/rhyme/RhymeCard';

const languageOptions = ['Portuguese', 'Spanish', 'Italian', 'French', 'German'];

export default function RhymePage() {
  const [theme, setTheme] = useState('');
  const [language, setLanguage] = useState('Spanish');
  const [rhymes, setRhymes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setRhymes([]);

    if (!theme.trim()) {
      setError('Theme is required');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://lingualoop-backend.onrender.com/api/rhymes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme: theme.trim(), language }),
      });

      const data = await res.json();
      if (res.ok) {
        setRhymes(data.result);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
      setError('Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 md:px-6 py-12 bg-[var(--background)] text-[var(--foreground)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="w-full max-w-3xl mx-auto px-6 py-10 flex flex-col gap-6 rounded-2xl bg-white text-[var(--text-dark)]"
      >
        <h2 className="text-4xl font-semibold text-center">🎤 Rhyme Generator</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Theme"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
            fullWidth
            variant="standard"
          />

          <TextField
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            select
            fullWidth
            variant="standard"
          >
            {languageOptions.map((lang) => (
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
            className="px-8 py-3 rounded-full bg-[var(--accent-yellow)] text-[var(--text-dark)] font-semibold text-lg transition hover:bg-[var(--accent-yellow-light)]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <CircularProgress size={20} color="inherit" />
                Generating...
              </span>
            ) : (
              'Generate Rhymes'
            )}
          </button>
        </div>
      </form>

      {rhymes.length > 0 ? (
        <section className="mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto px-4">
          {rhymes.map((item, i) => (
            <RhymeCard key={i} {...item} />
          ))}
        </section>
      ) : (
        !loading &&
        !error && (
          <p className="text-center text-sm text-gray-500 mt-12">
            No rhymes found. Try a different theme!
          </p>
        )
      )}
    </main>
  );
}
