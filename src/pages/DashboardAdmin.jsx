import { useEffect, useState } from 'react';
import {
  Users,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  LogOut,
  BookOpen,
  FileText,
  Megaphone,
  Settings,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function DashboardAdmin({ onNavigate }) {
  const { user, profile, logout } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({ siswa: 0, guru: 0, ekskul: 3 });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
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
      } catch (err) {
        console.error('Gagal ambil statistik:', err);
      } finally {
        setLoadingStats(false);
      }
    }
    fetchStats();
  }, []);

  // Loading state
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Guard: bukan admin → tolak
  if (profile.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Ditolak</h2>
          <p className="text-sm text-slate-500 mb-6">
            Halaman ini hanya untuk admin. Role kamu:{' '}
            <strong className="capitalize">{profile.role}</strong>
          </p>
          <button
            onClick={() => onNavigate('beranda')}
            className="px-6 py-2.5 rounded-full bg-[#0F4C81] text-white text-sm font-bold hover:bg-[#1E3A8A] transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Konten utama
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* === HERO HEADER === */}
        <div className="bg-gradient-to-r from-[#0F4C81] to-[#1E3A8A] rounded-2xl p-6 lg:p-8 mb-6 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-[#0F4C81] text-[10px] font-extrabold tracking-wider">
                  {profile.role?.toUpperCase()}
                </span>
                <span className="text-[11px] text-white/70">MA Fathus Salafi</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold">
                Selamat Datang, {profile.nama} 👋
              </h1>
              <p className="text-white/70 text-sm mt-1">{profile.email}</p>
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

        {/* === STATISTIK === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            icon={<Users className="w-5 h-5" />}
            label="Siswa Aktif"
            value={loadingStats ? '...' : stats.siswa}
            color="blue"
          />
          <StatCard
            icon={<GraduationCap className="w-5 h-5" />}
            label="Guru & Tendik"
            value={loadingStats ? '...' : stats.guru}
            color="green"
          />
          <StatCard
            icon={<Sparkles className="w-5 h-5" />}
            label="Ekstrakurikuler"
            value={stats.ekskul}
            color="purple"
          />
        </div>

        {/* === MENU CEPAT === */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h2 className="text-base font-bold text-slate-900 mb-4">Menu Cepat</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <QuickButton
              icon={<Users className="w-5 h-5" />}
              label="Kelola Siswa"
              onClick={() => onNavigate('kelola-siswa')}
            />
            <QuickButton
              icon={<GraduationCap className="w-5 h-5" />}
              label="Kelola Guru"
              onClick={() => onNavigate('kelola-guru')}
            />  

            <QuickButton
              icon={<Megaphone className="w-5 h-5" />}
              label="Pengumuman"
              onClick={() => onNavigate('kelola-pengumuman')}
            />
            <QuickButton
              icon={<BookOpen className="w-5 h-5" />}
              label="Jadwal"
              onClick={() => onNavigate('akademik')}
            />
            <QuickButton
              icon={<FileText className="w-5 h-5" />}
              label="Download"
              onClick={() => onNavigate('download')}
            />
            <QuickButton
              icon={<Settings className="w-5 h-5" />}
              label="Pengaturan"
              onClick={() => toast.info('Fitur segera hadir! 🚧')}
            />
          </div>
        </div>

        {/* === INFO === */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
          <p className="text-xs text-yellow-800 leading-relaxed">
            <strong>💡 Info:</strong> Dashboard ini masih versi dasar. Fitur CRUD
            (tambah/edit/hapus siswa & guru) akan ditambahkan di sesi berikutnya.
            Fokus sekarang: <strong>login → dashboard admin jalan dengan benar</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== Komponen pendukung =====

function StatCard({ icon, label, value, color }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-emerald-500 to-emerald-600',
    purple: 'from-purple-500 to-purple-600',
  };
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-white shadow`}
      >
        {icon}
      </div>
      <div>
        <div className="text-2xl font-extrabold text-slate-900">{value}</div>
        <div className="text-xs text-slate-500 font-medium">{label}</div>
      </div>
    </div>
  );
}

function QuickButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-200 hover:border-[#0F4C81] hover:bg-blue-50/50 transition text-slate-700 hover:text-[#0F4C81]"
    >
      {icon}
      <span className="text-xs font-semibold text-center">{label}</span>
    </button>
  );
}