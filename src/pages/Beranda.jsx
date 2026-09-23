import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Beranda({ onNavigate }) {
  const [pengumumanList, setPengumumanList] = useState([]);
  const [loadingPengumuman, setLoadingPengumuman] = useState(true);

  const [stats, setStats] = useState({ siswa: 0, guru: 0, ekskul: 3 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchPengumuman() {
      const { data, error } = await supabase
        .from('pengumuman')
        .select('*')
        .order('penting', { ascending: false })
        .order('tanggal', { ascending: false })
        .limit(3);

      if (!error && data) setPengumumanList(data);
      setLoadingPengumuman(false);
    }

    async function fetchStats() {
      const { count: siswaCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'siswa');

      const { count: guruCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'guru');

      setStats({
        siswa: siswaCount ?? 0,
        guru: guruCount ?? 0,
        ekskul: 3,
      });
      setLoadingStats(false);
    }

    fetchPengumuman();
    fetchStats();
  }, []);

  function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    const bulan = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des',
    ];
    return `${d.getDate()} ${bulan[d.getMonth()]} ${d.getFullYear()}`;
  }

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* ============ HERO SECTION ============ */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#0F4C81] text-white p-6 lg:p-10 min-h-[420px] flex flex-col lg:flex-row items-center gap-8">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#FBBF24] rounded-full blur-[100px] opacity-20" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white rounded-full blur-[120px] opacity-[0.06]" />

        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2">
            <span className="bg-white/10 border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.08em]">
              TERAKREDITASI B
            </span>
            <span className="bg-white/10 border border-white/10 text-white/70 rounded-full px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase">
              Tanjung Rejo • Mangaran • Situbondo
            </span>
          </div>

          <h1 className="mt-6 text-[32px] lg:text-[42px] font-extrabold leading-[0.95] tracking-[-0.02em]">
            MA Fathus Salafi
            <br />
            <span className="font-bold text-white/90">Tanjung Rejo</span>
          </h1>

          <div className="mt-3 text-[13px] lg:text-[14px] font-semibold tracking-[0.04em] text-[#FBBF24]">
            FATHUS SCHOOL HUB — Sistem Informasi Terpadu
          </div>

          <p className="mt-4 text-[14px] lg:text-[15px] leading-relaxed text-white/70 max-w-[520px] font-medium">
            "Membangun Generasi Berilmu, Berkarakter dan Berakhlak" — Ekosistem
            digital pesantren modern untuk akademik, kesiswaan & layanan terpadu.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("profil")}
              className="h-11 px-6 rounded-full bg-[#FBBF24] text-[#0F4C81] font-extrabold text-[14px] shadow hover:bg-yellow-400 transition"
            >
              Jelajahi Profil →
            </button>
            <button
              onClick={() => onNavigate("akademik")}
              className="h-11 px-6 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-[14px] hover:bg-white/15 transition"
            >
              Lihat Jadwal
            </button>
          </div>
        </div>

        <div className="relative z-10 w-full lg:w-[360px] shrink-0">
          <div className="rounded-[20px] bg-white p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] font-bold text-slate-500">
                📅 HARI INI
              </div>
              <div className="text-[11px] bg-[#0F4C81] text-white px-2 py-1 rounded-full font-bold">
                21 Sept 2026
              </div>
            </div>
            <div className="space-y-2">
              {[
                { jam: "07.00", title: "Tahfidz & Dhuha Bersama", loc: "Masjid Sekolah" },
                { jam: "08.30", title: "Ujian Tengah Semester", loc: "Ruang 3 & 4" },
                { jam: "13.00", title: "Ekstrakurikuler Pramuka", loc: "Lapangan Utama" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-slate-100"
                >
                  <div className="text-[12px] font-extrabold text-[#0F4C81]">
                    {item.jam}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-bold leading-tight text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.loc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============ STATISTIK ============ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="rounded-[20px] p-5 bg-[#0F4C81] text-white shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-[20px] -mr-6 -mt-6" />
          <div className="text-[10px] font-bold bg-[#FBBF24] text-[#0F4C81] px-2 py-1 rounded-full inline-block relative z-10">
            AKTIF
          </div>
          <div className="mt-3 text-[32px] font-extrabold leading-none relative z-10">
            {loadingStats ? '...' : stats.siswa}
          </div>
          <div className="mt-1 text-[13px] font-bold relative z-10">
            Siswa Aktif
          </div>
          <div className="mt-1 text-[11px] text-white/70 relative z-10">
            Putra & Putri
          </div>
        </div>

        <div className="rounded-[20px] p-5 bg-white border border-slate-200 shadow-sm">
          <div className="text-[10px] font-bold bg-[#F8FAFC] border px-2 py-1 rounded-full text-slate-600 inline-block">
            TENDIK
          </div>
          <div className="mt-3 text-[32px] font-extrabold leading-none text-[#0F4C81]">
            {loadingStats ? '...' : stats.guru}
          </div>
          <div className="mt-1 text-[13px] font-bold text-slate-800">
            Guru
          </div>
          <div className="mt-1 text-[11px] text-slate-500">
            Tenaga Pendidik Aktif
          </div>
        </div>

        <div className="rounded-[20px] p-5 bg-[#1E3A8A] text-white shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-[#FBBF24]/20 rounded-full blur-[20px] -mr-6 -mt-6" />
          <div className="text-[10px] font-bold bg-white/15 border border-white/20 px-2 py-1 rounded-full inline-block relative z-10">
            3 UNIT
          </div>
          <div className="mt-3 text-[32px] font-extrabold leading-none relative z-10">
            {stats.ekskul}
          </div>
          <div className="mt-1 text-[13px] font-bold relative z-10">
            Ekstrakurikuler
          </div>
          <div className="mt-1 text-[11px] text-white/70 relative z-10">
            OSIS • PRAMUKA • PASKIBRA
          </div>
        </div>

        <div className="rounded-[20px] p-5 bg-[#FBBF24] text-[#0F4C81] shadow-sm">
          <div className="text-[10px] font-bold bg-[#0F4C81] text-white px-2 py-1 rounded-full inline-block">
            BAN-S/M
          </div>
          <div className="mt-3 text-[32px] font-extrabold leading-none">B</div>
          <div className="mt-1 text-[13px] font-bold">Akreditasi</div>
          <div className="mt-1 text-[11px] opacity-70">Terakreditasi B</div>
        </div>
      </div>

      {/* ============ PENGUMUMAN + AGENDA ============ */}
      <div className="grid lg:grid-cols-12 gap-4 lg:gap-6">
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-[16px] text-slate-800">
              📢 Pengumuman Terbaru
            </h3>
            <button
              onClick={() => onNavigate("informasi")}
              className="text-[12px] font-bold text-[#0F4C81]"
            >
              Lihat semua →
            </button>
          </div>

          {loadingPengumuman ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-slate-500 text-xs">Memuat pengumuman...</p>
            </div>
          ) : pengumumanList.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
              <div className="text-[32px] mb-2">📢</div>
              <p className="text-slate-500 text-xs">Belum ada pengumuman terbaru.</p>
            </div>
          ) : (
            pengumumanList.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 flex gap-3 hover:shadow-md transition"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[20px] ${
                    item.penting ? "bg-amber-100" : "bg-blue-50"
                  }`}
                >
                  📢
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100">
                      {item.kategori}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {formatTanggal(item.tanggal)}
                    </span>
                    {item.penting && (
                      <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">
                        PENTING
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[13px] font-bold leading-snug text-slate-800">
                    {item.judul}
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="flex items-center justify-between pt-2">
            <h3 className="font-extrabold text-[16px] text-slate-800">
              📰 Berita Sekolah
            </h3>
            <button
              onClick={() => onNavigate("informasi")}
              className="text-[12px] font-bold text-[#0F4C81]"
            >
              Lihat semua →
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {[
              {
                kategori: "Prestasi",
                tgl: "05 Sept 2026",
                judul: "MA Fathus Salafi Raih Juara 1 MTQ Kabupaten 2026",
                desc: "Siswa atas nama Ahmad Zulfikar berhasil meraih juara 1 kategori Tahfidz 10 Juz.",
              },
              {
                kategori: "Ekstrakurikuler",
                tgl: "02 Sept 2026",
                judul: "Perkemahan Pramuka Blok 2026 Berjalan Sukses",
                desc: "Perkemahan selama 3 hari diikuti 180 peserta dari kelas X dan XI.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-4"
              >
                <div className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
                  {item.kategori} • {item.tgl}
                </div>
                <div className="mt-2 text-[14px] font-extrabold leading-tight text-slate-800">
                  {item.judul}
                </div>
                <div className="mt-1 text-[12px] text-slate-600 leading-relaxed line-clamp-2">
                  {item.desc}
                </div>
                <button className="mt-3 text-[12px] font-bold text-[#0F4C81]">
                  Baca selengkapnya →
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-[20px] p-5">
            <h3 className="font-extrabold text-[15px] mb-3 text-slate-800">
              📅 Agenda Minggu Ini
            </h3>
            <div className="space-y-3">
              {[
                { tgl: "21", bln: "SEP", title: "Ujian Tengah Semester", time: "07.30 - Selesai" },
                { tgl: "24", bln: "SEP", title: "Upacara Hari Pramuka", time: "07.00 - 08.00" },
                { tgl: "28", bln: "SEP", title: "Peringatan Maulid Nabi SAW", time: "08.00 - 11.00" },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#0F4C81] text-white flex flex-col items-center justify-center leading-none shrink-0">
                    <div className="text-[16px] font-extrabold">
                      {item.tgl}
                    </div>
                    <div className="text-[9px] font-bold tracking-widest">
                      {item.bln}
                    </div>
                  </div>
                  <div>
                    <div className="text-[13px] font-bold text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-[20px] p-5">
            <h3 className="font-extrabold text-[15px] mb-3 text-slate-800">
              🏆 Prestasi Terbaru
            </h3>
            <div className="space-y-2.5">
              {[
                { icon: "🥇", title: "Juara 1 MTQ Tahfidz 10 Juz", siswa: "Ahmad Zulfikar - XII Putra" },
                { icon: "🥈", title: "Juara 2 Olimpiade Matematika", siswa: "Fatimah Zahra - XII Putri" },
                { icon: "🏅", title: "Juara Harapan 1 Pidato B. Arab", siswa: "Zayd Al-Farisi - XI Putra" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-slate-100"
                >
                  <div className="text-[20px]">{item.icon}</div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-bold leading-tight text-slate-800">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.siswa}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0F4C81] rounded-[20px] p-5 text-white">
            <div className="text-[13px] font-bold">⚡ Akses Cepat</div>
            <div className="grid grid-cols-4 gap-2 mt-3">
              {[
                { id: "akademik", emoji: "📚", label: "Jadwal" },
                { id: "perpus", emoji: "📖", label: "Perpus" },
                { id: "kesiswaan", emoji: "👥", label: "Siswa" },
                { id: "galeri", emoji: "📸", label: "Galeri" },
                { id: "informasi", emoji: "📢", label: "Info" },
                { id: "download", emoji: "📥", label: "File" },
                { id: "profil", emoji: "🏫", label: "Profil" },
                { id: "kontak", emoji: "📞", label: "Kontak" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 transition"
                >
                  <div className="text-[18px]">{item.emoji}</div>
                  <span className="text-[10px] font-bold">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}