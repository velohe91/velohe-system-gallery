'use client';
import { useState } from 'react';

// Definición de los nodos criogénicos con sus rutas de video 9:16 y atributos
const nodesData = [
  {
    id: 'VIREX',
    name: 'VIREX',
    color: 'text-purple-400 border-purple-500/50 bg-purple-950/20 hover:bg-purple-500/20',
    badgeBg: 'bg-purple-950/80 border-purple-800/60 text-purple-300',
    video: '/nfts/nodes/virex.mp4',
    description: 'Igniting his interpretation layer, optimizing the tactical network\'s data flow in milliseconds.',
    metrics: 'STATUS: ACTIVE // LAYER: TACTICAL OPTIMIZATION // TEMP: -196°C'
  },
  {
    id: 'NULLA',
    name: 'NULLA',
    color: 'text-green-400 border-green-500/50 bg-green-950/20 hover:bg-green-500/20',
    badgeBg: 'bg-green-950/80 border-green-800/60 text-green-300',
    video: '/nfts/nodes/nulla.mp4',
    description: 'Activating passive monitoring, observing the environment in absolute silence.',
    metrics: 'STATUS: PASSIVE // MONITORING: OMNIDIRECTIONAL // TEMP: -196°C'
  },
  {
    id: 'LYNX',
    name: 'LYNX',
    color: 'text-blue-400 border-blue-500/50 bg-blue-950/20 hover:bg-blue-500/20',
    badgeBg: 'bg-blue-950/80 border-blue-800/60 text-blue-300',
    video: '/nfts/nodes/lynx.mp4',
    description: 'Taking visual supervision from the upper shadows, securing optical control of the critical zone.',
    metrics: 'STATUS: OPTICAL // SECTOR: UPPER SHADOWS // TEMP: -196°C'
  },
  {
    id: 'STRIPE',
    name: 'STRIPE',
    color: 'text-yellow-400 border-yellow-500/50 bg-yellow-950/20 hover:bg-yellow-500/20',
    badgeBg: 'bg-yellow-950/80 border-yellow-800/60 text-yellow-300',
    video: '/nfts/nodes/stripe.mp4',
    description: 'Synchronizing traversal pathways, activating unstoppable mobility for the journey to the surface.',
    metrics: 'STATUS: MOBILE // TRAVERSAL: SYNCHRONIZED // TEMP: -196°C'
  },
];

export default function CryogenicMonitor() {
  const [activeNode, setActiveNode] = useState<typeof nodesData[0] | null>(null);

  return (
    <div className="my-8 border border-cyan-900/60 bg-[#060911]/80 p-6 relative overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.05)]">
      {/* Efecto de líneas de escaneo CRT */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />

      {/* Cabecera de la terminal */}
      <div className="flex items-center justify-between mb-4 relative z-10 border-b border-cyan-900/50 pb-2">
        <h4 className="text-xs font-mono text-cyan-400 tracking-widest">
          [ CRYOGENIC SYSTEM // VΣLOHE SYSTEM NODES ]
        </h4>
        <span className="text-xs font-mono text-cyan-500/80">
          {activeNode ? `ACTIVE NODE: ${activeNode.id}` : 'STATUS: ALL NODES AWAKENING'}
        </span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Contenedor Multimedia (Video) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className={`relative w-full overflow-hidden bg-black/60 border border-cyan-900/80 shadow-[0_0_20px_rgba(0,255,255,0.1)] flex items-center justify-center ${activeNode ? 'aspect-[9/16] max-w-[280px]' : 'aspect-video'}`}>
            <video
              key={activeNode ? activeNode.video : 'all-nodes'}
              src={activeNode ? activeNode.video : '/nfts/nodes/all-nodes.mp4'}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          {activeNode && (
            <button
              onClick={() => setActiveNode(null)}
              className="mt-3 px-3 py-1 font-mono text-[10px] tracking-wider border border-cyan-500/50 text-cyan-300 bg-cyan-950/40 hover:bg-cyan-500/20 hover:text-white transition cursor-pointer"
            >
              ↺ RETURN TO ALL NODES VIEW
            </button>
          )}
        </div>

        {/* Panel de Texto y Botones Interactivos */}
        <div className="lg:col-span-7 space-y-4">
          <p className="font-mono text-xs text-cyan-300/90 leading-relaxed">
            The cryogenic fluids began to drain. In the darkness, four main nodes awakened simultaneously:
          </p>

          <div className="space-y-3">
            {nodesData.map((node) => {
              const isSelected = activeNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`p-3 border transition-all duration-300 cursor-pointer flex flex-col gap-1 ${
                    isSelected 
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.2)]' 
                      : 'bg-[#03050a]/80 border-cyan-900/60 hover:border-cyan-500/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs font-bold tracking-wider px-2 py-0.5 border ${node.badgeBg}`}>
                      {node.id}
                    </span>
                    <span className="font-mono text-[10px] text-cyan-500/60">
                      {isSelected ? '[ MONITORING FEED ]' : 'CLICK TO INSPECT →'}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-cyan-100/90 leading-normal mt-1">
                    <strong className="font-mono">{node.name}:</strong> {node.description}
                  </p>
                  {isSelected && (
                    <p className="font-mono text-[10px] text-cyan-400 mt-2 pt-2 border-t border-cyan-900/50 tracking-tight">
                      {node.metrics}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}