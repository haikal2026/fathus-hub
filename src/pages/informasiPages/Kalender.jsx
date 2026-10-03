import { useEffect, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, MapPin, Tag } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const HARI_SINGKAT = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const BULAN_NAMA = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export default function Kalender() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  // === NAVIGASI BULAN ===
  function prevMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
    setSelectedDate(null);
  }

  function nextMonth() {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    setSelectedDate(null);
  }

  function goToToday() {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  }

  // === BUILD KALENDER GRID ===
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekday = firstDay.getDay(); // 0=Min, 6=Sab

  // Array grid: null untuk hari kosong sebelum tanggal 1
  const calendarDays = [];
  for (let i = 0; i < startWeekday; i++) calendarDays.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

  // === HELPER: FORMAT TANGGAL KE YYYY-MM-DD ===
  function toDateKey(y, m, d) {
    const mm = String(m + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${y}-${mm}-${dd}`;
  }

  // === GROUP AGENDA PER TANGGAL ===
  const agendaByDate = {};
  list.forEach((a) => {
    if (!a.tanggal_mulai) return;
    const key = a.tanggal_mulai.split('T')[0];
    if (!agendaByDate[key]) agendaByDate[key] = [];
    agendaByDate[key].push(a);
  });

  // === HELPER: CEK HARI INI ===
  const today = new Date();
  const todayKey = toDateKey(today.getFullYear(), today.getMonth(), today.getDate());

  // === HELPER: WARNA KATEGORI ===
  function warnaDot(kategori) {
    switch (kategori) {
      case 'Akademik': return 'bg-blue-500';
      case 'Kesiswaan': return 'bg-emerald-500';
      case 'Ekstrakurikuler': return 'bg-purple-500';
      case 'Umum': return 'bg-amber-500';
      default: return 'bg-slate-400';
    }
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

  // === AGENDA YANG DIPILIH ===
  const selectedKey = selectedDate
    ? toDateKey(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
    : null;
  const selectedAgenda = selectedKey ? agendaByDate[selectedKey] || [] : [];

  // === JUMLAH AGENDA BULAN INI ===
  const agendaBulanIni = list.filter((a) => {
    if (!a.tanggal_mulai) return false;
    const d = new Date(a.tanggal_mulai);
    return d.getFullYear() === year && d.getMonth() === month;
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
              KALENDER KEGIATAN
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Kalender Akademik
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Lihat semua kegiatan sekolah dalam tampilan kalender bulanan.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Calendar className="w-4 h-4 text-[#FBBF24]" />
              {agendaBulanIni} Kegiatan Bulan Ini
            </div>
          </div>
        </div>

        {/* NAVIGASI BULAN */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
          <button
            onClick={prevMonth}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>

          <div className="text-center">
            <div className="text-[18px] lg:text-[22px] font-extrabold text-slate-900">
              {BULAN_NAMA[month]} {year}
            </div>
            <button
              onClick={goToToday}
              className="text-[11px] font-bold text-[#0F4C81] mt-0.5 hover:underline"
            >
              ← Ke Hari Ini
            </button>
          </div>

          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center hover:bg-slate-100 transition"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        {/* KALENDER GRID */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 lg:p-6">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat kalender...</p>
            </div>
          ) : (
            <>
              {/* Header Hari */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {HARI_SINGKAT.map((h) => (
                  <div
                    key={h}
                    className="text-center text-[11px] lg:text-[12px] font-extrabold text-slate-500 py-2"
                  >
                    {h}
                  </div>
                ))}
              </div>

              {/* Grid Tanggal */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, idx) => {
                  if (day === null) {
                    return (
                      <div
                        key={`empty-${idx}`}
                        className="aspect-square bg-slate-50/50 rounded-lg"
                      />
                    );
                  }

                  const dateKey = toDateKey(year, month, day);
                  const isToday = dateKey === todayKey;
                  const isSelected =
                    selectedDate &&
                    selectedDate.getDate() === day &&
                    selectedDate.getMonth() === month &&
                    selectedDate.getFullYear() === year;
                  const agendas = agendaByDate[dateKey] || [];
                  const hasAgenda = agendas.length > 0;

                  return (
                    <button
                      key={day}
                      onClick={() =>
                        setSelectedDate(new Date(year, month, day))
                      }
                      className={`aspect-square rounded-lg p-1.5 flex flex-col items-center justify-start transition relative ${
                        isSelected
                          ? 'bg-[#0F4C81] text-white shadow-lg scale-105'
                          : isToday
                          ? 'bg-[#FBBF24] text-[#0F4C81] font-extrabold shadow'
                          : hasAgenda
                          ? 'bg-blue-50 hover:bg-blue-100 border border-blue-200'
                          : 'hover:bg-slate-50 border border-transparent'
                      }`}
                    >
                      <div
                        className={`text-[12px] lg:text-[14px] font-bold ${
                          isSelected
                            ? 'text-white'
                            : isToday
                            ? 'text-[#0F4C81]'
                            : 'text-slate-700'
                        }`}
                      >
                        {day}
                      </div>

                      {/* Dots untuk agenda */}
                      {hasAgenda && (
                        <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                          {agendas.slice(0, 3).map((a, i) => (
                            <span
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                isSelected ? 'bg-white' : warnaDot(a.kategori)
                              }`}
                            />
                          ))}
                          {agendas.length > 3 && (
                            <span
                              className={`text-[8px] font-bold ${
                                isSelected ? 'text-white' : 'text-slate-500'
                              }`}
                            >
                              +{agendas.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-3 text-[10px] font-bold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#FBBF24]" />
                  Hari Ini
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-[#0F4C81]" />
                  Dipilih
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded bg-blue-100 border border-blue-200" />
                  Ada Kegiatan
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    Akademik
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Kesiswaan
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500" />
                    Ekskul
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Umum
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* DETAIL AGENDA TANGGAL DIPILIH */}
        {selectedDate && (
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  Agenda Tanggal
                </div>
                <div className="text-[18px] font-extrabold text-slate-900 mt-0.5">
                  {selectedDate.getDate()} {BULAN_NAMA[selectedDate.getMonth()]}{' '}
                  {selectedDate.getFullYear()}
                </div>
              </div>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-[11px] font-bold text-slate-400 hover:text-slate-700"
              >
                Tutup ✕
              </button>
            </div>

            {selectedAgenda.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-[12px] text-slate-500">
                  Tidak ada kegiatan di tanggal ini.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedAgenda.map((a) => (
                  <div
                    key={a.id}
                    className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full border ${warnaKategori(
                          a.kategori
                        )}`}
                      >
                        <Tag className="w-3 h-3" />
                        {a.kategori || 'Umum'}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-[14px] text-slate-900 leading-tight">
                      {a.judul}
                    </h3>

                    {a.deskripsi && (
                      <p className="mt-1.5 text-[12px] text-slate-600 leading-relaxed">
                        {a.deskripsi}
                      </p>
                    )}

                    <div className="mt-2.5 flex flex-wrap gap-3 text-[11px] text-slate-500">
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
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}