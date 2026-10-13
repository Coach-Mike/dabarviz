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
          <div className="text-white/40 text-sm">Select a connection line to study.</div>
        )}
      </aside>

      {/* MIDDLE — Mapping Canvas (Infinite Scroll) */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="min-h-[200vh] px-12 py-16">
          <div className="text-center mb-12">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">DabarViz</div>
            <h1 className="text-4xl font-light tracking-tight">The Living Map</h1>
            <p className="text-white/40 text-sm mt-2">Click a line to expand. Continue to drill into Genesis.</p>
          </div>

          {/* Connection Lines */}
          <div className="relative space-y-8">
            {visibleConnections.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setFocus(c);
                  if (depth < 3) setDepth(d => d + 1);
                }}
                className={`w-full text-left group relative ${
                  focus?.id === c.id ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/40 via-amber-300/40 to-violet-400/40 group-hover:from-emerald-400 group-hover:via-amber-300 group-hover:to-violet-400 transition-all" />
                  <div className={`px-4 py-2 rounded-full text-sm border transition-all ${
                    focus?.id === c.id
                      ? "bg-white/10 border-white/30"
                      : "bg-white/[0.03] border-white/10 group-hover:border-white/20"
                  }`}
                  >
                    {c.from} → {c.to}
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-l from-emerald-400/40 via-amber-300/40 to-violet-400/40 group-hover:from-emerald-400 group-hover:via-amber-300 group-hover:to-violet-400 transition-all" />
                </div>
                <div className="text-[10px] text-white/30 mt-1 text-center">{c.type}</div>
              </button>
            ))}
          </div>

          <div className="mt-24 text-center text-white/30 text-sm">
            {depth < 3 ? "Click any line to expand deeper into the connections." : "Full Genesis connection set visible."}
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
