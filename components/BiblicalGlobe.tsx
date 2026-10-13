"use client";

import { useState, useRef } from "react";

const markers = [
  { id: "eden", name: "Eden", x: 30, y: 40 },
  { id: "babel", name: "Babel", x: 55, y: 35 },
  { id: "ur", name: "Ur", x: 70, y: 50 },
  { id: "jerusalem", name: "Jerusalem", x: 48, y: 55 },
];

export default function BiblicalGlobe({ onSelect }: { onSelect: (place: string) => void }) {
  const [rotX, setRotX] = useState(-15);
  const [rotY, setRotY] = useState(20);
  const [isDragging, setIsDragging] = useState(false);
  const start = useRef({ x: 0, y: 0, rx: 0, ry: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    start.current = { x: e.clientX, y: e.clientY, rx: rotX, ry: rotY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    setRotY(start.current.ry + dx * 0.4);
    setRotX(Math.max(-60, Math.min(60, start.current.rx - dy * 0.3)));
  };

  const onPointerUp = () => setIsDragging(false);

  return (
    <div className="w-full h-full flex items-center justify-center perspective-[1200px]">
      <div
        className="relative w-64 h-64 cursor-grab active:cursor-grabbing select-none touch-none"
        style={{
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          transformStyle: "preserve-3d",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Sphere body */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-950/80 via-slate-900/90 to-amber-950/60 border border-white/20 shadow-[0_0_120px_rgba(59,130,246,0.3),inset_0_0_40px_rgba(0,0,0,0.6)]" />

        {/* Latitude / longitude rings */}
        <div className="absolute inset-0 rounded-full border border-white/10" style={{ transform: "rotateX(90deg)" }} />
        <div className="absolute inset-4 rounded-full border border-white/8" />
        <div className="absolute inset-8 rounded-full border border-white/5" />

        {/* Markers */}
        {markers.map((m) => (
          <button
            key={m.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(m.name);
            }}
            className="absolute w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24] hover:scale-150 transition-transform"
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            title={m.name}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.35em] text-white/40 font-medium pointer-events-none">
          Biblical World
        </div>
      </div>
    </div>
  );
}
