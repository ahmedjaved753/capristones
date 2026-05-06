import React, {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { heroImageUrl, heroImageLocalFallback } from '../lib/supabase'

// Editorial 2-slide hero. Imagery comes from the public 'hero-section' bucket
// (or /public/hero/ as local fallback — see heroImageUrl in src/lib/supabase.js).
// Filenames are the literal Supabase object names. Per client direction
// (2026-05-06), slides are lifestyle/installation imagery — finished material
// in residential settings — not quarry/slab shots. Slide 1: a CRISTALLUS-style
// natural-stone island in a kitchen. Slide 2: an engineered-quartz feature
// wall in a living/dining space. Don't call out countries other than Brazil
// (single-origin stance — see CLAUDE.md "Pricing & sourcing rules"). To swap
// an image or caption: HOW-TO-REVISE Recipe 20.
const SLIDES = [
  {
    id: 'kitchen',
    file: 'Hero-kitchen-cristallus.jpg',
    title: 'The Kitchen',
    meta: 'Natural Stone · Installed',
    alt: 'Luxury kitchen interior with a sculpted white-marble waterfall island, bold grey veining, dark grey stone floor, walnut cabinetry, and pendant lights above the counter.',
  },
  {
    id: 'wall',
    file: 'Hero-quartz-feature-wall.jpg',
    title: 'The Wall',
    meta: 'Quartz · Accent',
    alt: 'Elegant living and dining space with two tall white-and-gold marble feature panels framing a marble-topped dining table, modern chairs, and chandelier lighting.',
  },
]

const SLIDE_HOLD_MS = 6000
const FADE_MS = 1200
const KEN_BURNS_MS = SLIDE_HOLD_MS + FADE_MS // drift through full lifetime
const FADE_EASE = [0.22, 1, 0.36, 1] // expo-out

const HeroCarousel = ({ children }) => {
  const prefersReduced = useReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? !document.hidden : true,
  )
  const liveRegionId = useId()
  const stripRef = useRef(null)

  const isPaused = !isPlaying || isHovering || !isTabVisible

  useEffect(() => {
    const handler = () => setIsTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  // Auto-advance.
  useEffect(() => {
    if (isPaused) return
    const t = setTimeout(
      () => setActiveIndex((i) => (i + 1) % SLIDES.length),
      SLIDE_HOLD_MS,
    )
    return () => clearTimeout(t)
  }, [activeIndex, isPaused])

  const jumpTo = useCallback((i) => {
    setActiveIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length)
  }, [])

  const handleStripKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        jumpTo(activeIndex - 1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        jumpTo(activeIndex + 1)
      }
    },
    [activeIndex, jumpTo],
  )

  const activeSlide = SLIDES[activeIndex]
  // Restart the progress bar on every slide change AND every pause/resume —
  // accepts the small lie that "resume restarts at 0" rather than the
  // complexity of a freeze-and-resume animation. Hover-pause is short-lived,
  // so users rarely notice the reset.
  const progressKey = `${activeIndex}-${isPaused ? 'p' : 'r'}`

  return (
    <section
      className="relative min-h-[calc(100vh+5rem)] -mt-20 w-full overflow-hidden bg-surface-dark"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured quarry imagery"
    >
      {/* Image stack — every slide stays mounted; only opacity and scale animate. */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, i) => {
          const isActive = i === activeIndex
          return (
            <motion.img
              key={slide.id}
              src={heroImageUrl(slide.file)}
              onError={(e) => {
                // If the bucket doesn't have this filename yet (e.g., right
                // after a local rename, before the client uploads), drop to
                // the bundled /hero/ copy so the hero still renders.
                const local = heroImageLocalFallback(slide.file)
                if (e.currentTarget.src !== local) {
                  e.currentTarget.src = local
                }
              }}
              alt={isActive ? slide.alt : ''}
              aria-hidden={!isActive}
              decoding="async"
              fetchpriority={i === 0 ? 'high' : 'auto'}
              loading={i === 0 ? 'eager' : 'lazy'}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: prefersReduced ? 1 : isActive ? 1.06 : 1,
              }}
              transition={{
                opacity: {
                  duration: prefersReduced ? 0.2 : FADE_MS / 1000,
                  ease: FADE_EASE,
                },
                scale: isActive
                  ? { duration: KEN_BURNS_MS / 1000, ease: 'linear' }
                  : { duration: FADE_MS / 1000, ease: FADE_EASE },
              }}
              className="hero-slide-img absolute inset-0 h-full w-full object-cover will-change-transform"
            />
          )
        })}
      </div>

      {/* Asymmetric scrim — anchored to the lower-left where the H1 lives so
          the right side and top of every slide stay readable. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 75% at 18% 88%, rgba(28,25,23,0.78) 0%, rgba(28,25,23,0.55) 30%, rgba(28,25,23,0.20) 55%, transparent 75%)',
        }}
      />

      {/* Index-strip backing — keeps caption row legible regardless of slide. */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />

      {/* Film grain — subtle atmosphere; not a movement effect. */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Foreground content (eyebrow / H1 / sub / CTAs) — supplied by HomePage. */}
      <div className="relative z-10 flex items-center min-h-[calc(100vh+5rem)] pt-40 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">{children}</div>
      </div>

      {/* Live region for screen readers — announces only on slide change. */}
      <div className="sr-only" aria-live="polite" aria-atomic="true" id={liveRegionId}>
        {`Slide ${activeIndex + 1} of ${SLIDES.length}, ${activeSlide.title}, ${activeSlide.meta}`}
      </div>

      {/* Mobile chrome: 3 segmented bars + active caption. */}
      <div
        className="md:hidden absolute z-20 bottom-8 inset-x-6"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex gap-2 mb-4">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => jumpTo(i)}
              aria-label={`Show slide ${i + 1} of ${SLIDES.length}, ${slide.title}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className="flex-1 h-3 -my-1 flex items-center cursor-pointer group"
            >
              <span className="block w-full h-px bg-white/20 relative overflow-hidden">
                {i === activeIndex && (
                  <motion.span
                    key={progressKey}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPaused || prefersReduced ? 0 : 1 }}
                    transition={{
                      duration:
                        isPaused || prefersReduced ? 0 : SLIDE_HOLD_MS / 1000,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-accent origin-left"
                  />
                )}
                {i < activeIndex && (
                  <span className="absolute inset-0 bg-white/40" />
                )}
              </span>
            </button>
          ))}
        </div>
        <p className="font-display text-lg text-white leading-tight">
          {activeSlide.title}
        </p>
        <p className="font-body text-[10px] uppercase tracking-widest text-white/55 mt-1">
          {activeSlide.meta}
        </p>
      </div>

      {/* Desktop chrome: museum-placard index strip. */}
      <div
        ref={stripRef}
        role="group"
        aria-label="Slide navigation"
        onKeyDown={handleStripKeyDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="hidden md:block absolute z-20 bottom-0 inset-x-0"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-10">
          <div className="grid grid-cols-[repeat(2,1fr)_auto] gap-x-8 items-end">
            {SLIDES.map((slide, i) => {
              const isActive = i === activeIndex
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Show slide ${i + 1} of ${SLIDES.length}, ${slide.title}`}
                  aria-current={isActive ? 'true' : undefined}
                  className="text-left relative pt-10 pb-1 group focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark cursor-pointer"
                >
                  {/* Per-column hairline. */}
                  <span className="absolute top-0 inset-x-0 h-px bg-white/20" />
                  {/* Active progress bar drawn on top of the hairline. */}
                  {isActive && (
                    <motion.span
                      key={progressKey}
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: isPaused || prefersReduced ? 0 : 1,
                      }}
                      transition={{
                        duration:
                          isPaused || prefersReduced
                            ? 0
                            : SLIDE_HOLD_MS / 1000,
                        ease: 'linear',
                      }}
                      className="absolute top-0 inset-x-0 h-px bg-accent origin-left"
                    />
                  )}
                  <span
                    className={`font-display italic font-light text-3xl leading-none block mb-3 transition-colors duration-300 ${
                      isActive
                        ? 'text-accent-warm'
                        : 'text-white/35 group-hover:text-white/60'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className={`font-display text-xl leading-tight transition-colors duration-300 ${
                      isActive
                        ? 'text-white'
                        : 'text-white/40 group-hover:text-white/70'
                    }`}
                  >
                    {slide.title}
                  </p>
                  <p
                    className={`font-body text-[10px] uppercase tracking-widest mt-2 transition-colors duration-300 ${
                      isActive
                        ? 'text-white/60'
                        : 'text-white/30 group-hover:text-white/50'
                    }`}
                  >
                    {slide.meta}
                  </p>
                </button>
              )
            })}
            {/* Pause / play toggle. */}
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-pressed={!isPlaying}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="relative pt-10 pb-1 self-end text-white/40 hover:text-white/80 transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-accent-warm focus-visible:ring-offset-2 focus-visible:ring-offset-surface-dark"
            >
              <span className="absolute top-0 inset-x-0 h-px bg-white/20" />
              <span className="block w-4 h-4">
                {isPlaying ? (
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <rect x="3" y="2" width="3" height="12" />
                    <rect x="10" y="2" width="3" height="12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M3 2 L13 8 L3 14 Z" />
                  </svg>
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroCarousel
