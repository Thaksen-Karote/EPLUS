import Link from 'next/link';
import { Home, ArrowLeft, Search, HelpCircle, PhoneCall, Wrench } from 'lucide-react';

type NotFoundProps = {
  title?: string;
  description?: string;
  showHomeButton?: boolean;
};

export default function NotFound({
  title = 'Page Not Found',
  description = 'Sorry, the page you are looking for does not exist, has been removed, or is temporarily unavailable.',
  showHomeButton = true,
}: NotFoundProps) {
  return (
    <main className="min-h-[75vh] flex items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center">
        {/* Decorative Graphic & 404 Badge */}
        <div className="relative inline-flex items-center justify-center mb-8">
          {/* Subtle glowing backdrop */}
          <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-tertiary)]/20 to-[var(--color-quaternary)]/20 rounded-full blur-xl opacity-75 animate-pulse" />
          
          <div className="relative flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center mb-4">
              <HelpCircle className="w-12 h-12 sm:w-14 sm:h-14 text-[var(--color-primary)] stroke-[1.5]" />
            </div>
            
            <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-quaternary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20">
              Error 404
            </span>
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
          {description}
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {showHomeButton && (
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          )}

          <Link
            href="/services"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Wrench className="w-5 h-5 text-[var(--color-tertiary)]" />
            <span>Explore Services</span>
          </Link>
        </div>

        {/* Quick links footer inside 404 */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
            Looking for something else?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link href="/contact" className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              Contact Us
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/about" className="hover:text-[var(--color-primary)] transition-colors">
              About Us
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link href="/projects" className="hover:text-[var(--color-primary)] transition-colors">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
