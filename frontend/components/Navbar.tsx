'use client';

import Link from 'next/link';
import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Home,
  Info,
  Cog,
  Folders,
  Users,
  User,
  Phone,
  Briefcase,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/services', label: 'Services', icon: Cog },
  { href: '/projects', label: 'Projects', icon: Folders },
  { href: '/clients', label: 'Clients', icon: Users },
  { href: '/team', label: 'Team', icon: User },
  { href: '/about', label: 'About', icon: Info },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/contact', label: 'Contact', icon: Phone },
] as const;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const prevIndexRef = useRef<number>(-1);
  const hasSyncedRouteRef = useRef(false);
  const [navDir, setNavDir] = useState<1 | -1>(1);

  const [indicator, setIndicator] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const setLinkRef = useCallback((href: string) => (el: HTMLAnchorElement | null) => {
    const m = linkRefs.current;
    if (el) m.set(href, el);
    else m.delete(href);
  }, []);

  const measure = useCallback(() => {
    const container = containerRef.current;
    const activeEl = linkRefs.current.get(pathname);
    if (!container || !activeEl) return;

    const c = container.getBoundingClientRect();
    const r = activeEl.getBoundingClientRect();
    setIndicator({
      top: r.top - c.top,
      left: r.left - c.left,
      width: r.width,
      height: r.height,
    });
  }, [pathname]);

  useLayoutEffect(() => {
    const idx = navLinks.findIndex((l) => l.href === pathname);
    if (idx === -1) return;

    if (!hasSyncedRouteRef.current) {
      hasSyncedRouteRef.current = true;
      prevIndexRef.current = idx;
      return;
    }

    const prev = prevIndexRef.current;
    if (idx !== prev) {
      setNavDir(idx > prev ? 1 : -1);
      prevIndexRef.current = idx;
    }
  }, [pathname]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => measure());
    ro.observe(container);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const gradientClass =
    navDir === 1
      ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-quaternary)]'
      : 'bg-gradient-to-l from-[var(--color-primary)] to-[var(--color-quaternary)]';

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-14 py-2">
        <div className="flex justify-between items-center h-18">
          <Link href="/">
            <Image
              src="/EPLUS.svg"
              alt="Engineering Plus Logo"
              width={160}
              height={80}
              priority
              className="h-16 w-auto object-contain"
            />
          </Link>

          <div
            ref={containerRef}
            className="relative hidden md:flex items-center gap-2"
          >
            {indicator.width > 0 && (
              <motion.div
                aria-hidden
                className={`pointer-events-none absolute rounded-lg shadow-sm ${gradientClass}`}
                initial={false}
                animate={{
                  top: indicator.top,
                  left: indicator.left,
                  width: indicator.width,
                  height: indicator.height,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 34,
                  mass: 0.6,
                }}
              />
            )}

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={setLinkRef(link.href)}
                  className={`relative z-10 inline-flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium leading-normal transition-colors
                  ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={toggleMenu}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <svg
                className={`h-6 w-6 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden flex flex-col gap-2 pb-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`inline-flex flex-row items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium leading-normal transition-all
                  ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
