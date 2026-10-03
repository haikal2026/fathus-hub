import { useEffect, useState } from 'react';
import { Calendar, Search, MapPin, Clock, Tag, CalendarCheck } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const KATEGORI_FILTER = [
  { id: 'semua', label: 'Semua' },
  { id: 'Akademik', label: 'Akademik' },
  { id: 'Kesiswaan', label: 'Kesiswaan' },
  { id: 'Ekstrakurikuler', label: 'Ekstrakurikuler' },
  { id: 'Umum', label: 'Umum' },
];

export default function Agenda() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('semua');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('agenda')
          .select('*')
          .order('tanggal_mulai', { ascending: true });

        if (error) throw error;
        setList(data || []);
      } catch (err) {
        console.error('Error fetch agenda:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Filter
  const filteredList = list.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.judul?.toLowerCase().includes(q) ||
      a.deskripsi?.toLowerCase().includes(q) ||
      a.lokasi?.toLowerCase().includes(q) ||
      a.kategori?.toLowerCase().includes(q);

    const matchFilter = filter === 'semua' || a.kategori === filter;

    return matchSearch && matchFilter;
  });

  // Helper: ambil hari, tanggal, bulan
  function parseTanggal(dateStr) {
    if (!dateStr) return { hari: '-', tgl: '-', bln: '-' };
    const d = new Date(dateStr);
    const hariList = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const bulanList = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return {
      hari: hariList[d.getDay()],
      tgl: String(d.getDate()).padStart(2, '0'),
      bln: bulanList[d.getMonth()],
      tahun: d.getFullYear(),
    };
  }

  // Cek agenda sudah lewat atau belum
  function isPast(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    d.setHours(23, 59, 59);
    return d < new Date();
  }

  function warnaKategori(kategori) {
    switch (kategori) {
      case 'Akademik':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Kesiswaan':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Ekstrakurikuler':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Umum':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  }

  // Statistik
  const totalAgenda = list.length;
  const now = new Date();
  const bulanIni = list.filter((a) => {
    if (!a.tanggal_mulai) return false;
    const d = new Date(a.tanggal_mulai);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  // Hitung minggu ini (7 hari ke depan dari hari ini)
  const mingguIni = list.filter((a) => {
    if (!a.tanggal_mulai) return false;
    const d = new Date(a.tanggal_mulai);
    const diff = (d - now) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  }).length;

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1100px] mx-auto space-y-6">

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
              <Calendar className="w-3.5 h-3.5" />
              AGENDA
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Agenda Kegiatan
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Jadwal kegiatan mendatang MA Fathus Salafi untuk siswa, guru,
              dan orang tua.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <CalendarCheck className="w-4 h-4 text-[#FBBF24]" />
              {totalAgenda} Agenda Terdaftar
            </div>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-[#0F4C81]" />
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-[#0F4C81] px-2 py-0.5 rounded-full">
                TOTAL
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-[#0F4C81] leading-none">
              {loading ? '...' : totalAgenda}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Agenda
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <CalendarCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                MINGGU INI
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-emerald-600 leading-none">
              {loading ? '...' : mingguIni}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Akan Datang
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Calendar className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                BULAN INI
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-amber-600 leading-none">
              {loading ? '...' : bulanIni}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Kegiatan
            </div>
          </div>
        </div>

        {/* SEARCH & FILTER */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul, lokasi, atau kategori agenda..."
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

        {/* DAFTAR AGENDA */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat agenda...</p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              {search
                ? 'Tidak ada agenda yang cocok.'
                : filter !== 'semua'
                ? `Belum ada agenda kategori "${filter}".`
                : 'Belum ada agenda.'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredList.map((a) => {
              const tgl = parseTanggal(a.tanggal_mulai);
              const lewat = isPast(a.tanggal_mulai);
              return (
                <div
                  key={a.id}
                  className={`bg-white rounded-2xl p-5 border transition hover:shadow-md ${
                    lewat
                      ? 'border-slate-200 opacity-70'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Kartu tanggal */}
                    <div
                      className={`shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-white shadow ${
                        lewat
                          ? 'bg-slate-400'
                          : 'bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A]'
                      }`}
                    >
                      <div className="text-[9px] font-bold uppercase opacity-90">
                        {tgl.hari}
                      </div>
                      <div className="text-[20px] font-extrabold leading-none">
                        {tgl.tgl}
                      </div>
                      <div className="text-[9px] font-bold uppercase opacity-90">
                        {tgl.bln}
                      </div>
                    </div>

                    {/* Konten */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full border ${warnaKategori(
                            a.kategori
                          )}`}
                        >
                          <Tag className="w-3 h-3" />
                          {a.kategori || 'Umum'}
                        </span>

                        {lewat && (
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                            SELESAI
                          </span>
                        )}

                        <span className="text-[11px] text-slate-400 ml-auto">
                          {tgl.tanggal} {tgl.tahun}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-[15px] text-slate-900 leading-tight">
                        {a.judul}
                      </h3>

                      {a.deskripsi && (
                        <p className="mt-1.5 text-[12.5px] text-slate-600 leading-relaxed line-clamp-2">
                          {a.deskripsi}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-500">
                        {a.waktu && (
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {a.waktu}
                          </span>
                        )}
                        {a.lokasi && (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {a.lokasi}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!loading && filteredList.length > 0 && (
          <div className="text-center text-[11px] text-slate-400 font-medium pt-2">
            Menampilkan {filteredList.length} dari {totalAgenda} agenda
            {filter !== 'semua' && (
              <span className="ml-1">• Filter: {filter}</span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}