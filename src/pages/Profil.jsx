export default function Profil() {
  return (
    <div className="p-4 lg:p-6 max-w-[1100px] mx-auto space-y-6">
      {/* ============ HERO PROFIL ============ */}
      <div className="rounded-[24px] overflow-hidden bg-white border border-slate-200">
        <div className="h-[220px] bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] relative p-6 flex flex-col justify-end text-white">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative z-10">
            <div className="text-[11px] font-bold tracking-widest bg-[#FBBF24] text-[#0F4C81] px-2 py-1 rounded-full inline-block">
              TENTANG KAMI
            </div>
            <h1 className="mt-3 text-[28px] lg:text-[32px] font-extrabold leading-none tracking-[-0.02em]">
              MA FATHUS SALAFI
            </h1>
            <p className="text-[13px] opacity-90 max-w-[560px] mt-3 leading-relaxed font-medium">
              Madrasah Aliyah Fathus Salafi di bawah naungan Yayasan Pondok
              Pesantren Tanjung Rejo — memadukan kurikulum nasional dengan
              keagamaan dan karakter santri.
            </p>
          </div>
        </div>

        <div className="p-6">
          <p className="text-[13.5px] leading-relaxed text-slate-700 bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5">
            Berdiri sejak tahun <b>1970</b> di bawah naungan Yayasan Pondok
            Pesantren Tanjung Rejo, Madrasah Aliyah (MA) Fathus Salafi secara
            konsisten membina generasi muda melalui perpaduan seimbang antara
            pendidikan umum dan keagamaan. Seiring berjalannya waktu, MA Fathus
            Salafi terus berkomitmen mencetak santri yang berwawasan luas,
            berbakti kepada agama, serta siap menghadapi perkembangan zaman
            tanpa mengesampingkan nilai-nilai pesantren.
          </p>
        </div>
      </div>

      {/* ============ INFO CARDS ============ */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* NPSN */}
        <div className="rounded-2xl bg-[#0F4C81] text-white p-5 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-[12px]" />
          <div className="text-[10px] font-bold tracking-widest bg-white/15 border border-white/20 px-2.5 py-1 rounded-full inline-block relative z-10">
            NPSN
          </div>
          <div className="mt-4 relative z-10">
            <div className="text-[11px] opacity-70 font-semibold uppercase tracking-wide">
              Nomor Pokok Sekolah Nasional
            </div>
            <div className="mt-1 inline-block bg-white text-[#0F4C81] px-3 py-1 rounded-full font-extrabold text-[15px] tracking-wide">
              20584632
            </div>
          </div>
        </div>

        {/* Akreditasi */}
        <div className="rounded-2xl bg-[#FBBF24] text-[#0F4C81] p-5 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#0F4C81]/10 rounded-full blur-[12px]" />
          <div className="text-[10px] font-bold tracking-widest bg-[#0F4C81] text-white px-2.5 py-1 rounded-full inline-block relative z-10">
            AKREDITASI
          </div>
          <div className="mt-4 relative z-10">
            <div className="text-[11px] opacity-70 font-semibold uppercase tracking-wide">
              Status Akreditasi
            </div>
            <div className="mt-1 inline-block bg-[#0F4C81] text-white px-4 py-1 rounded-full font-extrabold text-[15px] tracking-wide">
              B
            </div>
            <div className="mt-2 text-[11px] font-bold opacity-80">
              Badan Akreditasi Nasional
            </div>
          </div>
        </div>

        {/* Alamat */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="text-[10px] font-bold tracking-widest bg-[#F8FAFC] border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full inline-block">
            📍 ALAMAT LENGKAP
          </div>
          <div className="mt-4">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Lokasi Sekolah
            </div>
            <div className="mt-1.5 text-[12.5px] leading-relaxed font-semibold text-slate-800">
              Jl. Tanjung Rejo No. 68 Desa Mangaran, Kec. Mangaran, Kab.
              Situbondo, Jawa Timur 68363
            </div>
          </div>
        </div>
      </div>

      {/* ============ VISI ============ */}
      <div className="rounded-[24px] bg-[#0F4C81] text-white p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-white rounded-full blur-[80px] opacity-[0.06]" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
            VISI MADRASAH
          </div>
          <div className="mt-5 text-[22px] lg:text-[28px] font-extrabold leading-[1.15] tracking-[-0.02em]">
            Terwujudnya Peserta Didik Yang{" "}
            <span className="text-[#FBBF24]">IHSAN</span>
            <br />
            <span className="text-[16px] lg:text-[18px] font-bold text-white/90">
              ( ISLAMI - HUMANIS - SANTUN - ANDAL - NASIONALIS )
            </span>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              { l: "ISLAMI", c: "I" },
              { l: "HUMANIS", c: "H" },
              { l: "SANTUN", c: "S" },
              { l: "ANDAL", c: "A" },
              { l: "NASIONALIS", c: "N" },
            ].map((item) => (
              <div
                key={item.l}
                className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wide"
              >
                <span className="w-5 h-5 rounded-full bg-[#0F4C81] text-[#FBBF24] flex items-center justify-center text-[10px] font-extrabold">
                  {item.c}
                </span>
                {item.l}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============ MISI ============ */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="text-[11px] font-bold tracking-widest bg-[#FBBF24] text-[#0F4C81] inline-block px-2.5 py-1 rounded-full">
          MISI
        </div>
        <ol className="mt-4 space-y-3 list-decimal list-inside text-[13px] leading-relaxed text-slate-700">
          <li>
            Menyelenggarakan pendidikan madrasah yang integratif antara ilmu
            agama dan umum berbasis IHSAN.
          </li>
          <li>
            Menguatkan program Tahfidz, Kitab Kuning, dan Bahasa Arab sebagai
            ciri khas Islami & Humanis.
          </li>
          <li>
            Membentuk karakter santri yang Santun, Andal, mandiri, dan
            bertanggung jawab.
          </li>
          <li>
            Mendorong prestasi akademik dan non-akademik berjiwa Nasionalis.
          </li>
          <li>
            Membangun ekosistem digital pesantren yang modern dan transparan.
          </li>
        </ol>
      </div>

      {/* ============ DATA CIVITAS ============ */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#FBBF24] flex items-center justify-center text-[16px]">
            👥
          </div>
          <h3 className="text-[18px] font-extrabold text-[#0F4C81] tracking-[-0.01em]">
            Data Civitas
          </h3>
          <div className="h-px flex-1 bg-slate-200 ml-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4">
          {/* Guru */}
          <div className="rounded-[20px] bg-white border border-slate-200 p-5 shadow-sm">
            <div className="text-[10px] font-bold bg-[#F8FAFC] border px-2 py-1 rounded-full text-slate-600 inline-block">
              TENDIK
            </div>
            <div className="mt-3 text-[32px] font-extrabold leading-none text-[#0F4C81]">
              15
            </div>
            <div className="mt-1 text-[14px] font-bold text-slate-800">
              Guru
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              Tenaga Pendidik
            </div>
          </div>

          {/* Siswa */}
          <div className="rounded-[20px] bg-[#0F4C81] text-white p-5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-[20px] -mr-6 -mt-6" />
            <div className="text-[10px] font-bold bg-[#FBBF24] text-[#0F4C81] px-2 py-1 rounded-full inline-block relative z-10">
              AKTIF
            </div>
            <div className="mt-3 text-[32px] font-extrabold leading-none relative z-10">
              163
            </div>
            <div className="mt-1 text-[14px] font-bold relative z-10">
              Siswa
            </div>
            <div className="mt-1 text-[11px] text-white/70 relative z-10">
              Total Aktif
            </div>
          </div>

          {/* Komposisi */}
          <div className="rounded-[20px] bg-[#FBBF24] text-[#0F4C81] p-5 shadow-sm">
            <div className="text-[11px] font-extrabold tracking-widest uppercase">
              KOMPOSISI
            </div>
            <div className="mt-3 flex gap-3">
              <div className="flex-1 rounded-xl bg-white border border-[#0F4C81]/10 p-3 text-center">
                <div className="text-[24px] font-extrabold leading-none">
                  70
                </div>
                <div className="text-[11px] font-bold mt-1">Putra</div>
                <div className="text-[10px] opacity-70">42.9%</div>
              </div>
              <div className="flex-1 rounded-xl bg-[#0F4C81] text-white p-3 text-center">
                <div className="text-[24px] font-extrabold leading-none">
                  93
                </div>
                <div className="text-[11px] font-bold mt-1">Putri</div>
                <div className="text-[10px] opacity-70">57.1%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============ FASILITAS ============ */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-[#0F4C81] flex items-center justify-center text-white text-[16px]">
            🏫
          </div>
          <h3 className="text-[18px] font-extrabold text-[#0F4C81] tracking-[-0.01em]">
            Fasilitas Unggulan
          </h3>
          <div className="h-px flex-1 bg-slate-200 ml-2" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { emoji: "❄️", title: "AC 2 Unit / Kelas", desc: "Kenyamanan belajar optimal" },
            { emoji: "💻", title: "Lab Komputer", desc: "Akses internet & digital" },
            { emoji: "📚", title: "Perpustakaan Digital", desc: "500+ koleksi buku" },
            { emoji: "⚽", title: "Lapangan Olahraga", desc: "Futsal, voli & upacara" },
            { emoji: "🍽️", title: "Kantin Sehat", desc: "Makanan higienis bergizi" },
            { emoji: "🏥", title: "Ruang UKS", desc: "Layanan kesehatan santri" },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-slate-200 p-4 flex gap-3 items-start hover:shadow-sm transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] border border-[#FBBF24]/30 flex items-center justify-center shrink-0 text-[20px]">
                {item.emoji}
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-bold leading-tight text-slate-800">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}