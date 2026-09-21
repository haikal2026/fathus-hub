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

export default function Header({ currentPage, onNavigate }) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-slate-200">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo + Nama Sekolah */}
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

        {/* Menu Desktop */}
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

        {/* Search + Menu Mobile */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-3 h-9 w-[200px]">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              placeholder="Cari..."
              className="bg-transparent outline-none ml-2 text-[13px] w-full"
            />
          </div>
          <button className="xl:hidden w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}