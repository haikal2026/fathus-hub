import { Building2, Users, BookOpen, Calendar, Heart } from 'lucide-react';

export default function Sejarah() {
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
              SEJARAH
            </div>
            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Perjalanan MA Fathus Salafi
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Lebih dari 5 dekade mengabdi untuk pendidikan Islam — dari
              pondok pesantren sederhana hingga menjadi madrasah aliyah
              terakreditasi.
            </p>
          </div>
        </div>

        {/* BAGIAN 2: DESKRIPSI LENGKAP */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
          <p className="text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Madrasah Aliyah (MA) Fathus Salafi berawal dari visi mulia{' '}
            <strong>K.H. R. Ghufron Imroni</strong> dan{' '}
            <strong>Nyai Siti Robiah</strong> yang mendirikan Pondok Pesantren
            Tanjung Rejo sebagai pusat syiar Islam dan pendidikan karakter.
            Berangkat dari keprihatinan terhadap minimnya akses pendidikan
            agama yang berkualitas di wilayah Tanjung Rejo dan sekitarnya,
            keduanya membangun pondok pesantren yang tidak hanya mengajarkan
            ilmu agama, tetapi juga membina akhlak dan kepribadian santri.
          </p>

          <p className="mt-4 text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Menyadari pentingnya keseimbangan ilmu di era modern, pada tahun{' '}
            <strong>1970</strong> resmi didirikan MA Fathus Salafi di bawah
            naungan Yayasan Pondok Pesantren Tanjung Rejo. Madrasah ini hadir
            sebagai jawaban atas kebutuhan masyarakat akan lembaga pendidikan
            menengah yang memadukan kurikulum nasional dengan nilai-nilai
            keislaman dan tradisi pesantren.
          </p>

          <p className="mt-4 text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Hingga kini, MA Fathus Salafi berfokus pada dua pilar utama —{' '}
            <strong>pendidikan agama</strong> dan <strong>pendidikan umum</strong>{' '}
            — untuk mencetak generasi yang berakhlak mulia sekaligus cerdas
            menjawab tantangan zaman. Program unggulan Tahfidz, kajian kitab
            kuning, dan penguatan bahasa Arab menjadi ciri khas madrasah ini,
            sementara mata pelajaran nasional tetap diberikan secara seimbang.
          </p>

          <p className="mt-4 text-[13.5px] lg:text-[14px] leading-relaxed text-slate-700 text-justify">
            Dengan dukungan tenaga pendidik yang kompeten dan fasilitas
            pembelajaran yang terus berkembang, MA Fathus Salafi berkomitmen
            menjadi lembaga pendidikan Islam unggulan yang melahirkan generasi
            berilmu, berkarakter, dan berakhlak mulia — siap berkontribusi
            bagi agama, bangsa, dan negara.
          </p>
        </div>

        {/* BAGIAN 3: KARTU PENDIRI */}
        <div>
          <h2 className="text-[16px] font-extrabold text-slate-900 mb-3 flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#0F4C81]" />
            Pendiri & Pelopor
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-[#0F4C81] text-white rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-[12px]" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FBBF24] text-[#0F4C81] flex items-center justify-center font-extrabold text-[18px]">
                  GI
                </div>
                <div>
                  <div className="font-extrabold text-[14px]">K.H. R. Ghufron Imroni</div>
                  <div className="text-[11px] text-white/70">Pendiri Pondok Pesantren Tanjung Rejo</div>
                </div>
              </div>
              <p className="mt-3 text-[12px] text-white/80 leading-relaxed relative z-10">
                Tokoh ulama kharismatik yang meletakkan dasar pendidikan
                pesantren di Tanjung Rejo.
              </p>
            </div>

            <div className="bg-[#FBBF24] text-[#0F4C81] rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#0F4C81]/10 rounded-full blur-[12px]" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#0F4C81] text-white flex items-center justify-center font-extrabold text-[18px]">
                  SR
                </div>
                <div>
                  <div className="font-extrabold text-[14px]">Nyai Siti Robiah</div>
                  <div className="text-[11px] opacity-70">Pendiri & Pembina Pesantren</div>
                </div>
              </div>
              <p className="mt-3 text-[12px] opacity-80 leading-relaxed relative z-10">
                Ibu nyai yang berperan besar dalam pembinaan karakter dan
                pendidikan santri putri.
              </p>
            </div>
          </div>
        </div>

        {/* BAGIAN 4: TIMELINE SEJARAH */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
          <h2 className="text-[16px] font-extrabold text-slate-900 mb-5 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#0F4C81]" />
            Tonggak Sejarah
          </h2>

          <div className="space-y-4">
            {[
              {
                tahun: 'Awal Berdiri',
                judul: 'Pendirian Pondok Pesantren Tanjung Rejo',
                desk: 'K.H. R. Ghufron Imroni & Nyai Siti Robiah mendirikan Pondok Pesantren Tanjung Rejo sebagai pusat syiar Islam.',
              },
              {
                tahun: '1970',
                judul: 'MA Fathus Salafi Resmi Didirikan',
                desk: 'Madrasah Aliyah Fathus Salafi didirikan di bawah naungan Yayasan Pondok Pesantren Tanjung Rejo.',
              },
              {
                tahun: 'Perkembangan',
                judul: 'Penguatan Kurikulum Terpadu',
                desk: 'Memadukan kurikulum nasional dengan ilmu keagamaan dan tradisi pesantren.',
              },
              {
                tahun: 'Sekarang',
                judul: 'Terakreditasi B & Terus Berkembang',
                desk: 'Melayani 163 siswa aktif dengan 15 guru & tendik, 3 ekskul, dan fasilitas pembelajaran modern.',
              },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="shrink-0 w-[110px]">
                  <div className="inline-flex items-center gap-1.5 bg-[#0F4C81] text-white px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide">
                    {item.tahun}
                  </div>
                </div>
                <div className="flex-1 pb-4 border-b border-slate-100 last:border-0">
                  <div className="font-bold text-[13.5px] text-slate-900">
                    {item.judul}
                  </div>
                  <p className="mt-1 text-[12.5px] text-slate-600 leading-relaxed">
                    {item.desk}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN 5: STATISTIK */}
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
              5+ Dekade
            </div>
            <div className="text-[11px] font-bold text-slate-600">
              Mengabdi
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 text-center">
            <div className="w-8 h-8 rounded-lg bg-[#0F4C81] flex items-center justify-center mx-auto mb-2">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="text-[22px] font-extrabold text-[#0F4C81]">
              B
            </div>
            <div className="text-[11px] font-bold text-slate-600">
              Akreditasi
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}