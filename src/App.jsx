import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import MenuLayout from './components/MenuLayout';
import Beranda from './pages/Beranda';
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
import * as ProfilPages from './pages/profilPages';

function App() {
  const [page, setPage] = useState('beranda');
  const { user, profile, logout } = useAuth();

  useEffect(() => {
    if (!user) setPage('beranda');
  }, [user]);

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

  if (page === 'login') {
    if (user && profile) return renderDashboard(profile, setPage, user, logout);
    return <Login onSuccess={() => setPage('dashboard')} />;
  }

  if (page === 'dashboard') {
    if (!user) return <Login onSuccess={() => setPage('dashboard')} />;
    if (!profile) return <LoadingProfile />;
    return renderDashboard(profile, setPage, user, logout);
  }

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

  const submenuMatch = parseSubmenuPage(page);
  if (submenuMatch) {
    const { menuId, submenuId, submenuLabel } = submenuMatch;
    const Content = renderSubmenuContent(menuId, submenuId, submenuLabel);

    return (
      <MenuLayout
        menuId={menuId}
        submenuId={submenuId}
        onNavigate={setPage}
        user={user}
        profile={profile}
        onLogout={logout}
      >
        {Content}
      </MenuLayout>
    );
  }

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

function renderSubmenuContent(menuId, submenuId, submenuLabel) {
  if (menuId === 'profil') {
    if (submenuId === 'tentang') return <ProfilPages.Tentang />;
    if (submenuId === 'sejarah') return <ProfilPages.Sejarah />;
    if (submenuId === 'visi') return <ProfilPages.VisiMisi />;
    if (submenuId === 'guru') return <ProfilPages.DataGuru />;
    if (submenuId === 'siswa') return <ProfilPages.DataSiswa />;
    if (submenuId === 'fasilitas') return <ProfilPages.Fasilitas />;
    if (submenuId === 'lingkungan') return <ProfilPages.Lingkungan />;
  }

  return (
    <SubmenuPlaceholder
      menuId={menuId}
      submenuId={submenuId}
      submenuLabel={submenuLabel}
    />
  );
}

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

function renderDashboard(profile, setPage, user, logout) {
  const role = profile?.role?.toLowerCase();
  let DashboardComponent;
  if (role === 'admin') DashboardComponent = DashboardAdmin;
  else if (role === 'guru') DashboardComponent = DashboardGuru;
  else DashboardComponent = DashboardSiswa;

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