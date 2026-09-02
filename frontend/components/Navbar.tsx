'use client';

import Link from 'next/link';
import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
} from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
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
  Menu,
  X,
  ChevronDown,
  Factory,
  Wrench,
  Building,
  Sparkles,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/services', label: 'Services', icon: Cog },
  { href: '/projects', label: 'Projects', icon: Folders },
  { href: '/clients', label: 'Clients', icon: Users },
  // { href: '/team', label: 'Team', icon: User },
  { href: '/about', label: 'About', icon: Info },
  { href: '/careers', label: 'Careers', icon: Briefcase },
  { href: '/contact', label: 'Contact', icon: Phone },
] as const;

const serviceCategories = [
  {
    id: 'industrial-epc',
    label: 'Industrial EPC',
    subtext: 'STP, WTP, Process Engineering & O&M',
    href: '/services#industrial-epc',
    icon: Factory,
  },
  {
    id: 'mepf',
    label: 'MEPF Works',
    subtext: 'HVAC, Electrical, Plumbing & Fire',
    href: '/services#mepf',
    icon: Wrench,
  },
  {
    id: 'civil-infrastructure',
    label: 'Civil & Infrastructure',
    subtext: 'Civil Construction, RCC & Site Development',
    href: '/services#civil-infrastructure',
    icon: Building,
  },
  {
    id: 'interior',
    label: 'Interior Design',
    subtext: 'Office, Hotel & Commercial Interiors',
    href: '/services#interior',
    icon: Sparkles,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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
      <div className="max-w-8xl mx-auto px-6 lg:px-14 py-2">
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
            className="relative hidden md:flex items-center gap-1.5"
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

              if (link.label === 'Services') {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      ref={setLinkRef(link.href)}
                      className={`relative z-10 inline-flex flex-row items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium leading-normal transition-colors
                      ${isActive
                          ? 'text-white'
                          : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                        }`}
                    >
                      <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                      <span>{link.label}</span>
                      <ChevronDown className="size-3.5 shrink-0 transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* EXPANDABLE DROPDOWN MENU */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                      <div className="bg-white/95 backdrop-blur-md rounded-xl border border-slate-200/90 shadow-2xl p-2 flex flex-col gap-1">
                        {serviceCategories.map((cat) => {
                          const CatIcon = cat.icon;
                          return (
                            <Link
                              key={cat.id}
                              href={cat.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-100/90 transition-all duration-200 group/item border border-transparent hover:border-slate-200/80"
                            >
                              <div className="p-2 rounded-lg bg-slate-100 group-hover/item:bg-[var(--color-primary)]/10 transition-colors shrink-0">
                                <CatIcon className="w-4 h-4 text-[var(--color-primary)]" />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-slate-900 group-hover/item:text-[var(--color-primary)] transition-colors">
                                  {cat.label}
                                </div>
                                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                  {cat.subtext}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  ref={setLinkRef(link.href)}
                  className={`relative z-10 inline-flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium leading-normal transition-colors
                  ${isActive
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
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {isOpen ? (
                <X className="size-6" strokeWidth={2} aria-hidden />
              ) : (
                <Menu className="size-6" strokeWidth={2} aria-hidden />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 md:hidden"
              />

              {/* Slide-over Drawer from Right */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-[70%] max-w-xs bg-white z-50 shadow-2xl flex flex-col md:hidden overflow-y-auto"
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-end p-4 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <X className="size-5" strokeWidth={2} />
                  </button>
                </div>

                {/* Left-Aligned Links */}
                <div className="flex flex-col gap-1.5 p-4 flex-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    if (link.label === 'Services') {
                      return (
                        <div key={link.href} className="flex flex-col gap-1">
                          <div className="flex items-center justify-between">
                            <Link
                              href={link.href}
                              onClick={() => setIsOpen(false)}
                              className={`relative z-10 flex-1 inline-flex items-center justify-start gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                  ? `text-white shadow-sm ${gradientClass}`
                                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                              }`}
                            >
                              <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                              <span>{link.label}</span>
                            </Link>
                            <button
                              type="button"
                              onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg ml-1"
                            >
                              <ChevronDown
                                className={`size-4 transition-transform duration-200 ${
                                  mobileServicesOpen ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          </div>

                          {mobileServicesOpen && (
                            <div className="pl-6 flex flex-col gap-1 py-1">
                              {serviceCategories.map((cat) => {
                                const CatIcon = cat.icon;
                                return (
                                  <Link
                                    key={cat.id}
                                    href={cat.href}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-start gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-[var(--color-primary)] transition-colors"
                                  >
                                    <CatIcon className="size-4 text-[var(--color-primary)] shrink-0" />
                                    <span>{cat.label}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`relative z-10 inline-flex w-full flex-row items-center justify-start gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium leading-normal transition-colors ${
                          isActive
                            ? `text-white shadow-sm ${gradientClass}`
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/80'
                        }`}
                      >
                        <Icon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
