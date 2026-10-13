"use client";

import { useState } from "react";
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
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians", "1 Timothy",
  "2 Timothy", "Titus", "Philemon", "Hebrews", "James",
  "1 Peter", "2 Peter", "1 John", "2 John", "3 John",
  "Jude", "Revelation"
];

function getBook(ref: string) {
  return ref.split(" ")[0].replace(/[0-9]/g, "").trim() || ref.split(" ")[0];
}

export default function Home() {
  const [selected, setSelected] = useState<Connection>(connections[0]);
  const [hovered, setHovered] = useState<string | null>(null);

  const targets = Array.from(new Set(connections.map(c => getBook(c.to))));

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="h-16 border-b border-white/5 flex items-center px-8 justify-between bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 via-amber-300 to-violet-500 shadow-lg shadow-violet-500/30" />
          <div>
            <span className="font-semibold tracking-tight text-lg">DabarViz</span>
            <span className="text-xs text-white/30 ml-3 tracking-widest uppercase">Multi-Book Arcs</span>
          </div>
        </div>
        <div className="text-sm text-white/40">Genesis → Later Books</div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Education Panel */}
        <aside className="w-96 border-r border-white/5 p-7 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Education</div>
          <h2 className="text-3xl font-light mb-1 tracking-tight">{selected.from}</h2>
          <p className="text-sm text-white/50 mb-6">Connected to {selected.to}</p>

          <div className="bg-black/60 rounded-2xl p-5 mb-8 border border-white/5">
            <p className="text-base leading-relaxed font-light">{selected.evidence}</p>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2">Type</div>
          <div className="text-emerald-400 text-sm mb-6">{selected.type}</div>

          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-3">Strength</div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-amber-300 to-violet-400"
              style={{ width: `${selected.strength * 100}%` }}
            />
          </div>
          <div className="text-xs text-white/40 mt-2">{(selected.strength * 100).toFixed(0)}%</div>
        </aside>

        {/* Arc Canvas */}
        <main className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_#0a0a1f_0%,_#000_70%)] overflow-hidden">
          <div className="absolute top-6 left-0 right-0 text-center">
            <h1 className="text-2xl font-light tracking-tight">Multi-Book Arcs</h1>
            <p className="text-xs text-white/40 mt-1">Arcs originate at Genesis and land on later books</p>
          </div>

          <svg viewBox="0 0 1000 500" className="w-full h-full absolute inset-0" preserveAspectRatio="xMidYMid meet">
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

            {/* Origin point */}
            <circle cx="80" cy="420" r="5" fill="#34d399" />
            <text x="80" y="445" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12">Genesis</text>

            {/* Target points and arcs */}
            {targets.map((book, i) => {
              const x = 200 + (i * (700 / Math.max(targets.length - 1, 1)));
              const y = 420;
              const midY = 120 + (i % 3) * 40;
              const conn = connections.find(c => getBook(c.to) === book);
              const isActive = selected && getBook(selected.to) === book;
              const isHover = hovered === book;

              return (
                <g key={book}>
                  <path
                    d={`M 80 420 Q ${(80 + x) / 2} ${midY} ${x} ${y}`}
                    fill="none"
                    stroke={isActive || isHover ? "#fbbf24" : "url(#arcGrad)"}
                    strokeWidth={isActive || isHover ? 3.5 : 1.8}
                    opacity={isActive || isHover ? 1 : 0.55}
                    filter="url(#glow)"
                    className="cursor-pointer"
                    onClick={() => conn && setSelected(conn)}
                    onMouseEnter={() => setHovered(book)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isActive || isHover ? 6 : 4}
                    fill={isActive || isHover ? "#fbbf24" : "#a78bfa"}
                    className="cursor-pointer"
                    onClick={() => conn && setSelected(conn)}
                  />
                  <text
                    x={x}
                    y={y + 22}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.7)"
                    fontSize="11"
                    className="cursor-pointer"
                    onClick={() => conn && setSelected(conn)}
                  >
                    {book}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] uppercase tracking-[0.2em] text-white/25">
            Click any arc. The education card updates with the connection.
          </div>
        </main>

        {/* Books List */}
        <aside className="w-64 border-l border-white/5 p-5 overflow-y-auto bg-gradient-to-b from-white/[0.02] to-transparent">
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Books</div>
          <div className="space-y-0.5">
            {books.map((book) => {
              const hasConnection = targets.includes(book);
              return (
                <button
                  key={book}
                  onClick={() => {
                    const conn = connections.find(c => getBook(c.to) === book);
                    if (conn) setSelected(conn);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm transition ${
                    selected && getBook(selected.to) === book
                      ? "bg-white/10 text-white"
                      : hasConnection
                      ? "text-white/70 hover:bg-white/5"
                      : "text-white/30"
                  }`}
                >
                  {book}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
