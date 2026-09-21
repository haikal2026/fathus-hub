import { useState } from 'react';
import { DATA_SISWA } from '../data/siswa';

export default function Kesiswaan() {
  const [filter, setFilter] = useState('semua');
  const [search, setSearch] = useState('');

  // Filter siswa
  const filtered = DATA_SISWA.filter((siswa) => {
    const matchSearch =
      siswa.nama.toLowerCase().includes(search.toLowerCase()) ||
      siswa.nis.includes(search);
    const matchFilter =
      filter === 'semua' || siswa.kelas.toLowerCase() === filter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const totalPutra = DATA_SISWA.filter((s) => s.jk === 'Laki-laki').length;
  const totalPutri = DATA_SISWA.filter((s) => s.jk === 'Perempuan').length;

  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ============ HEADER ============ */}
      <div className="rounded-[24px] bg-[#0F4C81] text-white p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-white rounded-full blur-[80px] opacity-[0.06]" />

        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
            KESISWAAN
          </div>
          <h1 className="mt-4 text-[28px] lg:text-[32px] font-extrabold leading-tight tracking-[-0.02em]">
            Data Siswa
          </h1>
          <p className="text-[13px] text-white/70 mt-2">
            Informasi lengkap siswa MA Fathus Salafi • TP 2026/2027
          </p>
        </div>
      </div>

      {/* ============ STATISTIK ============ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-[#0F4C81] text-white p-4">
          <div className="text-[10px] font-bold bg-[#FBBF24] text-[#0F4C81] px-2 py-0.5 rounded-full inline-block">
            TOTAL
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none">
            {DATA_SISWA.length}
          </div>
          <div className="text-[12px] font-bold mt-1">Siswa</div>
        </div>

        <div className="rounded-2xl bg-white border p-4">
          <div className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full inline-block">
            PUTRA
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none text-[#0F4C81]">
            {totalPutra}
          </div>
          <div className="text-[12px] font-bold mt-1 text-slate-700">Laki-laki</div>
        </div>

        <div className="rounded-2xl bg-[#FBBF24] text-[#0F4C81] p-4">
          <div className="text-[10px] font-bold bg-[#0F4C81] text-white px-2 py-0.5 rounded-full inline-block">
            PUTRI
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none">
            {totalPutri}
          </div>
          <div className="text-[12px] font-bold mt-1">Perempuan</div>
        </div>

        <div className="rounded-2xl bg-[#1E3A8A] text-white p-4">
          <div className="text-[10px] font-bold bg-white/15 border border-white/20 px-2 py-0.5 rounded-full inline-block">
            ROMBEL
          </div>
          <div className="mt-2 text-[28px] font-extrabold leading-none">6</div>
          <div className="text-[12px] font-bold mt-1">Kelas</div>
        </div>
      </div>

      {/* ============ FILTER & SEARCH ============ */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3">
        {/* Search */}
        <div>
          <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 rounded-full px-4 h-11">
            <span className="text-slate-400">🔍</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama siswa atau NIS..."
              className="bg-transparent outline-none text-[13px] w-full"
            />
          </div>
        </div>

        {/* Filter Kelas */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'semua', label: 'Semua' },
            { id: 'X Putra', label: 'X Putra' },
            { id: 'X Putri', label: 'X Putri' },
            { id: 'XI Putra', label: 'XI Putra' },
            { id: 'XII Putra', label: 'XII Putra' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`h-8 px-4 rounded-full text-[11px] font-bold border transition ${
                filter === btn.id
                  ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-[#0F4C81]/30'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* ============ LIST SISWA ============ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-[16px] text-slate-800">
            Daftar Siswa ({filtered.length})
          </h3>
        </div>

        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center">
            <div className="text-4xl mb-2">🔍</div>
            <div className="font-bold text-slate-700">Tidak ada siswa</div>
            <div className="text-[12px] text-slate-500 mt-1">
              Coba ubah kata kunci atau filter kelas
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((siswa) => (
              <div
                key={siswa.nis}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center font-extrabold shrink-0">
                  {siswa.foto}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold text-slate-800 leading-tight">
                    {siswa.nama}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    NIS {siswa.nis}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] bg-blue-50 border border-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">
                      {siswa.kelasAsli}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        siswa.jk === 'Laki-laki'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {siswa.jk}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ============ EKSKUL & PRESTASI ============ */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Ekstrakurikuler */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#FBBF24] flex items-center justify-center text-[16px]">
              🏆
            </div>
            <h3 className="font-extrabold text-[15px] text-slate-800">
              Ekstrakurikuler
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                nama: 'OSIS MA Fathus Salafi',
                ketua: 'M. Fadil - XII Putra',
                anggota: 35,
              },
              {
                nama: 'Pramuka Gugus Depan 12.045',
                ketua: 'Ahmad Zulfikar - XI Putra',
                anggota: 60,
              },
              {
                nama: 'Paskibra',
                ketua: 'Abdullah Hanif - XII Putra',
                anggota: 30,
              },
            ].map((ekskul, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100"
              >
                <div className="flex justify-between items-start gap-2">
                  <div className="font-bold text-[13px] text-slate-800">
                    {ekskul.nama}
                  </div>
                  <span className="text-[10px] bg-[#0F4C81] text-white px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                    {ekskul.anggota} anggota
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Ketua: {ekskul.ketua}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prestasi */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-[#0F4C81] flex items-center justify-center text-white text-[16px]">
              🥇
            </div>
            <h3 className="font-extrabold text-[15px] text-slate-800">
              Prestasi Terbaru
            </h3>
          </div>

          <div className="space-y-3">
            {[
              {
                icon: '🥇',
                title: 'Juara 1 MTQ Kabupaten 2026',
                siswa: 'Ahmad Zulfikar - XII Putra',
                tingkat: 'Kabupaten',
              },
              {
                icon: '🥈',
                title: 'Juara 2 Olimpiade Matematika',
                siswa: 'Fatimah Zahra - XII Putri',
                tingkat: 'Provinsi',
              },
              {
                icon: '🏅',
                title: 'Juara Harapan 1 Pidato B. Arab',
                siswa: 'Zayd Al-Farisi - XI Putra',
                tingkat: 'Kabupaten',
              },
            ].map((prestasi, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-slate-100"
              >
                <div className="text-[24px] shrink-0">{prestasi.icon}</div>
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-bold leading-tight text-slate-800">
                    {prestasi.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {prestasi.siswa}
                  </div>
                  <div className="mt-1">
                    <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                      Tingkat {prestasi.tingkat}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}