import Link from 'next/link';
import { MessageCircleQuestion } from 'lucide-react';
import FAQItem from './FAQItem';
import { faqsData } from '@/data/faqs';
import SectionWrapper from './SectionWrapper';

export default function FAQSection() {
  return (
    <SectionWrapper
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our services and processes"
      bgColor="gray"
      id="faq"
    >
      <div className="max-w-4xl mx-auto space-y-4">
        {faqsData.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>

      {/* Still have questions CTA */}
      <div className="mt-12 text-center max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border-2 border-slate-200 p-8 shadow-sm">
          <MessageCircleQuestion className="w-12 h-12 mx-auto mb-4 text-[var(--color-primary)]" />
          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-slate-600 mb-6">
            Can't find the answer you're looking for? Our team is here to help you with any inquiries.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <MessageCircleQuestion className="w-5 h-5" />
            Contact Us
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}
