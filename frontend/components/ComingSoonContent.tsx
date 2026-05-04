import { Construction } from 'lucide-react';
import Link from 'next/link';

type ComingSoonContentProps = {
  /** Optional heading; defaults to "Coming soon". */
  title?: string;
  /** Optional supporting line under the title. */
  description?: string;
  showBackLink?: boolean;
};

export default function ComingSoonContent({
  title = 'Coming soon',
  description = 'This section is under construction. Check back shortly.',
  showBackLink = true,
}: ComingSoonContentProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-quaternary)]/15 text-[var(--color-primary)]"
        aria-hidden
      >
        <Construction className="h-8 w-8" strokeWidth={1.75} />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-md text-balance text-slate-600 leading-relaxed">
        {description}
      </p>
      {showBackLink && (
        <Link
          href="/"
          className="mt-10 inline-flex rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md"
        >
          Back to home
        </Link>
      )}
    </div>
  );
}
