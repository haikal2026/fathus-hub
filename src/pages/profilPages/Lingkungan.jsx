import {
  Trees,
  VolumeX,
  Wind,
  Moon,
  MapPin,
  Sparkles,
  CheckCircle2,
  Leaf,
} from 'lucide-react';

export default function Lingkungan() {
  // Data keunggulan lingkungan
  const keunggulanList = [
    {
      icon: Trees,
      judul: 'Lingkungan Asri',
      desk: 'Area pesantren seluas 2 hektar dengan pepohonan rindang dan taman hijau.',
      warna: 'bg-emerald-100 text-emerald-700',
      border: 'border-emerald-200',
    },
    {
      icon: VolumeX,
      judul: 'Jauh dari Kebisingan',
      desk: 'Lokasi tenang, ideal untuk konsentrasi belajar dan menghafal Al-Qur\'an.',
      warna: 'bg-blue-100 text-blue-700',
      border: 'border-blue-200',
    },
    {
      icon: Wind,
      judul: 'Udara Sejuk',
      desk: 'Dikelilingi sawah dan pepohonan, memberikan udara segar setiap hari.',
      warna: 'bg-cyan-100 text-cyan-700',
      border: 'border-cyan-200',
    },
    {
      icon: Moon,
      judul: 'Suasana Islami',
      desk: 'Dekat dengan masjid pesantren — mendukung pembiasaan ibadah harian.',
      warna: 'bg-amber-100 text-amber-700',
      border: 'border-amber-200',
    },
  ];

  // Highlight
  const highlightList = [
    'Area pesantren 2 hektar',
    'Dikelilingi sawah & pepohonan',
    'Jauh dari jalan raya & keramaian',
    'Udara sejuk & bersih',
    'Dekat masjid pesantren',
    'Aman & nyaman untuk santri',
  ];

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1100px] mx-auto space-y-6">

        {/* ============================================
            BAGIAN 1: HERO
        ============================================ */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-emerald-700 to-[#0F4C81] text-white p-8 lg:p-10">
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
              <Leaf className="w-3.5 h-3.5" />
              LINGKUNGAN
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Lingkungan Sekolah
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Suasana asri, tenang, dan Islami — tempat ideal untuk tumbuh
              dan berkembang menjadi generasi berilmu dan berakhlak.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <MapPin className="w-4 h-4 text-[#FBBF24]" />
              Tanjung Rejo • Mangaran • Situbondo
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 2: KEUNGGULAN LINGKUNGAN
        ============================================ */}
        <div>
          <h2 className="text-[16px] font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Keunggulan Lingkungan
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {keunggulanList.map((k, idx) => {
              const Icon = k.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white border ${k.border} rounded-2xl p-5 hover:shadow-md transition`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${k.warna} flex items-center justify-center mb-3`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-extrabold text-[13px] text-slate-900 leading-tight">
                    {k.judul}
                  </div>
                  <div className="mt-1.5 text-[11.5px] text-slate-600 leading-relaxed">
                    {k.desk}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================
            BAGIAN 3: DESKRIPSI LENGKAP
        ============================================ */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
          <h2 className="text-[16px] font-extrabold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#0F4C81]" />
            Suasana Belajar Ideal
          </h2>

          <p className="text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            MA Fathus Salafi berada di lingkungan pesantren yang{' '}
            <strong>asri dan tenang</strong>, jauh dari hiruk-pikuk keramaian
            kota. Area pesantren seluas kurang lebih{' '}
            <strong>2 hektar</strong> ini dikelilingi oleh sawah, pepohonan
            rindang, dan taman hijau yang memberikan udara sejuk setiap hari.
            Suasana seperti ini sangat mendukung konsentrasi belajar,
            menghafal Al-Qur'an, dan pembinaan karakter santri.
          </p>

          <p className="mt-4 text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Kehadiran <strong>masjid pesantren</strong> di tengah lingkungan
            madrasah memudahkan santri untuk menunaikan ibadah berjamaah,
            kajian kitab, dan kegiatan keagamaan lainnya. Lingkungan yang
            Islami, aman, dan nyaman ini menjadi salah satu faktor utama
            mengapa banyak orang tua mempercayakan pendidikan putra-putrinya
            kepada MA Fathus Salafi.
          </p>
        </div>

        {/* ============================================
            BAGIAN 4: HIGHLIGHT
        ============================================ */}
        <div className="bg-emerald-600 text-white rounded-2xl p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center">
                <Trees className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-[#FBBF24] uppercase">
                  Suasana Ideal
                </div>
                <h3 className="font-extrabold text-[15px] mt-0.5">
                  Lingkungan Pendukung Belajar
                </h3>
              </div>
            </div>

            <p className="text-[12.5px] text-white/90 leading-relaxed mb-5">
              Lingkungan yang asri, tenang, dan Islami menciptakan suasana
              belajar yang kondusif — sesuai visi IHSAN MA Fathus Salafi.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {highlightList.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[12px] font-semibold"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#FBBF24] shrink-0" />
                  <span className="text-white/95">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 5: INFO LOKASI
        ============================================ */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-extrabold text-[14px] text-slate-900">
                Lokasi Strategis
              </div>
              <p className="mt-1 text-[12.5px] text-slate-600 leading-relaxed">
                Jl. Tanjung Rejo No. 68, Desa Mangaran, Kec. Mangaran, Kab.
                Situbondo, Provinsi Jawa Timur 68363
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="text-[10.5px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                  🌾 Dekat Sawah
                </span>
                <span className="text-[10.5px] font-bold bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full">
                  🕌 Dekat Masjid
                </span>
                <span className="text-[10.5px] font-bold bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                  🌳 Asri & Hijau
                </span>
                <span className="text-[10.5px] font-bold bg-purple-50 text-purple-700 px-2.5 py-1 rounded-full">
                  🔇 Tenang
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}