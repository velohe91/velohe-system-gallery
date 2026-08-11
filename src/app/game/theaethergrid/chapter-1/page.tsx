'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import EncryptedFolder from './EncryptedFolder';
import CryogenicMonitor from '@/components/CryogenicMonitor';

export default function Chapter1Page() {
  const [isHacking, setIsHacking] = useState(true);
  const [progress, setProgress] = useState(10);
  const [statusLog, setStatusLog] = useState("INITIALIZING HANDSHAKE PROTOCOL...");

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
            &gt; SYSTEM ALERT: DECRYPTING CHAPTER 1...
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
            <span className="text-cyan-400 animate-pulse">THE AETHERGRID HAS DECRYPTED CHAPTER 1.</span>
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
              href="/game/theaethergrid/page-2"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded bg-cyan-950/20 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(0,255,255,0.1)]"
            >
              <span>&larr;</span> PREVIOUS FRAGMENT
            </Link>
            <span className="text-xs text-cyan-600 font-mono">FILE: CHAPTER 1 // THE PULSE INITIALIZATION</span>
          </div>

          <div className="mb-10 border-b border-cyan-500/30 pb-6">
            <h1 className="text-3xl md:text-4xl font-mono text-white tracking-widest">
              CHAPTER 1
            </h1>
            <h2 className="text-sm md:text-base font-mono text-cyan-400 tracking-wider mt-2 uppercase">
              THE PULSE INITIALIZATION
            </h2>
          </div>

          <p className="mb-6">
            The buzz of government drones drowned out any other sound in the streets of San Salvador. Through the armored monitors of her clandestine lab, Lunarya watched the &quot;pacification&quot; forces deploy. They were beasts of metal and soulless algorithms, funded by a paranoid State looking to suffocate the imminent civil war. They wanted to hijack the VΣLOHE SYSTEM&apos;s core. They wanted to turn her surveillance network into an omniscient executioner.
          </p>

          <p className="mb-6 italic text-cyan-200">
            *But Lunarya was always one step ahead.* Her fingers flew across the holographic keyboard, isolating her private network from the government&apos;s mainframe. On the main screen, an encrypted folder opened, harmlessly classified under the name: <a href="https://opensea.io/collection/cyborgpunksclub" target="_blank" rel="noopener noreferrer" className="underline text-cyan-400 hover:text-cyan-300 font-sans not-italic text-lg">CyborgPunks Club</a>. To the State&apos;s auditors, these files were nothing more than a bizarre collection of digital art—pixelated avatars, urban aesthetics, and vibrant colors. Digital trash.
          </p>

          {/* Carpeta interactiva de los CyborgPunks */}
          <EncryptedFolder />

          <p className="mb-6">
            What the censors didn&apos;t know was that every pixel, color palette, and geometric stroke concealed terabytes of genetic code and biomechanical assembly schematics. The CyborgPunks weren&apos;t just art; they were a dormant army.
          </p>

          <p className="mb-6">
            A red alert flashed on the screen. The government forces had begun their assault on the east sector. It was now or never. Lunarya knew that conventional channels would be intercepted in seconds by government algorithms. She needed an immutable path. A network that belonged to no one, and therefore, no one could shut down.
          </p>

          <p className="mb-6">
            She invoked the protocols of the old decentralized web, hiding the ignition sequences within smart contracts on the <strong className="text-cyan-300 font-mono">Ethereum</strong> and <strong className="text-cyan-300 font-mono">Tezos</strong> blockchains. <em>&quot;Approve smart contract,&quot;</em> she whispered into the void of the lab, breaking the final security seal. <em>&quot;<a href="https://opensea.io/collection/cyborg-punk-states" target="_blank" rel="noopener noreferrer" className="underline text-cyan-400 hover:text-cyan-300 font-sans text-lg">CyborgPunk States Protocol</a>. Sign and execute.&quot;</em> 
          </p>

          <p className="mb-6">
            The entire lab plunged into a deep, electric blue gloom. The nodes validated the initial pulse in fractions of a second, decrypting the biomechanical genomes and injecting them directly into the lower-level incubation pods. *First pulse. System online. Block confirmed.* 
          </p>

          {/* Terminal interactiva de Nodos Criogénicos */}
          <CryogenicMonitor />

          <p className="mb-6">
            The government thought they had control of the city. But the network now belongs to the Punks. The awakening has begun.
          </p>

          {/* Botones de Navegación Final */}
          <div className="mt-12 pt-6 border-t border-cyan-500/30 flex justify-between items-center">
            <div className="text-center font-mono text-xs tracking-widest text-cyan-400/70 my-6">
              [ CHAPTER 01 ENDED ]
            </div>
            
            <Link 
              href="/game"
              className="inline-flex items-center gap-2 text-sm font-mono text-white bg-cyan-600/20 border border-cyan-400 px-6 py-3 rounded hover:bg-cyan-500/30 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] transition-all"
            >
              RETURN TO GAME PROTOCOL <span>&rarr;</span>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}