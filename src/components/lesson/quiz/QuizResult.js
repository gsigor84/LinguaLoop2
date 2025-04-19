'use client';

export default function QuizResult({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);
  const message =
    percentage === 100
      ? "🏆 Perfect score!"
      : percentage >= 80
        ? "🎉 Great job!"
        : percentage >= 50
          ? "👍 Not bad, keep practicing!"
          : "💡 Keep learning — you'll get there!";

  return (
    <div className="max-w-2xl mx-auto text-center bg-[#F5F5F5] p-8 rounded-2xl shadow">
      <h2 className="text-3xl font-bold mb-4">Your Result</h2>
      <p className="text-xl mb-2">
        Score: <strong>{score}</strong> out of <strong>{total}</strong> ({percentage}%)
      </p>
      <p className="mb-6 text-lg">{message}</p>
      <button
        onClick={onRestart}
        className="px-6 py-2 rounded-full bg-[var(--accent-yellow)] text-[var(--text-dark)] font-semibold transition hover:bg-[#FBE073]"
      >
        Try Again
      </button>
    </div>
  );
}
