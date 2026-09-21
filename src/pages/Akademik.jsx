import { DATA_GURU } from '../data/guru';

export default function Akademik() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header Biru */}
      <div className="bg-[#0F4C81] rounded-3xl p-6 text-white">
        <div className="text-xs font-bold tracking-widest text-[#FBBF24]">
          AKADEMIK
        </div>
        <h1 className="mt-2 text-3xl font-extrabold">Guru Pengajar</h1>
        <p className="mt-1 text-sm text-white/70">
          Total {DATA_GURU.length} guru • TP 2026/2027
        </p>
      </div>

      {/* Grid Guru */}
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {DATA_GURU.map((guru) => (
          <div
            key={guru.kode}
            className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center font-extrabold shrink-0">
              {guru.foto}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-slate-800 leading-tight">
                {guru.nama}
              </div>
              <div className="text-xs text-slate-500 mt-1">{guru.mapel}</div>
              <div className="mt-2 inline-block text-[10px] bg-amber-50 border border-amber-200 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                Kode {guru.kode}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}