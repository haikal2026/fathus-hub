import {
  Users,
  Crown,
  Briefcase,
  FileText,
  Target,
  Calendar,
  MapPin,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

// ============================================
// STRUKTUR OSIS 2026/2027
// ============================================
const PENGURUS_INTI = [
  { jabatan: 'Ketua OSIS', nama: 'M. Fadil', kelas: 'XII Putra', foto: 'MF' },
  { jabatan: 'Wakil Ketua', nama: 'Aisyah Nur Fadilah', kelas: 'XI Putri', foto: 'AN' },
  { jabatan: 'Sekretaris', nama: 'Fatimah Zahra', kelas: 'XI Putri', foto: 'FZ' },
  { jabatan: 'Bendahara', nama: 'Ahmad Zulfikar', kelas: 'XII Putra', foto: 'AZ' },
];

const DIVISI = [
  { nama: 'Divisi Keagamaan', ketua: 'Zayd Al-Farisi', anggota: 8, icon: '🕌' },
  { nama: 'Divisi Olahraga & Seni', ketua: 'Rafi Jamal', anggota: 10, icon: '⚽' },
  { nama: 'Divisi Sosial & Lingkungan', ketua: 'Aisyah Putri', anggota: 9, icon: '🌱' },
  { nama: 'Divisi Humas & Media', ketua: 'Zainuddin Hakim', anggota: 8, icon: '📢' },
];

const AGENDA = [
  {
    id: 1,
    judul: 'PORSENI 2026',
    tanggal: '15-20 Oktober 2026',
    lokasi: 'MA Fathus Salafi',
    icon: '🏆',
  },
  {
    id: 2,
    judul: 'LDK (Latihan Dasar Kepemimpinan)',
    tanggal: '5-7 November 2026',
    lokasi: 'Bumi Perkemahan',
    icon: '🎯',
  },
  {
    id: 3,
    judul: 'Bakti Sosial Ramadan',
    tanggal: 'Maret 2027',
    lokasi: 'Desa Mangaran',
    icon: '🤝',
  },
];

export default function Organisasi() {
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
              <Users className="w-3.5 h-3.5" />
              ORGANISASI SISWA
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              OSIS MA Fathus Salafi
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Organisasi Siswa Intra Sekolah — wadah kepemimpinan, kreativitas,
              dan pengabdian siswa-siswi MA Fathus Salafi.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <Crown className="w-4 h-4 text-[#FBBF24]" />
                Periode 2026/2027
              </div>
              <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] rounded-full px-4 py-1.5 text-[12px] font-extrabold">
                <Users className="w-4 h-4" />
                35 Pengurus Aktif
              </div>
            </div>
          </div>
        </div>

        {/* PENGURUS INTI */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <Crown className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Struktur
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Pengurus Inti
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {PENGURUS_INTI.map((p, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-4 text-center hover:shadow-md transition"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] text-white flex items-center justify-center font-extrabold text-[20px] mx-auto mb-3 shadow-md">
                  {p.foto}
                </div>
                <div className="text-[10px] font-extrabold bg-[#FBBF24] text-[#0F4C81] px-2 py-0.5 rounded-full inline-block uppercase tracking-wide mb-2">
                  {p.jabatan}
                </div>
                <div className="text-[13px] font-extrabold text-slate-900 leading-tight">
                  {p.nama}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{p.kelas}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DIVISI */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Bidang
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                4 Divisi Kerja
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {DIVISI.map((d, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex items-center justify-center text-[28px] shrink-0">
                  {d.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] font-extrabold text-slate-900">
                    {d.nama}
                  </div>
                  <div className="text-[11.5px] text-slate-500 mt-0.5">
                    Ketua: <b className="text-slate-700">{d.ketua}</b>
                  </div>
                  <div className="mt-2 inline-flex items-center gap-1 bg-[#F8FAFC] border border-slate-200 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-600">
                    <Users className="w-3 h-3" />
                    {d.anggota} anggota
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AGENDA */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <Calendar className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Program
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Agenda Mendatang
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {AGENDA.map((a) => (
              <div
                key={a.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
              >
                <div className="text-[36px] mb-3">{a.icon}</div>
                <div className="text-[14px] font-extrabold text-slate-900 leading-tight">
                  {a.judul}
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="flex items-center gap-2 text-[11.5px] text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-[#0F4C81]" />
                    {a.tanggal}
                  </div>
                  <div className="flex items-center gap-2 text-[11.5px] text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-[#0F4C81]" />
                    {a.lokasi}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="bg-[#0F4C81] text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FBBF24] flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold tracking-widest text-[#FBBF24] uppercase">
                Rekrutmen
              </div>
              <h3 className="font-extrabold text-[16px] mt-0.5">
                Ingin Bergabung dengan OSIS?
              </h3>
              <p className="text-[12.5px] text-white/80 mt-1 leading-relaxed">
                Rekrutmen pengurus OSIS dibuka setiap awal tahun ajaran.
                Pantau pengumuman di website atau hubungi guru pembina.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}