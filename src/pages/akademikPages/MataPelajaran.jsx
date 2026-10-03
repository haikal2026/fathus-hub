import {
  BookOpen,
  Users,
  Award,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';
import { RUMPUN_MAPEL, GURU_DATA } from '../../data/akademikData';

export default function MataPelajaran() {
  // Cari guru pengampu untuk suatu mapel (dari field `mapel` guru)
  function getGuruPengampu(namaMapel) {
    return GURU_DATA.filter((g) =>
      g.mapel.toLowerCase().includes(namaMapel.toLowerCase())
    );
  }

  const totalMapel = Object.values(RUMPUN_MAPEL).flat().length;

  // Warna per rumpun
  const rumpunStyle = {
    Umum: {
      border: 'border-blue-200',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      badge: 'bg-blue-600 text-white',
      icon: 'bg-blue-600',
    },
    Keagamaan: {
      border: 'border-emerald-200',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      badge: 'bg-emerald-600 text-white',
      icon: 'bg-emerald-600',
    },
    Keterampilan: {
      border: 'border-amber-200',
      bg: 'bg-amber-50',
      text: 'text-amber-700',
      badge: 'bg-amber-600 text-white',
      icon: 'bg-amber-600',
    },
  };

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1100px] mx-auto space-y-6">

        {/* ==========================================
            HERO
        ========================================== */}
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0F4C81] to-[#1E3A8A] text-white p-8 lg:p-10">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="absolute -top-16 -right-16 w-[260px] h-[260px] bg-[#FBBF24] rounded-full blur-[60px] opacity-20" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#FBBF24] text-[#0F4C81] px-3 py-1 rounded-full text-[11px] font-extrabold tracking-widest">
              <BookOpen className="w-3.5 h-3.5" />
              MATA PELAJARAN
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Mata Pelajaran
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Daftar lengkap mata pelajaran MA Fathus Salafi yang terbagi dalam
              3 rumpun keilmuan, beserta guru pengampu masing-masing.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Sparkles className="w-4 h-4 text-[#FBBF24]" />
              {totalMapel} Mata Pelajaran • 3 Rumpun
            </div>
          </div>
        </div>

        {/* ==========================================
            STATISTIK PER RUMPUN
        ========================================== */}
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(RUMPUN_MAPEL).map(([nama, list]) => {
            const style = rumpunStyle[nama];
            return (
              <div
                key={nama}
                className={`rounded-2xl border-2 p-4 ${style.border} ${style.bg}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-8 h-8 rounded-lg ${style.icon} flex items-center justify-center`}
                  >
                    <Layers className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wide opacity-70">
                      Rumpun
                    </div>
                    <div className={`text-[13px] font-extrabold ${style.text} truncate`}>
                      {nama}
                    </div>
                  </div>
                </div>
                <div className={`text-[24px] font-extrabold ${style.text}`}>
                  {list.length}
                </div>
                <div className="text-[10px] font-bold opacity-70">
                  Mata Pelajaran
                </div>
              </div>
            );
          })}
        </div>

        {/* ==========================================
            DAFTAR PER RUMPUN
        ========================================== */}
        {Object.entries(RUMPUN_MAPEL).map(([nama, list]) => {
          const style = rumpunStyle[nama];
          return (
            <div
              key={nama}
              className="bg-white border border-slate-200 rounded-[20px] overflow-hidden"
            >
              {/* Header rumpun */}
              <div className={`p-5 ${style.bg} border-b-2 ${style.border}`}>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${style.icon} flex items-center justify-center`}
                    >
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        Rumpun Keilmuan
                      </div>
                      <h2 className={`text-[18px] font-extrabold ${style.text}`}>
                        {nama}
                      </h2>
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-extrabold px-3 py-1.5 rounded-full ${style.badge}`}
                  >
                    {list.length} Mapel
                  </span>
                </div>
              </div>

              {/* Grid mapel */}
              <div className="p-5 grid md:grid-cols-2 gap-3">
                {list.map((m) => {
                  const guruList = getGuruPengampu(m);
                  return (
                    <div
                      key={m}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 hover:border-[#0F4C81]/30 transition"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-[#0F4C81]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-extrabold text-slate-900 truncate">
                          {m}
                        </div>

                        {guruList.length > 0 ? (
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {guruList.map((g) => (
                              <span
                                key={g.kode}
                                className="inline-flex items-center gap-1 bg-white border border-slate-200 px-2 py-0.5 rounded-full text-[10px] font-bold"
                                title={g.nama}
                              >
                                <span className="w-4 h-4 rounded-full bg-[#0F4C81] text-white flex items-center justify-center text-[8px] font-extrabold">
                                  {g.kode}
                                </span>
                                <span className="text-slate-600 truncate max-w-[120px]">
                                  {g.nama.split(',')[0]}
                                </span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="mt-1 text-[10px] text-slate-400 italic">
                            Guru pengampu belum ditentukan
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ==========================================
            DAFTAR GURU PENGAMPU LENGKAP
        ========================================== */}
        <div className="bg-white border border-slate-200 rounded-[20px] overflow-hidden">
          <div className="p-5 bg-[#F8FAFC] border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                  Tenaga Pendidik
                </div>
                <h2 className="text-[16px] font-extrabold text-slate-900">
                  Daftar Guru Pengampu
                </h2>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[12px] min-w-[600px]">
              <thead className="bg-[#0F4C81] text-white text-[11px]">
                <tr>
                  <th className="p-3 text-left w-[70px]">KODE</th>
                  <th className="p-3 text-left">Nama Lengkap</th>
                  <th className="p-3 text-left">Mata Pelajaran</th>
                  <th className="p-3 text-left w-[100px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {GURU_DATA.map((g, idx) => (
                  <tr
                    key={g.kode}
                    className={`border-t border-slate-100 ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-[#F8FAFC]'
                    } hover:bg-[#FEF3C7]/50 transition`}
                  >
                    <td className="p-3">
                      <span className="w-7 h-7 rounded-full bg-[#0F4C81] text-white inline-flex items-center justify-center font-extrabold text-[11px]">
                        {g.kode}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-900">{g.nama}</td>
                    <td className="p-3">
                      <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-700">
                        {g.mapel}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 rounded-full font-bold">
                        Aktif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-[#F8FAFC] border-t border-slate-200 text-[11px] text-slate-500 flex justify-between flex-wrap gap-2">
            <span>Total {GURU_DATA.length} guru pengampu (kode A – O)</span>
            <span className="font-bold">NPSN 20584632 • Akreditasi B</span>
          </div>
        </div>

        {/* ==========================================
            INFO PENTING
        ========================================== */}
        <div className="bg-[#0F4C81] text-white rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#FBBF24]/20 rounded-full blur-[30px]" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#FBBF24] flex items-center justify-center">
                <Award className="w-5 h-5 text-[#0F4C81]" />
              </div>
              <div>
                <div className="text-[10px] font-extrabold tracking-widest text-[#FBBF24] uppercase">
                  Kurikulum
                </div>
                <h3 className="font-extrabold text-[15px] mt-0.5">
                  Info Mata Pelajaran
                </h3>
              </div>
            </div>

            <ul className="space-y-2 text-[12px] text-white/90">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                <span className="leading-relaxed">
                  Memadukan Kurikulum Nasional (Kemenag) dengan kurikulum diniyah pesantren.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                <span className="leading-relaxed">
                  Rumpun Keagamaan menjadi ciri khas: Fikih, Akidah Akhlak, SKI, Qur'an Hadits, Aswaja.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBF24] shrink-0 mt-1.5" />
                <span className="leading-relaxed">
                  Setiap mapel diampu minimal 1 guru dengan kode A – O untuk memudahkan jadwal.
                </span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}