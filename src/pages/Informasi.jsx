import { useState } from 'react';
import { DATA_PENGUMUMAN, DATA_BERITA, DATA_AGENDA } from '../data/informasi';

const TABS = [
  { id: 'semua', label: 'Semua' },
  { id: 'pengumuman', label: '📢 Pengumuman' },
  { id: 'berita', label: '📰 Berita' },
  { id: 'agenda', label: '📅 Agenda' },
];

export default function Informasi() {
  const [tab, setTab] = useState('semua');
  const [search, setSearch] = useState('');

  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ============ HERO ============ */}
      <div className="rounded-[24px] bg-[#0F4C81] text-white p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-white rounded-full blur-[80px] opacity-[0.06]" />

        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
            📢 INFORMASI
          </div>
          <h1 className="mt-4 text-[28px] lg:text-[32px] font-extrabold leading-tight tracking-[-0.02em]">
            Informasi Sekolah
          </h1>
          <p className="text-[13px] text-white/70 mt-2 max-w-[520px]">
            Pengumuman resmi, berita terkini, dan agenda kegiatan MA Fathus
            Salafi Tanjung Rejo.
          </p>

          {/* Search */}
          <div className="mt-5 flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 h-12 max-w-[480px] backdrop-blur">
            <span className="text-white/60">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari pengumuman, berita, agenda..."
              className="flex-1 outline-none text-[14px] bg-transparent text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      {/* ============ TAB FILTER ============ */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`h-9 px-4 rounded-full text-[12px] font-bold border transition ${
              tab === t.id
                ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                : 'bg-white border-slate-200 text-slate-600 hover:border-[#0F4C81]/30'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ============ PENGUMUMAN ============ */}
      {(tab === 'semua' || tab === 'pengumuman') && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#FBBF24] flex items-center justify-center text-[16px]">
              📢
            </div>
            <h2 className="font-extrabold text-[16px] text-slate-800">
              Pengumuman Resmi
            </h2>
            <div className="h-px flex-1 bg-slate-200 ml-2" />
            <span className="text-[11px] text-slate-500">
              {DATA_PENGUMUMAN.length} pengumuman
            </span>
          </div>

          <div className="space-y-3">
            {DATA_PENGUMUMAN.filter(
              (p) =>
                p.judul.toLowerCase().includes(search.toLowerCase()) ||
                p.kategori.toLowerCase().includes(search.toLowerCase())
            ).map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-[20px] ${
                      p.penting ? 'bg-amber-100' : 'bg-blue-50'
                    }`}
                  >
                    {p.penting ? '⚠️' : '📢'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-[10px] bg-[#0F4C81] text-white px-2 py-0.5 rounded-full font-bold">
                        {p.kategori}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {p.tgl}
                      </span>
                      {p.penting && (
                        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                          PENTING
                        </span>
                      )}
                    </div>
                    <h3 className="text-[15px] font-extrabold text-slate-800 leading-tight">
                      {p.judul}
                    </h3>
                    <p className="mt-2 text-[12.5px] text-slate-600 leading-relaxed">
                      {p.isi}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ BERITA ============ */}
      {(tab === 'semua' || tab === 'berita') && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#0F4C81] flex items-center justify-center text-white text-[16px]">
              📰
            </div>
            <h2 className="font-extrabold text-[16px] text-slate-800">
              Berita Sekolah
            </h2>
            <div className="h-px flex-1 bg-slate-200 ml-2" />
            <span className="text-[11px] text-slate-500">
              {DATA_BERITA.length} berita
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {DATA_BERITA.filter(
              (b) =>
                b.judul.toLowerCase().includes(search.toLowerCase()) ||
                b.kategori.toLowerCase().includes(search.toLowerCase())
            ).map((b) => (
              <div
                key={b.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition"
              >
                {/* Cover */}
                <div className="h-[140px] bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] flex items-center justify-center relative">
                  <span className="text-[40px]">📰</span>
                  <div className="absolute top-2 left-2 text-[10px] font-bold bg-white/90 text-slate-800 px-2 py-0.5 rounded-full">
                    {b.kategori}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                    {b.tgl}
                  </div>
                  <h3 className="mt-2 text-[14px] font-extrabold leading-tight text-slate-800">
                    {b.judul}
                  </h3>
                  <p className="mt-2 text-[12px] text-slate-600 leading-relaxed line-clamp-2">
                    {b.desc}
                  </p>
                  <button className="mt-3 text-[12px] font-bold text-[#0F4C81]">
                    Baca selengkapnya →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ AGENDA ============ */}
      {(tab === 'semua' || tab === 'agenda') && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-xl bg-[#0F4C81] flex items-center justify-center text-white text-[16px]">
              📅
            </div>
            <h2 className="font-extrabold text-[16px] text-slate-800">
              Agenda Mendatang
            </h2>
            <div className="h-px flex-1 bg-slate-200 ml-2" />
            <span className="text-[11px] text-slate-500">
              {DATA_AGENDA.length} agenda
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {DATA_AGENDA.map((a) => (
              <div
                key={a.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-4 hover:shadow-md transition"
              >
                {/* Date */}
                <div
                  className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center leading-none shrink-0 ${
                    a.penting
                      ? 'bg-[#FBBF24] text-[#0F4C81]'
                      : 'bg-[#0F4C81] text-white'
                  }`}
                >
                  <div className="text-[22px] font-extrabold">{a.tgl}</div>
                  <div className="text-[10px] font-bold tracking-widest">
                    {a.bln}
                  </div>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-bold">
                      {a.kategori}
                    </span>
                    {a.penting && (
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                        PENTING
                      </span>
                    )}
                  </div>
                  <h3 className="text-[14px] font-bold text-slate-800 leading-tight">
                    {a.judul}
                  </h3>
                  <div className="mt-2 text-[11px] text-slate-500 space-y-0.5">
                    <div>🕐 {a.waktu}</div>
                    <div>📍 {a.lokasi}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============ EMPTY STATE ============ */}
      {tab === 'semua' && search && (
        <>
          {DATA_PENGUMUMAN.filter((p) =>
            p.judul.toLowerCase().includes(search.toLowerCase())
          ).length === 0 &&
            DATA_BERITA.filter((b) =>
              b.judul.toLowerCase().includes(search.toLowerCase())
            ).length === 0 && (
              <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
                <div className="text-4xl mb-2">🔍</div>
                <div className="font-bold text-slate-700">
                  Tidak ada hasil untuk "{search}"
                </div>
                <div className="text-[12px] text-slate-500 mt-1">
                  Coba kata kunci lain
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
}