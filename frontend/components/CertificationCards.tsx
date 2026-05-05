import {
  ShieldCheck,
  Leaf,
  Heart,
  FileCheck,
  Award,
} from 'lucide-react';
import { certificationsData } from '@/data/certifications';

const iconMap = {
  ShieldCheck,
  Leaf,
  Heart,
  FileCheck,
};

export default function CertificationCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {certificationsData.map((cert) => {
        const IconComponent = iconMap[cert.icon as keyof typeof iconMap];

        return (
          <div
            key={cert.id}
            className="group rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-quaternary)]/10 transition-transform group-hover:scale-110">
              {IconComponent && (
                <IconComponent className="h-7 w-7 text-[var(--color-primary)]" aria-hidden />
              )}
            </div>
            <h4 className="mb-1 font-bold text-slate-900">{cert.name}</h4>
            <p className="mb-2 text-sm text-slate-600">{cert.issuer}</p>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1">
              <Award className="h-3.5 w-3.5 text-slate-500" aria-hidden />
              <span className="text-xs font-medium text-slate-700">{cert.year}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
