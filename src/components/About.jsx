import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8">About me</h2>

        <p className="text-slate-600 text-lg leading-relaxed mb-6">
          I’m currently working as a software engineer and love building
          AI-first products that feel genuinely helpful, not gimmicky.
        </p>

        <p className="text-slate-600 text-lg leading-relaxed">
          Right now, I’m building an <strong>AI productivity app</strong> —
          think of it as an online second brain that understands your notes,
          links, thoughts, and reminds you at the right time.
          <br /><br />
          If this idea excites you, I’d love to connect.
        </p>
      </motion.div>
    </section>
  );
}
