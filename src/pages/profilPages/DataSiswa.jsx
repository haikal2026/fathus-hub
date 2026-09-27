import { useEffect, useState } from 'react';
import { Users, Search, GraduationCap, UserCheck, User } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Filter kelas
const FILTER_KELAS = [
  { id: 'semua', label: 'Semua', kelasAsli: null },
  { id: 'X Putra', label: 'X Putra', kelasAsli: 'X-A' },
  { id: 'X Putri', label: 'X Putri', kelasAsli: 'X-B' },
  { id: 'XI Putra', label: 'XI Putra', kelasAsli: 'XI-A' },
  { id: 'XI Putri', label: 'XI Putri', kelasAsli: 'XI-B' },
  { id: 'XII Putra', label: 'XII Putra', kelasAsli: 'XII-A' },
  { id: 'XII Putri', label: 'XII Putri', kelasAsli: 'XII-B' },
];

export default function DataSiswa() {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterKelas, setFilterKelas] = useState('semua');

  useEffect(() => {
    async function fetchSiswa() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'siswa')
          .order('nama', { ascending: true });

        if (error) throw error;
        setSiswaList(data || []);
      } catch (err) {
        console.error('Error fetch siswa:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSiswa();
  }, []);

  // Filter: search + kelas
  const filteredSiswa = siswaList.filter((s) => {
  const q = search.toLowerCase();
  const matchSearch =
    s.nama?.toLowerCase().includes(q) ||
    s.nis_nip?.toLowerCase().includes(q) ||
    s.kelas?.toLowerCase().includes(q);

  // Cari kelas asli dari filter yang aktif
  const activeFilter = FILTER_KELAS.find((f) => f.id === filterKelas);
  const matchKelas =
    filterKelas === 'semua' ||
    s.kelas === activeFilter?.kelasAsli;

  return matchSearch && matchKelas;
});

  // Helper: inisial nama
  function getInitials(nama) {
    if (!nama) return '?';
    const parts = nama.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  // Gradient warna untuk avatar
  const GRADIENTS = [
    'from-blue-500 to-blue-700',
    'from-emerald-500 to-emerald-700',
    'from-purple-500 to-purple-700',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-rose-700',
    'from-cyan-500 to-cyan-700',
    'from-indigo-500 to-indigo-700',
    'from-teal-500 to-teal-700',
  ];

  // Statistik
  const totalSiswa = siswaList.length;
  const totalPutra = siswaList.filter(
    (s) => s.jenis_kelamin === 'L' || s.kelas?.includes('Putra')
  ).length;
  const totalPutri = siswaList.filter(
    (s) => s.jenis_kelamin === 'P' || s.kelas?.includes('Putri')
  ).length;

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
              <Users className="w-3.5 h-3.5" />
              DATA SISWA
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Siswa MA Fathus Salafi
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Generasi berilmu, berkarakter, dan berakhlak mulia — calon
              pemimpin masa depan.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <GraduationCap className="w-4 h-4 text-[#FBBF24]" />
              {totalSiswa} Siswa Aktif Terdaftar
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
                <Users className="w-4 h-4 text-[#0F4C81]" />
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-[#0F4C81] px-2 py-0.5 rounded-full">
                TOTAL
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-[#0F4C81] leading-none">
              {loading ? '...' : totalSiswa}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Siswa Aktif
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                PUTRA
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-blue-600 leading-none">
              {loading ? '...' : totalPutra}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Siswa Putra
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-pink-50 flex items-center justify-center">
                <User className="w-4 h-4 text-pink-600" />
              </div>
              <span className="text-[10px] font-bold bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full">
                PUTRI
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-pink-600 leading-none">
              {loading ? '...' : totalPutri}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Siswa Putri
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 3: SEARCH & FILTER
        ============================================ */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama, NIS, atau kelas..."
              className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 bg-white text-[13px] outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20 transition"
            />
          </div>

          {/* Filter Kelas */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {FILTER_KELAS.map((f) => {
              const isActive = filterKelas === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilterKelas(f.id)}
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
            BAGIAN 4: GRID KARTU SISWA
        ============================================ */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat data siswa...</p>
          </div>
        ) : filteredSiswa.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              {search
                ? 'Tidak ada siswa yang cocok dengan pencarian.'
                : filterKelas !== 'semua'
                ? `Belum ada siswa di kelas ${filterKelas}.`
                : 'Belum ada data siswa.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSiswa.map((siswa, idx) => {
              const gradient = GRADIENTS[idx % GRADIENTS.length];
              const isPutri =
                siswa.jenis_kelamin === 'P' ||
                siswa.kelas?.includes('Putri');
              return (
                <div
                  key={siswa.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:border-[#0F4C81]/30 transition"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[15px] font-extrabold shrink-0 shadow`}
                    >
                      {getInitials(siswa.nama)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-[13px] text-slate-900 leading-tight">
                        {siswa.nama || '-'}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        NIS {siswa.nis_nip || '-'}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {siswa.kelas && (
                      <span className="text-[10.5px] font-bold bg-[#0F4C81]/10 text-[#0F4C81] px-2 py-0.5 rounded-full">
                        {siswa.kelas}
                      </span>
                    )}
                    {siswa.jenis_kelamin && (
                      <span
                        className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full ${
                          isPutri
                            ? 'bg-pink-50 text-pink-700'
                            : 'bg-blue-50 text-blue-700'
                        }`}
                      >
                        {isPutri ? 'Perempuan' : 'Laki-laki'}
                      </span>
                    )}
                  </div>

                  {siswa.email && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-[10.5px] text-slate-400 truncate">
                      {siswa.email}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Info Jumlah */}
        {!loading && filteredSiswa.length > 0 && (
          <div className="text-center text-[11px] text-slate-400 font-medium pt-2">
            Menampilkan {filteredSiswa.length} dari {totalSiswa} siswa
            {filterKelas !== 'semua' && (
              <span className="ml-1">• Filter: {filterKelas}</span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}