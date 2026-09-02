"use client";

import { Service } from '@/types';
import { getIconComponent } from '@/lib/iconMapper';
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { ServiceCategory } from '@/types';

interface ServiceCardProps {
  service: Service;
}

const badgeColors: Record<ServiceCategory, string> = {
  'Industrial EPC': 'text-[var(--color-primary)]',
  MEPF: 'text-[var(--color-tertiary)]',
  'Civil & Infrastructure': 'text-[var(--color-quaternary)]',
  Interior: 'text-[var(--color-secondary)]',
};

const badgeBorder: Record<ServiceCategory, string> = {
  'Industrial EPC': 'border-[var(--color-primary)]/35',
  MEPF: 'border-[var(--color-tertiary)]/35',
  'Civil & Infrastructure': 'border-[var(--color-quaternary)]/35',
  Interior: 'border-[var(--color-secondary)]/35',
};

const ProjBadge = ({ category }: { category: ServiceCategory }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase whitespace-nowrap bg-slate-100 shadow-inner max-w-fit ${badgeBorder[category]} ${badgeColors[category]}`}
    >
      {category}
    </span>
  );
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = getIconComponent(service.icon);
  const pathname = usePathname();
  const router = useRouter();

  // SERVICES PAGE LAYOUT (LEFT + RIGHT)
  if (pathname.startsWith("/services")) {
    return (
      <div className="relative overflow-hidden rounded-lg border border-gray-100 bg-slate-100 p-0 shadow-lg transition-all hover:shadow-lg">
        <div className="relative z-10 flex flex-col gap-8 p-5 sm:p-8 pb-8 md:pb-14">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* LEFT SIDE */}
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-4">
                {IconComponent && (
                  <IconComponent className={`w-10 h-10 shrink-0 ${service.color}`} />
                )}

                <div className="flex-1 min-w-0 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <h3 className="text-2xl font-bold text-gray-900 w-full sm:w-auto">
                    {service.name}
                  </h3>
                  <div className="shrink-0">
                    <ProjBadge category={service.category} />
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* RIGHT SIDE (BENEFITS) */}
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Key Benefits:
              </h4>

              <ul className="space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="text-green-600 mt-1">✔</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <Link
            href={`/contact?service=${encodeURIComponent(service.name)}#message`}
            className="group z-20 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg md:absolute md:bottom-8 md:right-6 md:inline-flex md:w-auto md:py-2 md:justify-center"
          >
            Ask a Question ?
            <ArrowRight className="size-4 shrink-0 group-hover:translate-x-1 transition-transform duration-300" aria-hidden />
          </Link>
        </div>
      </div>
    );
  }

  // DEFAULT (HOME PAGE SAME)
  return (
  <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">

    <div className="relative z-10 flex flex-1 flex-col p-8">

    {/* ICON + TITLE + CATEGORY (same row) */}
    <div className="flex items-start gap-4 mb-4">

      {/* Icon */}
      <div className={`${service.color}`}>
        {IconComponent && <IconComponent className="w-12 h-12" />}
      </div>

      {/* Title + Category */}
      <div className="flex items-center gap-3">
        <h3 className="text-2xl font-bold text-gray-900">
          {service.name}
        </h3>
      </div>

    </div>

    {/* Description */}
    <p className="text-gray-600 mb-6 leading-relaxed">
      {service.description}
    </p>

    <div className="mt-auto pt-4">
      <button
        onClick={() => router.push(`/services#${service.id}`)}
        className="w-full py-2 px-4 bg-gradient-to-r from-[var(--color-tertiary)] to-[var(--color-secondary)] text-white font-semibold rounded-lg hover:shadow-lg transition-all"
      >
      Learn More →
      </button>
    </div>

    </div>
  </div>
);
}