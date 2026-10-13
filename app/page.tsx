"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import connections from "@/data/genesis-connections.json";

const BiblicalGlobe = dynamic(() => import("@/components/BiblicalGlobe"), { ssr: false });

type Connection = typeof connections[number];

const themes = [
  "Creation / Logos",
  "Word (Dabar)",
  "Light",
  "Image of God",
  "Seed / Promise",
  "Faith / Righteousness",
  "Sacrifice",
  "Blessing of Nations",
];

export default function Home() {
  const [selected, setSelected] = useState<Connection>(connections[0]);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? connections : connections.filter(c => c.type.includes(filter) || c.from.includes(filter));

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
        <div className="text-sm text-white/40">Genesis Connections · {connections.length}</div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-96 border-r border-white/5 p-6 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Selected Passage</div>
          <h2 className="text-2xl font-light mb-1">Genesis 1:1</h2>
          <p className="text-xs text-white/40 mb-6">English Standard Version</p>

          <div className="bg-black/60 rounded-2xl p-4 mb-6 border border-white/5 text-sm leading-relaxed font-light">
            In the beginning, God created the heavens and the earth.
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Original Hebrew</div>
          <div className="text-2xl font-serif mb-1 text-amber-100/90">בְּרֵאשִׁית בָּרָא אֱלֹהִים</div>
          <div className="text-xs text-white/30 mb-5">bĕrē’šît bārā’ ’ĕlōhîm</div>

          <div className="space-y-1">
            {[
              { he: "בְּרֵאשִׁית", en: "in the beginning", strong: "H7225" },
              { he: "בָּרָא", en: "created", strong: "H1254" },
              { he: "אֱלֹהִים", en: "God", strong: "H430" },
            ].map((w) => (
              <button
                key={w.he}
                onClick={() => setActiveWord(w.he)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition ${
                  activeWord === w.he ? "bg-white/10 border border-white/20" : "hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex justify-between">
                  <span className="font-serif text-base text-amber-100/90">{w.he}</span>
                  <span className="text-[10px] text-white/30">{w.strong}</span>
                </div>
                <div className="text-white/50 text-xs">{w.en}</div>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col relative bg-[radial-gradient(ellipse_at_center,_#0a0a1f_0%,_#000_70%)]">
          <section className="h-44 border-b border-white/5 relative">
            <svg viewBox="0 0 1200 180" className="w-full h-full absolute inset-0" preserveAspectRatio="none">
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="40%" stopColor="#fbbf24" />
                  <stop offset="70%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <path d="M 30 160 Q 600 10 1170 160" fill="none" stroke="url(#arcGrad)" strokeWidth="2.5" opacity="0.8" />
            </svg>
            <div className="absolute inset-0 flex items-end justify-center pb-4 px-6 overflow-x-auto">
              <div className="flex gap-2">
                {connections.slice(0, 8).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all ${
                      selected.id === c.id
                        ? "bg-white/15 border border-white/30 text-white"
                        : "bg-black/50 border border-white/10 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    {c.from.split(":")[0]} → {c.to.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute bottom-1 left-6 text-[10px] uppercase tracking-[0.2em] text-white/25">Rainbow Arc · {connections.length} connections</div>
          </section>

          <section className="flex-1 border-b border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 p-6 overflow-y-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {["All", "Quotation", "Typology", "Prophecy", "Allusion"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full text-xs ${
                      filter === f ? "bg-white/15 border border-white/30" : "bg-white/5 border border-white/10 text-white/60"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {filtered.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`text-left p-3 rounded-xl border transition-all ${
                      selected.id === c.id
                        ? "bg-amber-500/10 border-amber-400/40"
                        : "bg-white/[0.03] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <div className="text-xs font-medium">{c.from} → {c.to}</div>
                    <div className="text-[10px] text-white/40 mt-1">{c.type}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="absolute bottom-1 left-6 text-[10px] uppercase tracking-[0.2em] text-white/25">Theme Graph · Genesis Connections</div>
          </section>

          <section className="h-56 relative">
            <BiblicalGlobe onSelect={setPlace} />
            <div className="absolute bottom-1 left-6 text-[10px] uppercase tracking-[0.2em] text-white/25">
              Biblical World {place && `· ${place}`}
            </div>
          </section>
        </main>

        <aside className="w-96 border-l border-white/5 p-6 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          {activeWord ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Word Study</div>
              <h3 className="text-2xl font-serif mb-2 text-amber-100/90">{activeWord}</h3>
              <p className="text-sm text-white/60">Click a connection to return to evidence.</p>
            </>
          ) : place ? (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Place</div>
              <h3 className="text-xl font-light mb-2">{place}</h3>
              <p className="text-sm text-white/60">Linked to the early Genesis narrative.</p>
            </>
          ) : (
            <>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Connection Evidence</div>
              <h3 className="text-lg font-light mb-1">{selected.from} → {selected.to}</h3>
              <div className="text-xs text-emerald-400/80 mb-5">{selected.type} · {(selected.strength * 100).toFixed(0)}%</div>
              <p className="text-sm text-white/70 leading-relaxed font-light mb-6">{selected.evidence}</p>
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-violet-400" style={{ width: `${selected.strength * 100}%` }} />
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
