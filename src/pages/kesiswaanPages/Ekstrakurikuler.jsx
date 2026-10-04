import {
  Users,
  Sparkles,
  Clock,
  MapPin,
  Award,
  TrendingUp,
  BookOpen,
  Target,
} from 'lucide-react';

// ============================================
// DATA EKSKUL (statis dulu)
// ============================================
const EKSKUL_DATA = [
  {
    id: 'osis',
    nama: 'OSIS',
    fullName: 'Organisasi Siswa Intra Sekolah',
    deskripsi:
      'Wadah kepemimpinan siswa dalam mengorganisir kegiatan sekolah, mengembangkan jiwa kepemimpinan, dan berkontribusi positif untuk madrasah.',
    icon: '🎓',
    warna: 'from-blue-500 to-indigo-700',
    pembina: 'Ust. Ahmad Fauzi, S.Pd',
    hari: 'Kamis',
    waktu: '15.00 - 16.30 WIB',
    lokasi: 'Aula Madrasah',
    anggota: 35,
    kegiatan: ['PORSENI', 'LDK', 'Bakti Sosial', 'Malam Keakraban'],
  },
  {
    id: 'pramuka',
    nama: 'PRAMUKA',
    fullName: 'Gerakan Pramuka Gugus Depan',
    deskripsi:
      'Membentuk karakter, kemandirian, dan cinta alam melalui kegiatan kepramukaan yang menyenangkan dan mendidik.',
    icon: '⛺',
    warna: 'from-emerald-500 to-green-700',
    pembina: 'Ust. Abdullah Hanif, S.Pd',
    hari: 'Sabtu',
    waktu: '14.00 - 16.00 WIB',
    lokasi: 'Lapangan & Alam Terbuka',
    anggota: 60,
    kegiatan: ['Perkemahan', 'Lomba Pramuka', 'Penjelajahan', 'Bakti Masyarakat'],
  },
  {
    id: 'paskibra',
    nama: 'PASKIBRA',
    fullName: 'Pasukan Pengibar Bendera',
    deskripsi:
      'Melatih kedisiplinan, ketegasan, dan jiwa nasionalisme melalui latihan baris-berbaris dan pengibaran bendera.',
    icon: '🎖️',
    warna: 'from-amber-500 to-orange-600',
    pembina: 'Ust. Alif Alim Sholata, S.Pd',
    hari: 'Jumat',
    waktu: '14.00 - 16.00 WIB',
    lokasi: 'Lapangan Utama',
    anggota: 30,
    kegiatan: ['Upacara', 'Lomba Paskibra', 'Latihan Rutin', 'Diklat'],
  },
];

// Statistik
const STATISTIK = [
  { icon: Users, label: 'Total Anggota', value: '125', sub: 'dari 3 ekskul' },
  { icon: Award, label: 'Prestasi', value: '12', sub: 'tingkat kabupaten' },
  { icon: Clock, label: 'Jam Latihan', value: '4', sub: 'jam/minggu' },
  { icon: TrendingUp, label: 'Kepuasan', value: '98%', sub: 'dari siswa' },
];

export default function Ekstrakurikuler() {
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
              <Target className="w-3.5 h-3.5" />
              EKSTRAKURIKULER
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Ekstrakurikuler
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Kembangkan bakat, minat, dan karakter Anda melalui
              ekstrakurikuler pilihan di MA Fathus Salafi.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              3 Ekstrakurikuler • 125 Anggota Aktif
            </div>
          </div>
        </div>

        {/* STATISTIK */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {STATISTIK.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-4"
              >
                <div className="w-9 h-9 rounded-xl bg-[#0F4C81]/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#0F4C81]" />
                </div>
                <div className="text-[20px] lg:text-[24px] font-extrabold text-slate-900 leading-tight">
                  {s.value}
                </div>
                <div className="text-[11px] font-bold text-slate-600 mt-0.5">
                  {s.label}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">{s.sub}</div>
              </div>
            );
          })}
        </div>

        {/* LIST EKSKUL */}
        <div className="space-y-4">
          {EKSKUL_DATA.map((e, idx) => (
            <div
              key={e.id}
              className="bg-white border border-slate-200 rounded-[20px] overflow-hidden hover:shadow-lg transition group"
            >
              <div className="grid md:grid-cols-12">
                {/* Visual */}
                <div
                  className={`md:col-span-4 relative h-[180px] md:h-auto bg-gradient-to-br ${e.warna} flex items-center justify-center`}
                >
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '20px 20px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-[80px] group-hover:scale-110 transition-transform">
                    {e.icon}
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-extrabold bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-slate-900">
                      {e.anggota} Anggota
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="md:col-span-8 p-5 lg:p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <h3 className="text-[20px] font-extrabold text-slate-900 leading-tight">
                        {e.nama}
                      </h3>
                      <div className="text-[11.5px] text-slate-500 mt-0.5">
                        {e.fullName}
                      </div>
                    </div>
                  </div>

                  <p className="text-[12.5px] text-slate-600 leading-relaxed mb-4">
                    {e.deskripsi}
                  </p>

                  {/* Info grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2 text-[11px] p-2 rounded-lg bg-[#F8FAFC] border border-slate-100">
                      <Clock className="w-3.5 h-3.5 text-[#0F4C81] shrink-0" />
                      <span className="font-bold text-slate-700">
                        {e.hari}, {e.waktu}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] p-2 rounded-lg bg-[#F8FAFC] border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-[#0F4C81] shrink-0" />
                      <span className="font-bold text-slate-700 truncate">
                        {e.lokasi}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] p-2 rounded-lg bg-[#F8FAFC] border border-slate-100 col-span-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#0F4C81] shrink-0" />
                      <span className="font-bold text-slate-700">
                        Pembina: {e.pembina}
                      </span>
                    </div>
                  </div>

                  {/* Kegiatan */}
                  <div>
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                      Program Kegiatan
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {e.kegiatan.map((k, i) => (
                        <span
                          key={i}
                          className="text-[10.5px] font-bold bg-white border border-slate-200 px-2.5 py-1 rounded-full text-slate-700"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}