import {
  Building2,
  BookOpen,
  Users,
  Library,
  Megaphone,
  Image,
  FileDown,
  Phone,
  ChevronRight,
} from 'lucide-react';
import { MENU_DATA, getSubmenus, getMenuLabel } from '../data/menuData';

const ICON_MAP = {
  Building2,
  BookOpen,
  Users,
  Library,
  Megaphone,
  Image,
  FileDown,
  Phone,
};

export default function Sidebar({
  menuId,
  submenuId,
  onNavigate,
  isMobileOpen,
  onClose,
}) {
  const menu = MENU_DATA[menuId];
  if (!menu) return null;

  const Icon = ICON_MAP[menu.icon] || Building2;
  const submenus = getSubmenus(menuId);

  return (
    <aside
      className={`
        w-[280px] shrink-0 bg-white border-r border-slate-200
        lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] overflow-y-auto
        fixed inset-y-0 left-0 z-50 transition-transform duration-300
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-[#FBBF24] flex items-center justify-center">
            <Icon className="w-4 h-4 text-[#0F4C81]" />
          </div>
          <div>
            <div className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
              Menu
            </div>
            <div className="text-[14px] font-extrabold text-[#0F4C81]">
              {getMenuLabel(menuId)}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          {submenus.map((sub) => {
            const isActive = submenuId === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  if (onNavigate) onNavigate(sub.id);
                  if (onClose) onClose();
                }}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl
                  text-[13px] font-semibold transition-all text-left
                  ${
                    isActive
                      ? 'bg-[#0F4C81] text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-[#0F4C81]'
                  }
                `}
              >
                <span className="flex-1">{sub.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
              </button>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-2xl bg-[#0F4C81] text-white">
          <div className="text-[12px] font-bold">FATHUS School Hub</div>
          <div className="text-[11px] opacity-80 mt-1 leading-relaxed">
            MA Fathus Salafi Tanjung Rejo — Ekosistem digital pesantren modern.
          </div>
        </div>
      </div>
    </aside>
  );
}