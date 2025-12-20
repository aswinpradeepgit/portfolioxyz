import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
      
      {/* Soft moving background blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute w-[600px] h-[600px] bg-blue-300/30 rounded-full blur-3xl
                     top-[-200px] left-[-200px]"
          style={{ animation: "float 22s ease-in-out infinite" }}
        />
        <div
          className="absolute w-[500px] h-[500px] bg-purple-300/30 rounded-full blur-3xl
                     bottom-[-150px] right-[-150px]"
          style={{ animation: "float 26s ease-in-out infinite" }}
        />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="mb-6">
            <span className="block text-4xl md:text-5xl font-semibold text-slate-600">
              Hi, I’m
            </span>
            <span className="block text-6xl md:text-7xl font-extrabold
                             bg-gradient-to-r from-blue-600 to-purple-600
                             bg-clip-text text-transparent">
              Aswin Pradeep
            </span>
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            Software engineer with 3.5 years of experience, passionate about
            building AI-powered products and thoughtful software systems.
          </p>

          <p className="text-slate-500 mb-10">
            I enjoy turning complex ideas into calm, useful experiences —
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

        {/* Right liquid glass card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="hidden md:block"
        >
          <div className="glass glass-float p-8">
            <p className="text-sm text-slate-600 mb-2">
              Currently building
            </p>

            <h3 className="text-xl font-semibold mb-4">
              An AI-powered second brain
            </h3>

            <p className="text-slate-700 leading-relaxed">
              A productivity app that understands what you save,
              surfaces context intelligently, and evolves with you.
            </p>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
