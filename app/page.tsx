"use client";

import { useState } from "react";

const connections = [
  { id: "gen1-john1", from: "Genesis 1:1", to: "John 1:1", type: "Structural Parallel", strength: 0.98 },
  { id: "gen1-light", from: "Genesis 1:3", to: "John 1:4-5", type: "Thematic Echo", strength: 0.92 },
];

export default function Home() {
  const [selected, setSelected] = useState<string | null>("gen1-john1");
  const [activeWord, setActiveWord] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="h-14 border-b border-white/10 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-violet-500" />
          <span className="font-semibold tracking-tight">DabarViz</span>
          <span className="text-xs text-white/40 ml-2">Hybrid</span>
        </div>
        <div className="text-sm text-white/50">Genesis 1 ↔ John 1</div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <aside className="w-80 border-r border-white/10 p-5 overflow-y-auto panel">
          <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Selected Passage</div>
          <h2 className="text-2xl font-semibold mb-1">Genesis 1:1</h2>
          <p className="text-sm text-white/60 mb-6">English Standard Version</p>

          <div className="bg-black/40 rounded-xl p-4 mb-6 border border-white/5">
            <div className="text-lg leading-relaxed">In the beginning, God created the heavens and the earth.</div>
          </div>

          <div className="text-xs uppercase tracking-wider text-white/40 mb-2">Original Hebrew</div>
          <div className="text-2xl font-serif mb-2 text-amber-200">בְּרֵאשִׁית בָּרָא אֱלֹהִים</div>
          <div className="text-xs text-white/40 mb-4">bĕrē’šît bārā’ ’ĕlōhîm</div>

          <div className="space-y-2">
            {[
              { he: "בְּרֵאשִׁית", en: "in the beginning", strong: "H7225" },
              { he: "בָּרָא", en: "created", strong: "H1254" },
              { he: "אֱלֹהִים", en: "God", strong: "H430" },
            ].map((w) => (
              <button
                key={w.he}
                onClick={() => setActiveWord(w.he)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                  activeWord === w.he ? "bg-white/10 border border-white/20" : "hover:bg-white/5"
                }`}
              >
                <span className="font-serif text-base">{w.he}</span>
                <span className="text-white/50 ml-2">{w.en}</span>
                <span className="text-xs text-white/30 ml-auto">{w.strong}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Hybrid Canvas */}
        <main className="flex-1 flex flex-col relative">
          {/* ARC */}
          <section className="h-48 border-b border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-center">
              <svg viewBox="0 0 800 200" className="w-full h-full">
                <defs>
                  <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="40%" stopColor="#f59e0b" />
                    <stop offset="70%" stopColor="#f43f5e" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <path
                  d="M 40 180 Q 400 20 760 180"
                  fill="none"
                  stroke="url(#arcGrad)"
                  strokeWidth="3"
                  opacity="0.8"
                />
                {/* Connection highlight */}
                {selected === "gen1-john1" && (
                  <path
                    d="M 80 160 Q 400 40 720 160"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="4"
                    opacity="0.9"
                  />
                )}
              </svg>
            </div>
            <div className="absolute bottom-3 left-6 text-xs text-white/40">Rainbow Arc · Cross-References</div>
          </section>

          {/* GRAPH */}
          <section className="flex-1 relative border-b border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full max-w-2xl h-64">
                {/* Nodes */}
                <div
                  onClick={() => setSelected("gen1-john1")}
                  className={`absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition ${
                    selected === "gen1-john1" ? "bg-amber-500/20 border border-amber-400 text-amber-200" : "bg-white/5 border border-white/10"
                  }`}
                >
                  Creation / Logos
                </div>
                <div className="absolute left-1/2 top-1/4 -translate-x-1/2 px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10">
                  Word
                </div>
                <div className="absolute right-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-full text-xs bg-white/5 border border-white/10">
                  Light
                </div>
              </div>
            </div>
            <div className="absolute bottom-3 left-6 text-xs text-white/40">Theme Graph</div>
          </section>

          {/* GLOBE */}
          <section className="h-40 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-900/40 to-amber-900/20 border border-white/10 flex items-center justify-center text-xs text-white/40">
                Biblical Globe
              </div>
            </div>
            <div className="absolute bottom-3 left-6 text-xs text-white/40">Biblical World</div>
          </section>
        </main>

        {/* Right Panel */}
        <aside className="w-80 border-l border-white/10 p-5 overflow-y-auto panel">
          {activeWord ? (
            <>
              <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Word Study</div>
              <h3 className="text-xl font-serif mb-1">{activeWord}</h3>
              <p className="text-sm text-white/60 mb-6">Root family & semantic range</p>
              <div className="text-sm text-white/70">
                Click another word or a connection to explore further.
              </div>
            </>
          ) : (
            <>
              <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Connection Evidence</div>
              <h3 className="text-lg font-semibold mb-1">Genesis 1:1 → John 1:1</h3>
              <div className="text-xs text-emerald-400 mb-4">Very Strong · Structural Parallel</div>

              <div className="space-y-4 text-sm">
                <div>
                  <div className="text-white/50 text-xs mb-1">Evidence</div>
                  <p>Both open with “In the beginning.” Genesis uses divine speech; John identifies the Word as the agent of creation.</p>
                </div>
                <div>
                  <div className="text-white/50 text-xs mb-1">Linguistic Link</div>
                  <p className="font-serif">בְּרֵאשִׁית ↔ ἐν ἀρχῇ</p>
                </div>
                <div>
                  <div className="text-white/50 text-xs mb-1">Confidence</div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-[98%] bg-gradient-to-r from-emerald-400 to-amber-400" />
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
