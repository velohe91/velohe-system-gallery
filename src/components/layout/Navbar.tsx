"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useFullscreen } from "@/hooks/useFullscreen";

export function Navbar() {
  const pathname = usePathname();
  const { isFullscreen, isSupported, toggle } = useFullscreen();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-neon-cyan/10 bg-void/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-sans text-sm font-bold tracking-[0.25em] text-neon-cyan text-glow-sm sm:text-base"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] transition-colors ${
                  active
                    ? "text-neon-cyan"
                    : "text-muted hover:text-neon-blue"
                }`}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-0.5 h-px bg-neon-cyan shadow-[0_0_8px_#00f0ff]"
                  />
                )}
              </Link>
            );
          })}

          {isSupported && (
            <button
              type="button"
              onClick={toggle}
              className="ml-2 rounded border border-neon-blue/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-neon-blue hover:border-neon-cyan hover:text-neon-cyan"
              aria-pressed={isFullscreen}
              title="Toggle immersive fullscreen"
            >
              {isFullscreen ? "Exit FS" : "Fullscreen"}
            </button>
          )}
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {isSupported && (
            <button
              type="button"
              onClick={toggle}
              className="rounded border border-neon-blue/30 px-2 py-1 font-mono text-[10px] uppercase text-neon-blue"
              aria-label="Toggle fullscreen"
            >
              FS
            </button>
          )}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-neon-cyan"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span className="font-mono text-lg">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-neon-cyan/10 md:hidden"
            aria-label="Mobile"
          >
            <ul className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-2 py-3 font-mono text-sm uppercase tracking-widest text-muted hover:text-neon-cyan"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
