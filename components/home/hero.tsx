'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Eye, RotateCw } from 'lucide-react';
import { EditableText } from '@/components/admin/editable-text';
import { cn } from '@/lib/utils';

type Outfit = {
  id: string;
  label: string;
  collection: string;
  productName: string;
  productDesc: string;
  image: string;
  colors: { name: string; hex: string }[];
  thumbnails: string[];
};

const outfits: Outfit[] = [
  {
    id: 'luxury-pret',
    label: 'Luxury Pret',
    collection: 'Luxury Pret',
    productName: 'Black Nooré',
    productDesc: 'Velvet embroidery with zardozi accents',
    image: 'https://images.pexels.com/photos/35340680/pexels-photo-35340680.jpeg?auto=compress&cs=tinysrgb&w=1200',
    colors: [
      { name: 'Onyx', hex: '#1a1a1a' },
      { name: 'Wine', hex: '#722F37' },
      { name: 'Gold', hex: '#C9A448' },
    ],
    thumbnails: [
      'https://images.pexels.com/photos/35340680/pexels-photo-35340680.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/36090347/pexels-photo-36090347.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/32633175/pexels-photo-32633175.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/34933733/pexels-photo-34933733.jpeg?auto=compress&cs=tinysrgb&w=200',
    ],
  },
  {
    id: 'sarees',
    label: 'Sarees',
    collection: 'Sarees',
    productName: 'Crimson Heritage',
    productDesc: 'Handwoven silk with temple border',
    image: 'https://images.pexels.com/photos/17152210/pexels-photo-17152210.jpeg?auto=compress&cs=tinysrgb&w=1200',
    colors: [
      { name: 'Crimson', hex: '#A02421' },
      { name: 'Ivory', hex: '#F5EDD0' },
      { name: 'Emerald', hex: '#0F5C4A' },
    ],
    thumbnails: [
      'https://images.pexels.com/photos/17152210/pexels-photo-17152210.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/37054310/pexels-photo-37054310.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/37054342/pexels-photo-37054342.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/17152210/pexels-photo-17152210.jpeg?auto=compress&cs=tinysrgb&w=200',
    ],
  },
  {
    id: 'unstitched',
    label: 'Unstitched',
    collection: 'Unstitched Lawn',
    productName: 'Ivory Blooms',
    productDesc: 'Hand-painted lawn with chikankari',
    image: 'https://images.pexels.com/photos/20791986/pexels-photo-20791986.jpeg?auto=compress&cs=tinysrgb&w=1200',
    colors: [
      { name: 'Ivory', hex: '#F5EDD0' },
      { name: 'Blush', hex: '#E8C5C5' },
      { name: 'Sage', hex: '#B2C4A8' },
    ],
    thumbnails: [
      'https://images.pexels.com/photos/20791986/pexels-photo-20791986.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/36884931/pexels-photo-36884931.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/25184951/pexels-photo-25184951.jpeg?auto=compress&cs=tinysrgb&w=200',
      'https://images.pexels.com/photos/20791986/pexels-photo-20791986.jpeg?auto=compress&cs=tinysrgb&w=200',
    ],
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeOutfit, setActiveOutfit] = useState(0);
  const [hoveringCTA, setHoveringCTA] = useState(false);
  const [thumbIdx, setThumbIdx] = useState(0);
  const [lookMode, setLookMode] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const current = outfits[activeOutfit];

  const switchOutfit = useCallback((idx: number) => {
    if (idx === activeOutfit) return;
    setThumbIdx(0);
    setActiveOutfit(idx);
  }, [activeOutfit]);

  // Auto cycle thumbnails every 4s
  useEffect(() => {
    const t = setInterval(() => {
      setThumbIdx((p) => (p + 1) % current.thumbnails.length);
    }, 4500);
    return () => clearInterval(t);
  }, [current]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden bg-[#0F0A0A]">
      {/* Ambient gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1212] via-[#0F0A0A] to-[#0a0606]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-libaas-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Parallax layer */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {/* MUSE — the model */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-full w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + '-' + thumbIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[85vh] max-h-[850px] aspect-[3/4] md:aspect-[4/5]"
              >
                {/* Muse image with breathing animation */}
                <MuseFigure
                  image={current.thumbnails[thumbIdx].replace('w=200', 'w=900')}
                  hoveringCTA={hoveringCTA}
                  lookMode={lookMode}
                />
              </motion.div>
            </AnimatePresence>

            {/* Gold shimmer overlay on the muse */}
            <motion.div
              animate={{
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-gradient-to-b from-gold-400/0 via-gold-400/10 to-gold-400/0 pointer-events-none mix-blend-overlay"
            />

            {/* Floating gold particles */}
            <GoldParticles />
          </div>
        </div>
      </motion.div>

      {/* LEFT PANEL — Brand text and CTAs */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 left-0 h-full w-full md:w-[42%] flex flex-col justify-center px-6 md:px-12 lg:px-16 z-20 pointer-events-none"
      >
        <div className="pointer-events-auto max-w-md">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gold-400 text-xs md:text-sm uppercase tracking-[0.3em] mb-5"
          >
            <EditableText contentKey="hero_eyebrow" fallback="Bangladesh's Curated Fashion Destination" as="span" />
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] text-shadow-luxury"
          >
            <EditableText
              contentKey="hero_title"
              fallback="Discover Exceptional Fashion, Carefully Curated"
              as="span"
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05]"
            />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-white/60 text-sm md:text-base mt-6 max-w-sm leading-relaxed"
          >
            <EditableText
              contentKey="hero_subtitle"
              fallback="Premium ethnic wear, luxury pret, sarees, and designer collections — handpicked from trusted brands and designers for every occasion."
              as="span"
            />
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-3 mt-8"
          >
            <Link
              href="/shop"
              onMouseEnter={() => setHoveringCTA(true)}
              onMouseLeave={() => setHoveringCTA(false)}
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-ink-900 text-sm font-medium uppercase tracking-wider hover:bg-gold-500 hover:text-white transition-all duration-300 rounded-sm"
            >
              <EditableText contentKey="hero_cta_primary" fallback="Explore Collection" as="span" />
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white text-sm font-medium uppercase tracking-wider hover:border-gold-500 hover:text-gold-400 transition-all duration-300 rounded-sm backdrop-blur-sm"
            >
              <EditableText contentKey="hero_cta_secondary" fallback="Why The Libaas" as="span" />
            </Link>
          </motion.div>

          {/* Collection thumbnails */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center gap-3 mt-10"
          >
            <span className="text-white/30 text-xs uppercase tracking-wider mr-1">Shop:</span>
            {outfits.map((outfit, i) => (
              <button
                key={outfit.id}
                onClick={() => switchOutfit(i)}
                className={cn(
                  'relative transition-all duration-300',
                  activeOutfit === i ? 'scale-110' : 'opacity-50 hover:opacity-80'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-full overflow-hidden border-2 transition-colors',
                  activeOutfit === i ? 'border-gold-500' : 'border-white/20'
                )}>
                  <img src={outfit.thumbnails[0]} alt={outfit.label} className="w-full h-full object-cover" />
                </div>
                <span className={cn(
                  'absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider whitespace-nowrap transition-opacity',
                  activeOutfit === i ? 'text-gold-400 opacity-100' : 'opacity-0'
                )}>
                  {outfit.label}
                </span>
              </button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT PANEL — Product card */}
      <motion.div
        style={{ opacity }}
        className="absolute top-0 right-0 h-full hidden md:flex items-center justify-end px-8 lg:px-12 z-20 pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto w-64 lg:w-72"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-5"
            >
              {/* Collection label */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-gold-400 text-xs uppercase tracking-[0.2em] font-medium">
                  {current.collection}
                </span>
                <span className="text-white/30 text-xs">0{activeOutfit + 1}/0{outfits.length}</span>
              </div>

              {/* Product name */}
              <h3 className="font-serif text-2xl text-white mb-1">{current.productName}</h3>
              <p className="text-white/40 text-xs mb-4">{current.productDesc}</p>

              {/* Color swatches */}
              <div className="flex items-center gap-2.5 mb-4">
                {current.colors.map((color) => (
                  <button
                    key={color.name}
                    className="group relative"
                    title={color.name}
                  >
                    <div
                      className="w-6 h-6 rounded-full border border-white/20 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-white/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 mb-4">
                {current.thumbnails.map((thumb, i) => (
                  <button
                    key={i}
                    onClick={() => setThumbIdx(i)}
                    className={cn(
                      'w-12 h-14 rounded overflow-hidden border transition-all',
                      thumbIdx === i ? 'border-gold-500' : 'border-white/10 opacity-50 hover:opacity-80'
                    )}
                  >
                    <img src={thumb} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <Link
                  href={`/shop/${current.id === 'unstitched' ? 'unstitched' : current.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-white/10 hover:bg-gold-500 text-white text-xs font-medium uppercase tracking-wider rounded-lg transition-colors"
                >
                  <Eye size={14} />
                  View Details
                </Link>
                <button className="flex items-center justify-center gap-2 w-full py-2.5 border border-white/15 hover:border-libaas-500 hover:text-libaas-400 text-white/80 text-xs font-medium uppercase tracking-wider rounded-lg transition-colors">
                  <Heart size={14} />
                  Add to Wishlist
                </button>
              </div>

              {/* Rotate / Look controls */}
              <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-white/10">
                <button
                  onClick={() => setLookMode(!lookMode)}
                  className={cn(
                    'flex items-center gap-1.5 text-[10px] uppercase tracking-wider transition-colors',
                    lookMode ? 'text-gold-400' : 'text-white/40 hover:text-white/70'
                  )}
                >
                  <RotateCw size={12} />
                  {lookMode ? 'Looking at you' : 'Rotate Muse'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* Collection name tabs at bottom center (desktop) */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex items-center gap-1"
      >
        {outfits.map((outfit, i) => (
          <button
            key={outfit.id}
            onClick={() => switchOutfit(i)}
            className={cn(
              'px-5 py-2 text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 rounded-sm',
              activeOutfit === i
                ? 'text-gold-400 border-b-2 border-gold-400'
                : 'text-white/40 hover:text-white/70 border-b-2 border-transparent'
            )}
          >
            {outfit.label}
          </button>
        ))}
      </motion.div>

      {/* Mobile collection tabs */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 left-0 right-0 z-20 flex md:hidden items-center justify-center gap-1 px-6"
      >
        {outfits.map((outfit, i) => (
          <button
            key={outfit.id}
            onClick={() => switchOutfit(i)}
            className={cn(
              'px-3 py-1.5 text-[10px] uppercase tracking-wider font-medium transition-all rounded-sm',
              activeOutfit === i
                ? 'bg-white/10 text-gold-400'
                : 'text-white/40'
            )}
          >
            {outfit.label}
          </button>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-6 z-20 hidden lg:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold-400/0 via-gold-400/50 to-gold-400/0" />
          <span className="text-white/30 text-[10px] uppercase tracking-wider rotate-90 origin-left translate-x-3">
            Scroll
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---- Muse Figure with breathing + idle + hover-reactive animations ---- */
function MuseFigure({ image, hoveringCTA, lookMode }: { image: string; hoveringCTA: boolean; lookMode: boolean }) {
  return (
    <motion.div
      className="relative h-full w-full"
      animate={{
        // Breathing — subtle scale
        scale: [1, 1.015, 1],
        // Idle sway
        x: [0, 3, -2, 0],
        y: [0, -2, 1, 0],
        // When hovering CTA, step forward (scale up slightly, move toward viewer)
        translateZ: hoveringCTA ? 30 : 0,
      }}
      transition={{
        scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        x: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        translateZ: { duration: 0.6, ease: 'easeOut' },
      }}
    >
      {/* The model image */}
      <motion.div
        animate={{
          // When hovering CTA, shift slightly right (toward the button)
          x: hoveringCTA ? 20 : 0,
          // When lookMode, tilt slightly toward visitor
          rotate: lookMode ? 2 : 0,
        }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
      >
        <img
          src={image}
          alt="The Libaas Muse"
          className="h-full w-full object-cover object-top rounded-lg"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 60%, transparent 95%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 50% 50%, black 60%, transparent 95%)',
          }}
        />

        {/* Fabric shimmer overlay — gold embroidery catching light */}
        <motion.div
          animate={{
            opacity: [0.1, 0.25, 0.1],
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0 rounded-lg pointer-events-none mix-blend-overlay"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, rgba(201,164,72,0.3) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
          }}
        />
      </motion.div>

      {/* Dupatta effect — floating fabric layer */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          rotate: [0, 1, -0.5, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-0 right-0 w-32 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(201,164,72,0.05))',
          filter: 'blur(20px)',
          maskImage: 'radial-gradient(ellipse 100% 80% at 70% 30%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 100% 80% at 70% 30%, black 40%, transparent 80%)',
        }}
      />

      {/* Gold edge glow around the muse */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,164,72,0.08), transparent 70%)',
        }}
      />

      {/* Gesture indicator when hovering CTA */}
      <AnimatePresence>
        {hoveringCTA && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="absolute top-1/3 left-0 pointer-events-none"
          >
            <div className="flex items-center gap-1.5 text-gold-400/60">
              <div className="w-8 h-px bg-gold-400/40" />
              <span className="text-[10px] uppercase tracking-wider">This way</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---- Floating gold particles ---- */
function GoldParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-gold-400/30"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
