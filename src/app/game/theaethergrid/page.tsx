"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AethergridSector() {
  const [isHacking, setIsHacking] = useState(true);
  const [progress, setProgress] = useState(10);
  const [statusLog, setStatusLog] = useState("INITIALIZING HANDSHAKE PROTOCOL...");

  // Efecto de carga asimétrica (rápido al inicio, se traba en el 99%)
  useEffect(() => {
    if (!isHacking) return;

    const runLoadingSequence = async () => {
      await simulateProgress(10, 80, 40);
      await simulateProgress(80, 90, 120);
      await simulateProgress(90, 95, 300);

      setStatusLog("BYPASSING FINAL FIREWALL & ANOMALY FILTER...");
      setProgress(99);
      
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setIsHacking(false);
    };

    runLoadingSequence();
  }, [isHacking]);

  const simulateProgress = (start: number, end: number, speed: number) => {
    return new Promise<void>((resolve) => {
      let current = start;
      const interval = setInterval(() => {
        current++;
        setProgress(current);

        if (current === 50) setStatusLog("ESTABLISHING SECURE OBSERVER CHANNEL...");
        if (current === 85) setStatusLog("DECRYPTING RESTRICTED SECTOR CORES...");

        if (current >= end) {
          clearInterval(interval);
          resolve();
        }
      }, speed);
    });
  };

  return (
    <div className="min-h-screen bg-[#03050a] text-cyan-500 font-mono p-6 md:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Scanlines inmersivas */}
      <div className="absolute inset-0 pointer-events-none bg-[url('/scanlines.png')] opacity-10 z-50 mix-blend-overlay"></div>

      {isHacking ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-3xl w-full text-sm md:text-base space-y-4"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="text-red-500 font-bold tracking-widest"
          >
            &gt; SYSTEM ALERT: UNREGISTERED NEURAL LINK DETECTED.
          </motion.p>
          
          <p className="text-cyan-400">&gt; {statusLog}</p>
          
          <div className="w-full bg-cyan-950/40 border border-cyan-500/30 p-1 rounded">
            <div 
              className="bg-cyan-400 h-3 transition-all duration-150 shadow-[0_0_12px_rgba(0,255,255,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-cyan-600 font-mono">
            <span>DECRYPTION STATUS: [ {progress}% ]</span>
            <span className="text-purple-400 animate-pulse">THE AETHERGRID WANTS TO BE FOUND.</span>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-3xl w-full text-gray-300 font-sans leading-relaxed text-lg"
        >
          {/* Barra de navegación superior */}
          <div className="mb-6 flex justify-between items-center">
            <Link 
              href="/game"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded bg-cyan-950/20 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,255,255,0.1)]"
            >
              <span>&larr;</span> RETURN TO GAME PROTOCOL
            </Link>
            <span className="text-xs text-cyan-600 font-mono">FILE: 001 // PROLOGUE</span>
          </div>

          <div className="mb-10 border-b border-cyan-500/30 pb-6">
            <h1 className="text-3xl md:text-4xl font-mono text-white tracking-widest text-glow-sm">
              VΣLOHE SYSTEM
            </h1>
            <h2 className="text-sm md:text-base font-mono text-cyan-400 tracking-wider mt-2 uppercase">
              PROLOGUE: THE HIDDEN PULSE OF AI
            </h2>
          </div>

          <p className="mb-6">
            <strong className="text-white">Year 2045.</strong> Two decades have passed since artificial intelligence rewrote the rules of our existence. What began as simple applications and virtual assistants evolved into silicon androids capable of decoding the intricate complexity of the human mind.
          </p>
          
          <p className="mb-6">
            We reached a turning point. Automation eradicated repetitive manual labor, granting us the necessary time to return to our core essence: being creators. We freed ourselves from daily burdens to immerse ourselves in art, philosophy, and intellect. Technology advanced with such ferocity that we stopped marveling at simple switches, replaced instead by autonomous machines performing open-heart surgeries.
          </p>

          <p className="mb-6">
            It is precisely within this ecosystem of apparent utopia that the deepest object of my thoughts is born: the <strong className="text-cyan-400 font-mono">VΣLOHE SYSTEM</strong>. It is not merely an algorithmic surveillance system—an omnipresent entity designed to observe every shift, every <em>anomaly</em> that disrupts the millimetric perfection of our metropolis: The Capital of San Salvador.
          </p>

          <p className="mb-6">
            Deep within the bowels of this capital, veiled in the advances of modern times, stands a pioneering laboratory at the intersection of computer science and biotechnology. Born from the drive to perfect domestic androids, this sanctuary of innovation was founded under the name <strong className="text-purple-400">Lunarya Studios</strong>, guided by the vision of the enigmatic cybernetic research doctor, Lunarya.
          </p>

          <p className="mb-6">
            VΣLOHE SYSTEM is her crowning achievement. The prodigal child of Lunarya Studios. However, we live in an era where the fear of losing control has made laws meticulously strict. Every technological entity, no matter how brilliant, must pass through the scrutiny of governmental approval to exist. And the VΣLOHE system... conceals capabilities that the outside world perhaps is not yet prepared to comprehend.
          </p>

          <p className="mb-6">
            In its incessant scan to maintain the perfection of San Salvador, VΣLOHE&apos;s algorithmic eye did not detect a simple code error or a computer virus. It found a heartbeat. A hidden pulse nestled in the deepest and darkest recesses of artificial intelligence.
          </p>

          <p className="mb-6 text-xl text-cyan-300 font-mono tracking-wide py-4 border-l-2 border-cyan-500 pl-4 my-8 bg-cyan-950/20">
            They called it <strong className="text-white">The Aethergrid</strong>.
          </p>

          {/* Botón de Siguiente Página */}
          <div className="mt-12 pt-6 border-t border-cyan-500/30 flex justify-between items-center">
            <span className="text-xs text-cyan-600 font-mono">[ FRAGMENT 01 ENDED ]</span>
            <Link 
              href="/game/theaethergrid/page-2"
              className="inline-flex items-center gap-2 text-sm font-mono text-white bg-cyan-600/20 border border-cyan-400 px-6 py-3 rounded hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all"
            >
              NEXT FILE // DECRYPT NEXT FRAGMENT <span>&rarr;</span>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}