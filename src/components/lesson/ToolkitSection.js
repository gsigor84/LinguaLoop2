'use client';

export default function ToolkitSection({ toolkit }) {
  if (!toolkit || Object.keys(toolkit).length === 0) return null;

  const { effort_time_exchange, omni_learner_principle, iteration_effect } = toolkit;

  const Card = ({ title, emoji, items }) => {
    if (!items || items.length === 0) return null;

    return (
      <div
        className="rounded-2xl p-6 space-y-3"
        style={{ backgroundColor: '#EDEDED' }}
      >
        <h4 className="text-lg font-semibold text-[var(--text-dark)] flex items-center gap-2 mb-1">
          <span className="text-2xl">{emoji}</span> {title}
        </h4>
        <ul className="list-disc list-inside text-[var(--foreground)] space-y-1 text-sm">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-12 grid gap-6 md:grid-cols-3 px-4">
      <Card
        title="Effort/Time Exchange"
        emoji="🧠"
        items={effort_time_exchange}
      />
      <Card
        title="Omni-Learner Principle"
        emoji="🎯"
        items={omni_learner_principle}
      />
      <Card
        title="Iteration Effect"
        emoji="🔁"
        items={iteration_effect}
      />
    </div>
  );
}
