'use client';

import { useState } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import QuizCard from './QuizCard';
import QuizResult from './QuizResult';
// Optional: import Confetti from 'react-confetti'; // If you want to add celebration later

export default function QuizSection({ quiz }) {
  const [activeStep, setActiveStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  // ✅ Safeguard against empty quiz
  if (!quiz || quiz.length === 0) {
    return (
      <section className="mt-16 text-center text-xl text-red-500">
        No quiz data available.
      </section>
    );
  }

  const totalSteps = quiz.length;
  const current = quiz?.[activeStep] || {};

  const handleAnswer = (isCorrect) => {
    if (answered) return;
    if (isCorrect) setScore((prev) => prev + 1);
    setAnswered(true);
  };

  const handleNext = () => {
    if (activeStep + 1 < totalSteps) {
      setActiveStep((prev) => prev + 1);
      setAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setActiveStep(0);
    setScore(0);
    setAnswered(false);
    setCompleted(false);
  };

  if (completed) {
    return (
      <section className="mt-16">
        {/* Optional 🎉 celebration */}
        {/* <Confetti /> */}
        <QuizResult score={score} total={totalSteps} onRestart={handleRestart} />
      </section>
    );
  }

  return (
    <section className="mt-16 space-y-8">
      {/* Step Progress */}
      <div className="max-w-3xl mx-auto">
        <Stepper activeStep={activeStep} alternativeLabel>
          {quiz.map((_, index) => (
            <Step key={index}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Current Question Card */}
      <QuizCard
        question={current.question}
        options={current.options}
        correctAnswer={current.answer}
        onAnswer={handleAnswer}
        disabled={answered}
        image={current.image}
      />


      {/* Next / Finish Button */}
      {answered && (
        <div className="flex justify-center">
          <button
            onClick={handleNext}
            className="mt-4 px-6 py-2 rounded-full bg-[var(--accent-yellow)] text-[var(--text-dark)] font-semibold transition hover:bg-[#FBE073]"
          >
            {activeStep + 1 === totalSteps ? 'Finish' : 'Next'}
          </button>
        </div>
      )}
    </section>
  );
}
