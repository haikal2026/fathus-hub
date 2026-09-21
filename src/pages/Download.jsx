import { useState } from 'react';
import { DATA_DOWNLOAD, KATEGORI_DOWNLOAD } from '../data/download';

export default function Download() {
  const [kategori, setKategori] = useState('semua');
  const [search, setSearch] = useState('');

  const filtered = DATA_DOWNLOAD.filter((d) => {
    const matchSearch = d.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori = kategori === 'semua' || d.kategori === kategori;
    return matchSearch && matchKategori;
  });

  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ============ HERO ============ */}
      <div className="rounded-[24px] bg-[#0F4C81] text-white p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-white rounded-full blur-[80px] opacity-[0.06]" />

        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
            📥 DOWNLOAD
          </div>
          <h1 className="mt-4 text-[28px] lg:text-[32px] font-extrabold leading-tight tracking-[-0.02em]">
            Download Center
          </h1>
          <p className="text-[13px] text-white/70 mt-2 max-w-[560px]">
            Unduh formulir, kalender akademik, panduan, tata tertib, dan materi
            pembelajaran MA Fathus Salafi.
          </p>

          <div className="mt-5 flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 h-12 max-w-[480px] backdrop-blur">
            <span className="text-white/60">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari dokumen..."
              className="flex-1 outline-none text-[14px] bg-transparent text-white placeholder:text-white/50"
            />
          </div>
        </div>
      </div>

      {/* ============ STATISTIK ============ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-[#0F4C81] text-white p-4">
          <div className="text-[10px] font-bold bg-[#FBBF24] text-[#0F4C81] px-2 py-0.5 rounded-full inline-block">
            TOTAL
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none">
            {DATA_DOWNLOAD.length}
          </div>
          <div className="text-[12px] font-bold mt-1">Dokumen</div>
        </div>

        <div className="rounded-2xl bg-white border p-4">
          <div className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full inline-block">
            PDF
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none text-[#0F4C81]">
            {DATA_DOWNLOAD.filter((d) => d.type === 'PDF').length}
          </div>
          <div className="text-[12px] font-bold mt-1 text-slate-700">File PDF</div>
        </div>

        <div className="rounded-2xl bg-[#FBBF24] text-[#0F4C81] p-4">
          <div className="text-[10px] font-bold bg-[#0F4C81] text-white px-2 py-0.5 rounded-full inline-block">
            EXCEL
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none">
            {DATA_DOWNLOAD.filter((d) => d.type === 'Excel').length}
          </div>
          <div className="text-[12px] font-bold mt-1">Spreadsheet</div>
        </div>

        <div className="rounded-2xl bg-[#1E3A8A] text-white p-4">
          <div className="text-[10px] font-bold bg-white/15 border border-white/20 px-2 py-0.5 rounded-full inline-block">
            UNDUHAN
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none">
            {DATA_DOWNLOAD.reduce((sum, d) => sum + d.downloads, 0)}
          </div>
          <div className="text-[12px] font-bold mt-1">Total Unduhan</div>
        </div>
      </div>

      {/* ============ FILTER ============ */}
      <div className="flex flex-wrap gap-2">
        {KATEGORI_DOWNLOAD.map((k) => (
          <button
            key={k.id}
            onClick={() => setKategori(k.id)}
            className={`h-9 px-4 rounded-full text-[12px] font-bold border transition ${
              kategori === k.id
                ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                : 'bg-white border-slate-200 text-slate-600 hover:border-[#0F4C81]/30'
            }`}
          >
            {k.emoji} {k.label}
          </button>
        ))}
      </div>

      {/* ============ LIST DOKUMEN ============ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-[16px] text-slate-800">
            Daftar Dokumen ({filtered.length})
          </h3>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-2">📁</div>
            <div className="font-bold text-slate-700">Tidak ada dokumen</div>
            <div className="text-[12px] text-slate-500 mt-1">
              Coba ubah kata kunci atau kategori
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((dok) => (
              <div
                key={dok.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 hover:shadow-md transition"
              >
                {/* Icon Tipe */}
                <div
                  className={`w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                    dok.type === 'PDF'
                      ? 'bg-red-50 text-red-600'
                      : dok.type === 'Excel'
                      ? 'bg-green-50 text-green-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  <div className="text-[10px] font-extrabold">{dok.type}</div>
                  <div className="text-[18px]">
                    {dok.type === 'PDF'
                      ? '📄'
                      : dok.type === 'Excel'
                      ? '📊'
                      : '📝'}
                  </div>
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold text-slate-800 leading-tight">
                    {dok.nama}
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-full font-bold">
                      {KATEGORI_DOWNLOAD.find((k) => k.id === dok.kategori)
                        ?.label || dok.kategori}
                    </span>
                    <span>📦 {dok.size}</span>
                    <span>📅 {dok.tgl}</span>
                    <span>⬇️ {dok.downloads}x diunduh</span>
                  </div>
                </div>

                {/* Tombol Download */}
                <button
                  className={`h-10 px-4 rounded-full text-[12px] font-bold flex items-center gap-1.5 transition shrink-0 ${
                    dok.type === 'PDF'
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : dok.type === 'Excel'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  ⬇️ Download
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============ INFO BANNER ============ */}
      <div className="bg-[#0F4C81] rounded-2xl p-6 text-white flex gap-4 items-start">
        <div className="text-[28px] shrink-0">ℹ️</div>
        <div>
          <div className="font-bold text-[14px]">Informasi</div>
          <div className="text-[12px] text-white/80 mt-1 leading-relaxed">
            Semua dokumen dalam format PDF, Excel, atau Word. Untuk dokumen
            yang memerlukan pengisian, silakan unduh, isi, lalu serahkan ke
            bagian administrasi madrasah. Jika ada kendala, hubungi bagian Tata
            Usaha.
          </div>
        </div>
      </div>
    </div>
  );
}