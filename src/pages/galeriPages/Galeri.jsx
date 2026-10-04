import { useState, useMemo, useEffect } from 'react';
import {
  Camera,
  X,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react';
import { useGaleri, filterByKategori } from '../../hooks/useGaleri';

const KATEGORI_GALERI = [
  { id: 'semua', label: 'Semua Foto' },
  { id: 'belajar', label: 'Kegiatan Belajar' },
  { id: 'upacara', label: 'Upacara' },
  { id: 'maulid', label: 'Maulid' },
  { id: 'agustusan', label: 'Agustusan' },
  { id: 'pramuka', label: 'Pramuka' },
  { id: 'paskibra', label: 'Paskibra' },
  { id: 'osis', label: 'OSIS' },
  { id: 'lomba', label: 'Lomba' },
  { id: 'wisuda', label: 'Wisuda' },
];

export default function Galeri({ submenuId }) {
  const { list, loading, error } = useGaleri();
  const [kategori, setKategori] = useState(submenuId || 'semua');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Sync kategori saat submenuId berubah (klik submenu di sidebar)
  useEffect(() => {
    if (submenuId) setKategori(submenuId);
  }, [submenuId]);
  const fotoFiltered = useMemo(
    () => filterByKategori(list, kategori),
    [list, kategori]
  );

  const openLightbox = (idx) => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);
  const nextFoto = () =>
    setLightboxIndex((prev) => (prev + 1) % fotoFiltered.length);
  const prevFoto = () =>
    setLightboxIndex(
      (prev) => (prev - 1 + fotoFiltered.length) % fotoFiltered.length
    );

  const getKategoriLabel = (id) =>
    KATEGORI_GALERI.find((k) => k.id === id)?.label || id;

  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* HERO */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] text-white p-8 lg:p-10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] px-3 py-1 rounded-full text-[11px] font-extrabold tracking-widest">
              <Camera className="w-3.5 h-3.5" />
              GALERI SEKOLAH
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Galeri Kegiatan
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Kumpulan momen berharga kegiatan belajar, ekstrakurikuler,
              dan acara penting MA Fathus Salafi.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <ImageIcon className="w-4 h-4 text-[#FBBF24]" />
              {list.length} Foto • {KATEGORI_GALERI.length - 1} Kategori
            </div>
          </div>
        </div>

        {/* FILTER KATEGORI */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {KATEGORI_GALERI.map((k) => {
            const aktif = kategori === k.id;
            const jumlah = filterByKategori(list, k.id).length;
            return (
              <button
                key={k.id}
                onClick={() => setKategori(k.id)}
                className={`whitespace-nowrap h-10 px-4 rounded-full text-[12px] font-extrabold border-2 transition-all flex items-center gap-2 ${
                  aktif
                    ? 'bg-[#0F4C81] text-white border-[#0F4C81] shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81]/40'
                }`}
              >
                {k.label}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    aktif
                      ? 'bg-[#FBBF24] text-[#0F4C81]'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {jumlah}
                </span>
              </button>
            );
          })}
        </div>

        {/* KONTEN */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat galeri...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-700 font-bold text-sm">Gagal memuat galeri</p>
            <p className="text-red-600 text-xs mt-1">{error}</p>
          </div>
        ) : fotoFiltered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-extrabold text-slate-800">Belum ada foto</h3>
            <p className="text-slate-500 text-sm mt-1">
              Foto untuk kategori ini akan segera diunggah.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {fotoFiltered.map((foto, idx) => (
              <button
                key={foto.id}
                onClick={() => openLightbox(idx)}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <img
                  src={foto.image_url}
                  alt={foto.judul}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-left text-white">
                  <div className="text-[10px] font-bold bg-[#FBBF24] text-[#0F4C81] px-2 py-0.5 rounded-full inline-block mb-1.5">
                    {getKategoriLabel(foto.kategori)}
                  </div>
                  <div className="text-[12px] font-extrabold leading-tight line-clamp-2 drop-shadow">
                    {foto.judul}
                  </div>
                  <div className="text-[10px] text-white/80 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatTanggal(foto.tanggal)}
                  </div>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </button>
            ))}
          </div>
        )}

        {/* INFO */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FBBF24]/30 flex items-center justify-center shrink-0">
            <Camera className="w-5 h-5 text-[#0F4C81]" />
          </div>
          <div>
            <div className="font-extrabold text-[13px] text-slate-800">
              Klik foto untuk melihat lebih besar
            </div>
            <div className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
              Galeri ini dikelola langsung oleh admin madrasah. Foto akan
              terus diperbarui dengan dokumentasi kegiatan terbaru.
            </div>
          </div>
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {fotoFiltered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevFoto();
              }}
              className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div
            className="max-w-[900px] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl relative bg-slate-900">
              <img
                src={fotoFiltered[lightboxIndex].image_url}
                alt={fotoFiltered[lightboxIndex].judul}
                className="w-full max-h-[70vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                <div className="text-[11px] font-bold bg-[#FBBF24] text-[#0F4C81] px-3 py-1 rounded-full inline-block mb-3">
                  {getKategoriLabel(fotoFiltered[lightboxIndex].kategori)}
                </div>
                <h2 className="text-[20px] lg:text-[26px] font-extrabold leading-tight">
                  {fotoFiltered[lightboxIndex].judul}
                </h2>
                {fotoFiltered[lightboxIndex].deskripsi && (
                  <p className="mt-2 text-[13px] text-white/85 leading-relaxed max-w-[600px]">
                    {fotoFiltered[lightboxIndex].deskripsi}
                  </p>
                )}
                <div className="mt-2 text-[12px] text-white/80 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatTanggal(fotoFiltered[lightboxIndex].tanggal)}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center text-white/70 text-[12px] font-bold">
              {lightboxIndex + 1} / {fotoFiltered.length}
            </div>
          </div>

          {fotoFiltered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextFoto();
              }}
              className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}