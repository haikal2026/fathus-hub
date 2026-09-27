import {
  Building2,
  Snowflake,
  Monitor,
  BookOpen,
  Trophy,
  Utensils,
  HeartPulse,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function Fasilitas() {
  // Data fasilitas
  const fasilitasList = [
    {
      icon: Snowflake,
      judul: 'AC 2 Unit / Kelas',
      desk: 'Kenyamanan belajar optimal di setiap kelas dengan pendingin ruangan.',
      warna: 'bg-cyan-100 text-cyan-700',
      border: 'border-cyan-200',
    },
    {
      icon: Monitor,
      judul: 'LAB Komputer',
      desk: 'Akses internet & pembelajaran digital dengan komputer modern.',
      warna: 'bg-blue-100 text-blue-700',
      border: 'border-blue-200',
    },
    {
      icon: BookOpen,
      judul: 'Perpustakaan Digital',
      desk: '500+ koleksi buku, kitab kuning, dan e-book untuk menunjang literasi.',
      warna: 'bg-emerald-100 text-emerald-700',
      border: 'border-emerald-200',
    },
    {
      icon: Trophy,
      judul: 'Lapangan Olahraga',
      desk: 'Lapangan multifungsi untuk futsal, voli, dan upacara bendera.',
      warna: 'bg-amber-100 text-amber-700',
      border: 'border-amber-200',
    },
    {
      icon: Utensils,
      judul: 'Kantin Sehat',
      desk: 'Makanan higienis & bergizi untuk mendukung aktivitas santri.',
      warna: 'bg-orange-100 text-orange-700',
      border: 'border-orange-200',
    },
    {
      icon: HeartPulse,
      judul: 'Ruang UKS',
      desk: 'Layanan kesehatan santri dengan petugas terlatih.',
      warna: 'bg-rose-100 text-rose-700',
      border: 'border-rose-200',
    },
  ];

  // Highlight fasilitas unggulan
  const highlightList = [
    'AC 2 unit di setiap kelas',
    'Lab komputer dengan internet',
    'Perpustakaan digital 500+ koleksi',
    'Lapangan olahraga multifungsi',
    'Kantin sehat & higienis',
    'Ruang UKS dengan petugas',
  ];

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
              <Building2 className="w-3.5 h-3.5" />
              FASILITAS
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Fasilitas Unggulan
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Sarana & prasarana modern untuk mendukung pembelajaran dan
              kenyamanan santri MA Fathus Salafi.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              6 Fasilitas Utama Terstandar
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 2: GRID FASILITAS
        ============================================ */}
        <div>
          <h2 className="text-[16px] font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0F4C81]" />
            Daftar Fasilitas
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fasilitasList.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white border ${f.border} rounded-2xl p-5 hover:shadow-md transition`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${f.warna} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-[13px] text-slate-900 leading-tight">
                    {f.judul}
                  </div>
                  <div className="mt-1.5 text-[11.5px] text-slate-600 leading-relaxed">
                    {f.desk}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================
            BAGIAN 3: HIGHLIGHT / INFO
        ============================================ */}
        <div className="bg-[#0F4C81] text-white rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#0F4C81]" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-[#FBBF24] uppercase">
                  Standar Pesantren Modern
                </div>
                <h3 className="font-extrabold text-[15px] mt-0.5">
                  Fasilitas Terstandar
                </h3>
              </div>
            </div>

            <p className="text-[12.5px] text-white/80 leading-relaxed mb-5">
              Semua fasilitas di MA Fathus Salafi disiapkan untuk mendukung
              visi IHSAN — menciptakan lingkungan belajar yang Islami,
              Humanis, Santun, Andal, dan Nasionalis.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {highlightList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[12px] font-semibold"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span className="text-white/90">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 4: INFO TAMBAHAN
        ============================================ */}
        <div className="bg-[#FBBF24] text-[#0F4C81] rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#0F4C81]/10 rounded-full blur-[12px]" />
          <div className="relative z-10 flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-extrabold text-[14px]">
                Terus Berkembang
              </div>
              <p className="mt-1 text-[12px] leading-relaxed opacity-80">
                MA Fathus Salafi berkomitmen untuk terus meningkatkan kualitas
                fasilitas pembelajaran seiring dengan perkembangan zaman dan
                kebutuhan santri.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}