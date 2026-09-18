'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clientsData } from '@/data/clients';
import SectionWrapper from './SectionWrapper';
import { ArrowRight } from 'lucide-react';

// Custom per-client logo sizing map keyed by exact image filename (Gallery/CLIENTS/)
const clientMarqueeLogoStyles: Record<string, string> = {
  gmda: 'scale-[1.50] p-0',
  ish: 'scale-[1.00] p-0',
  keci: 'scale-[0.80] p-0',
  m3m: 'scale-[1.00] p-0.5',
  mck: 'scale-[1.15] p-0',
  ntpc: 'scale-[1.00] p-0.5',
  phed: 'scale-[1.40] p-0.5',
  uprvunl: 'scale-[1.10] p-0.5',
  vedanta: 'scale-[1.10] p-0',
};

export default function TrustedClients() {
  const [isPaused, setIsPaused] = useState(false);
  const [stepSpacing, setStepSpacing] = useState(224);
  const [cardWidth, setCardWidth] = useState(192);

  // Deduplicate by logo URL for unique client logos in the slider
  const uniqueClientsMap = new Map();
  clientsData.forEach((client) => {
    if (!uniqueClientsMap.has(client.logo)) {
      uniqueClientsMap.set(client.logo, client);
    }
  });

  const uniqueClients = Array.from(uniqueClientsMap.values());
  const count = uniqueClients.length;

  // Tripled list for infinite conveyor track (Set 1: 0..N-1, Set 2: N..2N-1, Set 3: 2N..3N-1)
  const displayClients = [...uniqueClients, ...uniqueClients, ...uniqueClients];

  // Start centered in the middle set (Set 2: index = count)
  const [activeGlobalIndex, setActiveGlobalIndex] = useState(count);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Derived current client index (0 to count - 1)
  const activeClientIdx = count > 0 ? ((activeGlobalIndex % count) + count) % count : 0;
  const [activeTextIndex, setActiveTextIndex] = useState(activeClientIdx);
  const [showText, setShowText] = useState(true);
  const prevClientIdxRef = useRef(activeClientIdx);

  // Responsive card dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (window.innerWidth < 640) {
        setCardWidth(144);
        setStepSpacing(164); // 144px card + 20px gap
      } else {
        setCardWidth(192);
        setStepSpacing(224); // 192px card + 32px gap
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Pause when tab is inactive, and safely realign cards when tab becomes active again
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        // Tab became visible again: instantly snap to Set 2 and resume
        setIsTransitioning(false);
        setActiveGlobalIndex((prev) => count + (((prev % count) + count) % count));
        setIsPaused(false);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [count]);

  // Re-enable CSS transition after teleport snap
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Auto-step 1 place every 3 seconds (pauses on hover or when tab is hidden)
  // Always normalizes index first so it CAN NEVER drift out of bounds
  useEffect(() => {
    if (isPaused || count === 0) return;

    const interval = setInterval(() => {
      setActiveGlobalIndex((prev) => {
        // Normalizes to Set 2 before advancing
        const base = count + (((prev % count) + count) % count);
        return base + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, count]);

  // Snap reset effect: whenever activeGlobalIndex reaches Set 1 or Set 3,
  // seamlessly snap back to Set 2 once the 500ms slide transition completes
  useEffect(() => {
    if (count === 0) return;
    if (activeGlobalIndex >= 2 * count || activeGlobalIndex < count) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActiveGlobalIndex((prev) => count + (((prev % count) + count) % count));
      }, 520);

      return () => clearTimeout(timer);
    }
  }, [activeGlobalIndex, count]);

  // Handle transition end for instantaneous snap when browser allows it
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (activeGlobalIndex >= 2 * count || activeGlobalIndex < count) {
      setIsTransitioning(false);
      setActiveGlobalIndex((prev) => count + (((prev % count) + count) % count));
    }
  };

  // Hide text immediately when track starts sliding, reveal text once center card settles
  // If silent snap occurs without changing active client, do not flash text
  useEffect(() => {
    if (activeClientIdx !== prevClientIdxRef.current) {
      setShowText(false);
      prevClientIdxRef.current = activeClientIdx;

      const timeout = setTimeout(() => {
        setActiveTextIndex(activeClientIdx);
        setShowText(true);
      }, 350);

      return () => clearTimeout(timeout);
    } else {
      setActiveTextIndex(activeClientIdx);
    }
  }, [activeClientIdx]);

  const goToClient = (targetClientIdx: number) => {
    if (targetClientIdx === activeClientIdx) return;
    let diff = targetClientIdx - activeClientIdx;
    if (diff > count / 2) diff -= count;
    if (diff < -count / 2) diff += count;

    const currentNormalized = count + activeClientIdx;
    if (activeGlobalIndex !== currentNormalized) {
      setIsTransitioning(false);
      setActiveGlobalIndex(currentNormalized);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setActiveGlobalIndex(currentNormalized + diff);
        });
      });
    } else {
      setIsTransitioning(true);
      setActiveGlobalIndex(currentNormalized + diff);
    }
  };

  // Safe clamped index guaranteeing the track NEVER translates beyond displayClients
  const safeIndex = count > 0 ? Math.max(0, Math.min(activeGlobalIndex, 3 * count - 1)) : 0;

  return (
    <SectionWrapper
      id="trusted-clients"
      title="Our Trusted Clients"
      subtitle="Partnering with premier government authorities, power utilities, municipal corporations, and enterprise leaders across India."
      bgColor="gray"
      containerClassName="max-w-[1600px] overflow-hidden"
    >
      <div
        className="relative w-full py-4 flex flex-col items-center select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* CAROUSEL TRACK STAGE */}
        <div className="relative w-full h-48 sm:h-56 flex items-center justify-center overflow-hidden">
          {/* Left & Right Gradient Edge Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-r from-slate-100 via-slate-100/80 to-transparent z-30" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-32 bg-gradient-to-l from-slate-100 via-slate-100/80 to-transparent z-30" />

          {/* CONTINUOUS PHYSICAL TRACK */}
          <div
            className="absolute flex items-center top-1/2 -translate-y-1/2"
            style={{
              left: '50%',
              transform: `translateX(-${safeIndex * stepSpacing + cardWidth / 2}px)`,
              transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {displayClients.map((client, idx) => {
              const isCenter = idx === safeIndex;
              const logoFilename = client.logo.split('/').pop()?.split('.')[0]?.toLowerCase() || '';
              const logoScaleStyle =
                clientMarqueeLogoStyles[client.id] ||
                clientMarqueeLogoStyles[logoFilename] ||
                'p-2';

              return (
                <div
                  key={`${client.id}-${idx}`}
                  onClick={() => {
                    if (idx !== activeGlobalIndex) {
                      setIsTransitioning(true);
                      setActiveGlobalIndex(idx);
                    }
                  }}
                  className={`flex-shrink-0 cursor-pointer flex flex-col items-center select-none ${
                    isCenter ? 'z-20' : 'z-10'
                  }`}
                  style={{
                    width: `${cardWidth}px`,
                    marginRight: `${stepSpacing - cardWidth}px`,
                  }}
                >
                  {/* WHITE CARD BOX (LOGO ONLY) */}
                  <div
                    className={`w-full h-24 sm:h-32 bg-white rounded-2xl p-3 flex items-center justify-center transition-all duration-500 ${
                      isCenter
                        ? 'scale-110 sm:scale-125 border border-[var(--color-primary)]/80 shadow-md -translate-y-1'
                        : 'scale-90 border border-slate-200/60 opacity-50 hover:opacity-90 hover:scale-95 shadow-sm'
                    }`}
                  >
                    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={160}
                        height={80}
                        className={`max-h-full max-w-full w-auto h-auto object-contain transition-all duration-500 ${
                          isCenter ? 'grayscale-0' : 'filter grayscale opacity-60'
                        } ${logoScaleStyle}`}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER FOCUSED CLIENT NAME (FADES OUT INSTANTLY ON SLIDE START, FADES IN AFTER CARD LANDS AT CENTER) */}
        <div className="h-10 mt-3 flex items-center justify-center text-center max-w-[240px] sm:max-w-[300px]">
          <span
            key={uniqueClients[activeTextIndex]?.id}
            className={`block text-xs sm:text-sm font-extrabold text-[var(--color-primary)] transition-all duration-300 line-clamp-2 px-2 ${
              showText ? 'opacity-100 scale-100 animate-fadeIn' : 'opacity-0 scale-95'
            }`}
          >
            {uniqueClients[activeTextIndex]?.name}
          </span>
        </div>

        {/* STEP DOT INDICATORS */}
        <div className="flex gap-2 mt-3 z-30">
          {uniqueClients.map((client, idx) => (
            <button
              key={client.id}
              onClick={() => goToClient(idx)}
              aria-label={`Go to ${client.name}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeClientIdx
                  ? 'w-8 bg-[var(--color-primary)]'
                  : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* FOOTER LINK */}
      <div className="mt-4 text-center">
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 transition-colors"
        >
          <span>View All Clients & Portfolio Details</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
