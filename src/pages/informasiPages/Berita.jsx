import { useEffect, useState } from 'react';
import { Newspaper, Search, Calendar, Tag, ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const KATEGORI_FILTER = [
  { id: 'semua', label: 'Semua' },
  { id: 'Prestasi', label: 'Prestasi' },
  { id: 'Akademik', label: 'Akademik' },
  { id: 'Ekstrakurikuler', label: 'Ekstrakurikuler' },
  { id: 'Kesiswaan', label: 'Kesiswaan' },
  { id: 'Umum', label: 'Umum' },
];

// Gradient warna untuk header kartu berita (bervariasi)
const GRADIENTS = [
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-emerald-700',
  'from-purple-500 to-purple-700',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-rose-700',
  'from-cyan-500 to-cyan-700',
];

export default function Berita() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('berita')
          .select('*')
          .order('tanggal', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setList(data || []);
      } catch (err) {
        console.error('Error fetch berita:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter
  const filteredList = list.filter((b) => {
    const q = search.toLowerCase();
    const matchSearch =
      b.judul?.toLowerCase().includes(q) ||
      b.isi?.toLowerCase().includes(q) ||
      b.ringkasan?.toLowerCase().includes(q) ||
      b.kategori?.toLowerCase().includes(q);

    const matchFilter = filter === 'semua' || b.kategori === filter;

    return matchSearch && matchFilter;
  });

  function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }

  function warnaKategori(kategori) {
    switch (kategori) {
      case 'Prestasi':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Akademik':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Ekstrakurikuler':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Kesiswaan':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  }

  const totalBerita = list.length;

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1100px] mx-auto space-y-6">

        {/* ============================================
            BAGIAN 1: HERO
        ============================================ */}
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
              <Newspaper className="w-3.5 h-3.5" />
              BERITA SEKOLAH
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Berita & Kabar Terbaru
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Informasi terkini seputar prestasi, kegiatan, dan perkembangan
              MA Fathus Salafi.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Newspaper className="w-4 h-4 text-[#FBBF24]" />
              {totalBerita} Berita Terdaftar
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 2: SEARCH & FILTER
        ============================================ */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul atau isi berita..."
              className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 bg-white text-[13px] outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20 transition"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {KATEGORI_FILTER.map((f) => {
              const isActive = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`whitespace-nowrap h-8 px-4 rounded-full text-[11px] font-bold border transition ${
                    isActive
                      ? 'bg-[#0F4C81] text-white border-[#0F4C81] shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81]/30'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================
            BAGIAN 3: GRID KARTU BERITA
        ============================================ */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat berita...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Newspaper className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              {search
                ? 'Tidak ada berita yang cocok.'
                : filter !== 'semua'
                ? `Belum ada berita kategori "${filter}".`
                : 'Belum ada berita.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filteredList.map((b, idx) => {
              const gradient = GRADIENTS[idx % GRADIENTS.length];
              return (
                <div
                  key={b.id}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition group cursor-pointer"
                >
                  {/* Header: gradient + kategori */}
                  <div
                    className={`relative h-[110px] bg-gradient-to-br ${gradient} overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '18px 18px',
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/95 ${warnaKategori(
                          b.kategori
                        )}`}
                      >
                        <Tag className="w-3 h-3" />
                        {b.kategori || 'Umum'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <Newspaper className="w-8 h-8 text-white/80" />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    {/* Tanggal */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                      <Calendar className="w-3 h-3" />
                      {formatTanggal(b.tanggal)}
                    </div>

                    {/* Judul */}
                    <h3 className="font-extrabold text-[15px] text-slate-900 leading-snug line-clamp-2 group-hover:text-[#0F4C81] transition">
                      {b.judul}
                    </h3>

                    {/* Ringkasan / Isi */}
                    {(b.ringkasan || b.isi) && (
                      <p className="mt-2 text-[12.5px] text-slate-600 leading-relaxed line-clamp-3">
                        {b.ringkasan || b.isi}
                      </p>
                    )}

                    {/* Link */}
                    <div className="mt-3 inline-flex items-center gap-1 text-[11.5px] font-bold text-[#0F4C81] group-hover:gap-2 transition-all">
                      Baca selengkapnya
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Info jumlah */}
        {!loading && filteredList.length > 0 && (
          <div className="text-center text-[11px] text-slate-400 font-medium pt-2">
            Menampilkan {filteredList.length} dari {totalBerita} berita
            {filter !== 'semua' && (
              <span className="ml-1">• Filter: {filter}</span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}