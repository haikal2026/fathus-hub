import { useEffect, useState } from 'react';
import { GraduationCap, Search, Users, Award, BookOpen } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function DataGuru() {
  const [guruList, setGuruList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchGuru() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'guru')
          .order('nama', { ascending: true });

        if (error) throw error;
        setGuruList(data || []);
      } catch (err) {
        console.error('Error fetch guru:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchGuru();
  }, []);

  const filteredGuru = guruList.filter((g) => {
    const q = search.toLowerCase();
    return (
      g.nama?.toLowerCase().includes(q) ||
      g.nis_nip?.toLowerCase().includes(q) ||
      g.mapel?.toLowerCase().includes(q) ||
      g.email?.toLowerCase().includes(q)
    );
  });

  // Helper: ambil inisial dari nama (maks 2 karakter)
  function getInitials(nama) {
    if (!nama) return '?';
    const parts = nama.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  // Helper: warna gradient berdasar index
  const GRADIENTS = [
    'from-blue-500 to-blue-700',
    'from-emerald-500 to-emerald-700',
    'from-purple-500 to-purple-700',
    'from-amber-500 to-orange-600',
    'from-rose-500 to-rose-700',
    'from-cyan-500 to-cyan-700',
    'from-indigo-500 to-indigo-700',
    'from-teal-500 to-teal-700',
  ];

  // Statistik
  const totalGuru = guruList.length;
  const totalMapel = new Set(
    guruList.map((g) => g.mapel).filter(Boolean)
  ).size;
  const jumlahBersertifikasi = guruList.filter((g) => g.nis_nip).length;

  return (
    <div className="p-6 lg:p-10">
      <div className="max-w-[1100px] mx-auto space-y-6">

        {/* ============================================
            BAGIAN 1: HERO
        ============================================ */}
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
              <GraduationCap className="w-3.5 h-3.5" />
              DATA GURU & TENDIK
            </div>

            <h1 className="mt-4 text-[28px] lg:text-[36px] font-extrabold leading-tight tracking-[-0.02em]">
              Tenaga Pendidik MA Fathus Salafi
            </h1>
            <p className="mt-3 text-[14px] lg:text-[15px] leading-relaxed text-white/90 max-w-[600px] font-medium">
              Guru-guru berdedikasi yang membimbing santri dengan ilmu,
              akhlak, dan keteladanan.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-[12px] font-bold">
              <Users className="w-4 h-4 text-[#FBBF24]" />
              {totalGuru} Guru & Tenaga Kependidikan Aktif
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 2: STATISTIK
        ============================================ */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                <Users className="w-4.5 h-4.5 text-[#0F4C81]" />
              </div>
              <span className="text-[10px] font-bold bg-blue-50 text-[#0F4C81] px-2 py-0.5 rounded-full">
                TOTAL
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-[#0F4C81] leading-none">
              {loading ? '...' : totalGuru}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Guru & Tendik
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
                <BookOpen className="w-4.5 h-4.5 text-emerald-600" />
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                MAPEL
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-emerald-600 leading-none">
              {loading ? '...' : totalMapel}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Mata Pelajaran
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center">
                <Award className="w-4.5 h-4.5 text-amber-600" />
              </div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                NIP
              </span>
            </div>
            <div className="mt-3 text-[26px] font-extrabold text-amber-600 leading-none">
              {loading ? '...' : jumlahBersertifikasi}
            </div>
            <div className="mt-1 text-[11px] font-bold text-slate-600">
              Punya NIP
            </div>
          </div>
        </div>

        {/* ============================================
            BAGIAN 3: SEARCH
        ============================================ */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, NIP, atau mata pelajaran..."
            className="w-full h-12 pl-11 pr-4 rounded-full border border-slate-200 bg-white text-[13px] outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20 transition"
          />
        </div>

        {/* ============================================
            BAGIAN 4: GRID KARTU GURU
        ============================================ */}
        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat data guru...</p>
          </div>
        ) : filteredGuru.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              {search
                ? 'Tidak ada guru yang cocok dengan pencarian.'
                : 'Belum ada data guru.'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredGuru.map((guru, idx) => {
              const gradient = GRADIENTS[idx % GRADIENTS.length];
              return (
                <div
                  key={guru.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md hover:border-[#0F4C81]/30 transition"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[15px] font-extrabold shrink-0 shadow`}
                    >
                      {getInitials(guru.nama)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-extrabold text-[13px] text-slate-900 leading-tight">
                        {guru.nama || '-'}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {guru.nis_nip ? `NIP ${guru.nis_nip}` : 'NIP belum diisi'}
                      </div>
                    </div>
                  </div>

                  {guru.mapel && (
                    <div className="mt-3">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
                        Mata Pelajaran
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {guru.mapel.split(/[;,]/).map((m, i) => (
                          <span
                            key={i}
                            className="text-[10.5px] font-bold bg-[#0F4C81]/10 text-[#0F4C81] px-2 py-0.5 rounded-full"
                          >
                            {m.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {guru.email && (
                    <div className="mt-3 pt-3 border-t border-slate-100 text-[10.5px] text-slate-400 truncate">
                      {guru.email}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Info tambahan */}
        {!loading && filteredGuru.length > 0 && (
          <div className="text-center text-[11px] text-slate-400 font-medium pt-2">
            Menampilkan {filteredGuru.length} dari {totalGuru} guru
          </div>
        )}

      </div>
    </div>
  );
}