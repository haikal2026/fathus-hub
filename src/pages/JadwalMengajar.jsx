import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HARI = ['SENIN', 'SELASA', 'RABU', 'KAMIS', "JUM'AT", 'SABTU'];

// Jadwal hardcode dari HTML asli (sementara)
const JADWAL_PER_MAPEL = {
  'bahasa inggris': {
    SENIN: [
      { jam: '07.30 - 08.30', kelas: 'X-A', ruang: 'R-01' },
      { jam: '10.00 - 11.00', kelas: 'XI-A', ruang: 'R-03' },
      { jam: '11.30 - 12.00', kelas: 'XII-A', ruang: 'R-05' },
    ],
    SELASA: [
      { jam: '08.30 - 09.30', kelas: 'X-B', ruang: 'R-02' },
      { jam: '10.30 - 11.30', kelas: 'XI-B', ruang: 'R-04' },
    ],
    RABU: [
      { jam: '07.30 - 08.30', kelas: 'XII-B', ruang: 'R-06' },
      { jam: '10.00 - 11.00', kelas: 'X-A', ruang: 'R-01' },
    ],
    KAMIS: [{ jam: '07.30 - 08.30', kelas: 'XI-A', ruang: 'R-03' }],
    "JUM'AT": [
      { jam: '07.30 - 07.55', kelas: 'X-A', ruang: 'R-01' },
      { jam: '09.30 - 09.55', kelas: 'XII-A', ruang: 'R-05' },
    ],
    SABTU: [],
  },
  biologi: {
    SENIN: [{ jam: '07.30 - 08.30', kelas: 'X-A', ruang: 'LAB-1' }],
    SELASA: [{ jam: '10.00 - 11.00', kelas: 'XI-A', ruang: 'LAB-1' }],
    RABU: [{ jam: '08.30 - 09.30', kelas: 'XII-A', ruang: 'LAB-1' }],
    KAMIS: [],
    "JUM'AT": [],
    SABTU: [{ jam: '07.30 - 08.30', kelas: 'X-B', ruang: 'LAB-1' }],
  },
};

// Default kalau mapel tidak dikenali
const DEFAULT_JADWAL = {
  SENIN: [{ jam: '07.30 - 08.30', kelas: 'X-A', ruang: 'R-01' }],
  SELASA: [],
  RABU: [],
  KAMIS: [],
  "JUM'AT": [],
  SABTU: [],
};

export default function JadwalMengajar({ onNavigate }) {
  const { profile } = useAuth();

  // Tentukan hari aktif dari hari ini
  const getTodayName = () => {
    const day = new Date().getDay();
    if (day === 0) return 'SENIN'; // Minggu → anggap Senin
    const idx = day - 1; // Senin=0, ..., Sabtu=5
    return HARI[idx] || 'SENIN';
  };

  const [hariAktif, setHariAktif] = useState(getTodayName());

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

  // Ambil mapel pertama dari profile.mapel
  const mapelRaw = profile.mapel?.split(';')[0]?.trim()?.toLowerCase() || '';
  const jadwalMapel = JADWAL_PER_MAPEL[mapelRaw] || DEFAULT_JADWAL;
  const jadwalHariIni = jadwalMapel[hariAktif] || [];

  const totalJamPerMinggu = HARI.reduce(
    (sum, hari) => sum + (jadwalMapel[hari]?.length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1100px]">
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
            <Calendar className="w-7 h-7 text-emerald-600" />
            Jadwal Mengajar Saya
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Mata Pelajaran: <strong className="text-emerald-600 capitalize">{profile.mapel || '-'}</strong>
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white rounded-2xl p-5 shadow-sm">
            <div className="text-[11px] font-bold tracking-widest opacity-80 uppercase">
              Total Jam / Minggu
            </div>
            <div className="text-3xl font-extrabold mt-1">{totalJamPerMinggu}</div>
            <div className="text-[11px] opacity-80 mt-1">Jam Pelajaran</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Hari Aktif
            </div>
            <div className="text-3xl font-extrabold mt-1 text-slate-900">
              {HARI.filter((h) => (jadwalMapel[h]?.length || 0) > 0).length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">dari 6 hari</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm col-span-2 md:col-span-1">
            <div className="text-[11px] font-bold tracking-widest text-slate-500 uppercase">
              Jadwal Hari Ini
            </div>
            <div className="text-3xl font-extrabold mt-1 text-emerald-600">
              {jadwalHariIni.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">{hariAktif}</div>
          </div>
        </div>

        {/* Tab Hari */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 mb-4">
          <div className="flex flex-wrap gap-2">
            {HARI.map((h) => {
              const jumlahJam = jadwalMapel[h]?.length || 0;
              const active = hariAktif === h;
              return (
                <button
                  key={h}
                  onClick={() => setHariAktif(h)}
                  className={`h-10 px-4 rounded-full text-[12px] font-bold transition flex items-center gap-2 ${
                    active
                      ? 'bg-emerald-500 text-white shadow'
                      : 'bg-[#F8FAFC] border border-slate-200 text-slate-600 hover:border-emerald-300'
                  }`}
                >
                  {h}
                  {jumlahJam > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        active ? 'bg-white/20' : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {jumlahJam}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Jadwal Hari Aktif */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[13px] font-extrabold text-slate-900">
                  Jadwal Hari {hariAktif}
                </div>
                <div className="text-[11px] text-slate-500">
                  {jadwalHariIni.length} jam pelajaran
                </div>
              </div>
            </div>
          </div>

          {jadwalHariIni.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                Tidak ada jadwal mengajar hari {hariAktif}.
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Nikmati waktu istirahat atau persiapan materi.
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {jadwalHariIni.map((j, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-slate-100 hover:border-emerald-300 hover:bg-white transition"
                >
                  <div className="w-20 h-14 rounded-xl bg-emerald-500 text-white flex flex-col items-center justify-center leading-none shrink-0">
                    <div className="text-[12px] font-extrabold">
                      {j.jam.split(' - ')[0]}
                    </div>
                    <div className="text-[10px] opacity-80 mt-1">
                      {j.jam.split(' - ')[1]}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-bold text-slate-900">
                      {profile.mapel?.split(';')[0]?.trim() || 'Mata Pelajaran'}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-[12px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <span className="font-bold text-emerald-600">Kelas</span>
                        {j.kelas}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {j.ruang}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block text-right">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                      Jam ke
                    </div>
                    <div className="text-[18px] font-extrabold text-emerald-600">
                      {idx + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <p className="text-xs text-emerald-800 leading-relaxed">
            <strong>💡 Info:</strong> Jadwal ini diambil dari jadwal pelajaran
            MA Fathus Salafi TP 2026/2027. Nanti bisa diupdate otomatis ketika
            admin mengelola jadwal di panel admin.
          </p>
        </div>
      </div>
    </div>
  );
}