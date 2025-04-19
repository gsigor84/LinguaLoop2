'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#272666] text-white px-6 py-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left: Logo + description */}
        <div>
          <Link href="/" className="text-2xl font-bold tracking-wide text-white">
            <span className="font-bold text-white">Lingua</span>
            <span className="font-light text-white">Loop</span>
          </Link>
          <p className="mt-2 text-sm text-gray-300 max-w-xs">
            Learn languages through AI-powered lessons, quizzes, and creative tools.
          </p>
        </div>

        {/* Center: Nav links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Explore</h4>
          <ul className="space-y-2 text-base capitalize font-semibold">
            {[
              { label: 'Home', href: '/' },
              { label: 'Lesson', href: '/lesson' },
              { label: 'Quiz', href: '/quiz' },
              { label: 'Rhyme', href: '/rhyme' },
              { label: 'About Us', href: '/about' },
              { label: 'Contact Us', href: '/contact' },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-white hover:underline transition"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
          <p className="text-sm text-gray-300">
            Email:{' '}
            <a
              href="mailto:hello@lingualoop.com"
              className="underline text-white hover:opacity-80"
            >
              hello@lingualoop.com
            </a>
          </p>
          <p className="text-sm text-gray-300 mt-2">
            Follow us on social media
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} LinguaLoop. All rights reserved.
      </div>
    </footer>
  );
}
