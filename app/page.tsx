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

function getTargetX(to: string) {
  const book = to.split(" ")[0];
  const idx = books.findIndex(b => book.startsWith(b.split(" ")[0]) || b.startsWith(book));
  const safe = idx === -1 ? books.length - 1 : idx;
  return 80 + (safe / (books.length - 1)) * 840;
}

export default function Home() {
  const [focus, setFocus] = useState<Connection | null>(connections[0]);
  const [depth, setDepth] = useState(2);
  const [activeBook, setActiveBook] = useState("Genesis");

  const visible = useMemo(() => {
    if (depth === 1) return connections.filter(c => c.from.startsWith("Genesis 1"));
    return connections;
  }, [depth]);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* LEFT */}
      <aside className="w-[360px] border-r border-white/5 p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Education</div>
        {focus ? (
          <>
            <h2 className="text-2xl font-light mb-1">{focus.from}</h2>
            <p className="text-xs text-white/40 mb-5">Connected to {focus.to}</p>
            <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mb-5 text-sm leading-relaxed text-white/80">
              {focus.evidence}
            </div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-1">Type</div>
            <div className="text-emerald-400/90 text-sm mb-4">{focus.type}</div>
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-1">Strength</div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-400 to-amber-300" style={{ width: `${focus.strength * 100}%` }} />
            </div>
          </>
        ) : (
          <p className="text-white/40 text-sm">Click an arc to study the connection.</p>
        )}
      </aside>

      {/* MIDDLE — Arcs */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="pt-10 pb-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/30">DabarViz</div>
          <h1 className="text-3xl font-light mt-1">Multi-Book Arcs</h1>
          <p className="text-xs text-white/40 mt-1">Arcs originate at Genesis and land on later books</p>
        </div>

        <div className="relative h-[520px] mx-6">
          <svg viewBox="0 0 1000 520" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" />
                <stop offset="55%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Baseline */}
            <line x1="40" y1="480" x2="960" y2="480" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <text x="50" y="500" fill="rgba(255,255,255,0.35)" fontSize="12">Genesis</text>
            <text x="940" y="500" fill="rgba(255,255,255,0.35)" fontSize="12" textAnchor="end">Revelation</text>

            {visible.map((c, i) => {
              const startX = 70;
              const endX = getTargetX(c.to);
              const lift = 90 + (i % 6) * 55;
              const focused = focus?.id === c.id;

              return (
                <g key={c.id} className="cursor-pointer" onClick={() => { setFocus(c); setDepth(2); }}>
                  <path
                    d={`M ${startX} 480 Q ${(startX + endX) / 2} ${480 - lift} ${endX} 480`}
                    fill="none"
                    stroke={focused ? "#fcd34d" : "url(#g)"}
                    strokeWidth={focused ? 4 : 2}
                    opacity={focused ? 1 : 0.65}
                    filter={focused ? "url(#glow)" : undefined}
                  />
                  <circle cx={endX} cy={480} r={focused ? 5 : 3.5} fill={focused ? "#fcd34d" : "#a78bfa"} />
                  <text
                    x={(startX + endX) / 2}
                    y={480 - lift - 14}
                    fill={focused ? "#fcd34d" : "rgba(255,255,255,0.55)"}
                    fontSize="11"
                    textAnchor="middle"
                    fontWeight={focused ? 500 : 400}
                  >
                    {c.to.split(" ")[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="text-center text-xs text-white/30 pb-16">
          Click any arc. The education card updates with the connection.
        </div>
      </main>

      {/* RIGHT */}
      <aside className="w-52 border-l border-white/5 sticky top-0 h-screen overflow-y-auto">
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Books</div>
          <div className="space-y-0.5">
            {books.map(b => (
              <button
                key={b}
                onClick={() => setActiveBook(b)}
                className={`w-full text-left px-2.5 py-1 text-xs rounded ${
                  activeBook === b ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
