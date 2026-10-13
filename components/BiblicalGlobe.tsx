"use client";

import { useState, useRef } from "react";

export default function BiblicalGlobe({ onSelect }: { onSelect: (place: string) => void }) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const startRot = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX;
    startRot.current = rotation;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    setRotation(startRot.current + delta * 0.6);
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-52 h-52 cursor-grab active:cursor-grabbing select-none touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={() => onSelect("Jerusalem")}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900/50 via-slate-800/70 to-amber-900/40 border border-white/20 shadow-[0_0_100px_rgba(59,130,246,0.25)]" />
        <div className="absolute inset-8 rounded-full border border-white/15" />
        <div className="absolute inset-0 flex items-center justify-center text-[11px] uppercase tracking-[0.3em] text-white/50 font-medium">
          Biblical Globe
        </div>
        <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_16px_#fbbf24]" />
      </div>
    </div>
  );
}
