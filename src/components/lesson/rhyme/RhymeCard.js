'use client';

import Image from 'next/image';

export default function RhymeCard({ foreign, english, rhyme, image }) {
  return (
    <div className="bg-[#EDEDED] rounded-2xl p-5 text-center shadow">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={image?.startsWith('http') ? image : '/placeholder.jpg'}
          alt={english}
          fill
          className="object-cover rounded-xl"
        />

      </div>
      <h3 className="text-lg font-bold text-[var(--text-dark)]">{foreign}</h3>
      <p className="text-sm text-gray-600 mb-1">({english})</p>
      <p className="text-sm italic mt-2 text-[var(--text-dark)]">{rhyme}</p>
    </div>
  );
}
