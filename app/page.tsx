"use client";

import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<string | null>("creation");
  const [activeWord, setActiveWord] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Top Bar */}
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
        {/* Left Panel */}
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

        {/* Main Hybrid Canvas */}
        <main className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_center,_#0a0a1f_0%,_#000_70%)]">
          {/* ARC */}
          <section className="h-56 border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0">
              <svg viewBox="0 0 1200 220" className="w-full h-full" preserveAspectRatio="none">
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
                <path
                  d="M 60 190 Q 600 10 1140 190"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="2.5"
                  opacity="0.9"
                  filter="url(#glow)"
                />
                <path
                  d="M 60 190 Q 600 10 1140 190"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="8"
                  opacity="0.15"
                />
                {selected === "creation" && (
                  <path
                    d="M 120 170 Q 600 30 1080 170"
                    fill="none"
                    stroke="#fcd34d"
                    strokeWidth="3"
                    opacity="0.8"
                    filter="url(#glow)"
                  />
                )}
              </svg>
            </div>
            <div className="absolute bottom-4 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">Rainbow Arc · Cross-References</div>
          </section>

          {/* GRAPH */}
          <section className="flex-1 relative border-b border-white/5">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400">
                <line x1="280" y1="200" x2="400" y2="140" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="400" y1="140" x2="520" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                <line x1="280" y1="200" x2="520" y2="200" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              </svg>

              <button
                onClick={() => setSelected("creation")}
                className={`absolute left-[32%] top-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-500 ${
                  selected === "creation"
                    ? "bg-amber-500/15 border border-amber-400/40 text-amber-100 shadow-[0_0_30px_rgba(251,191,36,0.25)]"
                    : "bg-white/[0.03] border border-white/10 text-white/70 hover:border-white/20"
                }`}
              >
                Creation / Logos
              </button>

              <div className="absolute left-1/2 top-[28%] -translate-x-1/2 px-4 py-2 rounded-full text-xs bg-white/[0.04] border border-white/10 text-white/60">
                Word
              </div>

              <div className="absolute right-[32%] top-1/2 translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-xs bg-white/[0.04] border border-white/10 text-white/60">
                Light
              </div>
            </div>
            <div className="absolute bottom-4 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">Theme Graph</div>
          </section>

          {/* GLOBE */}
          <section className="h-48 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900/30 via-amber-900/10 to-violet-900/20 border border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.15)]" />
                <div className="absolute inset-4 rounded-full border border-white/5" />
                <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.2em] text-white/30">
                  Biblical Globe
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-8 text-[10px] uppercase tracking-[0.2em] text-white/25">Biblical World</div>
          </section>
        </main>

        {/* Right Panel */}
        <aside className="w-96 border-l border-white/5 p-7 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          {activeWord ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Word Study</div>
              <h3 className="text-3xl font-serif mb-2 text-amber-100/90">{activeWord}</h3>
              <p className="text-sm text-white/40 mb-8">Root family & semantic range</p>
              <div className="text-sm text-white/60 leading-relaxed">
                Select a connection or another word to continue exploring the tapestry.
              </div>
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
