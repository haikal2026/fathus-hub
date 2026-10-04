import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  CheckCircle2,
  Info,
  School,
  ArrowRight,
} from 'lucide-react';

// ============================================
// DATA KONTAK (statis — jarang berubah)
// ============================================
const KONTAK_DATA = {
  alamat: 'Jl. Tanjung Rejo No. 68, Desa Mangaran, Kec. Mangaran, Kab. Situbondo, Jawa Timur 68363',
  telepon: '(0338) 671186',
  whatsapp: '6281234567890',
  whatsappLabel: '0812-3456-7890',
  email: 'info@mafathussalafi.sch.id',
  emailHumas: 'humas@mafathussalafi.sch.id',
  npsn: '20584632',
  akreditasi: 'B',
};

const JAM_PELAYANAN = [
  { hari: 'Senin - Kamis', jam: '07.00 - 15.00 WIB', status: 'buka' },
  { hari: 'Jumat', jam: '07.00 - 11.30 WIB', status: 'buka' },
  { hari: 'Sabtu', jam: '07.00 - 13.00 WIB', status: 'buka' },
  { hari: 'Ahad', jam: 'Libur', status: 'tutup' },
];

const MEDIA_SOSIAL = [
  { id: 'instagram', label: 'Instagram', icon: Instagram, url: 'https://instagram.com/', warna: 'from-pink-500 to-purple-600' },
  { id: 'facebook', label: 'Facebook', icon: Facebook, url: 'https://facebook.com/', warna: 'from-blue-600 to-blue-800' },
  { id: 'youtube', label: 'YouTube', icon: Youtube, url: 'https://youtube.com/', warna: 'from-red-500 to-red-700' },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, url: 'https://wa.me/6281234567890', warna: 'from-emerald-500 to-emerald-700' },
];

const KATEGORI_FORM = [
  'Informasi Pendaftaran (PPDB)',
  'Akademik',
  'Kesiswaan',
  'Kerjasama',
  'Saran & Masukan',
  'Lainnya',
];

// ============================================
// KOMPONEN UTAMA
// ============================================
export default function Kontak({ submenuId }) {
  const [form, setForm] = useState({
    nama: '',
    kontak: '',
    kategori: KATEGORI_FORM[0],
    subjek: '',
    pesan: '',
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Scroll otomatis ke section saat submenu diklik
  useEffect(() => {
    const sectionMap = {
      info: 'section-info',
      lokasi: 'section-lokasi',
      jam: 'section-jam',
      form: 'section-form',
    };
    const targetId = sectionMap[submenuId];
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [submenuId]);

  const update = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulasi kirim (mock) — 1.5 detik
    setTimeout(() => {
      setLoading(false);
      setSent(true);

      // Reset form setelah 4 detik
      setTimeout(() => {
        setSent(false);
        setForm({
          nama: '',
          kontak: '',
          kategori: KATEGORI_FORM[0],
          subjek: '',
          pesan: '',
        });
      }, 4000);
    }, 1500);
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1200px] mx-auto space-y-6">

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
              <Phone className="w-3.5 h-3.5" />
              KONTAK KAMI
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Hubungi Kami
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Ada pertanyaan tentang pendaftaran, akademik, atau kerjasama?
              Hubungi MA Fathus Salafi melalui berbagai kanal di bawah ini.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
                <Clock className="w-4 h-4 text-[#FBBF24]" />
                Respons Cepat 1×24 Jam
              </div>
              <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] rounded-full px-4 py-1.5 text-[12px] font-extrabold">
                <CheckCircle2 className="w-4 h-4" />
                Terverifikasi
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 1: INFO KONTAK
        ========================================== */}
        <div id="section-info" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <Info className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Section 1
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Informasi Kontak
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Alamat */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#0F4C81] flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Alamat Lengkap
                  </div>
                  <div className="mt-1 text-[13.5px] font-bold text-slate-900 leading-relaxed">
                    {KONTAK_DATA.alamat}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold bg-[#F8FAFC] border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                      NPSN {KONTAK_DATA.npsn}
                    </span>
                    <span className="text-[10px] font-bold bg-[#FBBF24] text-[#0F4C81] px-2 py-0.5 rounded-full">
                      Akreditasi {KONTAK_DATA.akreditasi}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Telepon & WhatsApp */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Telepon & WhatsApp
                  </div>
                  <div className="mt-1 space-y-1">
                    <div className="text-[13.5px] font-bold text-slate-900">
                      {KONTAK_DATA.telepon}
                    </div>
                    <div className="text-[13px] font-bold text-emerald-600 flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {KONTAK_DATA.whatsappLabel}
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${KONTAK_DATA.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-600 hover:text-emerald-700"
                  >
                    Chat WhatsApp
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Email Resmi
                  </div>
                  <div className="mt-1 space-y-1">
                    <div className="text-[12.5px] font-bold text-slate-900 break-all">
                      {KONTAK_DATA.email}
                    </div>
                    <div className="text-[12px] text-slate-500 break-all">
                      {KONTAK_DATA.emailHumas}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Media Sosial */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FBBF24] flex items-center justify-center shrink-0 shadow-sm">
                  <Instagram className="w-6 h-6 text-[#0F4C81]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Media Sosial
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-1.5">
                    {MEDIA_SOSIAL.map((s) => {
                      const Icon = s.icon;
                      return (
                        <a
                          key={s.id}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gradient-to-br ${s.warna} text-white text-[10.5px] font-bold hover:opacity-90 transition`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          {s.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 2: LOKASI & MAPS
        ========================================== */}
        <div id="section-lokasi" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <MapPin className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Section 2
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Lokasi & Peta
              </h2>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            {/* Google Maps Embed */}
            <div className="relative h-[320px] lg:h-[420px] bg-slate-100">
              <iframe
                title="Lokasi MA Fathus Salafi"
                src="https://www.google.com/maps?q=MA+Fathus+Salafi+Tanjung+Rejo+Mangaran+Situbondo&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Info bawah maps */}
            <div className="p-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center shrink-0">
                  <School className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-extrabold text-slate-900">
                    MA Fathus Salafi
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {KONTAK_DATA.alamat}
                  </div>
                </div>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=MA+Fathus+Salafi+Tanjung+Rejo+Mangaran+Situbondo"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-xl bg-[#0F4C81] text-white text-[12px] font-bold hover:bg-[#0d3f6b] transition flex items-center gap-2 shrink-0"
              >
                <MapPin className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 3: JAM PELAYANAN
        ========================================== */}
        <div id="section-jam" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <Clock className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Section 3
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Jam Pelayanan
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Jam Pelayanan */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="space-y-2">
                {JAM_PELAYANAN.map((j, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      j.status === 'buka'
                        ? 'bg-emerald-50/50 border-emerald-100'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          j.status === 'buka'
                            ? 'bg-emerald-500 animate-pulse'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span className="text-[13px] font-bold text-slate-800">
                        {j.hari}
                      </span>
                    </div>
                    <span
                      className={`text-[12px] font-extrabold ${
                        j.status === 'buka' ? 'text-emerald-700' : 'text-slate-500'
                      }`}
                    >
                      {j.jam}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Tambahan */}
            <div className="bg-[#0F4C81] text-white rounded-2xl p-5 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center">
                    <Info className="w-5 h-5 text-[#0F4C81]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-extrabold tracking-widest text-[#FBBF24] uppercase">
                      Catatan
                    </div>
                    <h3 className="font-extrabold text-[15px] mt-0.5">
                      Info Pelayanan
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2 text-[12px] text-white/90">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                    <span className="leading-relaxed">
                      Kunjungan luar jam pelayanan harap konfirmasi via WhatsApp.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                    <span className="leading-relaxed">
                      Hari libur nasional & cuti bersama: kantor tutup.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                    <span className="leading-relaxed">
                      Untuk urusan PPDB, silakan datang langsung ke kantor madrasah.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ==========================================
            SECTION 4: FORM KONTAK
        ========================================== */}
        <div id="section-form" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-[#FBBF24] flex items-center justify-center">
              <Send className="w-4 h-4 text-[#0F4C81]" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                Section 4
              </div>
              <h2 className="text-[18px] font-extrabold text-slate-900">
                Kirim Pesan
              </h2>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] p-6 lg:p-8">
            <p className="text-[13px] text-slate-600 mb-5 leading-relaxed">
              Isi form di bawah untuk mengirim pesan, pertanyaan, atau saran.
              Tim humas akan membalas maksimal <b>1×24 jam</b>.
            </p>

            {sent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-[18px] font-extrabold text-emerald-900">
                  Pesan Terkirim!
                </h3>
                <p className="text-[13px] text-emerald-700 mt-1">
                  Terima kasih. Tim humas akan segera menghubungi Anda.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 mb-1.5 block uppercase tracking-wide">
                      Nama Lengkap *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.nama}
                      onChange={(e) => update('nama', e.target.value)}
                      placeholder="Nama Anda"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 mb-1.5 block uppercase tracking-wide">
                      Email / No. WhatsApp *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.kontak}
                      onChange={(e) => update('kontak', e.target.value)}
                      placeholder="email@example.com atau 08xx"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 mb-1.5 block uppercase tracking-wide">
                      Kategori *
                    </label>
                    <select
                      required
                      value={form.kategori}
                      onChange={(e) => update('kategori', e.target.value)}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
                    >
                      {KATEGORI_FORM.map((k) => (
                        <option key={k} value={k}>
                          {k}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 mb-1.5 block uppercase tracking-wide">
                      Subjek *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.subjek}
                      onChange={(e) => update('subjek', e.target.value)}
                      placeholder="Subjek pesan"
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-700 mb-1.5 block uppercase tracking-wide">
                    Pesan *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.pesan}
                    onChange={(e) => update('pesan', e.target.value)}
                    placeholder="Tulis pesan Anda secara detail..."
                    className="w-full p-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-[13px] outline-none focus:border-[#0F4C81] focus:bg-white transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-full bg-[#0F4C81] hover:bg-[#0d3f6b] disabled:bg-slate-300 text-white font-extrabold text-[13px] transition flex items-center justify-center gap-2 shadow-sm"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </>
                  )}
                </button>

                <p className="text-[10.5px] text-slate-400 text-center leading-relaxed">
                  Dengan mengirim pesan, Anda setuju data Anda digunakan
                  untuk keperluan komunikasi madrasah saja.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}