import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  Trash2,
  FileText,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';

const KELAS_OPTIONS = ['Semua', 'X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'];
const JENIS_OPTIONS = ['Semua', 'Harian', 'Tugas', 'UTS', 'UAS'];

export default function RekapNilai({ onNavigate }) {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [nilaiList, setNilaiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua');
  const [filterJenis, setFilterJenis] = useState('Semua');
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    if (profile?.role === 'guru') {
      fetchNilai();
    }
  }, [profile]);

  async function fetchNilai() {
    setLoading(true);
    try {
      // Query JOIN: ambil nilai + data siswa dari profiles
      const { data, error } = await supabase
        .from('nilai')
        .select(`
          id,
          nilai,
          jenis,
          mapel,
          semester,
          tahun_ajaran,
          catatan,
          created_at,
          siswa_id,
          guru_id,
          siswa:profiles!nilai_siswa_id_fkey (
            nama,
            nis_nip,
            kelas,
            jenis_kelamin
          )
        `)
        .eq('guru_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetch nilai:', error);
        // Fallback: query tanpa JOIN kalau error
        const { data: dataFallback, error: errorFallback } = await supabase
          .from('nilai')
          .select('*')
          .eq('guru_id', user.id)
          .order('created_at', { ascending: false });

        if (errorFallback) throw errorFallback;

        // Fetch nama siswa secara terpisah
        if (dataFallback && dataFallback.length > 0) {
          const siswaIds = [...new Set(dataFallback.map((n) => n.siswa_id))];
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, nama, nis_nip, kelas, jenis_kelamin')
            .in('id', siswaIds);

          const profileMap = {};
          (profilesData || []).forEach((p) => {
            profileMap[p.id] = p;
          });

          const merged = dataFallback.map((n) => ({
            ...n,
            siswa: profileMap[n.siswa_id] || null,
          }));
          setNilaiList(merged);
        } else {
          setNilaiList([]);
        }
      } else {
        setNilaiList(data || []);
      }
    } catch (err) {
      console.error('Error fetch nilai:', err);
      setNilaiList([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(nilai) {
  const namaSiswa = nilai.siswa?.nama || 'Siswa';
  const ok = window.confirm(
    `Yakin hapus nilai ${nilai.nilai} untuk ${namaSiswa}?`
  );
  if (!ok) return;

  setDeleteLoading(nilai.id);
  try {
    const { error } = await supabase
      .from('nilai')
      .delete()
      .eq('id', nilai.id);

    if (error) throw error;

    // Refresh list
    await fetchNilai();
    toast.success(`Nilai ${nilai.nilai} untuk ${namaSiswa} berhasil dihapus!`);
  } catch (err) {
    console.error('Error delete nilai:', err);
    toast.error('Gagal hapus nilai: ' + err.message);
  } finally {
    setDeleteLoading(null);
  }
}
  // Guard
  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (profile.role !== 'guru') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Akses Ditolak</h2>
          <p className="text-sm text-slate-500 mb-6">
            Halaman ini hanya untuk guru.
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  // Filter data
  const filteredNilai = nilaiList.filter((n) => {
    const siswa = n.siswa || {};
    const q = search.toLowerCase();

    const matchSearch =
      siswa.nama?.toLowerCase().includes(q) ||
      siswa.nis_nip?.toLowerCase().includes(q) ||
      n.mapel?.toLowerCase().includes(q);

    const matchKelas =
      filterKelas === 'Semua' || siswa.kelas === filterKelas;

    const matchJenis =
      filterJenis === 'Semua' || n.jenis === filterJenis;

    return matchSearch && matchKelas && matchJenis;
  });

  // Statistik
  const totalNilai = filteredNilai.length;
  const nilaiValid = filteredNilai.filter((n) => n.nilai !== null && n.nilai !== undefined);
  const rataRata = nilaiValid.length > 0
    ? (nilaiValid.reduce((sum, n) => sum + Number(n.nilai), 0) / nilaiValid.length).toFixed(2)
    : '-';
  const nilaiTertinggi = nilaiValid.length > 0
    ? Math.max(...nilaiValid.map((n) => Number(n.nilai)))
    : '-';
  const nilaiTerendah = nilaiValid.length > 0
    ? Math.min(...nilaiValid.map((n) => Number(n.nilai)))
    : '-';

  function formatTanggal(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function warnaNilai(nilai) {
    const n = Number(nilai);
    if (n >= 85) return 'bg-emerald-100 text-emerald-700';
    if (n >= 70) return 'bg-blue-100 text-blue-700';
    if (n >= 60) return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="text-xs text-slate-500 hover:text-emerald-600 font-semibold flex items-center gap-1 mb-2 transition"
          >
            <ArrowLeft className="w-3 h-3" />
            Kembali ke Dashboard
          </button>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
            <FileText className="w-7 h-7 text-emerald-600" />
            Rekap Nilai Siswa
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Semua nilai yang sudah Anda input. Mapel: <strong>{profile.mapel || '-'}</strong>
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <Users className="w-5 h-5 opacity-80" />
              <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                TOTAL
              </span>
            </div>
            <div className="mt-2 text-[24px] font-extrabold leading-none">{totalNilai}</div>
            <div className="text-[11px] opacity-80 mt-1">Nilai Diinput</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">
                RATA²
              </span>
            </div>
            <div className="mt-2 text-[24px] font-extrabold leading-none text-slate-900">{rataRata}</div>
            <div className="text-[11px] text-slate-500 mt-1">Rata-rata</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <Award className="w-5 h-5 text-amber-600" />
              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                MAX
              </span>
            </div>
            <div className="mt-2 text-[24px] font-extrabold leading-none text-slate-900">{nilaiTertinggi}</div>
            <div className="text-[11px] text-slate-500 mt-1">Tertinggi</div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />
              <span className="text-[10px] font-bold bg-red-50 text-red-700 px-2 py-0.5 rounded-full">
                MIN
              </span>
            </div>
            <div className="mt-2 text-[24px] font-extrabold leading-none text-slate-900">{nilaiTerendah}</div>
            <div className="text-[11px] text-slate-500 mt-1">Terendah</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, NIS, mapel..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                {KELAS_OPTIONS.map((k) => (
                  <option key={k} value={k}>
                    {k === 'Semua' ? 'Semua Kelas' : k}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={filterJenis}
                onChange={(e) => setFilterJenis(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                {JENIS_OPTIONS.map((j) => (
                  <option key={j} value={j}>
                    {j === 'Semua' ? 'Semua Jenis' : j}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat data nilai...</p>
            </div>
          ) : filteredNilai.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {nilaiList.length === 0
                  ? 'Belum ada nilai yang diinput. Silakan input nilai terlebih dahulu.'
                  : 'Tidak ada nilai yang cocok dengan filter.'}
              </p>
              {nilaiList.length === 0 && (
                <button
                  onClick={() => onNavigate('input-nilai')}
                  className="mt-4 px-6 py-2.5 rounded-full bg-emerald-500 text-white text-sm font-bold hover:bg-emerald-600 transition"
                >
                  + Input Nilai Sekarang
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">No</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Nama Siswa</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">NIS</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Kelas</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Mapel</th>
                    <th className="text-center px-4 py-3 font-bold text-slate-700 text-xs">Nilai</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Jenis</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Tanggal</th>
                    <th className="text-right px-4 py-3 font-bold text-slate-700 text-xs">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNilai.map((n, idx) => (
                    <tr
                      key={n.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition"
                    >
                      <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {n.siswa?.nama || (
                          <span className="text-slate-400 italic">
                            ID: {n.siswa_id?.slice(0, 8)}...
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {n.siswa?.nis_nip || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-bold bg-slate-100 px-2 py-1 rounded-full">
                          {n.siswa?.kelas || '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700 font-medium">{n.mapel}</td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[12px] font-extrabold ${warnaNilai(
                            n.nilai
                          )}`}
                        >
                          {n.nilai ?? '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                          {n.jenis}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-[12px]">
                        {formatTanggal(n.created_at)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => {
                            if (deleteLoading !== n.id) handleDelete(n);
                          }}
                          disabled={deleteLoading === n.id}
                          className={`inline-flex w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition items-center justify-center ${
                            deleteLoading === n.id ? 'opacity-50' : ''
                          }`}
                          title="Hapus"
                        >
                          {deleteLoading === n.id ? (
                            <span className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Trash2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Info */}
        {filteredNilai.length > 0 && (
          <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
            <p className="text-xs text-emerald-800">
              💡 Menampilkan <strong>{filteredNilai.length}</strong> dari{' '}
              <strong>{nilaiList.length}</strong> total nilai yang Anda input.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}