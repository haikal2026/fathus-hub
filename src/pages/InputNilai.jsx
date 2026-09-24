import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Save,
  Users,
  FileText,
  Search,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const KELAS_OPTIONS = ['X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'];
const JENIS_OPTIONS = ['Harian', 'Tugas', 'UTS', 'UAS'];

export default function InputNilai({ onNavigate }) {
  const { user, profile } = useAuth();
  const [kelas, setKelas] = useState('X-A');
  const [jenis, setJenis] = useState('Harian');
  const [mapel, setMapel] = useState('');
  const [search, setSearch] = useState('');
  const [siswaList, setSiswaList] = useState([]);
  const [nilaiMap, setNilaiMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile?.mapel && !mapel) {
      setMapel(profile.mapel);
    }
  }, [profile, mapel]);

  useEffect(() => {
    if (profile?.role === 'guru' && kelas) {
      fetchSiswa();
    }
  }, [kelas, profile]);

  async function fetchSiswa() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, nama, nis_nip, kelas, jenis_kelamin')
        .eq('role', 'siswa')
        .eq('kelas', kelas)
        .order('nama', { ascending: true });

      if (error) throw error;
      setSiswaList(data || []);
      setNilaiMap({});
    } catch (err) {
      console.error('Error fetch siswa:', err);
    } finally {
      setLoading(false);
    }
  }

  function handleNilaiChange(siswaId, value) {
    if (value === '') {
      setNilaiMap((prev) => {
        const copy = { ...prev };
        delete copy[siswaId];
        return copy;
      });
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num) || num < 0 || num > 100) return;
    setNilaiMap((prev) => ({ ...prev, [siswaId]: num }));
  }

  async function handleSave() {
    const entries = Object.entries(nilaiMap);
    if (entries.length === 0) {
      alert('Belum ada nilai yang diinput.');
      return;
    }
    if (!mapel.trim()) {
      alert('Mapel wajib diisi.');
      return;
    }
    setSaving(true);
    try {
      const payload = entries.map(([siswaId, nilai]) => ({
        siswa_id: siswaId,
        guru_id: user.id,
        mapel: mapel.trim(),
        nilai: nilai,
        jenis: jenis,
        semester: 'Ganjil',
        tahun_ajaran: '2026/2027',
      }));
      const { error } = await supabase.from('nilai').insert(payload);
      if (error) throw error;
      setSuccess(true);
      setNilaiMap({});
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error save nilai:', err);
      alert('Gagal simpan nilai: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

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

  const filteredSiswa = siswaList.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.nama?.toLowerCase().includes(q) ||
      s.nis_nip?.toLowerCase().includes(q)
    );
  });

  const jumlahTerisi = Object.keys(nilaiMap).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1100px]">
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
            Input Nilai Siswa
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pilih kelas, jenis nilai, dan input nilai untuk setiap siswa.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Kelas *
              </label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                {KELAS_OPTIONS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Jenis Nilai *
              </label>
              <select
                value={jenis}
                onChange={(e) => setJenis(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              >
                {JENIS_OPTIONS.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Mata Pelajaran *
              </label>
              <input
                type="text"
                value={mapel}
                onChange={(e) => setMapel(e.target.value)}
                placeholder="Bahasa Inggris"
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
          <div className="text-sm text-emerald-800">
            <strong>{siswaList.length}</strong> siswa di kelas{' '}
            <strong>{kelas}</strong> • Terisi: <strong>{jumlahTerisi}</strong>
          </div>
          <div className="text-[11px] text-emerald-700 font-bold bg-white px-3 py-1 rounded-full">
            Nilai: 0 - 100
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau NIS..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-emerald-500 transition"
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat data siswa...</p>
            </div>
          ) : filteredSiswa.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {siswaList.length === 0
                  ? `Belum ada siswa di kelas ${kelas}.`
                  : 'Tidak ada siswa yang cocok dengan pencarian.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">No</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Nama</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">NIS</th>
                    <th className="text-right px-4 py-3 font-bold text-slate-700 text-xs">Nilai (0-100)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.map((s, idx) => (
                    <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                      <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">{s.nama}</td>
                      <td className="px-4 py-3 text-slate-600">{s.nis_nip || '-'}</td>
                      <td className="px-4 py-3 text-right">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={nilaiMap[s.id] ?? ''}
                          onChange={(e) => handleNilaiChange(s.id, e.target.value)}
                          placeholder="-"
                          className="w-24 h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm text-center font-bold outline-none focus:border-emerald-500 focus:bg-white transition"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {success && (
          <div className="mb-4 bg-emerald-500 text-white rounded-2xl p-4 flex items-center gap-3 shadow-lg">
            <CheckCircle2 className="w-5 h-5" />
            <div className="text-sm font-bold">
              ✅ Nilai berhasil disimpan ke database!
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            {jumlahTerisi > 0 ? (
              <span>
                <strong className="text-emerald-600">{jumlahTerisi}</strong> nilai siap disimpan
              </span>
            ) : (
              <span>Belum ada nilai yang diinput</span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="h-11 px-6 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || jumlahTerisi === 0}
              className="h-11 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Menyimpan...' : 'Simpan Nilai'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}