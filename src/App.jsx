import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Beranda from './pages/Beranda';
import Profil from './pages/Profil';
import Akademik from './pages/Akademik';
import Kesiswaan from './pages/Kesiswaan';
import Informasi from './pages/Informasi';
import Galeri from './pages/Galeri';
import Download from './pages/Download';
import Kontak from './pages/Kontak';
import Login from './pages/Login';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardGuru from './pages/DashboardGuru';
import DashboardSiswa from './pages/DashboardSiswa';
import KelolaSiswa from './pages/KelolaSiswa';
import KelolaGuru from './pages/KelolaGuru';
import KelolaPengumuman from './pages/KelolaPengumuman';

function App() {
  const [page, setPage] = useState('beranda');
  const { user, profile, logout } = useAuth();

  // === GUARD 1: Halaman login ===
  if (page === 'login') {
    if (user && profile) {
      return renderDashboard(profile, setPage, user, logout);
    }
    return <Login onSuccess={() => setPage('dashboard')} />;
  }

  // === GUARD 2: Halaman dashboard ===
  if (page === 'dashboard') {
    if (!user) {
      return <Login onSuccess={() => setPage('dashboard')} />;
    }
    if (!profile) {
      return <LoadingProfile />;
    }
    return renderDashboard(profile, setPage, user, logout);
  }

  // === GUARD 3: Halaman kelola-siswa (hanya admin) ===
  if (page === 'kelola-siswa') {
    if (!user) {
      return <Login onSuccess={() => setPage('kelola-siswa')} />;
    }
    if (!profile) {
      return <LoadingProfile />;
    }
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header
          currentPage="kelola-siswa"
          onNavigate={setPage}
          user={user}
          profile={profile}
          onLogout={logout}
        />
        <KelolaSiswa onNavigate={setPage} />
      </div>
    );
  }

    // === GUARD 4: Halaman kelola-guru (hanya admin) ===
  if (page === 'kelola-guru') {
    if (!user) {
      return <Login onSuccess={() => setPage('kelola-guru')} />;
    }
    if (!profile) {
      return <LoadingProfile />;
    }
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header
          currentPage="kelola-guru"
          onNavigate={setPage}
          user={user}
          profile={profile}
          onLogout={logout}
        />
        <KelolaGuru onNavigate={setPage} />
      </div>
    );
  }

  // === GUARD 5: Halaman kelola-pengumuman (hanya admin) ===
  if (page === 'kelola-pengumuman') {
    if (!user) {
      return <Login onSuccess={() => setPage('kelola-pengumuman')} />;
    }
    if (!profile) {
      return <LoadingProfile />;
    }
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <Header
          currentPage="kelola-pengumuman"
          onNavigate={setPage}
          user={user}
          profile={profile}
          onLogout={logout}
        />
        <KelolaPengumuman onNavigate={setPage} />
      </div>
    );
  }

  // === Halaman publik biasa ===
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header
        currentPage={page}
        onNavigate={setPage}
        user={user}
        profile={profile}
        onLogout={logout}
      />

      <main>
        {page === 'beranda' && <Beranda onNavigate={setPage} />}
        {page === 'profil' && <Profil />}
        {page === 'akademik' && <Akademik />}
        {page === 'kesiswaan' && <Kesiswaan />}
        {page === 'informasi' && <Informasi />}
        {page === 'galeri' && <Galeri />}
        {page === 'download' && <Download />}
        {page === 'kontak' && <Kontak />}
      </main>
    </div>
  );
}

// === Helper: pilih dashboard berdasarkan role ===
function renderDashboard(profile, setPage, user, logout) {
  const role = profile?.role?.toLowerCase();

  let DashboardComponent;
  if (role === 'admin') {
    DashboardComponent = DashboardAdmin;
  } else if (role === 'guru') {
    DashboardComponent = DashboardGuru;
  } else if (role === 'siswa') {
    DashboardComponent = DashboardSiswa;
  } else {
    DashboardComponent = DashboardSiswa;
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header
        currentPage="dashboard"
        onNavigate={setPage}
        user={user}
        profile={profile}
        onLogout={logout}
      />
      <DashboardComponent onNavigate={setPage} />
    </div>
  );
}

// === Helper: loading state ===
function LoadingProfile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="text-center">
        <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-slate-500 text-sm">Memuat profil...</p>
      </div>
    </div>
  );
}

export default App;