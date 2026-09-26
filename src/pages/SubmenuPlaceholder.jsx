import { Construction } from 'lucide-react';
import { getMenuLabel } from '../data/menuData';

export default function SubmenuPlaceholder({ menuId, submenuId, submenuLabel }) {
  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[800px] mx-auto">
        {/* Breadcrumb */}
        <div className="text-[12px] text-slate-500 mb-4">
          <span className="font-bold text-[#0F4C81]">{getMenuLabel(menuId)}</span>
          <span className="mx-2">›</span>
          <span>{submenuLabel}</span>
        </div>

        {/* Konten Placeholder */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 lg:p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-5">
            <Construction className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            {submenuLabel}
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Halaman ini sedang dalam pengembangan.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 px-4 py-2 rounded-full text-[11px] font-bold text-slate-600">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Menunggu Konten (Fase 4)
          </div>
        </div>
      </div>
    </div>
  );
}