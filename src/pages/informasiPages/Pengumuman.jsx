import { useEffect, useState } from 'react';
import { Megaphone, Search, AlertCircle, Bell, Calendar, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const KATEGORI_FILTER = [
  { id: 'semua', label: 'Semua' },
  { id: 'Akademik', label: 'Akademik' },
  { id: 'Kesiswaan', label: 'Kesiswaan' },
  { id: 'Umum', label: 'Umum' },
  { id: 'Pengumuman', label: 'Pengumuman' },
];

export default function Pengumuman() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('pengumuman')
          .select('*')
          .order('tanggal', { ascending: false })
          .order('created_at', { ascending: false });

        if (error) throw error;
        setList(data || []);
      } catch (err) {
        console.error('Error fetch pengumuman:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter: search + kategori
  const filteredList = list.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      p.judul?.toLowerCase().includes(q) ||
      p.isi?.toLowerCase().includes(q) ||
      p.kategori?.toLowerCase().includes(q);

    const matchFilter = filter === 'semua' || p.kategori === filter;

    return matchSearch && matchFilter;
  });

  // Helper: format tanggal
  function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }

  // Helper: warna kategori
  function warnaKategori(kategori) {
    switch (kategori) {
      case 'Akademik':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Kesiswaan':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Umum':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Pengumuman':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  }

  // Statistik
  const totalPengumuman = list.length;
  const totalPenting = list.filter((p) => p.penting).length;
  const totalBulanIni = list.filter((p) => {
    if (!p.tanggal) return false;
    const d = new Date(p.tanggal);
    const now = new Date();
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  }).length;

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
              <Megaphone className="w-3.5 h-3.5" />
              PENGUMUMAN
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Pengumuman Terbaru
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Informasi resmi dari MA Fathus Salafi untuk siswa, guru, dan
              orang tua.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Bell className="w-4 h-4 text-[#FBBF24]" />
              {totalPengumuman} Pengumuman Terdaftar
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 2: STATISTIK
        ============================================ */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Megaphone className="w-4 h-4 text-[#0F4C81]" />
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-[#0F4C81] px-2 py-0.5 rounded-full">
                TOTAL
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-[#0F4C81] leading-none">
              {loading ? '...' : totalPengumuman}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Pengumuman
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                PENTING
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-red-600 leading-none">
              {loading ? '...' : totalPenting}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Ditandai Penting
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                BULAN INI
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-emerald-600 leading-none">
              {loading ? '...' : totalBulanIni}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Pengumuman Baru
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 3: SEARCH & FILTER
        ============================================ */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul atau isi pengumuman..."
              className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 bg-white text-[13px] outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20 transition"
            />
          </div>

          {/* Filter Kategori */}
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
            BAGIAN 4: DAFTAR PENGUMUMAN
        ============================================ */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat pengumuman...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Megaphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              {search
                ? 'Tidak ada pengumuman yang cocok dengan pencarian.'
                : filter !== 'semua'
                ? `Belum ada pengumuman kategori "${filter}".`
                : 'Belum ada pengumuman.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((p) => (
              <div
                key={p.id}
                className={`bg-white rounded-2xl p-5 border transition hover:shadow-md ${
                  p.penting
                    ? 'border-red-200 bg-red-50/30'
                    : 'border-slate-200'
                }`}
              >
                {/* Header: kategori + tanggal + badge penting */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full border ${warnaKategori(
                      p.kategori
                    )}`}
                  >
                    <Tag className="w-3 h-3" />
                    {p.kategori || 'Umum'}
                  </span>

                  {p.penting && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-full bg-red-100 text-red-700 border border-red-200">
                      <AlertCircle className="w-3 h-3" />
                      PENTING
                    </span>
                  )}

                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 ml-auto">
                    <Calendar className="w-3 h-3" />
                    {formatTanggal(p.tanggal)}
                  </span>
                </div>

                {/* Judul */}
                <h3 className="font-extrabold text-[15px] text-slate-900 leading-tight mb-2">
                  {p.judul}
                </h3>

                {/* Isi */}
                <p className="text-[13px] text-slate-600 leading-relaxed whitespace-pre-line">
                  {p.isi}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Info jumlah */}
        {!loading && filteredList.length > 0 && (
          <div className="text-center text-[11px] text-slate-400 font-medium pt-2">
            Menampilkan {filteredList.length} dari {totalPengumuman} pengumuman
            {filter !== 'semua' && (
              <span className="ml-1">• Filter: {filter}</span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}