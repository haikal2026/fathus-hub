import { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Users,
  Info,
  Clock,
  CircleDot,
  UserCircle2,
  Filter,
  Coffee,
  BookOpen,
} from 'lucide-react';
import {
  JADWAL_PUTRA,
  JADWAL_PUTRI,
  HARI_LIST,
  ALOKASI_REGULER,
  ALOKASI_JUMAT,
  GURU_DATA,
  getGuruByKode,
} from '../../data/akademikData';

// ============================================
// HELPER
// ============================================
function getHariIni() {
  const hari = new Date()
    .toLocaleDateString('id-ID', { weekday: 'long' })
    .toUpperCase();
  if (hari === 'JUMAT') return "JUM'AT";
  return hari;
}

function isJamAktif(waktuStr) {
  if (!waktuStr || waktuStr.includes('*')) return false;
  const match = waktuStr.match(/(\d{2})\.(\d{2})-(\d{2})\.(\d{2})/);
  if (!match) return false;
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const mulai = parseInt(match[1]) * 60 + parseInt(match[2]);
  const selesai = parseInt(match[3]) * 60 + parseInt(match[4]);
  return nowMin >= mulai && nowMin < selesai;
}

// Ambil jam saja (tanpa WIB) → "07.30-08.30"
function waktuBersih(waktuStr) {
  if (!waktuStr) return '';
  return waktuStr.replace(/\s*WIB\s*$/i, '').replace(/\*$/, '').trim();
}

// ============================================
// KONFIGURASI WARNA PER KELAS
// ============================================
const KELAS_STYLE = {
  X: {
    headerBg: '#0F4C81',
    headerText: '#ffffff',
    badgeBg: 'bg-[#0F4C81]',
    badgeText: 'text-white',
    kartuBorder: 'border-l-[#0F4C81]',
    kartuBg: 'bg-blue-50/40',
    kartuHover: 'hover:bg-blue-50',
    kodeBg: 'bg-[#0F4C81]',
    kodeText: 'text-white',
  },
  XI: {
    headerBg: '#FBBF24',
    headerText: '#0F4C81',
    badgeBg: 'bg-[#FBBF24]',
    badgeText: 'text-[#0F4C81]',
    kartuBorder: 'border-l-[#FBBF24]',
    kartuBg: 'bg-amber-50/40',
    kartuHover: 'hover:bg-amber-50',
    kodeBg: 'bg-[#FBBF24]',
    kodeText: 'text-[#0F4C81]',
  },
  XII: {
    headerBg: '#1E293B',
    headerText: '#ffffff',
    badgeBg: 'bg-slate-800',
    badgeText: 'text-white',
    kartuBorder: 'border-l-slate-800',
    kartuBg: 'bg-slate-50',
    kartuHover: 'hover:bg-slate-100',
    kodeBg: 'bg-slate-800',
    kodeText: 'text-white',
  },
};

// ============================================
// KOMPONEN UTAMA
// ============================================
export default function JadwalPelajaran() {
  const [gender, setGender] = useState('PUTRA');
  const [hari, setHari] = useState(() => {
    const h = getHariIni();
    return HARI_LIST.includes(h) ? h : 'SENIN';
  });
  const [filterKelas, setFilterKelas] = useState('SEMUA');

  const jadwal = gender === 'PUTRA' ? JADWAL_PUTRA : JADWAL_PUTRI;
  const sesiHariIni = jadwal[hari] || [];
  const alokasi = hari === "JUM'AT" ? ALOKASI_JUMAT : ALOKASI_REGULER;
  const hariIni = getHariIni();
  const isHariIni = hari === hariIni;

  function getWaktu(jam) {
    const found = alokasi.find((a) => a.jam === jam);
    return found ? found.waktu : '';
  }

  const kolomAktif = useMemo(() => {
    if (filterKelas === 'SEMUA') return ['X', 'XI', 'XII'];
    return [filterKelas];
  }, [filterKelas]);

  useEffect(() => {
    setFilterKelas('SEMUA');
  }, [gender]);

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1200px] mx-auto space-y-6">

        {/* ==========================================
            HERO
        ========================================== */}
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
              JADWAL PELAJARAN
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Jadwal Pelajaran
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Jadwal lengkap kelas X, XI, XII — Kelas A (Putra) & Kelas B
              (Putri), Tahun Pelajaran 2026/2027.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <Clock className="w-4 h-4 text-[#FBBF24]" />
                Senin – Sabtu • 07.00 – 12.00 WIB
              </div>
              {isHariIni && (
                <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] rounded-full px-4 py-1.5 text-[12px] font-extrabold">
                  <CircleDot className="w-4 h-4 animate-pulse" />
                  HARI INI • {hari}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            TOOLBAR
        ========================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl">
          <div className="p-3 lg:p-4 flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4">

            <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] border border-slate-200 rounded-xl shrink-0">
              <button
                onClick={() => setGender('PUTRA')}
                className={`flex items-center gap-2 h-10 px-4 rounded-lg text-[12px] font-extrabold transition-all ${
                  gender === 'PUTRA'
                    ? 'bg-[#0F4C81] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                <UserCircle2 className="w-4 h-4" />
                PUTRA
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    gender === 'PUTRA'
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  A
                </span>
              </button>
              <button
                onClick={() => setGender('PUTRI')}
                className={`flex items-center gap-2 h-10 px-4 rounded-lg text-[12px] font-extrabold transition-all ${
                  gender === 'PUTRI'
                    ? 'bg-[#FBBF24] text-[#0F4C81] shadow-sm'
                    : 'text-slate-600 hover:bg-white'
                }`}
              >
                <UserCircle2 className="w-4 h-4" />
                PUTRI
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    gender === 'PUTRI'
                      ? 'bg-[#0F4C81] text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  B
                </span>
              </button>
            </div>

            <div className="hidden lg:block w-px h-8 bg-slate-200" />

            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wide shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Kelas</span>
              </div>

              <div className="flex gap-1 flex-wrap">
                {[
                  { id: 'SEMUA', label: 'Semua', dot: 'bg-slate-400' },
                  { id: 'X', label: 'X', dot: 'bg-[#0F4C81]' },
                  { id: 'XI', label: 'XI', dot: 'bg-[#FBBF24]' },
                  { id: 'XII', label: 'XII', dot: 'bg-slate-800' },
                ].map((opt) => {
                  const aktif = filterKelas === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setFilterKelas(opt.id)}
                      className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[11px] font-bold border transition-all ${
                        aktif
                          ? 'bg-[#0F4C81] text-white border-[#0F4C81] shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81]/40 hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          aktif ? 'bg-[#FBBF24]' : opt.dot
                        }`}
                      />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ==========================================
            TAB HARI
        ========================================== */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wide shrink-0">
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Hari</span>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 flex-1">
            {HARI_LIST.map((h) => {
              const isToday = h === hariIni;
              const aktif = hari === h;
              return (
                <button
                  key={h}
                  onClick={() => setHari(h)}
                  className={`relative whitespace-nowrap h-9 px-4 rounded-full text-[11.5px] font-extrabold border-2 transition-all flex items-center gap-2 ${
                    aktif
                      ? 'bg-[#0F4C81] text-white border-[#0F4C81] shadow-md'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-[#0F4C81]/40'
                  }`}
                >
                  {h}
                  {isToday && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-[#FBBF24] text-[#0F4C81]">
                      HARI INI
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            TABEL (DESKTOP) — v7 Style
        ========================================== */}
        <div className="hidden md:block bg-white border border-slate-200 rounded-[20px] overflow-hidden">
          {/* Header info */}
          <div className="p-4 lg:p-5 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-[#F8FAFC] to-white border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  gender === 'PUTRA'
                    ? 'bg-[#0F4C81] text-white'
                    : 'bg-[#FBBF24] text-[#0F4C81]'
                }`}
              >
                <Calendar className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-extrabold text-slate-900 flex items-center gap-2 flex-wrap">
                  {gender} • {hari} • TP 2026/2027
                  {isHariIni && (
                    <span className="text-[10px] bg-[#FBBF24] text-[#0F4C81] px-2 py-0.5 rounded-full">
                      HARI INI
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  {hari === "JUM'AT"
                    ? 'Alokasi Khusus Jumat • 25 menit/jam'
                    : 'Alokasi Reguler • 60 menit/jam'}{' '}
                  • {kolomAktif.length} Rombel
                </div>
              </div>
            </div>
            <div className="text-[11px] font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-full">
              {sesiHariIni.length} Sesi
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[12px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    className="p-3 text-left w-[110px] text-[10px] tracking-widest uppercase bg-[#0F4C81] text-white/70 font-bold"
                  >
                    Jam
                  </th>
                  {kolomAktif.map((k) => {
                    const style = KELAS_STYLE[k];
                    return (
                      <th
                        key={k}
                        className="p-3 text-left text-[11px] tracking-wide font-extrabold"
                        style={{
                          backgroundColor: style.headerBg,
                          color: style.headerText,
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <span className="opacity-60 text-[10px] uppercase">
                            Kelas
                          </span>
                          <span className="text-[13px]">{k}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {sesiHariIni.map((sesi, idx) => {
                  const waktuRaw = getWaktu(sesi.jam);
                  const waktu = waktuBersih(waktuRaw);
                  const sedangBerlangsung = isJamAktif(waktuRaw) && isHariIni;
                  const isIstirahat = sesi.isIstirahat;

                  if (isIstirahat) {
                    return (
                      <tr key={idx}>
                        <td colSpan={kolomAktif.length + 1} className="p-0">
                          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-amber-50 via-amber-50/70 to-white border-y border-amber-200/70">
                            <div className="w-9 h-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                              <Coffee className="w-4 h-4 text-amber-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[11px] font-extrabold text-amber-800 tracking-widest uppercase">
                                Istirahat
                              </div>
                              <div className="text-[10px] font-bold text-amber-700 mt-0.5">
                                {waktu}
                              </div>
                            </div>
                            <div className="text-[10px] font-bold text-amber-700 bg-white/70 border border-amber-200 px-2.5 py-1 rounded-full hidden sm:block">
                              ☕ Waktunya recharge
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  const zebra = idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40';

                  return (
                    <tr
                      key={idx}
                      className={`transition-all ${
                        sedangBerlangsung
                          ? 'bg-emerald-50/60'
                          : `${zebra} hover:bg-[#F8FAFC]`
                      }`}
                    >
                      {/* Kolom Jam */}
                      <td
                        className={`px-3 py-3 align-top border-b border-slate-100 ${
                          sedangBerlangsung
                            ? 'bg-emerald-50/40'
                            : ''
                        }`}
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-[11px] shrink-0 ${
                                sedangBerlangsung
                                  ? 'bg-emerald-600 text-white animate-pulse'
                                  : 'bg-[#0F4C81] text-white'
                              }`}
                            >
                              {sesi.jam}
                            </span>
                            {sedangBerlangsung && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            )}
                          </div>
                          <div className="text-[10.5px] font-bold text-slate-700 leading-tight">
                            {waktu}
                          </div>
                          {sedangBerlangsung && (
                            <div className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-wide">
                              Live
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Kolom Kelas */}
                      {kolomAktif.map((k) => {
                        const style = KELAS_STYLE[k];
                        const mapel = sesi[k];

                        if (!mapel) {
                          return (
                            <td
                              key={k}
                              className="p-3 align-top border-b border-slate-100"
                            >
                              <span className="text-[11px] text-slate-300 italic">
                                —
                              </span>
                            </td>
                          );
                        }

                        const guru = getGuruByKode(mapel.k);

                        return (
                          <td
                            key={k}
                            className="p-2.5 align-top border-b border-slate-100"
                          >
                            {/* Kartu Mapel */}
                            <div
                              className={`group flex items-start gap-2.5 rounded-xl border-l-4 ${style.kartuBorder} ${style.kartuBg} ${style.kartuHover} px-3 py-2.5 transition-all hover:shadow-sm`}
                            >
                              <span
                                className={`w-7 h-7 rounded-lg ${style.kodeBg} ${style.kodeText} flex items-center justify-center font-extrabold text-[11px] shrink-0 shadow-sm`}
                                title={guru ? `Kode ${mapel.k}` : ''}
                              >
                                {mapel.k}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="text-[12.5px] font-extrabold text-slate-900 leading-tight">
                                  {mapel.m}
                                </div>
                                {guru && (
                                  <div className="text-[10.5px] text-slate-500 mt-1 leading-tight truncate">
                                    <span className="inline-flex items-center gap-1">
                                      <UserCircle2 className="w-3 h-3 opacity-60" />
                                      {guru.nama}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Info bawah */}
          <div className="p-4 bg-gradient-to-r from-[#F8FAFC] to-white border-t border-slate-200">
            <div className="flex items-start gap-2 text-[11px] text-slate-600">
              <Info className="w-3.5 h-3.5 text-[#0F4C81] shrink-0 mt-0.5" />
              <span>
                Format: <b>Kode Guru</b> di samping nama mapel, dengan nama
                lengkap guru di bawahnya.
                {isHariIni && (
                  <>
                    {' '}
                    • <b className="text-emerald-700">Baris hijau</b> = jam
                    sedang berlangsung.
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* ==========================================
            CARD VIEW (MOBILE)
        ========================================== */}
        <div className="md:hidden space-y-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-extrabold text-slate-900">
                  {gender} • {hari}
                </div>
                <div className="text-[11px] text-slate-500">
                  {sesiHariIni.length} sesi • {kolomAktif.length} kelas
                </div>
              </div>
              {isHariIni && (
                <span className="text-[10px] bg-[#FBBF24] text-[#0F4C81] px-2.5 py-1 rounded-full font-extrabold">
                  HARI INI
                </span>
              )}
            </div>
          </div>

          {sesiHariIni.map((sesi, idx) => {
            const waktuRaw = getWaktu(sesi.jam);
            const waktu = waktuBersih(waktuRaw);
            const sedangBerlangsung = isJamAktif(waktuRaw) && isHariIni;

            if (sesi.isIstirahat) {
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border-2 border-amber-200 p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                    <Coffee className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-[12px] font-extrabold text-amber-800 tracking-widest uppercase">
                      Istirahat
                    </div>
                    <div className="text-[11px] font-bold text-amber-700 mt-0.5">
                      {waktu}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 bg-white overflow-hidden ${
                  sedangBerlangsung
                    ? 'border-emerald-500 shadow-lg shadow-emerald-100'
                    : 'border-slate-200'
                }`}
              >
                <div
                  className={`p-3 flex items-center justify-between ${
                    sedangBerlangsung
                      ? 'bg-emerald-50'
                      : 'bg-gradient-to-r from-[#F8FAFC] to-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-[12px] ${
                        sedangBerlangsung
                          ? 'bg-emerald-600 text-white animate-pulse'
                          : 'bg-[#0F4C81] text-white'
                      }`}
                    >
                      {sesi.jam}
                    </span>
                    <div className="leading-tight">
                      <div className="text-[12px] font-extrabold text-slate-900">
                        {waktu}
                      </div>
                      {sedangBerlangsung && (
                        <div className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-wide">
                          Live
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-3 space-y-2">
                  {kolomAktif.map((k) => {
                    const style = KELAS_STYLE[k];
                    const mapel = sesi[k];
                    if (!mapel) return null;
                    const guru = getGuruByKode(mapel.k);

                    return (
                      <div
                        key={k}
                        className={`flex items-start gap-2.5 rounded-xl border-l-4 ${style.kartuBorder} ${style.kartuBg} px-3 py-2.5`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg ${style.kodeBg} ${style.kodeText} flex items-center justify-center font-extrabold text-[11px] shrink-0 shadow-sm`}
                        >
                          {mapel.k}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${style.badgeBg} ${style.badgeText}`}
                            >
                              {k}
                            </span>
                            <span className="text-[12px] font-extrabold text-slate-900 truncate">
                              {mapel.m}
                            </span>
                          </div>
                          {guru && (
                            <div className="text-[10.5px] text-slate-500 mt-1 truncate">
                              {guru.nama}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* ==========================================
            LEGEND KODE GURU + ALOKASI WAKTU
        ========================================== */}
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Legenda
                </div>
                <h3 className="text-[14px] font-extrabold text-slate-900">
                  Kode Guru A – O
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
              {GURU_DATA.map((g) => (
                <div
                  key={g.kode}
                  className="flex items-center gap-2 p-2 rounded-lg bg-[#F8FAFC] border border-slate-100"
                >
                  <span className="w-6 h-6 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-extrabold text-[10px] shrink-0">
                    {g.kode}
                  </span>
                  <span className="text-[11px] font-bold truncate text-slate-700">
                    {g.nama}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F4C81] rounded-2xl p-5 text-white relative overflow-hidden">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#FBBF24] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[#0F4C81]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#FBBF24] uppercase tracking-wide">
                    Alokasi Waktu
                  </div>
                  <h3 className="text-[14px] font-extrabold">
                    {hari === "JUM'AT" ? 'Khusus Jumat' : 'Reguler'}
                  </h3>
                </div>
              </div>

              <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-1">
                {alokasi.map((a, i) => {
                  const aktif = isJamAktif(a.waktu) && isHariIni;
                  return (
                    <div
                      key={i}
                      className={`flex justify-between items-center p-2 rounded-lg text-[11px] transition ${
                        a.jam === 'ISTIRAHAT'
                          ? 'bg-[#FBBF24]/20 border border-[#FBBF24]/30 font-bold'
                          : aktif
                          ? 'bg-emerald-500/30 border border-emerald-400'
                          : 'bg-white/10 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-12 font-extrabold text-[#FBBF24] text-[10px]">
                          JAM {a.jam}
                        </span>
                        <span className="font-bold">
                          {waktuBersih(a.waktu)}
                        </span>
                      </div>
                      {aktif && (
                        <CircleDot className="w-3 h-3 text-emerald-300 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 p-2.5 rounded-lg bg-white/10 border border-white/15 text-[10.5px] leading-relaxed">
                <span className="font-bold text-[#FBBF24]">NB:</span> Guru
                piket mendampingi siswa shalat dhuhur & Jum'at berjamaah di
                masjid.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}