import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Bow, Cupcake, Petals, Reveal, SectionTitle, SoulGem, SparkleTrail, Sparkles, TeaCup } from "@/components/cute";
import { START_DATE, SONG_URL, timeline, reasons, madokaText, mamiText, madokaImage, mamiImage, photos, letter, signature } from "@/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Para Cami 💖" },
      { name: "description", content: "Un regalo mágico hecho a mano para Cami, con amor de Lulu." },
      { property: "og:title", content: "Para Cami 💖" },
      { property: "og:description", content: "Un regalo mágico hecho a mano para Cami, con amor de Lulu." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { id: "inicio", icon: "🏠" }, { id: "contador", icon: "⏳" }, { id: "historia", icon: "📖" },
  { id: "razones", icon: "💗" }, { id: "magia", icon: "🎀" }, { id: "galeria", icon: "📷" }, { id: "carta", icon: "💌" },
];

function Index() {
  return (
    <main className="relative min-h-screen">
      <Petals />
      <SparkleTrail />
      <FloatingNav />
      <MusicButton />
      <Hero />
      <Counter />
      <Story />
      <Reasons />
      <MadokaMami />
      <Gallery />
      <Letter />
      <Closing />
    </main>
  );
}

function FloatingNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 gap-1 rounded-full bg-card px-2 py-1.5 shadow-soft backdrop-blur md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col">
      {nav.map((n) => (
        <a key={n.id} href={`#${n.id}`} aria-label={n.id} className="grid h-9 w-9 place-items-center rounded-full text-lg transition hover:scale-125 hover:bg-madoka-soft/50">{n.icon}</a>
      ))}
    </nav>
  );
}

function MusicButton() {
  const ref = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [hint, setHint] = useState(false);
  const toggle = () => {
    if (!SONG_URL) { setHint(true); setTimeout(() => setHint(false), 2500); return; }
    const a = ref.current; if (!a) return;
    if (on) { a.pause(); setOn(false); } else { a.volume = 0.4; a.play().then(() => setOn(true)).catch(() => {}); }
  };
  return (
    <div className="fixed right-4 top-4 z-40 flex items-center gap-2">
      {hint && <span className="animate-pop rounded-full bg-card px-3 py-1 text-xs shadow-soft">Pronto habrá una canción 🎶</span>}
      <button onClick={toggle} aria-label={on ? "Silenciar música" : "Reproducir música"} className={`grid h-11 w-11 place-items-center rounded-full bg-card text-xl shadow-soft transition hover:scale-110 ${on ? "animate-heartbeat" : ""}`}>
        {on ? "🎵" : "🔇"}
      </button>
      {SONG_URL && <audio ref={ref} src={SONG_URL} loop />}
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="bg-hero relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <Sparkles count={26} />
      <SoulGem color="pink" size={46} className="animate-glow absolute left-[8%] top-[14%]" />
      <SoulGem color="gold" size={40} className="animate-glow absolute right-[10%] top-[22%]" />
      <TeaCup className="animate-float absolute bottom-[14%] left-[6%] w-16 md:w-24" />
      <Cupcake className="animate-float absolute bottom-[18%] right-[8%] w-12 md:w-20" />
      <Bow className="animate-pop w-24" />
      <h1 className="animate-pop font-display mt-4 text-6xl text-madoka drop-shadow md:text-8xl">Para Cami</h1>
      <p className="animate-pop font-script mt-6 max-w-md text-2xl text-foreground md:text-3xl">Desde el 15 de octubre de 2026, mi mundo es más bonito</p>
      <a href="#contador" className="btn-magic mt-10 animate-pop">Abrir mi regalo ✨</a>
    </section>
  );
}

function Counter() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const diff = Math.max(0, (now ?? START_DATE.getTime()) - START_DATE.getTime());
  const parts = [
    { v: Math.floor(diff / 864e5), l: "días" },
    { v: Math.floor(diff / 36e5) % 24, l: "horas" },
    { v: Math.floor(diff / 6e4) % 60, l: "minutos" },
    { v: Math.floor(diff / 1e3) % 60, l: "segundos" },
  ];
  return (
    <section id="contador" className="relative px-6 py-24">
      <Reveal className="card-cute relative mx-auto max-w-2xl p-8 text-center md:p-12">
        <SoulGem size={50} className="animate-glow absolute -top-10 left-1/2 -translate-x-1/2" />
        <p className="font-script mt-4 text-3xl text-madoka md:text-4xl">Llevamos juntos...</p>
        <div className="mt-8 grid grid-cols-4 gap-2 md:gap-4">
          {parts.map((p) => (
            <div key={p.l} className="bg-madoka-grad rounded-2xl py-4 shadow-soft">
              <div className="text-2xl font-bold tabular-nums text-primary-foreground md:text-5xl">{p.v}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wider text-foreground md:text-xs">{p.l}</div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">y cada segundo te quiero más 💗</p>
      </Reveal>
    </section>
  );
}

function Story() {
  return (
    <section id="historia" className="relative px-6 py-24">
      <SectionTitle sub="Los momentos que hicieron magia">Nuestra historia</SectionTitle>
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute bottom-0 left-6 top-0 w-1 rounded-full bg-gradient-to-b from-madoka-soft via-mami to-lilac md:left-1/2 md:-translate-x-1/2" />
        {timeline.map((t, i) => (
          <Reveal key={i} delay={i * 80} className={`relative mb-10 pl-16 md:w-1/2 md:pl-0 ${i % 2 ? "md:ml-auto md:pl-10" : "md:pr-10"}`}>
            <span className={`absolute left-1 top-4 grid h-11 w-11 place-items-center rounded-full bg-card text-xl shadow-soft md:top-4 ${i % 2 ? "md:-left-[22px]" : "md:left-auto md:-right-[22px]"}`}>{t.icon}</span>
            <div className="card-cute p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-madoka">{t.date}</p>
              <h3 className="font-script mt-1 text-2xl">{t.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{t.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Reasons() {
  const [flipped, setFlipped] = useState<number[]>([]);
  return (
    <section id="razones" className="relative px-6 py-24">
      <SectionTitle sub="Toca cada grimorio para descubrirla">Razones por las que te quiero</SectionTitle>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {reasons.map((r, i) => {
          const f = flipped.includes(i);
          return (
            <Reveal key={i} delay={i * 60}>
              <button onClick={() => setFlipped((s) => (f ? s.filter((x) => x !== i) : [...s, i]))} className={`flip block h-56 w-full text-left ${f ? "is-flipped" : ""}`} aria-label={`Razón ${i + 1}`}>
                <div className="flip-inner h-full w-full">
                  <div className={`flip-face flex flex-col items-center justify-center rounded-3xl border-4 border-mami ${i % 2 ? "bg-mami-grad shadow-gold" : "bg-madoka-grad shadow-soft"}`}>
                    <span className="font-display text-5xl text-primary-foreground drop-shadow">{i + 1}</span>
                    <SoulGem color={i % 2 ? "gold" : "pink"} size={34} className="animate-glow mt-2" />
                    <span className="mt-2 text-xs font-semibold text-foreground">toca ✨</span>
                  </div>
                  <div className="flip-face flip-back flex items-center justify-center rounded-3xl border-4 border-madoka-soft bg-cream p-4 text-center">
                    <p className="font-script text-lg leading-snug md:text-xl">{r}</p>
                  </div>
                </div>
              </button>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function ArtSlot({ src, color }: { src: string; color: "pink" | "gold" }) {
  if (src) return <img src={src} alt="Fan art" className="aspect-square w-full rounded-2xl object-cover" />;
  return (
    <div className="grid aspect-square w-full place-items-center rounded-2xl border-2 border-dashed border-card bg-card/40 text-center">
      <div>
        <SoulGem color={color} size={48} className="animate-glow mx-auto" />
        <p className="mt-2 text-xs text-foreground">Aquí va tu fan art 🎨</p>
      </div>
    </div>
  );
}

function MadokaMami() {
  return (
    <section id="magia" className="relative px-6 py-24">
      <SectionTitle sub="Lo que veo en ti">Madoka × Mami</SectionTitle>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <Reveal className="bg-madoka-grad relative overflow-hidden rounded-[2rem] p-6 shadow-soft">
          <Bow className="absolute -right-2 -top-2 w-20 rotate-12" color="#ff5c8f" />
          <ArtSlot src={madokaImage} color="pink" />
          <h3 className="font-display mt-5 text-3xl text-primary-foreground drop-shadow">Madoka</h3>
          <p className="mt-2 leading-relaxed">{madokaText}</p>
        </Reveal>
        <Reveal delay={120} className="bg-mami-grad relative overflow-hidden rounded-[2rem] p-6 shadow-gold">
          <TeaCup className="absolute -right-1 -top-1 w-16" />
          <ArtSlot src={mamiImage} color="gold" />
          <h3 className="font-display mt-5 text-3xl text-primary-foreground drop-shadow">Mami</h3>
          <p className="mt-2 leading-relaxed">{mamiText}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="galeria" className="relative px-6 py-24">
      <SectionTitle sub="Nuestros momentos favoritos">Galería de recuerdos</SectionTitle>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-5 md:grid-cols-3 md:gap-8">
        {photos.map((p, i) => (
          <Reveal key={i} delay={i * 60}>
            <figure className={`relative bg-card p-3 pb-4 shadow-soft transition duration-300 hover:z-10 hover:rotate-0 hover:scale-105 ${["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"][i]}`}>
              <Bow className="absolute -top-4 left-1/2 w-12 -translate-x-1/2" color={i % 2 ? "#f7d774" : "#ff8fb1"} />
              {p.src ? (
                <img src={p.src} alt={p.caption} className="aspect-square w-full object-cover" />
              ) : (
                <div className={`grid aspect-square w-full place-items-center ${i % 2 ? "bg-mami-grad" : "bg-madoka-grad"}`}>
                  <span className="text-4xl">📷</span>
                </div>
              )}
              <figcaption className="font-script mt-3 text-center text-lg">{p.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Letter() {
  const [open, setOpen] = useState(false);
  return (
    <section id="carta" className="relative px-6 py-24">
      <SectionTitle sub={open ? undefined : "Toca el sello para abrirla"}>Una carta para ti</SectionTitle>
      <Reveal className="mx-auto max-w-xl">
        {!open ? (
          <button onClick={() => setOpen(true)} className="bg-mami-grad relative mx-auto block aspect-[4/3] w-full rounded-3xl shadow-gold transition hover:scale-[1.02]" aria-label="Abrir carta">
            <svg viewBox="0 0 100 75" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
              <path d="M0 0L50 42L100 0" fill="none" stroke="#e9b93a" strokeWidth=".8" />
            </svg>
            <span className="animate-heartbeat absolute left-1/2 top-[52%] grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-madoka text-4xl shadow-soft">💖</span>
          </button>
        ) : (
          <div className="animate-pop rounded-3xl border-4 border-mami-soft bg-cream p-8 shadow-gold md:p-12">
            <p className="font-script text-3xl text-madoka">Mi Cami hermosa,</p>
            <p className="font-script mt-6 whitespace-pre-line text-2xl leading-relaxed">{letter}</p>
            <p className="font-script mt-10 text-right text-2xl text-madoka">{signature}</p>
          </div>
        )}
      </Reveal>
    </section>
  );
}

function Closing() {
  const [wish, setWish] = useState(false);
  return (
    <section className="bg-hero relative overflow-hidden px-6 pb-32 pt-24 text-center">
      <Sparkles count={20} />
      <div className="animate-heartbeat mx-auto text-8xl md:text-9xl">💖</div>
      <h2 className="font-display mt-6 text-4xl text-madoka md:text-6xl">Gracias por quedarte a mi lado</h2>
      <a href="#inicio" className="btn-magic mt-10">Volver al inicio 🎀</a>
      {/* 🤫 Sorpresa secreta */}
      <button onClick={() => setWish(true)} aria-label="Soul gem secreta" className="absolute bottom-24 right-6 opacity-50 transition hover:scale-125 hover:opacity-100">
        <SoulGem color="gold" size={18} className="animate-glow" />
      </button>
      {wish && <Wish onClose={() => setWish(false)} />}
    </section>
  );
}

function Wish({ onClose }: { onClose: () => void }) {
  const bits = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div onClick={onClose} className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-madoka-soft/60 backdrop-blur-sm">
      {bits.map((i) => (
        <span key={i} className="animate-fall absolute top-0" style={{ left: `${(i * 17) % 100}%`, animationDuration: `${3 + (i % 5)}s`, animationDelay: `${(i % 10) * 0.15}s`, fontSize: 16 + (i % 4) * 6 }}>
          {["💖", "🌸", "💛", "✨", "🎀"][i % 5]}
        </span>
      ))}
      <div className="animate-pop card-cute relative mx-6 max-w-md p-10 text-center">
        <SoulGem size={60} className="animate-glow mx-auto" />
        <p className="font-display mt-4 text-3xl text-madoka">Eres mi mayor deseo hecho realidad ✨</p>
        <p className="mt-4 text-xs text-muted-foreground">toca para cerrar</p>
      </div>
    </div>
  );
}
