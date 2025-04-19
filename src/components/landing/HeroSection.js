'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="text-center py-24 px-6 bg-white text-[var(--text-dark)] overflow-hidden">
      {/* ✅ Banner Image Animation */}
      <motion.div
        className="max-w-4xl mx-auto mb-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <Image
          src="https://images.unsplash.com/photo-1588623731810-171b80f3c55e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="LinguaLoop banner"
          width={1200}
          height={600}
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </motion.div>

      {/* ✅ Heading Animation */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold leading-tight mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
      >
        Welcome to <span className="text-[#282560]">LinguaLoop</span> 🎓
      </motion.h1>

      {/* ✅ Paragraph Animation */}
      <motion.p
        className="text-lg sm:text-xl mb-10 text-[#282560]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {"Start your journey with AI-powered language lessons."}
      </motion.p>

      {/* ✅ Buttons Animation */}
      <motion.div
        className="flex justify-center gap-4 flex-wrap"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link
          href="/lesson"
          className="bg-[#F2B138] font-semibold px-6 py-2.5 rounded-full transition hover:brightness-110 shadow-md"
          style={{ color: '#282560' }}
        >
          Start Learning
        </Link>

        <Link
          href="/quiz"
          className="border-2 border-[#F2B138] font-semibold px-6 py-2.5 rounded-full transition hover:bg-[#F2B138] shadow-md"
          style={{ color: '#F2B138' }}
          onMouseEnter={(e) => (e.target.style.color = '#282560')}
          onMouseLeave={(e) => (e.target.style.color = '#F2B138')}
        >
          Take a Quiz
        </Link>
      </motion.div>
    </section>
  );
}
