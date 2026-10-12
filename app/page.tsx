"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BiblicalGlobe = dynamic(() => import("@/components/BiblicalGlobe"), { ssr: false });

const themes = [
  { id: "creation", label: "Creation / Logos", x: "28%", y: "50%" },
  { id: "word", label: "Word (Dabar)", x: "50%", y: "28%" },
  { id: "light", label: "Light", x: "72%", y: "50%" },
  { id: "image", label: "Image of God", x: "40%", y: "72%" },
  { id: "rest", label: "Sabbath Rest", x: "62%", y: "68%" },
];

export default function Home() {
  const [selected, setSelected] = useState<string | null>("creation");
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-amber-300 to-violet-500 shadow-lg shadow-violet-500/20" />
          <div>
            <span className="font-semibold tracking-tight text-lg">DabarViz</span>
            <span className="text-xs text-white/30 ml-3 tracking-widest uppercase">Hybrid</span>
          </div>
        </div>
        <div className="text-sm text-white/40 tracking-wide">Genesis 1 ↔ John 1</div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-96 border-r border-white/5 p-7 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Selected Passage</div>
          <h2 className="text-3xl font-light mb-1 tracking-tight">Genesis 1:1</h2>
          <p className="text-xs text-white/40 mb-8 tracking-wide">English Standard Version</p>

          <div className="bg-black/60 rounded-2xl p-5 mb-8 border border-white/5 shadow-inner">
            <div className="text-lg leading-relaxed font-light">In the beginning, God created the heavens and the earth.</div>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Original Hebrew</div>
          <div className="text-3xl font-serif mb-1 text-amber-100/90 tracking-wide">בְּרֵאשִׁית בָּרָא אֱלֹהִים</div>
          <div className="text-xs text-white/30 mb-6 tracking-wider">bĕrē’šît bārā’ ’ĕlōhîm</div>

          <div className="space-y-1.5">
            {[
              { he: "בְּרֵאשִׁית", en: "in the beginning", strong: "H7225" },
              { he: "בָּרָא", en: "created", strong: "H1254" },
              { he: "אֱלֹהִים", en: "God", strong: "H430" },
            ].map((w) => (
              <button
                key={w.he}
                onClick={() => setActiveWord(w.he)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-300 ${
                  activeWord === w.he
                    ? "bg-white/10 border border-white/20 shadow-lg"
                    : "hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-amber-100/90">{w.he}</span>
                  <span className="text-[10px] text-white/30 tracking-wider">{w.strong}</span>
                </div>
                <div className="text-white/50 text-xs mt-0.5">{w.en}</div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_center,_#0a0a1f_0%,_#000_70%)]">
          <section className="h-48 border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0">
              <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="35%" stopColor="#fbbf24" />
                    <stop offset="65%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path d="M 60 170 Q 600 10 1140 170" fill="none" stroke="url(#arcGrad)" strokeWidth="2.5" opacity="0.9" filter="url(#glow)" />
                <path d="M 60 170 Q 600 10 1140 170" fill="none" stroke="url(#arcGrad)" strokeWidth="8" opacity="0.12" />
              </svg>
            </div>
            <div className="absolute bottom-3 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">Rainbow Arc · Cross-References</div>
          </section>

          <section className="flex-1 relative border-b border-white/5">
            <div className="absolute inset-0">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  style={{ left: t.x, top: t.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                    selected === t.id
                      ? "bg-amber-500/20 border border-amber-400/50 text-amber-100 shadow-[0_0_40px_rgba(251,191,36,0.3)]"
                      : "bg-white/[0.04] border border-white/10 text-white/70 hover:border-white/25 hover:bg-white/[0.08]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="absolute bottom-3 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">Theme Graph · Genesis Connections</div>
          </section>

          <section className="h-64 relative">
            <BiblicalGlobe onSelect={setPlace} />
            <div className="absolute bottom-3 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">
              Biblical World {place && `· ${place}`}
            </div>
          </section>
        </main>

        <aside className="w-96 border-l border-white/5 p-7 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          {activeWord ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Word Study</div>
              <h3 className="text-3xl font-serif mb-2 text-amber-100/90">{activeWord}</h3>
              <p className="text-sm text-white/40 mb-8">Root family & semantic range</p>
              <div className="text-sm text-white/60 leading-relaxed">
                Click a theme node or the globe to continue exploring.
              </div>
            </>
          ) : place ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Place</div>
              <h3 className="text-2xl font-light mb-2">{place}</h3>
              <p className="text-sm text-white/60">Connected to the Genesis narrative of beginnings.</p>
            </>
          ) : (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Connection Evidence</div>
              <h3 className="text-xl font-light mb-1 tracking-tight">Genesis 1:1 → John 1:1</h3>
              <div className="text-xs text-emerald-400/80 mb-8 tracking-wide">Very Strong · Structural Parallel</div>

              <div className="space-y-6 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">Evidence</div>
                  <p className="text-white/70 leading-relaxed font-light">Both open with “In the beginning.” Genesis uses divine speech; John identifies the Word as the agent of creation.</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">Linguistic Link</div>
                  <p className="font-serif text-lg text-amber-100/80">בְּרֵאשִׁית ↔ ἐν ἀρχῇ</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">Confidence</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-emerald-400 via-amber-300 to-violet-400" />
                  </div>
                </div>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
