import { useState, useMemo } from 'react';
import {
  Trophy,
  Award,
  Medal,
  Star,
  Calendar,
  Filter,
  Users,
  TrendingUp,
  Sparkles,
} from 'lucide-react';

// ============================================
// DATA PRESTASI (statis dulu, nanti bisa dari Supabase)
// ============================================
const PRESTASI_DATA = [
  {
    id: 1,
    judul: 'Juara 1 MTQ Tingkat Kabupaten',
    siswa: 'Ahmad Zulfikar',
    kelas: 'XII Putra',
    kategori: 'Keagamaan',
    tingkat: 'Kabupaten',
    tahun: 2026,
    tanggal: '2026-09-05',
    icon: '🏆',
    warna: 'from-amber-500 to-orange-600',
  },
  {
    id: 2,
    judul: 'Juara 2 Olimpiade Matematika MA',
    siswa: 'Fatimah Zahra',
    kelas: 'XII Putri',
    kategori: 'Akademik',
    tingkat: 'Kabupaten',
    tahun: 2026,
    tanggal: '2026-08-25',
    icon: '🥈',
    warna: 'from-blue-500 to-indigo-700',
  },
  {
    id: 3,
    judul: 'Juara Harapan 1 Pidato B. Arab',
    siswa: 'Zayd Al-Farisi',
    kelas: 'XI Putra',
    kategori: 'Keagamaan',
    tingkat: 'Kabupaten',
    tahun: 2026,
    tanggal: '2026-08-20',
    icon: '🎤',
    warna: 'from-emerald-500 to-green-700',
  },
  {
    id: 4,
    judul: 'Juara Umum Porseni MA Se-Kabupaten',
    siswa: 'Kontingen MA Fathus Salafi',
    kelas: 'Tim',
    kategori: 'Olahraga',
    tingkat: 'Kabupaten',
    tahun: 2025,
    tanggal: '2025-11-10',
    icon: '🏅',
    warna: 'from-rose-500 to-red-700',
  },
  {
    id: 5,
    judul: 'Juara 1 Lomba Kaligrafi',
    siswa: 'Aisyah Nur Fadilah',
    kelas: 'XI Putri',
    kategori: 'Seni',
    tingkat: 'Kabupaten',
    tahun: 2026,
    tanggal: '2026-07-15',
    icon: '🎨',
    warna: 'from-purple-500 to-fuchsia-700',
  },
  {
    id: 6,
    judul: 'Juara 2 Lomba Cerdas Cermat Islam',
    siswa: 'Tim Cerdas Cermat',
    kelas: 'Tim',
    kategori: 'Keagamaan',
    tingkat: 'Provinsi',
    tahun: 2025,
    tanggal: '2025-10-20',
    icon: '🧠',
    warna: 'from-teal-500 to-cyan-700',
  },
];

const KATEGORI_LIST = ['Semua', 'Keagamaan', 'Akademik', 'Olahraga', 'Seni'];
const TINGKAT_LIST = ['Semua', 'Kabupaten', 'Provinsi', 'Nasional'];

export default function Prestasi({ submenuId }) {
  const [kategori, setKategori] = useState('Semua');
  const [tingkat, setTingkat] = useState('Semua');
  const [tahun, setTahun] = useState('Semua');

  // Daftar tahun unik dari data
  const tahunList = useMemo(() => {
    const set = new Set(PRESTASI_DATA.map((p) => p.tahun));
    return ['Semua', ...Array.from(set).sort((a, b) => b - a)];
  }, []);

  // Filter
  const filtered = useMemo(() => {
    return PRESTASI_DATA.filter((p) => {
      const matchKategori = kategori === 'Semua' || p.kategori === kategori;
      const matchTingkat = tingkat === 'Semua' || p.tingkat === tingkat;
      const matchTahun = tahun === 'Semua' || p.tahun === tahun;
      return matchKategori && matchTingkat && matchTahun;
    });
  }, [kategori, tingkat, tahun]);

  // Statistik
  const totalPrestasi = PRESTASI_DATA.length;
  const totalKabupaten = PRESTASI_DATA.filter((p) => p.tingkat === 'Kabupaten').length;
  const totalProvinsi = PRESTASI_DATA.filter((p) => p.tingkat === 'Provinsi').length;

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
              <Trophy className="w-3.5 h-3.5" />
              PRESTASI SISWA
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Prestasi Gemilang
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Kumpulan prestasi siswa-siswi MA Fathus Salafi di berbagai
              bidang — akademik, keagamaan, olahraga, dan seni.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <Trophy className="w-4 h-4 text-[#FBBF24]" />
                {totalPrestasi} Prestasi
              </div>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <Medal className="w-4 h-4 text-[#FBBF24]" />
                {totalKabupaten} Kabupaten
              </div>
              <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] rounded-full px-4 py-1.5 text-[12px] font-extrabold">
                <Star className="w-4 h-4" />
                {totalProvinsi} Provinsi
              </div>
            </div>
          </div>
        </div>

        {/* FILTER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-5 space-y-3">
          {/* Kategori */}
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
              <Filter className="w-3.5 h-3.5" />
              Kategori
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {KATEGORI_LIST.map((k) => (
                <button
                  key={k}
                  onClick={() => setKategori(k)}
                  className={`h-8 px-3.5 rounded-full text-[11px] font-bold border-2 transition-all ${
                    kategori === k
                      ? 'bg-[#0F4C81] text-white border-[#0F4C81] shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81]/40'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Tingkat & Tahun */}
          <div className="grid md:grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Tingkat
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {TINGKAT_LIST.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTingkat(t)}
                    className={`h-8 px-3.5 rounded-full text-[11px] font-bold border-2 transition-all ${
                      tingkat === t
                        ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81]/40'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                Tahun
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {tahunList.map((y) => (
                  <button
                    key={y}
                    onClick={() => setTahun(y)}
                    className={`h-8 px-3.5 rounded-full text-[11px] font-bold border-2 transition-all ${
                      tahun === y
                        ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81]/40'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LIST PRESTASI */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              Tidak ada prestasi yang cocok dengan filter.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition group"
              >
                {/* Header berwarna */}
                <div className={`relative h-[110px] bg-gradient-to-br ${p.warna}`}>
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[52px] group-hover:scale-110 transition-transform">
                    {p.icon}
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-extrabold bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-slate-900">
                      {p.tingkat}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FBBF24] text-[#0F4C81] uppercase tracking-wide">
                      {p.kategori}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">
                      {p.tahun}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight">
                    {p.judul}
                  </h3>

                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-[12px]">
                      <Users className="w-3.5 h-3.5 text-[#0F4C81] shrink-0" />
                      <span className="font-bold text-slate-800">{p.siswa}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span>{p.kelas}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{formatTanggal(p.tanggal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INFO */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FBBF24]/30 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#0F4C81]" />
          </div>
          <div>
            <div className="font-extrabold text-[13px] text-slate-800">
              Terus Berprestasi!
            </div>
            <div className="text-[11.5px] text-slate-500 mt-0.5 leading-relaxed">
              MA Fathus Salafi terus mendorong siswa-siswi berprestasi di
              berbagai bidang. Prestasi terbaru akan diperbarui secara berkala.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}