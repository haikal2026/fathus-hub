import { Menu, Search } from 'lucide-react';

const MENU_ITEMS = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'profil', label: 'Profil' },
  { id: 'akademik', label: 'Akademik' },
  { id: 'kesiswaan', label: 'Kesiswaan' },
  { id: 'informasi', label: 'Informasi' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'download', label: 'Download' },
  { id: 'kontak', label: 'Kontak' },
];

export default function Header({
  currentPage,
  onNavigate,
  user,
  profile,
  onLogout,
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0F4C81] flex items-center justify-center shadow-sm">
            <span className="text-white text-lg font-extrabold">MA</span>
          </div>
          <div className="leading-none">
            <div className="font-bold text-[15px] text-slate-900">
              MA Fathus Salafi
            </div>
            <div className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
              FATHUS SCHOOL HUB
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="hidden xl:flex items-center gap-1">
          {MENU_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`px-3.5 py-2 rounded-full text-[13px] font-semibold transition-all ${
                currentPage === item.id
                  ? 'bg-[#0F4C81] text-white shadow'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0F4C81]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search + Auth */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 h-9 w-[200px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              placeholder="Cari..."
              className="bg-transparent outline-none ml-2 text-[13px] w-full"
            />
          </div>

          {/* Tampilkan user info + tombol Keluar jika sudah login */}
          {user && profile ? (
  <div className="flex items-center gap-2">
    <button
      onClick={() => onNavigate('dashboard')}
      className="hidden md:flex items-center gap-2 h-9 px-3 rounded-full bg-slate-50 border border-slate-200 hover:border-[#0F4C81] transition text-left"
      title="Buka Dashboard"
    >
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] flex items-center justify-center text-white text-[11px] font-extrabold">
        {profile.nama?.charAt(0)?.toUpperCase() ?? '?'}
      </div>
      <div className="leading-none">
        <div className="text-[12px] font-bold text-slate-800">
          {profile.nama}
        </div>
        <div className="text-[10px] text-slate-500 capitalize">
          {profile.role}
        </div>
      </div>
    </button>
    <button
      onClick={() => onNavigate('dashboard')}
      className="h-9 px-3 rounded-full bg-[#0F4C81] text-white text-[12px] font-bold hover:bg-[#1E3A8A] transition"
    >
      Dashboard
    </button>
    <button
      onClick={onLogout}
      className="h-9 px-4 rounded-full bg-red-50 border border-red-100 text-red-600 text-[12px] font-bold hover:bg-red-100 transition"
    >
      Keluar
    </button>
  </div>
) : (
            <button
              onClick={() => onNavigate('login')}
              className="h-9 px-4 rounded-full bg-[#0F4C81] hover:bg-[#1E3A8A] text-white text-[12px] font-bold transition"
            >
              Masuk
            </button>
          )}

          <button className="xl:hidden w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}