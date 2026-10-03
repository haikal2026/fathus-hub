import {
  Award,
  Calendar,
  Clock,
  Info,
  CheckCircle2,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { JADWAL_UJIAN, TATA_TERTIB_UJIAN } from '../../data/akademikData';

export default function JadwalUjian() {
  // Warna per ujian
  const warnaStyle = {
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-700',
      icon: 'bg-blue-600',
      badge: 'bg-blue-600 text-white',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-700',
      icon: 'bg-amber-600',
      badge: 'bg-amber-600 text-white',
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      text: 'text-emerald-700',
      icon: 'bg-emerald-600',
      badge: 'bg-emerald-600 text-white',
    },
    purple: {
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      text: 'text-purple-700',
      icon: 'bg-purple-600',
      badge: 'bg-purple-600 text-white',
    },
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1100px] mx-auto space-y-6">

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
              <Award className="w-3.5 h-3.5" />
              JADWAL UJIAN
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Jadwal Ujian
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Informasi lengkap jadwal UTS, UAS, Ujian Madrasah, dan Ujian
              Tahfidz TP 2026/2027.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Calendar className="w-4 h-4 text-[#FBBF24]" />
              {JADWAL_UJIAN.length} Agenda Ujian • TP 2026/2027
            </div>
          </div>
        </div>

        {/* ==========================================
            LIST UJIAN
        ========================================== */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <FileText className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Agenda
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Daftar Ujian Tahun Pelajaran 2026/2027
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {JADWAL_UJIAN.map((u) => {
              const style = warnaStyle[u.warna] || warnaStyle.blue;
              return (
                <div
                  key={u.id}
                  className={`rounded-[20px] border-2 ${style.border} ${style.bg} p-5 relative overflow-hidden`}
                >
                  {/* Blur deco */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 bg-white/50 rounded-full blur-[24px]" />

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`w-11 h-11 rounded-xl ${style.icon} flex items-center justify-center shrink-0`}
                      >
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${style.badge}`}
                      >
                        {u.status === 'akan-datang' ? 'AKAN DATANG' : 'SELESAI'}
                      </span>
                    </div>

                    {/* Nama & tanggal */}
                    <h3 className={`text-[15px] font-extrabold ${style.text} leading-tight`}>
                      {u.nama}
                    </h3>

                    <div className="mt-2 flex items-center gap-2 text-[11px] font-bold text-slate-700">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{u.tanggal}</span>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Durasi: {u.durasi}</span>
                    </div>

                    {/* Deskripsi */}
                    <p className="mt-3 text-[11.5px] text-slate-600 leading-relaxed">
                      {u.deskripsi}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==========================================
            TATA TERTIB UJIAN
        ========================================== */}
        <div className="bg-white border border-slate-200 rounded-[20px] p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Peraturan
              </div>
              <h2 className="text-[16px] font-extrabold text-slate-900">
                Tata Tertib Ujian
              </h2>
            </div>
          </div>

          <ul className="space-y-2">
            {TATA_TERTIB_UJIAN.map((t, i) => (
              <li
                key={i}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-slate-100"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-[12.5px] text-slate-700 leading-relaxed">
                  {t}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* ==========================================
            INFO PENTING
        ========================================== */}
        <div className="bg-[#0F4C81] text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center">
                <Info className="w-5 h-5 text-[#0F4C81]" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-[#FBBF24] uppercase">
                  Penting
                </div>
                <h3 className="font-extrabold text-[15px] mt-0.5">
                  Info Persiapan Ujian
                </h3>
              </div>
            </div>

            <ul className="space-y-2 text-[12px] text-white/90">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                <span className="leading-relaxed">
                  Jadwal detail per mapel akan diumumkan H-7 sebelum ujian dimulai.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                <span className="leading-relaxed">
                  Kartu peserta ujian dapat diunduh dari menu <b>Download</b> atau diambil di kantor madrasah.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                <span className="leading-relaxed">
                  Siswa wajib mengikuti seluruh rangkaian ujian untuk mendapatkan nilai rapor.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}