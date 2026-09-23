import { ArrowLeft, LogOut, Construction } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardSiswa({ onNavigate }) {
  const { user, profile, logout } = useAuth();

  // Loading state
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Guard: bukan siswa → tolak
  if (profile.role !== 'siswa') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center border border-slate-200">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🚫</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Ditolak</h2>
          <p className="text-sm text-slate-500 mb-6">
            Halaman ini hanya untuk siswa. Role kamu:{' '}
            <strong className="capitalize">{profile.role}</strong>
          </p>
          <button
            onClick={() => onNavigate('beranda')}
            className="px-6 py-2.5 rounded-full bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-6 lg:p-8 mb-6 text-white shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white text-amber-700 text-[10px] font-extrabold tracking-wider">
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

        {/* Placeholder */}
        <div className="bg-white rounded-2xl border-2 border-dashed border-amber-300 p-12 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
            <Construction className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Panel Siswa Segera Hadir
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Fitur untuk siswa (lihat nilai, jadwal, tugas, pengumuman, materi)
            akan ditambahkan setelah panel admin & guru selesai.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-[11px] text-slate-400">
            <span className="px-3 py-1 rounded-full bg-slate-100">📊 Nilai</span>
            <span className="px-3 py-1 rounded-full bg-slate-100">📅 Jadwal</span>
            <span className="px-3 py-1 rounded-full bg-slate-100">📝 Tugas</span>
            <span className="px-3 py-1 rounded-full bg-slate-100">📢 Pengumuman</span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-xs text-amber-800 leading-relaxed">
            <strong>💡 Info:</strong> Panel ini masih placeholder. Login sebagai
            siswa sudah berfungsi, tapi fitur-fiturnya belum dibuat. Fokus sekarang
            adalah menyelesaikan alur role-based routing.
          </p>
        </div>
      </div>
    </div>
  );
}