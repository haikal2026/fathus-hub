import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Users,
  Search,
  Filter,
  User,
  Mail,
  Phone,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const KELAS_OPTIONS = ['Semua', 'X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'];

export default function DaftarSiswaGuru({ onNavigate }) {
  const { profile } = useAuth();
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [kelasFilter, setKelasFilter] = useState('Semua');

  useEffect(() => {
    if (profile?.role === 'guru') {
      fetchSiswa();
    }
  }, [profile]);

  async function fetchSiswa() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, nama, nis_nip, kelas, jenis_kelamin, email, telepon')
        .eq('role', 'siswa')
        .order('kelas', { ascending: true })
        .order('nama', { ascending: true });

      if (error) throw error;
      setSiswaList(data || []);
    } catch (err) {
      console.error('Error fetch siswa:', err);
    } finally {
      setLoading(false);
    }
  }

  if (!profile || profile.role !== 'guru') {
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

  const filteredSiswa = siswaList.filter((s) => {
    const q = search.toLowerCase();
    const matchSearch =
      s.nama?.toLowerCase().includes(q) ||
      s.nis_nip?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q);
    const matchKelas = kelasFilter === 'Semua' || s.kelas === kelasFilter;
    return matchSearch && matchKelas;
  });

  // Group by kelas
  const groupedByKelas = filteredSiswa.reduce((acc, s) => {
    const k = s.kelas || 'Tanpa Kelas';
    if (!acc[k]) acc[k] = [];
    acc[k].push(s);
    return acc;
  }, {});

  const jumlahPutra = filteredSiswa.filter(
    (s) => s.jenis_kelamin === 'L'
  ).length;
  const jumlahPutri = filteredSiswa.filter(
    (s) => s.jenis_kelamin === 'P'
  ).length;

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
            <Users className="w-7 h-7 text-emerald-600" />
            Daftar Siswa Saya
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Total <strong>{filteredSiswa.length}</strong> siswa •{' '}
            <strong>{jumlahPutra}</strong> Putra •{' '}
            <strong>{jumlahPutri}</strong> Putri
          </p>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama, NIS, atau email..."
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
            <div className="flex items-center gap-2 md:w-[240px]">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={kelasFilter}
                onChange={(e) => setKelasFilter(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                {KELAS_OPTIONS.map((k) => (
                  <option key={k} value={k}>
                    {k === 'Semua' ? 'Semua Kelas' : k}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Memuat data siswa...</p>
          </div>
        ) : filteredSiswa.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              {siswaList.length === 0
                ? 'Belum ada siswa di database.'
                : 'Tidak ada siswa yang cocok dengan filter.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedByKelas).map(([kelas, list]) => (
              <div
                key={kelas}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
              >
                {/* Header Kelas */}
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-extrabold text-[12px]">
                      {kelas.split('-')[0]}
                    </div>
                    <div>
                      <div className="text-[13px] font-extrabold text-slate-900">
                        Kelas {kelas}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {list.length} siswa
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 text-[11px]">
                    <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-100">
                      👦 {list.filter((s) => s.jenis_kelamin === 'L').length}{' '}
                      Putra
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-pink-50 text-pink-700 font-bold border border-pink-100">
                      👧 {list.filter((s) => s.jenis_kelamin === 'P').length}{' '}
                      Putri
                    </span>
                  </div>
                </div>

                {/* List Siswa */}
                <div className="divide-y divide-slate-100">
                  {list.map((s, idx) => (
                    <div
                      key={s.id}
                      className="p-4 flex items-center gap-3 hover:bg-slate-50/50 transition"
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 text-white flex items-center justify-center font-extrabold text-[13px] shrink-0">
                        {s.nama?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-[13px] font-bold text-slate-900">
                            {s.nama}
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                            {s.nis_nip || '-'}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              s.jenis_kelamin === 'L'
                                ? 'bg-blue-50 text-blue-700'
                                : 'bg-pink-50 text-pink-700'
                            }`}
                          >
                            {s.jenis_kelamin === 'L'
                              ? 'Laki-laki'
                              : s.jenis_kelamin === 'P'
                              ? 'Perempuan'
                              : '-'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-1 text-[11px] text-slate-500">
                          {s.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {s.email}
                            </span>
                          )}
                          {s.telepon && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {s.telepon}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">
                        #{String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <p className="text-xs text-emerald-800 leading-relaxed">
            <strong>💡 Info:</strong> Daftar siswa ini otomatis dari database
            (tabel <code>profiles</code> yang role-nya <code>siswa</code>).
            Guru hanya bisa lihat, tambah/edit lewat panel admin.
          </p>
        </div>
      </div>
    </div>
  );
}