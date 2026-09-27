import { Building2, Award, MapPin, Users, BookOpen, Calendar } from 'lucide-react';

export default function Tentang() {
  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[900px] mx-auto space-y-6">

        {/* BAGIAN 1: HERO */}
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
            <div className="inline-block bg-[#FBBF24] text-[#0F4C81] px-3 py-1 rounded-full text-[11px] font-extrabold tracking-widest">
              TENTANG KAMI
            </div>
            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              MA FATHUS SALAFI
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Madrasah Aliyah Fathus Salafi ialah lembaga pendidikan yang
              berada di bawah naungan Yayasan Pondok Pesantren Tanjung Rejo.
              Lembaga ini memadukan kurikulum nasional dengan keagamaan dan
              karakter santri.
            </p>
          </div>
        </div>

        {/* BAGIAN 2: DESKRIPSI */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
          <p className="text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Berdiri sejak tahun <strong>1970</strong> di bawah naungan Yayasan
            Pondok Pesantren Tanjung Rejo, Madrasah Aliyah (MA) Fathus Salafi
            secara konsisten membina generasi muda melalui perpaduan seimbang
            antara pendidikan umum dan keagamaan. Seiring berjalannya waktu,
            MA Fathus Salafi terus berkomitmen mencetak santri yang berwawasan
            luas, berbakti kepada agama, serta siap menghadapi perkembangan
            zaman tanpa mengesampingkan nilai-nilai pesantren.
          </p>

          <p className="mt-4 text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Sebagai lembaga pendidikan Islam, MA Fathus Salafi mengedepankan
            visi <strong>IHSAN</strong> — <em>Islami, Humanis, Santun, Andal,
            dan Nasionalis</em> — dalam setiap aspek pembelajaran. Kurikulum
            yang diterapkan memadukan mata pelajaran nasional (Matematika,
            Bahasa Indonesia, Bahasa Inggris, IPA, IPS, dan lainnya) dengan
            mata pelajaran khas madrasah (Fikih, Akidah Akhlak, SKI, Qur'an
            Hadits, Bahasa Arab, dan Aswaja) serta program unggulan Tahfidz
            dan kajian kitab kuning.
          </p>

          <p className="mt-4 text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Dengan dukungan tenaga pendidik yang kompeten, fasilitas
            pembelajaran yang memadai, serta lingkungan pesantren yang asri,
            MA Fathus Salafi berkomitmen menjadi lembaga pendidikan yang
            unggul dalam membentuk generasi berilmu, berkarakter, dan
            berakhlak mulia — siap berkontribusi bagi agama, bangsa, dan
            negara.
          </p>
        </div>

        {/* BAGIAN 3: KARTU INFO */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[#0F4C81] text-white rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-[12px]" />
            <div className="flex items-center justify-between relative z-10">
              <div className="text-[10px] font-bold tracking-widest bg-white/15 border border-white/20 px-2.5 py-1 rounded-full">
                NPSN
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#FBBF24] flex items-center justify-center">
                <Building2 className="w-4 h-4 text-[#0F4C81]" />
              </div>
            </div>
            <div className="mt-4 relative z-10">
              <div className="text-[11px] opacity-70 font-semibold uppercase tracking-wide">
                Nomor Pokok Sekolah Nasional
              </div>
              <div className="mt-1 inline-flex items-center gap-2 bg-white text-[#0F4C81] px-3 py-1 rounded-full font-extrabold text-[15px] tracking-wide">
                20584632
              </div>
            </div>
          </div>

          <div className="bg-[#FBBF24] text-[#0F4C81] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#0F4C81]/10 rounded-full blur-[12px]" />
            <div className="flex items-center justify-between relative z-10">
              <div className="text-[10px] font-bold tracking-widest bg-[#0F4C81] text-white px-2.5 py-1 rounded-full">
                AKREDITASI
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#0F4C81] flex items-center justify-center">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>
            <div className="mt-4 relative z-10">
              <div className="text-[11px] opacity-70 font-semibold uppercase tracking-wide">
                Status Akreditasi
              </div>
              <div className="mt-1 inline-flex items-center gap-2 bg-[#0F4C81] text-white px-4 py-1 rounded-full font-extrabold text-[15px] tracking-wide">
                B
              </div>
              <div className="mt-2 text-[11px] font-bold opacity-80">
                Badan Akreditasi Nasional
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="text-[10px] font-bold tracking-widest bg-[#F8FAFC] border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                ALAMAT LENGKAP
              </div>
              <div className="w-8 h-8 rounded-xl bg-[#0F4C81]/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[#0F4C81]" />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                Lokasi Sekolah
              </div>
              <div className="mt-1.5 text-[13px] leading-relaxed font-semibold text-slate-800 flex gap-2">
                <MapPin className="w-4 h-4 text-[#0F4C81] shrink-0 mt-0.5" />
                <span>
                  Jl. Tanjung Rejo No. 68, Desa Mangaran, Kec. Mangaran,
                  Kab. Situbondo, Provinsi Jawa Timur 68363
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* BAGIAN 4: STATISTIK */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <div className="text-[22px] font-extrabold text-[#0F4C81]">
              1970
            </div>
            <div className="text-[11px] font-bold text-slate-600">
              Tahun Berdiri
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="text-[22px] font-extrabold text-[#0F4C81]">
              163
            </div>
            <div className="text-[11px] font-bold text-slate-600">
              Siswa Aktif
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center mx-auto mb-2">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div className="text-[22px] font-extrabold text-[#0F4C81]">
              15
            </div>
            <div className="text-[11px] font-bold text-slate-600">
              Guru & Tendik
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}