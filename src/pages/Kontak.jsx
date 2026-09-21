import { useState } from 'react';

export default function Kontak() {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    kategori: 'Informasi Pendaftaran',
    subjek: '',
    pesan: '',
  });

  const [terkirim, setTerkirim] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerkirim(true);
    setForm({ nama: '', email: '', kategori: 'Informasi Pendaftaran', subjek: '', pesan: '' });
    setTimeout(() => setTerkirim(false), 5000);
  };

  return (
    <div className="p-4 lg:p-6 max-w-[1400px] mx-auto space-y-6">
      {/* ============ HERO ============ */}
      <div className="rounded-[24px] bg-[#0F4C81] text-white p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-[320px] h-[320px] bg-white rounded-full blur-[80px] opacity-[0.06]" />

        <div className="relative z-10">
          <div className="inline-flex items-center bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest">
            📞 KONTAK
          </div>
          <h1 className="mt-4 text-[28px] lg:text-[32px] font-extrabold leading-tight tracking-[-0.02em]">
            Hubungi Kami
          </h1>
          <p className="text-[13px] text-white/70 mt-2 max-w-[560px]">
            Ada pertanyaan, saran, atau ingin bekerja sama? Hubungi kami melalui
            kontak di bawah ini atau kirim pesan lewat form.
          </p>
        </div>
      </div>

      {/* ============ INFO CARDS ============ */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Alamat */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5">
          <div className="w-12 h-12 rounded-xl bg-[#0F4C81] flex items-center justify-center text-[24px]">
            📍
          </div>
          <div className="mt-4">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              Alamat
            </div>
            <div className="mt-1.5 text-[13px] leading-relaxed font-semibold text-slate-800">
              Jl. Tanjung Rejo No. 68
              <br />
              Desa Mangaran, Kec. Mangaran
              <br />
              Kab. Situbondo, Jawa Timur 68363
            </div>
          </div>
        </div>

        {/* Telepon */}
        <div className="rounded-2xl bg-[#FBBF24] text-[#0F4C81] p-5">
          <div className="w-12 h-12 rounded-xl bg-[#0F4C81] text-white flex items-center justify-center text-[24px]">
            📞
          </div>
          <div className="mt-4">
            <div className="text-[11px] font-bold opacity-70 uppercase tracking-wide">
              Telepon & WhatsApp
            </div>
            <div className="mt-1.5 text-[13px] leading-relaxed font-bold">
              (0338) 671186
              <br />
              0821-2345-6789
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="rounded-2xl bg-[#0F4C81] text-white p-5">
          <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-[24px]">
            ✉️
          </div>
          <div className="mt-4">
            <div className="text-[11px] font-bold opacity-70 uppercase tracking-wide">
              Email
            </div>
            <div className="mt-1.5 text-[13px] leading-relaxed font-bold break-all">
              info@mafathussalafi.sch.id
              <br />
              humas@mafathussalafi.sch.id
            </div>
          </div>
        </div>
      </div>

      {/* ============ JAM + MEDSOS ============ */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Jam Pelayanan */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center text-[20px]">
              🕐
            </div>
            <h3 className="font-extrabold text-[15px] text-slate-800">
              Jam Pelayanan
            </h3>
          </div>

          <div className="space-y-3">
            {[
              { hari: 'Senin - Kamis', jam: '07.00 - 15.00 WIB', aktif: true },
              { hari: 'Jumat', jam: '07.00 - 11.30 WIB', aktif: true },
              { hari: 'Sabtu', jam: '07.00 - 13.00 WIB', aktif: true },
              { hari: 'Ahad', jam: 'Libur', aktif: false },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex justify-between items-center p-3 rounded-xl border ${
                  item.aktif
                    ? 'bg-[#F8FAFC] border-slate-100'
                    : 'bg-red-50 border-red-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.aktif ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-[13px] font-bold text-slate-800">
                    {item.hari}
                  </span>
                </div>
                <span
                  className={`text-[12px] font-bold ${
                    item.aktif ? 'text-[#0F4C81]' : 'text-red-600'
                  }`}
                >
                  {item.jam}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Media Sosial */}
        <div className="rounded-2xl bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center text-[20px]">
              🌐
            </div>
            <h3 className="font-extrabold text-[15px] text-slate-800">
              Media Sosial
            </h3>
          </div>

          <p className="text-[12px] text-slate-600 mb-4">
            Ikuti kami untuk update terbaru kegiatan dan prestasi santri MA
            Fathus Salafi.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { emoji: '📸', nama: 'Instagram', handle: '@mafathussalafi', warna: 'bg-pink-50 text-pink-700 border-pink-100' },
              { emoji: '📘', nama: 'Facebook', handle: '/mafathussalafi', warna: 'bg-blue-50 text-blue-700 border-blue-100' },
              { emoji: '📺', nama: 'YouTube', handle: 'MA Fathus Salafi', warna: 'bg-red-50 text-red-700 border-red-100' },
              { emoji: '🎵', nama: 'TikTok', handle: '@mafathussalafi', warna: 'bg-slate-50 text-slate-700 border-slate-100' },
            ].map((medsos, i) => (
              <button
                key={i}
                className={`p-3 rounded-xl border text-left hover:shadow-sm transition ${medsos.warna}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[20px]">{medsos.emoji}</span>
                  <div className="min-w-0">
                    <div className="text-[12px] font-bold">{medsos.nama}</div>
                    <div className="text-[10px] opacity-70 truncate">
                      {medsos.handle}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ============ PETA LOKASI ============ */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
        <div className="h-[280px] bg-[#E2E8F0] flex items-center justify-center relative">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="relative bg-white border shadow-lg rounded-2xl px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0F4C81] text-white flex items-center justify-center text-[20px]">
              📍
            </div>
            <div>
              <div className="text-[13px] font-bold text-slate-800">
                MA Fathus Salafi
              </div>
              <div className="text-[11px] text-slate-500">
                Mangaran, Situbondo, Jawa Timur
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 flex justify-between items-center flex-wrap gap-2">
          <div className="text-[12px] font-bold text-slate-700">
            📍 Peta Lokasi Sekolah
          </div>
          <button className="text-[12px] font-bold text-[#0F4C81] hover:underline">
            Buka di Google Maps →
          </button>
        </div>
      </div>

      {/* ============ FORM KONTAK ============ */}
      <div className="rounded-2xl bg-white border border-slate-200 p-6 lg:p-8">
        <div className="mb-6">
          <h3 className="font-extrabold text-[20px] text-slate-800">
            Form Kontak
          </h3>
          <p className="text-[13px] text-slate-500 mt-1">
            Kirim pesan, pertanyaan, atau saran. Tim humas akan membalas
            maksimal 1x24 jam.
          </p>
        </div>

        {terkirim && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-[13px] font-bold">
            ✅ Terima kasih! Pesan Anda sudah terkirim. Kami akan segera membalas.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-[12px] font-bold text-slate-700 mb-1 block">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              value={form.nama}
              onChange={(e) => setForm({ ...form, nama: e.target.value })}
              placeholder="Nama Anda"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-[12px] font-bold text-slate-700 mb-1 block">
              Email / No. HP
            </label>
            <input
              type="text"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email atau nomor HP"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>

          <div>
            <label className="text-[12px] font-bold text-slate-700 mb-1 block">
              Kategori
            </label>
            <select
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
            >
              <option>Informasi Pendaftaran</option>
              <option>Akademik</option>
              <option>Kesiswaan</option>
              <option>Kerjasama</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] font-bold text-slate-700 mb-1 block">
              Subjek
            </label>
            <input
              type="text"
              required
              value={form.subjek}
              onChange={(e) => setForm({ ...form, subjek: e.target.value })}
              placeholder="Subjek pesan"
              className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-[12px] font-bold text-slate-700 mb-1 block">
              Pesan
            </label>
            <textarea
              required
              value={form.pesan}
              onChange={(e) => setForm({ ...form, pesan: e.target.value })}
              placeholder="Tulis pesan Anda di sini..."
              rows={5}
              className="w-full p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#0F4C81] hover:bg-[#1E3A8A] text-white font-bold text-[14px] transition flex items-center justify-center gap-2"
            >
              📨 Kirim Pesan
            </button>
          </div>

          <div className="md:col-span-2 text-center text-[11px] text-slate-400">
            Form ini masih dalam tahap UI. Nanti akan terhubung ke email
            madrasah setelah backend Supabase aktif.
          </div>
        </form>
      </div>
    </div>
  );
}