'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Search, Sparkles, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/8886952/pexels-photo-8886952.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="The Libaas Gallery curated fashion"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gold-400 text-xs uppercase tracking-[0.3em] mb-4"
          >
            Bangladesh's Premium Curated Fashion Gallery
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-serif text-4xl md:text-6xl text-white text-shadow-luxury text-balance"
          >
            The Art of <span className="italic text-gold-400">Curation</span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container-luxury max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="font-serif text-3xl mb-6">A Trusted Destination for Premium Fashion</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Libaas Gallery was founded with a simple mission: to become
              Bangladesh's most trusted destination for discovering premium
              fashion. We don't just sell clothing — we curate collections,
              handpicking the finest pieces from designers, brands, and
              boutiques we trust, and presenting them in one elegant destination.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              From luxury pret and handwoven sarees to unstitched lawn and
              designer menswear, every piece in our gallery is selected for
              quality, craftsmanship, and timeless style. We search across
              collections and designers so you don't have to — bringing you a
              carefully edited selection that meets our standards.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that discovering the perfect outfit should feel like
              walking through a gallery, not scrolling through an endless
              marketplace. That is the experience we have built.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: 'Expertly Selected', desc: 'We handpick every piece from trusted designers and brands, evaluating quality, craftsmanship, and style before it reaches our gallery.' },
              { icon: Sparkles, title: 'Curated with Care', desc: 'Our editors search across collections so you can discover exceptional fashion in one place — no endless scrolling, no guesswork.' },
              { icon: ShieldCheck, title: 'Trusted Destination', desc: 'We stand behind every piece we present. If it is in our gallery, it has earned its place through quality and design.' },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex w-14 h-14 rounded-full bg-gold-500/10 items-center justify-center mb-4">
                  <value.icon size={24} className="text-gold-600" />
                </div>
                <h3 className="font-serif text-2xl mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-ink-900 text-center">
        <div className="container-luxury">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-white mb-6 text-balance"
          >
            Explore Our Curated Collections
          </motion.h2>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ink-900 text-sm font-medium uppercase tracking-wider hover:bg-gold-500 hover:text-white transition-colors group"
          >
            Explore Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
