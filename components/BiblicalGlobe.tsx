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
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX.current;
    setRotation(startRot.current + delta * 0.5);
  };

  const handlePointerUp = () => setIsDragging(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-48 h-48 cursor-grab active:cursor-grabbing select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onClick={() => onSelect("Jerusalem")}
        style={{ transform: `rotateY(${rotation}deg)` }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-900/40 via-slate-800/60 to-amber-900/30 border border-white/15 shadow-[0_0_80px_rgba(59,130,246,0.2)]" />
        <div className="absolute inset-6 rounded-full border border-white/10" />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-[0.25em] text-white/40">
          Biblical Globe
        </div>
        <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]" />
      </div>
    </div>
  );
}
