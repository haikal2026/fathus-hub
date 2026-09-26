import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import MenuLayout from './components/MenuLayout';
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
import InputNilai from './pages/InputNilai';
import InputAbsensi from './pages/InputAbsensi';
import JadwalMengajar from './pages/JadwalMengajar';
import DaftarSiswaGuru from './pages/DaftarSiswaGuru';
import RekapNilai from './pages/RekapNilai';
import SubmenuPlaceholder from './pages/SubmenuPlaceholder';
import { MENU_DATA, getSubmenus } from './data/menuData';

function App() {
  const [page, setPage] = useState('beranda');
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    if (!user) setPage('beranda');
  }, [user]);

  // ============================================
  // CEK APAKAH PAGE ADALAH SUBMENU
  // 'profil-tentang' → { menuId: 'profil', submenuId: 'tentang' }
  // ============================================
  function parseSubmenuPage(pageName) {
    const parts = pageName.split('-');
    if (parts.length < 2) return null;

    for (let i = parts.length - 1; i >= 1; i--) {
      const menuId = parts.slice(0, i).join('-');
      const submenuId = parts.slice(i).join('-');

      if (MENU_DATA[menuId]) {
        const submenus = getSubmenus(menuId);
        const matched = submenus.find((s) => s.id === submenuId);
        if (matched) {
          return { menuId, submenuId, submenuLabel: matched.label };
        }
      }
    }
    return null;
  }

  // === GUARD 1: LOGIN ===
  if (page === 'login') {
    if (user && profile) return renderDashboard(profile, setPage, user, logout);
    return <Login onSuccess={() => setPage('dashboard')} />;
  }

  // === GUARD 2: DASHBOARD ===
  if (page === 'dashboard') {
    if (!user) return <Login onSuccess={() => setPage('dashboard')} />;
    if (!profile) return <LoadingProfile />;
    return renderDashboard(profile, setPage, user, logout);
  }

  // === GUARD 3-5: KELOLA (ADMIN) ===
  if (['kelola-siswa', 'kelola-guru', 'kelola-pengumuman'].includes(page)) {
    if (!user) return <Login onSuccess={() => setPage(page)} />;
    if (!profile) return <LoadingProfile />;

    const Content =
      page === 'kelola-siswa' ? KelolaSiswa :
      page === 'kelola-guru' ? KelolaGuru : KelolaPengumuman;

    return (
      <PageWrapper currentPage={page} setPage={setPage} user={user} profile={profile} logout={logout}>
        <Content onNavigate={setPage} />
      </PageWrapper>
    );
  }

  // === GUARD 6-10: PANEL GURU ===
  if (['input-nilai', 'rekap-nilai', 'input-absensi', 'jadwal-mengajar', 'daftar-siswa-guru'].includes(page)) {
    if (!user) return <Login onSuccess={() => setPage(page)} />;
    if (!profile) return <LoadingProfile />;

    const Content =
      page === 'input-nilai' ? InputNilai :
      page === 'rekap-nilai' ? RekapNilai :
      page === 'input-absensi' ? InputAbsensi :
      page === 'jadwal-mengajar' ? JadwalMengajar : DaftarSiswaGuru;

    return (
      <PageWrapper currentPage={page} setPage={setPage} user={user} profile={profile} logout={logout}>
        <Content onNavigate={setPage} />
      </PageWrapper>
    );
  }

  // === SUBMENU PUBLIK (FASE 3 BARU) ===
  const submenuMatch = parseSubmenuPage(page);
  if (submenuMatch) {
    const { menuId, submenuId, submenuLabel } = submenuMatch;
    return (
      <MenuLayout
        menuId={menuId}
        submenuId={submenuId}
        onNavigate={setPage}
        user={user}
        profile={profile}
        onLogout={logout}
      >
        <SubmenuPlaceholder
          menuId={menuId}
          submenuId={submenuId}
          submenuLabel={submenuLabel}
        />
      </MenuLayout>
    );
  }

  // === HALAMAN PUBLIK UTAMA ===
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
      </main>
    </div>
  );
}

// === Helper: wrapper dengan Header ===
function PageWrapper({ currentPage, setPage, user, profile, logout, children }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header
        currentPage={currentPage}
        onNavigate={setPage}
        user={user}
        profile={profile}
        onLogout={logout}
      />
      {children}
    </div>
  );
}

// === Helper: pilih dashboard berdasarkan role ===
function renderDashboard(profile, setPage, user, logout) {
  const role = profile?.role?.toLowerCase();
  let DashboardComponent;
  if (role === 'admin') DashboardComponent = DashboardAdmin;
  else if (role === 'guru') DashboardComponent = DashboardGuru;
  else DashboardComponent = DashboardSiswa;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header currentPage="dashboard" onNavigate={setPage} user={user} profile={profile} onLogout={logout} />
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