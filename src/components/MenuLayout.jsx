import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import { getMenuLabel } from '../data/menuData';

export default function MenuLayout({
  menuId,
  submenuId,
  onNavigate,
  user,
  profile,
  onLogout,
  children,
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleSubmenuNavigate(subId) {
    if (onNavigate) onNavigate(`${menuId}-${subId}`);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header
        currentPage={menuId}
        onNavigate={onNavigate}
        user={user}
        profile={profile}
        onLogout={onLogout}
      />

      <div className="lg:hidden sticky top-[64px] z-30 bg-white/90 backdrop-blur border-b border-slate-200 px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[13px] font-bold text-[#0F4C81]">
          <button
            onClick={() => setIsMobileOpen(true)}
            className="w-8 h-8 rounded-full bg-[#0F4C81] text-white flex items-center justify-center"
          >
            <Menu className="w-4 h-4" />
          </button>
          <span>
            {getMenuLabel(menuId)} • {submenuId}
          </span>
        </div>
        {profile && (
          <div className="text-[11px] text-slate-500 capitalize">
            {profile.role}
          </div>
        )}
      </div>

      <div className="mx-auto max-w-[1600px] flex min-w-0">
        {isMobileOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <Sidebar
          menuId={menuId}
          submenuId={submenuId}
          onNavigate={handleSubmenuNavigate}
          isMobileOpen={isMobileOpen}
          onClose={() => setIsMobileOpen(false)}
        />

        <main className="flex-1 min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>

      {isMobileOpen && (
        <button
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}