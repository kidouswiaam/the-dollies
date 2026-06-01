import { motion } from 'framer-motion'
import { BRAND_NAME } from '../../lib/brand'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
}

export default function Hero({ brandName = BRAND_NAME }) {
  return (
    <section className="relative overflow-hidden bg-cream min-h-[75vh] flex items-center justify-center">
      {/* Soft ambient glow behind text */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-[min(90vw,32rem)] h-48 rounded-full bg-primary/8 blur-3xl hero-glow-pulse" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-2xl mx-auto px-6 py-20 text-center"
      >
        <motion.p
          variants={fadeUp}
          className="text-xs sm:text-sm font-semibold uppercase tracking-[0.32em] text-dark/55 mb-5 md:mb-6"
        >
          {brandName}
        </motion.p>

        <h1 className="font-display font-semibold text-dark leading-[1.12] tracking-tight">
          <motion.span variants={fadeUp} className="block text-[2rem] sm:text-[2.6rem] md:text-[3rem]">
            Tired hands,
          </motion.span>
          <motion.span
            variants={fadeUp}
            className="block text-[2rem] sm:text-[2.6rem] md:text-[3rem] mt-1 hero-line-float"
          >
            endless{' '}
            <span className="hero-text-shimmer italic">crochet love</span>
          </motion.span>
        </h1>

        <motion.p
          variants={fadeUp}
          className="mt-6 md:mt-8 text-base sm:text-lg text-muted max-w-lg mx-auto leading-relaxed"
        >
          Handmade creations only — each amigurumi doll is stitched slowly, with care, for your cozy corner.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-9 md:mt-11 flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          <a href="#catalog" className="btn-primary">
            Shop Dolls
          </a>
          <a href="#contact" className="btn-secondary">
            Contact Us
          </a>
        </motion.div>

        {/* Decorative stitch dots */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex justify-center gap-2"
          aria-hidden="true"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary/50"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
