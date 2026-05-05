'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ } from '@/data/faqs';

interface FAQItemProps {
  faq: FAQ;
}

export default function FAQItem({ faq }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-slate-900 pr-4">{faq.question}</h3>
        <ChevronDown
          className={`w-5 h-5 text-[var(--color-primary)] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-4 pt-2">
          <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}
