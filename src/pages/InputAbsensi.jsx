import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Save,
  Users,
  ClipboardCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabase';

const KELAS_OPTIONS = ['X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'];

const STATUS_OPTIONS = [
  { value: 'hadir', label: 'Hadir', color: 'emerald' },
  { value: 'sakit', label: 'Sakit', color: 'amber' },
  { value: 'izin', label: 'Izin', color: 'blue' },
  { value: 'alpa', label: 'Alpa', color: 'red' },
];

export default function InputAbsensi({ onNavigate }) {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [kelas, setKelas] = useState('X-A');
  const [tanggal, setTanggal] = useState(new Date().toISOString().slice(0, 10));
  const [mapel, setMapel] = useState('');
  const [siswaList, setSiswaList] = useState([]);
  const [absenMap, setAbsenMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile?.mapel && !mapel) setMapel(profile.mapel);
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
        .select('id, nama, nis_nip, kelas')
        .eq('role', 'siswa')
        .eq('kelas', kelas)
        .order('nama', { ascending: true });

      if (error) throw error;
      setSiswaList(data || []);
      const defaultAbsen = {};
      (data || []).forEach((s) => {
        defaultAbsen[s.id] = 'hadir';
      });
      setAbsenMap(defaultAbsen);
    } catch (err) {
      console.error('Error fetch siswa:', err);
      toast.error('Gagal memuat data siswa: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  function setStatus(siswaId, status) {
    setAbsenMap((prev) => ({ ...prev, [siswaId]: status }));
  }

  function setAllHadir() {
    const allHadir = {};
    siswaList.forEach((s) => {
      allHadir[s.id] = 'hadir';
    });
    setAbsenMap(allHadir);
    toast.info('Semua siswa ditandai hadir');
  }

  async function handleSave() {
    if (siswaList.length === 0) {
      toast.warning('Belum ada siswa di kelas ini.');
      return;
    }
    setSaving(true);
    try {
      const payload = siswaList.map((s) => ({
        siswa_id: s.id,
        guru_id: user.id,
        mapel: mapel.trim() || null,
        tanggal: tanggal,
        status: absenMap[s.id] || 'hadir',
      }));
      const { error } = await supabase.from('absensi').insert(payload);
      if (error) throw error;
      toast.success(`Absensi ${siswaList.length} siswa berhasil disimpan!`);
    } catch (err) {
      console.error('Error save absensi:', err);
      toast.error('Gagal simpan absensi: ' + err.message);
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

  const rekap = {
    hadir: Object.values(absenMap).filter((v) => v === 'hadir').length,
    sakit: Object.values(absenMap).filter((v) => v === 'sakit').length,
    izin: Object.values(absenMap).filter((v) => v === 'izin').length,
    alpa: Object.values(absenMap).filter((v) => v === 'alpa').length,
  };

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
            <ClipboardCheck className="w-7 h-7 text-emerald-600" />
            Input Absensi Siswa
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Pilih kelas dan tanggal, lalu tandai kehadiran setiap siswa.
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
                Tanggal *
              </label>
              <input
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1.5 block">
                Mata Pelajaran
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

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={setAllHadir}
              className="h-9 px-4 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition"
            >
              ✅ Tandai Semua Hadir
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
            <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
              Hadir
            </div>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">
              {rekap.hadir}
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
            <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
              Sakit
            </div>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">
              {rekap.sakit}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
            <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
              Izin
            </div>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">
              {rekap.izin}
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <div className="text-[11px] font-bold text-red-700 uppercase tracking-wide">
              Alpa
            </div>
            <div className="text-2xl font-extrabold text-red-700 mt-1">
              {rekap.alpa}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat data siswa...</p>
            </div>
          ) : siswaList.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                Belum ada siswa di kelas {kelas}.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">
                      No
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">
                      Nama
                    </th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">
                      NIS
                    </th>
                    <th className="text-center px-4 py-3 font-bold text-slate-700 text-xs">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {siswaList.map((s, idx) => {
                    const current = absenMap[s.id] || 'hadir';
                    return (
                      <tr
                        key={s.id}
                        className="border-b border-slate-100 hover:bg-slate-50/50 transition"
                      >
                        <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                        <td className="px-4 py-3 font-semibold text-slate-800">
                          {s.nama}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {s.nis_nip || '-'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-1.5">
                            {STATUS_OPTIONS.map((opt) => {
                              const active = current === opt.value;
                              return (
                                <button
                                  key={opt.value}
                                  type="button"
                                  onClick={() => setStatus(s.id, opt.value)}
                                  className={`h-8 px-3 rounded-full text-[11px] font-bold border transition ${
                                    active
                                      ? opt.value === 'hadir'
                                        ? 'bg-emerald-500 text-white border-emerald-500'
                                        : opt.value === 'sakit'
                                        ? 'bg-amber-500 text-white border-amber-500'
                                        : opt.value === 'izin'
                                        ? 'bg-blue-500 text-white border-blue-500'
                                        : 'bg-red-500 text-white border-red-500'
                                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                  }`}
                                >
                                  {opt.label}
                                </button>
                              );
                            })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            <span>
              Total <strong className="text-emerald-600">{siswaList.length}</strong>{' '}
              siswa • <strong className="text-emerald-600">{rekap.hadir}</strong> hadir
            </span>
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
              disabled={saving || siswaList.length === 0}
              className="h-11 px-6 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold text-sm transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Menyimpan...' : 'Simpan Absensi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}