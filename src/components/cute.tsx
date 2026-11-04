import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

export function SoulGem({ color = "pink", size = 56, className = "" }: { color?: "pink" | "gold"; size?: number; className?: string }) {
  const id = `g-${color}`;
  const [a, b, c] = color === "pink" ? ["#fff", "#ffb6c9", "#ff5c8f"] : ["#fff", "#fff3c4", "#e9b93a"];
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 40 50" className={className} aria-hidden>
      <defs>
        <radialGradient id={id} cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor={a} />
          <stop offset="35%" stopColor={b} />
          <stop offset="100%" stopColor={c} />
        </radialGradient>
      </defs>
      <path d="M14 4h12l3 4H11z" fill="#f7d774" />
      <ellipse cx="20" cy="27" rx="13" ry="17" fill={`url(#${id})`} stroke="#f7d774" strokeWidth="2" />
      <ellipse cx="15" cy="20" rx="3" ry="5" fill="#fff" opacity=".7" />
      <path d="M20 44l-3 5h6z" fill="#f7d774" />
    </svg>
  );
}

export function Bow({ className = "", color = "#ff8fb1" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 60 34" className={className} aria-hidden>
      <path d="M30 17C20 2 4 2 4 17s16 15 26 0z" fill={color} />
      <path d="M30 17C40 2 56 2 56 17s-16 15-26 0z" fill={color} />
      <circle cx="30" cy="17" r="6" fill="#fff" opacity=".9" />
      <circle cx="30" cy="17" r="4" fill={color} />
    </svg>
  );
}

export function TeaCup({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 56" className={className} aria-hidden>
      <path d="M26 4c-3 4 3 6 0 10M36 4c-3 4 3 6 0 10" stroke="#ffb6c9" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M8 20h40v8c0 12-9 20-20 20S8 40 8 28z" fill="#fff3c4" stroke="#e9b93a" strokeWidth="2" />
      <path d="M48 24c10 0 10 12 0 12" stroke="#e9b93a" strokeWidth="3" fill="none" />
      <ellipse cx="28" cy="52" rx="26" ry="3" fill="#f7d774" />
      <circle cx="28" cy="32" r="4" fill="#ff8fb1" />
    </svg>
  );
}

export function Cupcake({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 56" className={className} aria-hidden>
      <path d="M10 30h30l-4 24H14z" fill="#f7d774" />
      <path d="M6 30c0-14 10-20 19-20s19 6 19 20z" fill="#ffb6c9" />
      <circle cx="25" cy="8" r="5" fill="#ff5c8f" />
      <circle cx="16" cy="22" r="1.5" fill="#fff" /><circle cx="32" cy="20" r="1.5" fill="#fff" />
    </svg>
  );
}

export function Sparkles({ count = 18 }: { count?: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: (i * 53) % 100, top: (i * 37) % 100, delay: (i % 7) * 0.4, size: 8 + (i % 4) * 4,
  })), [count]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {items.map((s, i) => (
        <span key={i} className="animate-twinkle absolute text-mami" style={{ left: `${s.left}%`, top: `${s.top}%`, animationDelay: `${s.delay}s`, fontSize: s.size }}>✦</span>
      ))}
    </div>
  );
}

export function Petals({ count = 16 }: { count?: number }) {
  const items = useMemo(() => Array.from({ length: count }, (_, i) => ({
    left: (i * 61) % 100, dur: 9 + (i % 5) * 2, delay: -(i * 1.3), drift: ((i % 3) - 1) * 80, ch: ["🌸", "💗", "✿", "💛"][i % 4],
  })), [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {items.map((p, i) => (
        <span key={i} className="animate-fall absolute top-0 text-madoka opacity-80" style={{ left: `${p.left}%`, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`, ["--drift" as string]: `${p.drift}px`, fontSize: 14 + (i % 3) * 4 }}>{p.ch}</span>
      ))}
    </div>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setV(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${v ? "is-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function SectionTitle({ children, sub }: { children: ReactNode; sub?: string | undefined }) {
  return (
    <Reveal className="mb-10 text-center">
      <h2 className="font-display text-4xl text-madoka md:text-5xl">{children}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
      <Bow className="mx-auto mt-4 w-14" />
    </Reveal>
  );
}

export function SparkleTrail() {
  useEffect(() => {
    let last = 0;
    const spawn = (x: number, y: number) => {
      const now = Date.now(); if (now - last < 40) return; last = now;
      const s = document.createElement("span");
      s.className = "sparkle-trail"; s.textContent = Math.random() > 0.5 ? "✦" : "♡";
      s.style.left = `${x - 6}px`; s.style.top = `${y - 6}px`; s.style.fontSize = `${10 + Math.random() * 8}px`;
      document.body.appendChild(s); setTimeout(() => s.remove(), 800);
    };
    const m = (e: MouseEvent) => spawn(e.clientX, e.clientY);
    const t = (e: TouchEvent) => { const p = e.touches[0]; if (p) spawn(p.clientX, p.clientY); };
    window.addEventListener("mousemove", m); window.addEventListener("touchmove", t, { passive: true });
    window.addEventListener("touchstart", t, { passive: true });
    return () => { window.removeEventListener("mousemove", m); window.removeEventListener("touchmove", t); window.removeEventListener("touchstart", t); };
  }, []);
  return null;
}
