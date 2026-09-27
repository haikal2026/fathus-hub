import { Award, Heart, Users, Shield, Flag, Sparkles, Target, CheckCircle2 } from 'lucide-react';

export default function VisiMisi() {
  // Data 5 pilar IHSAN
  const ihsanPillars = [
    {
      kode: 'I',
      judul: 'ISLAMI',
      desk: 'Berlandaskan nilai-nilai Islam dalam setiap aspek pendidikan dan pembinaan santri.',
      icon: Shield,
      warna: 'bg-[#0F4C81] text-white',
      iconWarna: 'text-[#FBBF24]',
    },
    {
      kode: 'H',
      judul: 'HUMANIS',
      desk: 'Menghargai harkat dan martabat manusia, membangun empati dan kepedulian sosial.',
      icon: Heart,
      warna: 'bg-[#FBBF24] text-[#0F4C81]',
      iconWarna: 'text-[#0F4C81]',
    },
    {
      kode: 'S',
      judul: 'SANTUN',
      desk: 'Membiasakan akhlak mulia, tutur kata yang baik, dan sikap hormat kepada sesama.',
      icon: Users,
      warna: 'bg-emerald-600 text-white',
      iconWarna: 'text-white',
    },
    {
      kode: 'A',
      judul: 'ANDAL',
      desk: 'Membekali santri dengan kompetensi, keterampilan, dan kemandirian yang mumpuni.',
      icon: Award,
      warna: 'bg-indigo-600 text-white',
      iconWarna: 'text-[#FBBF24]',
    },
    {
      kode: 'N',
      judul: 'NASIONALIS',
      desk: 'Menumbuhkan cinta tanah air dan semangat berkontribusi bagi bangsa dan negara.',
      icon: Flag,
      warna: 'bg-rose-600 text-white',
      iconWarna: 'text-white',
    },
  ];

  // Data misi madrasah
  const misiList = [
    'Menyelenggarakan pendidikan madrasah yang integratif antara ilmu agama dan umum berbasis IHSAN.',
    'Menguatkan program Tahfidz, Kitab Kuning, dan Bahasa Arab sebagai ciri khas Islami & Humanis.',
    'Membentuk karakter santri yang Santun, Andal, mandiri, dan bertanggung jawab.',
    'Mendorong prestasi akademik dan non-akademik berjiwa Nasionalis.',
    'Membangun ekosistem digital pesantren yang modern dan transparan.',
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[900px] mx-auto space-y-6">

        {/* ============================================
            BAGIAN 1: HERO VISI
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
          <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-white rounded-full blur-[80px] opacity-[0.06]" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
              <Target className="w-3 h-3 text-[#FBBF24]" />
              VISI MADRASAH
            </div>

            <h1 className="mt-5 text-[22px] lg:text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em]">
              Terwujudnya Peserta Didik Yang{' '}
              <span className="text-[#FBBF24]">IHSAN</span>
            </h1>

            <p className="mt-3 text-[14px] lg:text-[16px] font-bold text-white/90 leading-relaxed">
              ( ISLAMI — HUMANIS — SANTUN — ANDAL — NASIONALIS )
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {ihsanPillars.map((p) => (
                <div
                  key={p.kode}
                  className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wide shadow-sm"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0F4C81] text-[#FBBF24] flex items-center justify-center text-[10px] font-extrabold">
                    {p.kode}
                  </span>
                  {p.judul}
                </div>
              ))}
            </div>

            <p className="mt-5 text-[11px] text-white/60 font-medium">
              IHSAN • Karakter santri MA Fathus Salafi Tanjung Rejo
            </p>
          </div>
        </div>

        {/* ============================================
            BAGIAN 2: PENJELASAN IHSAN
        ============================================ */}
        <div>
          <h2 className="text-[16px] font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0F4C81]" />
            Makna IHSAN
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {ihsanPillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.kode}
                  className={`rounded-2xl p-5 ${p.warna} relative overflow-hidden`}
                >
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-[12px]" />
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                      <Icon className={`w-5 h-5 ${p.iconWarna}`} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-extrabold">
                          {p.kode}
                        </span>
                        <span className="font-extrabold text-[14px] tracking-wide">
                          {p.judul}
                        </span>
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed opacity-90">
                        {p.desk}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================
            BAGIAN 3: MISI MADRASAH
        ============================================ */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-[#FBBF24]" />
            </div>
            <div>
              <div className="inline-block bg-[#FBBF24] text-[#0F4C81] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-widest">
                MISI
              </div>
              <h2 className="text-[16px] font-extrabold text-slate-900 mt-1">
                Misi MA Fathus Salafi
              </h2>
            </div>
          </div>

          <ol className="space-y-3">
            {misiList.map((misi, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-extrabold text-[12px] shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-[13px] leading-relaxed text-slate-700 flex-1">
                  {misi}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* ============================================
            BAGIAN 4: TAGLINE
        ============================================ */}
        <div className="bg-[#FBBF24] rounded-2xl p-6 lg:p-8 text-[#0F4C81] relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#0F4C81]/10 rounded-full blur-[20px]" />
          <div className="relative z-10 text-center">
            <div className="text-[10px] font-extrabold tracking-widest opacity-70 uppercase mb-3">
              Tagline Madrasah
            </div>
            <p className="text-[20px] lg:text-[24px] font-extrabold leading-tight tracking-[-0.01em]">
              "Membangun Generasi Berilmu,
              <br />
              Berkarakter dan Berakhlak"
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-[#0F4C81] text-white px-4 py-2 rounded-full text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              MA Fathus Salafi Tanjung Rejo
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}