export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 bg-gradient-to-r from-emerald-400 via-amber-300 to-violet-400 bg-clip-text text-transparent">
          DabarViz
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Visualizing the Word (Dabar) of God
        </p>
        <p className="text-gray-400 mb-12">
          Genesis 1 ↔ John 1 — the first connection in the living tapestry.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-emerald-400 text-sm font-medium mb-2">ARC</div>
            <div className="font-semibold">Rainbow Connections</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-amber-400 text-sm font-medium mb-2">GRAPH</div>
            <div className="font-semibold">Theme Network</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-violet-400 text-sm font-medium mb-2">GLOBE</div>
            <div className="font-semibold">Biblical World</div>
          </div>
        </div>
      </div>
    </main>
  );
}
