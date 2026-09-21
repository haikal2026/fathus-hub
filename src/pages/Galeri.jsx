import { useState } from 'react';
import { DATA_GALERI, KATEGORI_GALERI } from '../data/galeri';

export default function Galeri() {
  const [kategori, setKategori] = useState('semua');
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    kategori === 'semua'
      ? DATA_GALERI
      : DATA_GALERI.filter((foto) => foto.kategori === kategori);

  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ============ HERO ============ */}
      <div className="rounded-[24px] bg-[#0F4C81] text-white p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-white rounded-full blur-[80px] opacity-[0.06]" />

        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
            📸 GALERI
          </div>
          <h1 className="mt-4 text-[28px] lg:text-[32px] font-extrabold leading-tight tracking-[-0.02em]">
            Galeri Sekolah
          </h1>
          <p className="text-[13px] text-white/70 mt-2 max-w-[560px]">
            Koleksi momen berharga dari kegiatan belajar, ekstrakurikuler,
            perlombaan, dan acara penting di MA Fathus Salafi Tanjung Rejo.
          </p>
        </div>
      </div>

      {/* ============ FILTER ============ */}
      <div className="flex flex-wrap gap-2">
        {KATEGORI_GALERI.map((k) => (
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

      {/* ============ GRID FOTO ============ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-[16px] text-slate-800">
            {KATEGORI_GALERI.find((k) => k.id === kategori)?.label} (
            {filtered.length})
          </h3>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-2">📸</div>
            <div className="font-bold text-slate-700">Belum ada foto</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((foto, i) => (
              <button
                key={foto.id}
                onClick={() => setLightbox(foto)}
                className={`group relative rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition text-left ${
                  i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div
                  className={`${foto.warna} flex items-center justify-center relative ${
                    i % 5 === 0 ? 'h-[280px]' : 'h-[140px]'
                  }`}
                >
                  <span className={`${i % 5 === 0 ? 'text-[64px]' : 'text-[40px]'}`}>
                    {foto.emoji}
                  </span>

                  {/* Overlay Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition">
                    <div className="text-[11px] font-bold leading-tight">
                      {foto.judul}
                    </div>
                    <div className="text-[10px] opacity-80">
                      {foto.tanggal}
                    </div>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <span className="text-[14px]">🔍</span>
                  </div>
                </div>

                {/* Info Selalu Terlihat */}
                <div className="p-3 bg-white">
                  <div className="text-[12px] font-bold text-slate-800 leading-tight line-clamp-1">
                    {foto.judul}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {foto.tanggal}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ============ LIGHTBOX ============ */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <div className="font-extrabold text-[14px] text-slate-800">
                  {lightbox.judul}
                </div>
                <div className="text-[11px] text-slate-500">
                  {lightbox.tanggal}
                </div>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition"
              >
                ✕
              </button>
            </div>

            {/* Image */}
            <div
              className={`${lightbox.warna} flex items-center justify-center py-20`}
            >
              <span className="text-[100px]">{lightbox.emoji}</span>
            </div>

            {/* Footer */}
            <div className="p-4 text-center text-[12px] text-slate-500">
              Klik di luar untuk menutup
            </div>
          </div>
        </div>
      )}
    </div>
  );
}