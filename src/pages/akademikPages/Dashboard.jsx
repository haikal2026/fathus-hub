import {
  BookOpen,
  GraduationCap,
  Users,
  Calendar,
  Award,
  Clock,
  Sparkles,
  TrendingUp,
  School,
  ArrowRight,
} from 'lucide-react';

export default function Dashboard() {
  // Statistik akademik
  const stats = [
    {
      icon: BookOpen,
      label: 'Mata Pelajaran',
      value: '21',
      sub: '3 Rumpun',
      warna: 'bg-blue-50 text-[#0F4C81]',
      iconColor: 'text-[#0F4C81]',
    },
    {
      icon: GraduationCap,
      label: 'Guru Pengajar',
      value: '15',
      sub: 'Kode A - O',
      warna: 'bg-emerald-50 text-emerald-600',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Users,
      label: 'Siswa Aktif',
      value: '163',
      sub: '70 Putra • 93 Putri',
      warna: 'bg-purple-50 text-purple-600',
      iconColor: 'text-purple-600',
    },
    {
      icon: Calendar,
      label: 'Tahun Ajaran',
      value: '2026/2027',
      sub: 'Semester Ganjil',
      warna: 'bg-amber-50 text-amber-600',
      iconColor: 'text-amber-600',
    },
  ];

  // Rumpun mapel
  const rumpun = [
    {
      nama: 'Umum',
      jumlah: 15,
      warna: 'bg-blue-50 border-blue-200 text-blue-700',
      badge: 'bg-blue-600 text-white',
      mapel: [
        'Matematika',
        'B. Indonesia',
        'B. Inggris',
        'Fisika',
        'Kimia',
        'Biologi',
        'Ekonomi',
        'Sosiologi',
        'Geografi',
        'Sejarah',
        'PKn',
        'Penjas',
        'TIK',
        'Seni Budaya',
        'B. Arab',
      ],
    },
    {
      nama: 'Keagamaan',
      jumlah: 5,
      warna: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      badge: 'bg-emerald-600 text-white',
      mapel: ['Fikih', 'Akidah Akhlak', 'SKI', "Qur'an Hadits", 'Aswaja'],
    },
    {
      nama: 'Keterampilan',
      jumlah: 1,
      warna: 'bg-amber-50 border-amber-200 text-amber-700',
      badge: 'bg-amber-600 text-white',
      mapel: ['Prakarya'],
    },
  ];

  // Akses cepat (3 kartu)
  const quickAccess = [
    {
      icon: Calendar,
      label: 'Jadwal Pelajaran',
      desc: 'Jadwal harian kelas X, XI, dan XII',
      warna: 'from-blue-600 to-blue-800',
    },
    {
      icon: BookOpen,
      label: 'Mata Pelajaran',
      desc: 'Daftar mapel per rumpun keilmuan',
      warna: 'from-emerald-500 to-emerald-700',
    },
    {
      icon: Award,
      label: 'Jadwal Ujian',
      desc: 'Info UTS, UAS & ujian madrasah',
      warna: 'from-amber-500 to-orange-600',
    },
  ];

  // Info penting
  const infoList = [
    'Alokasi waktu reguler: 60 menit per jam pelajaran',
    "Jum'at: 25 menit per jam pelajaran (persiapan shalat Jum'at)",
    'Jam pelajaran: 07.00 - 12.00 WIB',
    'Guru piket mendampingi shalat dhuhur berjamaah',
  ];

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
              <School className="w-3.5 h-3.5" />
              AKADEMIK
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Dashboard Akademik
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Ringkasan informasi akademik MA Fathus Salafi — mata pelajaran,
              guru pengajar, jadwal, dan kalender akademik.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              Tahun Pelajaran 2026/2027 • Terakreditasi B
            </div>
          </div>
        </div>

        {/* ==========================================
            AKSES CEPAT — BESAR & BERWARNA
        ========================================== */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <TrendingUp className="w-4.5 h-4.5 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Navigasi
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Akses Cepat Akademik
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {quickAccess.map((q, idx) => {
              const Icon = q.icon;
              return (
                <button
                  key={idx}
                  className={`group relative overflow-hidden rounded-[20px] bg-gradient-to-br ${q.warna} text-white p-6 text-left hover:shadow-2xl transition-all hover:scale-[1.02] min-h-[180px] flex flex-col justify-between`}
                >
                  {/* Pattern dekoratif */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '22px 22px',
                    }}
                  />
                  {/* Blur dekoratif */}
                  <div className="absolute -top-8 -right-8 w-28 h-28 bg-white/15 rounded-full blur-[24px]" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white/25 backdrop-blur flex items-center justify-center shadow-lg">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <ArrowRight className="w-6 h-6 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-[17px] font-extrabold leading-tight">
                      {q.label}
                    </div>
                    <div className="mt-1.5 text-[12px] text-white/85 leading-relaxed">
                      {q.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-slate-400 mt-3 text-center italic">
            💡 Klik menu di sidebar kiri untuk membuka halaman lengkap
          </p>
        </div>

        {/* ==========================================
            STATISTIK
        ========================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-4"
              >
                <div
                  className={`w-9 h-9 rounded-xl ${s.warna} flex items-center justify-center mb-3`}
                >
                  <Icon className={`w-4 h-4 ${s.iconColor}`} />
                </div>
                <div className="text-[20px] lg:text-[24px] font-extrabold text-slate-900 leading-tight">
                  {s.value}
                </div>
                <div className="text-[11px] font-bold text-slate-600 mt-0.5">
                  {s.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {s.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* ==========================================
            INFO MADRASAH
        ========================================== */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0F4C81] flex items-center justify-center shrink-0">
              <School className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-extrabold tracking-widest text-[#0F4C81] uppercase">
                Yayasan Pondok Pesantren Tanjung Rejo
              </div>
              <h2 className="mt-1 text-[18px] font-extrabold text-slate-900">
                Madrasah Aliyah Fathus Salafi
              </h2>
              <p className="mt-1 text-[12px] text-slate-500 leading-relaxed">
                Jl. Tanjung Rejo No. 68, Desa Mangaran, Kec. Mangaran, Kab.
                Situbondo, Jawa Timur 68363
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">
                    NPSN
                  </div>
                  <div className="text-[13px] font-extrabold text-[#0F4C81] mt-0.5">
                    20584632
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">
                    Akreditasi
                  </div>
                  <div className="text-[13px] font-extrabold text-[#0F4C81] mt-0.5">
                    B
                  </div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center">
                  <div className="text-[10px] font-bold text-slate-500 uppercase">
                    Rombel
                  </div>
                  <div className="text-[13px] font-extrabold text-[#0F4C81] mt-0.5">
                    6
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            RUMPUN MAPEL
        ========================================== */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Rumpun
              </div>
              <h2 className="text-[16px] font-extrabold text-slate-900">
                Mata Pelajaran
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {rumpun.map((r) => (
              <div
                key={r.nama}
                className={`rounded-2xl border-2 p-5 ${r.warna}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-extrabold text-[14px]">
                    Rumpun {r.nama}
                  </h3>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${r.badge}`}
                  >
                    {r.jumlah} Mapel
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {r.mapel.map((m, i) => (
                    <span
                      key={i}
                      className="text-[10.5px] font-bold bg-white/70 backdrop-blur px-2 py-0.5 rounded-full border border-current/20"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ==========================================
            INFO PENTING
        ========================================== */}
        <div className="bg-[#0F4C81] text-white rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#0F4C81]" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-[#FBBF24] uppercase">
                  Alokasi Waktu
                </div>
                <h3 className="font-extrabold text-[15px] mt-0.5">
                  Info Penting Akademik
                </h3>
              </div>
            </div>

            <ul className="space-y-2">
              {infoList.map((info, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[12px] text-white/90"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{info}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}