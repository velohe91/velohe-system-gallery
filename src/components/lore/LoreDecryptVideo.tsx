/**
 * Responsive video for decrypt panels.
 * Mount only when expanded so media is not fetched while collapsed.
 * No autoplay — user controls playback.
 */
export function LoreDecryptVideo({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="mt-2 overflow-hidden rounded border border-neon-cyan/20 bg-void">
      <div className="relative aspect-video w-full">
        <video
          src={src}
          controls
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-contain"
          aria-label={title}
        />
      </div>
      <p className="border-t border-neon-cyan/10 px-2 py-1.5 font-mono text-[9px] uppercase tracking-widest text-muted/70">
        Media // {title}
      </p>
    </div>
  );
}
