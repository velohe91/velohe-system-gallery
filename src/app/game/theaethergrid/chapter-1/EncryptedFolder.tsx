'use client';
import { useState, useRef, useEffect } from 'react';

const cipherPunks = [
  { id: 'VEL-CPC001', name: 'CYBORG PUNK 001', image: '/nfts/videos/VEL-CPC001.gif', rarity: 'COMMON', description: 'Derived identity node. Synchronized via encrypted channels.' },
  { id: 'VEL-CPC002', name: 'CYBORG PUNK 002', image: '/nfts/videos/VEL-CPC002.gif', rarity: 'COMMON', description: 'Derived identity node. Synchronized via encrypted channels.' },
  { id: 'VEL-CPC003', name: 'CYBORG PUNK 003', image: '/nfts/videos/VEL-CPC003.gif', rarity: 'COMMON', description: 'Derived identity node. Synchronized via encrypted channels.' },
  { id: 'VEL-CPC004', name: 'CYBORG PUNK 004', image: '/nfts/videos/VEL-CPC004.gif', rarity: 'COMMON', description: 'Derived identity node. Synchronized via encrypted channels.' },
];

type CyborgPunk = typeof cipherPunks[0];

export default function EncryptedFolder() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPunk, setSelectedPunk] = useState<CyborgPunk | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (openState: boolean) => {
    setIsOpen(openState);
    if (!openState && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Soporte para cerrar el modal presionando la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPunk(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div ref={containerRef} className="my-8 border border-cyan-900/60 bg-[#060911]/80 p-6 relative overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.05)]">
         {/* Efecto de líneas de escaneo */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(18,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
         
         {/* Cabecera del contenedor */}
         <div className="flex items-center justify-between mb-4 relative z-10 border-b border-cyan-900/50 pb-2">
              <h4 className="text-xs font-mono text-cyan-400 tracking-widest">
                  [ SECURE FOLDER // CYBORGPUNKS_CLUB ]
              </h4>
              <button 
                onClick={() => handleToggle(!isOpen)}
                className="text-xs font-mono text-cyan-500/80 hover:text-cyan-300 transition cursor-pointer"
              >
                STATUS: {isOpen ? '[ DECRYPTED (CLICK TO LOCK) ]' : 'LOCKED'}
              </button>
         </div>

        {!isOpen ? (
          // ESTADO CERRADO
          <div className="text-center relative z-10 py-4">
              <button
                onClick={() => handleToggle(true)}
                className="px-6 py-3 font-mono text-xs tracking-wider border border-cyan-500/60 text-cyan-300 bg-cyan-950/30 hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.2)] cursor-pointer"
              >
                 OPEN ENCRYPTED FOLDER →
              </button>
               <p className="text-[10px] font-mono text-cyan-500/60 mt-3 tracking-tighter">
                   {/* DECRYPTING LOCAL ASSETS: CYBORGPUNKS CLUB */}
               </p>
          </div>
        ) : (
          // ESTADO ABIERTO
          <div className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fadeIn">
              {cipherPunks.map((punk) => (
                <div
                  key={punk.id}
                  onClick={() => setSelectedPunk(punk)}
                  className="bg-[#03050a] border border-cyan-900/80 p-3 group hover:border-cyan-500 transition duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:shadow-[0_4px_10px_rgba(0,255,255,0.2)]"
                >
                  <div className="relative aspect-square mb-3 overflow-hidden bg-black/40 border border-cyan-950">
                    <img
                      src={punk.image}
                      alt={punk.name}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
                    />
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-[10px] text-cyan-600 tracking-widest">{punk.id}</span>
                    <span className="font-mono text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 border border-cyan-800/60">
                      {punk.rarity}
                    </span>
                  </div>
                  <h5 className="font-sans text-base font-bold text-cyan-100 tracking-wide">{punk.name}</h5>
                  <p className="font-mono text-[11px] text-cyan-400/70 mt-1">Derived identity node</p>
                </div>
              ))}
            </div>

            {/* Botón para volver a cerrar la carpeta */}
            <div className="text-center pt-2 border-t border-cyan-900/40">
              <button
                onClick={() => handleToggle(false)}
                className="px-4 py-2 font-mono text-[11px] tracking-wider border border-red-500/50 text-red-300 bg-red-950/20 hover:bg-red-500/20 hover:text-white transition-all duration-300 cursor-pointer"
              >
                 ← LOCK FOLDER (SECURE ASSETS)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* MODAL CON ESTILO DE ARCHIVO Y SALIDA CORRECTA */}
      {selectedPunk && (
        <div 
          onClick={() => setSelectedPunk(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#060911] border border-cyan-500/60 p-6 shadow-[0_0_30px_rgba(0,255,255,0.15)] overflow-hidden cursor-default"
          >
            {/* Líneas de escaneo */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

            {/* Cabecera del modal */}
            <div className="flex justify-between items-center border-b border-cyan-900/50 pb-3 mb-4 relative z-10">
              <span className="font-mono text-xs text-cyan-400 tracking-widest">[ ASSET DETAILS // {selectedPunk.id} ]</span>
              <button 
                onClick={() => setSelectedPunk(null)}
                className="font-mono text-xs text-cyan-400 hover:text-white hover:bg-cyan-900/50 border border-cyan-800/60 px-3 py-1 bg-cyan-950/40 transition cursor-pointer"
              >
                [ CLOSE ✕ ]
              </button>
            </div>

            {/* Contenido */}
            <div className="relative z-10 space-y-4">
              <div className="aspect-square w-full bg-black/60 border border-cyan-900/80 p-2 flex items-center justify-center overflow-hidden">
                <img 
                  src={selectedPunk.image} 
                  alt={selectedPunk.name} 
                  className="w-full h-full object-contain"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-sans text-xl font-bold text-cyan-100">{selectedPunk.name}</h3>
                  <span className="font-mono text-xs text-cyan-300 bg-cyan-950 px-2 py-1 border border-cyan-800">
                    {selectedPunk.rarity}
                  </span>
                </div>
                <p className="font-mono text-xs text-cyan-400/80 leading-relaxed">
                  {selectedPunk.description}
                </p>
              </div>

              {/* Botón inferior de retorno */}
              <div className="pt-2 text-right">
                <button
                  onClick={() => setSelectedPunk(null)}
                  className="px-4 py-2 font-mono text-[11px] border border-cyan-700/60 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-500/20 hover:text-white transition cursor-pointer"
                >
                  RETURN TO EXHIBITION
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}