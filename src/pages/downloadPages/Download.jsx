import { useState, useMemo, useEffect } from 'react';
import {
  Download as DownloadIcon,
  Search,
  FileText,
  Eye,
  TrendingUp,
  Sparkles,
  Clock,
  FolderOpen,
  ArrowDownAZ,
} from 'lucide-react';
import {
  useDownload,
  filterByKategori,
  isFileBaru,
  getFormatStyle,
} from '../../hooks/useDownload';

const KATEGORI_LIST = [
  { id: 'semua', label: 'Semua' },
  { id: 'formulir', label: 'Formulir' },
  { id: 'kalender', label: 'Kalender' },
  { id: 'tatib', label: 'Tata Tertib' },
];

const SORT_OPTIONS = [
  { id: 'terbaru', label: 'Terbaru', icon: Clock },
  { id: 'populer', label: 'Terpopuler', icon: TrendingUp },
  { id: 'az', label: 'A - Z', icon: ArrowDownAZ },
];

export default function Download({ submenuId }) {
  const { list, loading, error, incrementDownload } = useDownload();
  const [kategori, setKategori] = useState(submenuId || 'semua');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('terbaru');

  // Sinkronkan kategori saat submenuId berubah (user klik submenu di sidebar)
  useEffect(() => {
    if (submenuId) setKategori(submenuId);
  }, [submenuId]);

  // Filter + Search + Sort
  const filtered = useMemo(() => {
    let result = filterByKategori(list, kategori);

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.judul?.toLowerCase().includes(q) ||
          item.deskripsi?.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result];
    if (sortBy === 'terbaru') {
      result.sort(
        (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
      );
    } else if (sortBy === 'populer') {
      result.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
    } else if (sortBy === 'az') {
      result.sort((a, b) => a.judul.localeCompare(b.judul));
    }

    return result;
  }, [list, kategori, search, sortBy]);

  // Statistik
  const totalDokumen = list.length;
  const totalKategori = KATEGORI_LIST.length - 1;
  const totalDownloads = list.reduce(
    (sum, item) => sum + (item.downloads || 0),
    0
  );

  // Format tanggal
  const formatTanggal = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Handle klik download
  const handleDownload = (item) => {
    incrementDownload(item);
    window.open(item.file_url, '_blank');
  };

  // Handle klik preview
  const handlePreview = (item) => {
    window.open(item.file_url, '_blank');
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
              <DownloadIcon className="w-3.5 h-3.5" />
              DOWNLOAD CENTER
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Pusat Unduhan
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Dokumen resmi MA Fathus Salafi — formulir, kalender akademik,
              dan tata tertib. Gratis diunduh untuk siswa, guru, dan orang tua.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <FileText className="w-4 h-4 text-[#FBBF24]" />
                {totalDokumen} Dokumen
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <FolderOpen className="w-4 h-4 text-[#FBBF24]" />
                {totalKategori} Kategori
              </div>
              <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] rounded-full px-4 py-1.5 text-[12px] font-extrabold">
                <DownloadIcon className="w-4 h-4" />
                {totalDownloads.toLocaleString('id-ID')}× diunduh
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH + FILTER + SORT */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 rounded-xl px-4 h-11 focus-within:ring-2 focus-within:ring-[#0F4C81]/20 focus-within:border-[#0F4C81]">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari dokumen berdasarkan judul atau deskripsi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[13px] placeholder:text-slate-400"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Kategori + Sort */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Kategori */}
            <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
              {KATEGORI_LIST.map((k) => {
                const aktif = kategori === k.id;
                const jumlah = filterByKategori(list, k.id).length;
                return (
                  <button
                    key={k.id}
                    onClick={() => setKategori(k.id)}
                    className={`whitespace-nowrap h-9 px-4 rounded-full text-[11.5px] font-extrabold border-2 transition-all flex items-center gap-2 ${
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

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Urut:
              </span>
              <div className="flex gap-1 p-1 bg-[#F8FAFC] border border-slate-200 rounded-xl">
                {SORT_OPTIONS.map((s) => {
                  const Icon = s.icon;
                  const aktif = sortBy === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`h-7 px-2.5 rounded-lg text-[10.5px] font-extrabold flex items-center gap-1 transition ${
                        aktif
                          ? 'bg-[#0F4C81] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-white'
                      }`}
                      title={s.label}
                    >
                      <Icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* KONTEN */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-16 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat dokumen...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-700 font-bold text-sm">Gagal memuat dokumen</p>
            <p className="text-red-600 text-xs mt-1">{error}</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="font-extrabold text-slate-800">Tidak ada dokumen</h3>
            <p className="text-slate-500 text-sm mt-1">
              {search
                ? 'Coba kata kunci lain atau reset filter.'
                : 'Belum ada dokumen di kategori ini.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => {
              const formatStyle = getFormatStyle(item.format);
              const baru = isFileBaru(item.tanggal);
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 hover:shadow-md hover:border-[#0F4C81]/30 transition group"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">

                    {/* Ikon Format */}
                    <div
                      className={`w-14 h-14 rounded-2xl border-2 ${formatStyle.warna} flex flex-col items-center justify-center shrink-0`}
                    >
                      <FileText className="w-6 h-6" />
                      <span className="text-[9px] font-extrabold mt-0.5">
                        {formatStyle.label}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-slate-200 text-slate-600 uppercase tracking-wider">
                          {item.kategori}
                        </span>
                        {baru && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500 text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            BARU
                          </span>
                        )}
                      </div>

                      <h3 className="text-[14px] lg:text-[15px] font-extrabold text-slate-900 leading-tight">
                        {item.judul}
                      </h3>

                      {item.deskripsi && (
                        <p className="text-[12px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.deskripsi}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {item.ukuran || '-'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatTanggal(item.tanggal)}
                        </span>
                        <span className="flex items-center gap-1 font-bold text-[#0F4C81]">
                          <DownloadIcon className="w-3 h-3" />
                          {item.downloads?.toLocaleString('id-ID') || 0}× diunduh
                        </span>
                      </div>
                    </div>

                    {/* Aksi */}
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handlePreview(item)}
                        className="h-10 px-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-slate-700 text-[12px] font-bold hover:border-[#0F4C81]/40 hover:bg-blue-50/30 transition flex items-center gap-2"
                        title="Preview dokumen"
                      >
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Preview</span>
                      </button>
                      <button
                        onClick={() => handleDownload(item)}
                        className="h-10 px-4 rounded-xl bg-[#0F4C81] text-white text-[12px] font-bold hover:bg-[#0d3f6b] transition flex items-center gap-2 shadow-sm"
                        title="Download dokumen"
                      >
                        <DownloadIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* INFO */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FBBF24]/30 flex items-center justify-center shrink-0">
            <DownloadIcon className="w-5 h-5 text-[#0F4C81]" />
          </div>
          <div>
            <div className="font-extrabold text-[13px] text-slate-800">
              Semua dokumen gratis & resmi
            </div>
            <div className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
              Dokumen di halaman ini adalah file resmi dari MA Fathus Salafi.
              Jika ada kendala, hubungi admin madrasah melalui menu Kontak.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}