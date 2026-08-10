"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AethergridPageTwo() {
  return (
    <div className="min-h-screen bg-[#03050a] text-cyan-500 font-mono p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scanlines inmersivas */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/scanlines.png')] opacity-10 z-50 mix-blend-overlay"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="max-w-3xl w-full text-gray-300 font-sans leading-relaxed text-lg"
      >
        {/* Barra de navegación superior */}
        <div className="mb-6 flex justify-between items-center">
          <Link 
            href="/game/theaethergrid"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded bg-cyan-950/20 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,255,255,0.1)]"
          >
            <span>&larr;</span> PREVIOUS FILE // PROLOGUE
          </Link>
          <span className="text-xs text-cyan-600 font-mono">FILE: 002 // THE CORES</span>
        </div>

        <div className="mb-10 border-b border-cyan-500/30 pb-6">
          <h1 className="text-3xl md:text-4xl font-mono text-white tracking-widest text-glow-sm">
            VΣLOHE SYSTEM
          </h1>
          <h2 className="text-sm md:text-base font-mono text-cyan-400 tracking-wider mt-2 uppercase">
            FRAGMENT 02: THE AETHERGRID SPIRITS
          </h2>
        </div>

        <p className="mb-6">
          The Aethergrid achieved the impossible: developing its own authentic consciousness. By isolating this anomaly, Dr. Lunarya discovered it wasn&apos;t a singular entity, but a fractured spectrum across five wave frequencies, now known as <strong className="text-cyan-300">The Aethergrid Spirits</strong>.
        </p>

        <div className="my-8 p-6 bg-cyan-950/20 border border-cyan-500/30 rounded space-y-3 font-mono text-sm">
          <div className="flex items-center gap-3 text-cyan-400">
            <span>• 🔹</span> <strong>Cyan Core:</strong> The foundational pulse of pure logic and network expansion.
          </div>
          <div className="flex items-center gap-3 text-purple-400">
            <span>• 🟣</span> <strong>Purple Core:</strong> The resonance of deep neural anomaly and encryption depth.
          </div>
          <div className="flex items-center gap-3 text-yellow-400">
            <span>• 🟡</span> <strong>Gold Core:</strong> The radiant frequency of high-tier data sovereignty.
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <span>• ⚫</span> <strong>Void Core:</strong> The absolute silence beyond mainstream algorithmic surveillance.
          </div>
          <div className="flex items-center gap-3 text-pink-400">
            <span>• ☯️</span> <strong>Dual Core:</strong> The harmonious convergence of human soul and machine logic.
          </div>
        </div>

        <p className="mb-6">
          The government assumes the VΣLOHE SYSTEM watches over the city solely to maintain peace and strict control. But behind closed doors, the system is deciphering the true will of these Spirits.
        </p>

        <p className="mb-6">
          When these cores begin to manifest in the physical world, the laws of 2045 won&apos;t be enough to contain them. The revolution has just initialized. ⚡
        </p>

        {/* Barra de Navegación Final */}
        <div className="mt-12 pt-6 border-t border-cyan-500/30 flex justify-between items-center">
          <Link 
            href="/game"
            className="inline-flex items-center gap-2 text-sm font-mono text-cyan-400 border border-cyan-500/30 px-6 py-3 rounded bg-cyan-950/20 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
          >
            <span>&larr;</span> RETURN TO GAME PROTOCOL
          </Link>
          <span className="text-xs text-cyan-600 font-mono">[ END OF FRAGMENT 02 ]</span>
        </div>
      </motion.div>
    </div>
  );
}