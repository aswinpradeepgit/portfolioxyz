import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            <span className="block text-slate-700">
                Hi, I’m
            </span>

            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Aswin Pradeep
            </span>
          </h1>


          <p className="text-lg text-slate-600 mb-6">
            Software engineer with 3.5 years of experience, passionate about
            building AI-powered products and thoughtful software systems.
          </p>

          <p className="text-slate-500 mb-10">
            I enjoy turning complex ideas into simple, useful experiences —
            especially when AI is involved.
          </p>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-slate-900 text-white hover:scale-105 transition"
          >
            Let’s work together →
          </a>
        </motion.div>

        {/* Right visual card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden md:block"
        >
          <div className="rounded-3xl p-8 bg-white shadow-xl border border-slate-200">
            <p className="text-sm text-slate-500 mb-2">Currently building</p>
            <h3 className="text-xl font-semibold mb-4">
              An AI-powered second brain
            </h3>
            <p className="text-slate-600">
              A productivity app that understands what you save, reminds you
              intelligently, and helps you think better over time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
