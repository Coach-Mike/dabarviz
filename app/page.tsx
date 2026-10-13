"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BiblicalGlobe = dynamic(() => import("@/components/BiblicalGlobe"), { ssr: false });

const arcConnections = [
  {
    id: "gen1-john1",
    from: "Genesis 1:1",
    to: "John 1:1",
    type: "Structural Parallel",
    strength: 0.98,
    evidence: "Both open with ‘In the beginning.’ Genesis uses divine speech; John identifies the Word as the agent of creation.",
    linguistic: "בְּרֵאשִׁית ↔ ἐν ἀρχῇ",
  },
  {
    id: "gen1-light",
    from: "Genesis 1:3",
    to: "John 1:4-5",
    type: "Thematic Echo",
    strength: 0.92,
    evidence: "‘Let there be light’ finds its fulfillment in the Light that shines in the darkness and is not overcome.",
    linguistic: "אוֹר ↔ φῶς",
  },
  {
    id: "gen1-image",
    from: "Genesis 1:26-27",
    to: "John 1:14",
    type: "Theological Parallel",
    strength: 0.88,
    evidence: "Humanity made in God’s image; the Word becomes flesh and tabernacles among us.",
    linguistic: "צֶלֶם ↔ σάρξ",
  },
];

const themes = [
  { id: "creation", label: "Creation / Logos" },
  { id: "word", label: "Word (Dabar)" },
  { id: "light", label: "Light" },
  { id: "image", label: "Image of God" },
  { id: "rest", label: "Sabbath Rest" },
];

export default function Home() {
  const [selectedArc, setSelectedArc] = useState(arcConnections[0]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>("creation");
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-amber-300 to-violet-500 shadow-lg shadow-violet-500/30" />
          <div>
            <span className="font-semibold tracking-tight text-lg">DabarViz</span>
            <span className="text-xs text-white/30 ml-3 tracking-widest uppercase">Hybrid</span>
          </div>
        </div>
        <div className="text-sm text-white/40 tracking-wide">Genesis 1 ↔ John 1</div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left */}
        <aside className="w-96 border-r border-white/5 p-7 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Selected Passage</div>
          <h2 className="text-3xl font-light mb-1 tracking-tight">Genesis 1:1</h2>
          <p className="text-xs text-white/40 mb-8 tracking-wide">English Standard Version</p>

          <div className="bg-black/60 rounded-2xl p-5 mb-8 border border-white/5">
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
                  activeWord === w.he ? "bg-white/10 border border-white/20" : "hover:bg-white/[0.04]"
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

        {/* Center */}
        <main className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_center,_#0a0a1f_0%,_#000_70%)]">
          {/* ARC */}
          <section className="h-52 border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 flex items-end">
              <svg viewBox="0 0 1200 200" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="40%" stopColor="#fbbf24" />
                    <stop offset="70%" stopColor="#fb7185" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path d="M 40 175 Q 600 5 1160 175" fill="none" stroke="url(#arcGrad)" strokeWidth="3" opacity="0.9" filter="url(#glow)" />
                <path d="M 40 175 Q 600 5 1160 175" fill="none" stroke="url(#arcGrad)" strokeWidth="12" opacity="0.1" />
              </svg>

              {/* Clickable arc segments */}
              <div className="absolute inset-0 flex items-end justify-between px-12 pb-6 pointer-events-none">
                {arcConnections.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedArc(c)}
                    className={`pointer-events-auto px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                      selectedArc.id === c.id
                        ? "bg-white/15 border border-white/30 text-white shadow-lg"
                        : "bg-black/40 border border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                    style={{ transform: `translateY(${i === 1 ? -40 : i === 2 ? -20 : 0}px)` }}
                  >
                    {c.from} → {c.to}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute bottom-2 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">Rainbow Arc · Click a connection</div>
          </section>

          {/* GRAPH */}
          <section className="flex-1 relative border-b border-white/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-xl h-full">
                {themes.map((t, i) => {
                  const positions = [
                    { left: "22%", top: "50%" },
                    { left: "50%", top: "28%" },
                    { left: "78%", top: "50%" },
                    { left: "38%", top: "72%" },
                    { left: "62%", top: "70%" },
                  ];
                  const pos = positions[i];
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTheme(t.id)}
                      style={pos}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-500 ${
                        selectedTheme === t.id
                          ? "bg-amber-500/20 border border-amber-400/50 text-amber-100 shadow-[0_0_40px_rgba(251,191,36,0.35)]"
                          : "bg-white/[0.05] border border-white/10 text-white/70 hover:border-white/30"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-2 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">Theme Graph · Genesis Connections</div>
          </section>

          {/* GLOBE */}
          <section className="h-72 relative">
            <BiblicalGlobe onSelect={setPlace} />
            <div className="absolute bottom-2 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">
              Biblical World {place && `· ${place}`}
            </div>
          </section>
        </main>

        {/* Right */}
        <aside className="w-96 border-l border-white/5 p-7 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          {activeWord ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Word Study</div>
              <h3 className="text-3xl font-serif mb-2 text-amber-100/90">{activeWord}</h3>
              <p className="text-sm text-white/40 mb-6">Root family & semantic range</p>
              <p className="text-sm text-white/60 leading-relaxed">Click an arc connection or a place on the globe to explore further.</p>
            </>
          ) : place ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Place</div>
              <h3 className="text-2xl font-light mb-2">{place}</h3>
              <p className="text-sm text-white/60 leading-relaxed">A location woven into the early Genesis narrative and the broader biblical story.</p>
            </>
          ) : (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Connection Evidence</div>
              <h3 className="text-xl font-light mb-1 tracking-tight">
                {selectedArc.from} → {selectedArc.to}
              </h3>
              <div className="text-xs text-emerald-400/80 mb-6 tracking-wide">
                {selectedArc.type} · {(selectedArc.strength * 100).toFixed(0)}% confidence
              </div>

              <div className="space-y-6 text-sm">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">Evidence</div>
                  <p className="text-white/70 leading-relaxed font-light">{selectedArc.evidence}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">Linguistic Link</div>
                  <p className="font-serif text-lg text-amber-100/80">{selectedArc.linguistic}</p>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-3">Confidence</div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-violet-400"
                      style={{ width: `${selectedArc.strength * 100}%` }}
                    />
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
