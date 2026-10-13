"use client";

import { useState, useMemo } from "react";
import connections from "@/data/genesis-connections.json";

type Connection = typeof connections[number];

const books = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
  "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation"
];

function getBookIndex(bookName: string) {
  const name = bookName.split(" ")[0].replace(/\d+/, "").trim();
  return books.findIndex(b => b.startsWith(name) || name.startsWith(b.split(" ")[0]));
}

export default function Home() {
  const [focus, setFocus] = useState<Connection | null>(connections[0]);
  const [depth, setDepth] = useState(1);
  const [activeBook, setActiveBook] = useState("Genesis");

  const visibleConnections = useMemo(() => {
    if (depth === 1) return connections.filter(c => c.from.startsWith("Genesis 1"));
    if (depth === 2) return connections.filter(c => c.from.startsWith("Genesis"));
    return connections;
  }, [depth]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* LEFT — Education Card */}
      <aside className="w-[380px] border-r border-white/5 p-6 sticky top-0 h-screen overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Education</div>

        {focus ? (
          <>
            <h2 className="text-2xl font-light mb-1">{focus.from}</h2>
            <p className="text-xs text-white/40 mb-6">Connected to {focus.to}</p>

            <div className="bg-black/60 rounded-2xl p-5 mb-6 border border-white/5">
              <div className="text-sm leading-relaxed font-light">{focus.evidence}</div>
            </div>

            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">Linguistic Link</div>
            <div className="font-serif text-lg text-amber-100/80 mb-6">
              {focus.from.includes("1:1") ? "בְּרֵאשִׁית ↔ ἐν ἀρχῇ" : "Shared language across the connection"}
            </div>

            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-2">Type</div>
            <div className="text-sm text-emerald-400/80">{focus.type}</div>
          </>
        ) : (
          <div className="text-white/40 text-sm">Select a connection arc to study.</div>
        )}
      </aside>

      {/* MIDDLE — Mapping Canvas with Multi-Book Arcs */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="min-h-[180vh] relative">
          <div className="text-center pt-16 pb-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">DabarViz</div>
            <h1 className="text-4xl font-light tracking-tight">The Living Map</h1>
            <p className="text-white/40 text-sm mt-2">Arcs span from Genesis to later books. Click to expand and drill.</p>
          </div>

          {/* Arc Canvas */}
          <div className="relative h-[600px] mx-8">
            <svg viewBox="0 0 1000 600" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Book axis labels (simplified) */}
              <text x="40" y="580" fill="rgba(255,255,255,0.3)" fontSize="11" textAnchor="start">Genesis</text>
              <text x="960" y="580" fill="rgba(255,255,255,0.3)" fontSize="11" textAnchor="end">Revelation</text>

              {visibleConnections.map((c, i) => {
                const startX = 60;
                const endIndex = Math.max(1, getBookIndex(c.to.split(" ")[0] || c.to));
                const endX = 60 + (endIndex / books.length) * 880;
                const height = 80 + (i % 5) * 60;
                const isFocused = focus?.id === c.id;

                return (
                  <g key={c.id}>
                    <path
                      d={`M ${startX} 560 Q ${(startX + endX) / 2} ${560 - height} ${endX} 560`}
                      fill="none"
                      stroke={isFocused ? "#fbbf24" : "url(#arcGrad)"}
                      strokeWidth={isFocused ? 3 : 1.5}
                      opacity={isFocused ? 1 : 0.5}
                      filter={isFocused ? "url(#glow)" : undefined}
                      className="cursor-pointer"
                      onClick={() => {
                        setFocus(c);
                        if (depth < 3) setDepth(d => d + 1);
                      }}
                    />
                    <text
                      x={(startX + endX) / 2}
                      y={560 - height - 12}
                      fill={isFocused ? "#fbbf24" : "rgba(255,255,255,0.5)"}
                      fontSize="10"
                      textAnchor="middle"
                      className="pointer-events-none"
                    >
                      {c.to.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="px-12 pb-24 text-center text-white/30 text-sm">
            {depth < 3 ? "Click an arc to expand deeper into the connections." : "Full set of Genesis arcs visible."}
          </div>
        </div>
      </main>

      {/* RIGHT — Scroll Spy (Books) */}
      <aside className="w-56 border-l border-white/5 sticky top-0 h-screen overflow-y-auto bg-black/40">
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Books</div>
          <div className="space-y-0.5">
            {books.map((book) => (
              <button
                key={book}
                onClick={() => setActiveBook(book)}
                className={`w-full text-left px-3 py-1.5 text-xs rounded transition ${
                  activeBook === book
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                }`}
              >
                {book}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
