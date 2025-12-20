import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto glass glass-float p-12"
      >
        <h2 className="text-4xl font-bold mb-8">
          About me
        </h2>

        <p className="text-slate-700 text-lg leading-relaxed mb-6">
          I’m a software engineer with around <strong>3.5 years of experience</strong>,
          focused on building AI-first products that feel calm, intuitive,
          and genuinely useful rather than noisy or over-engineered.
        </p>

        <p className="text-slate-700 text-lg leading-relaxed">
          Right now, I’m working on an <strong>AI productivity app</strong> —
          an online second brain that understands what you save, remembers
          context for you, and surfaces the right things at the right time.
          <br /><br />
          If this idea resonates with you, I’d genuinely love to connect
          and explore what we could build together.
        </p>
      </motion.div>
    </section>
  );
}
