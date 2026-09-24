import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  LogOut,
  BookOpen,
  Users,
  FileText,
  Calendar,
  ClipboardCheck,
  ChevronRight,
  Bell,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function DashboardGuru({ onNavigate }) {
  const { user, profile, logout } = useAuth();
  const [stats, setStats] = useState({ kelas: 0, siswa: 0, nilai: 0 });
  const [pengumuman, setPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role === 'guru') {
      fetchData();
    }
  }, [profile]);

  async function fetchData() {
    try {
      // 1. Jumlah siswa (yang punya role 'siswa')
      const { count: countSiswa } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'siswa');

      // 2. Jumlah nilai yang pernah diinput guru ini
      const { count: countNilai } = await supabase
        .from('nilai')
        .select('*', { count: 'exact', head: true })
        .eq('guru_id', user?.id);

      // 3. Ambil pengumuman terbaru (max 3)
      const { data: pengumumanData } = await supabase
        .from('pengumuman')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

      setStats({
        kelas: 6, // X-A, X-B, XI-A, XI-B, XII-A, XII-B
        siswa: countSiswa || 0,
        nilai: countNilai || 0,
      });
      setPengumuman(pengumumanData || []);
    } catch (err) {
      console.error('Error fetch data guru:', err);
    } finally {
      setLoading(false);
    }
  }

  // === Loading state ===
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  // === Guard: bukan guru ===
  if (profile.role !== 'guru') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Ditolak</h2>
          <p className="text-sm text-slate-500 mb-6">
            Halaman ini hanya untuk guru. Role kamu:{' '}
            <strong className="capitalize">{profile.role}</strong>
          </p>
          <button
            onClick={() => onNavigate('beranda')}
            className="px-6 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // === Menu Cepat ===
  const menuCepat = [
    {
      id: 'input-nilai',
      label: 'Input Nilai',
      desc: 'Input nilai siswa',
      icon: FileText,
      color: 'from-blue-500 to-blue-700',
    },
    {
      id: 'input-absensi',
      label: 'Input Absensi',
      desc: 'Absensi harian',
      icon: ClipboardCheck,
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      id: 'jadwal-mengajar',
      label: 'Jadwal Saya',
      desc: 'Jadwal mengajar',
      icon: Calendar,
      color: 'from-purple-500 to-purple-700',
    },
    {
      id: 'daftar-siswa-guru',
      label: 'Siswa Saya',
      desc: 'Daftar siswa',
      icon: Users,
      color: 'from-amber-500 to-orange-600',
    },
  ];

  // === Jadwal Hari Ini (hardcode dulu dari HTML asli) ===
  const jadwalHariIni = [
    { jam: '07.30 - 08.30', kelas: 'X-A', mapel: 'Bahasa Inggris', ruang: 'R-01' },
    { jam: '10.00 - 11.00', kelas: 'XI-A', mapel: 'Bahasa Inggris', ruang: 'R-03' },
    { jam: '11.30 - 12.00', kelas: 'XII-A', mapel: 'Bahasa Inggris', ruang: 'R-05' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-2xl p-6 lg:p-8 mb-6 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-emerald-800 text-[10px] font-extrabold tracking-wider">
                  {profile.role?.toUpperCase()}
                </span>
                <span className="text-[11px] text-white/70">MA Fathus Salafi</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold">
                Selamat Datang, {profile.nama} 👋
              </h1>
              <p className="text-white/70 text-sm mt-1">
                Guru {profile.mapel || '-'} • {profile.email}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('beranda')}
                className="h-10 px-4 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold hover:bg-white/20 transition flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Beranda
              </button>
              <button
                onClick={logout}
                className="h-10 px-4 rounded-full bg-red-500 text-white text-xs font-bold hover:bg-red-600 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          </div>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                KELAS
              </span>
            </div>
            <div className="mt-3 text-[32px] font-extrabold text-slate-900 leading-none">
              {stats.kelas}
            </div>
            <div className="mt-1 text-[13px] font-bold text-slate-600">
              Kelas Diajar
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                SISWA
              </span>
            </div>
            <div className="mt-3 text-[32px] font-extrabold text-slate-900 leading-none">
              {stats.siswa}
            </div>
            <div className="mt-1 text-[13px] font-bold text-slate-600">
              Total Siswa
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-1 rounded-full">
                NILAI
              </span>
            </div>
            <div className="mt-3 text-[32px] font-extrabold text-slate-900 leading-none">
              {stats.nilai}
            </div>
            <div className="mt-1 text-[13px] font-bold text-slate-600">
              Nilai Diinput
            </div>
          </div>
        </div>

        {/* Menu Cepat */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Menu Cepat</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {menuCepat.map((menu) => {
              const Icon = menu.icon;
              return (
                <button
                  key={menu.id}
                  onClick={() => onNavigate(menu.id)}
                  className="group p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition text-left"
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${menu.color} flex items-center justify-center mb-3 group-hover:scale-105 transition`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="font-bold text-[13px] text-slate-900">
                    {menu.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {menu.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid: Jadwal + Pengumuman */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Jadwal Hari Ini */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" />
                Jadwal Hari Ini
              </h2>
              <button
                onClick={() => onNavigate('jadwal-mengajar')}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Lihat Semua
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {jadwalHariIni.map((j, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-slate-100"
                >
                  <div className="w-16 h-12 rounded-xl bg-emerald-500 text-white flex flex-col items-center justify-center leading-none shrink-0">
                    <div className="text-[11px] font-extrabold">
                      {j.jam.split(' - ')[0]}
                    </div>
                    <div className="text-[9px] opacity-80 mt-0.5">
                      {j.jam.split(' - ')[1]}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-bold text-slate-900">
                      {j.mapel}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Kelas {j.kelas} • {j.ruang}
                    </div>
                  </div>
                </div>
              ))}
              {jadwalHariIni.length === 0 && (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Tidak ada jadwal hari ini
                </div>
              )}
            </div>
          </div>

          {/* Pengumuman */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" />
                Pengumuman
              </h2>
              <button
                onClick={() => onNavigate('informasi')}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Lihat Semua
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="space-y-2">
              {loading ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Memuat pengumuman...
                </div>
              ) : pengumuman.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-sm">
                  Belum ada pengumuman
                </div>
              ) : (
                pengumuman.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-[#F8FAFC] border border-slate-100"
                  >
                    <div className="text-[13px] font-bold text-slate-900 line-clamp-2">
                      {p.judul}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      {p.kategori || 'Umum'} •{' '}
                      {new Date(p.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}