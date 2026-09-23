import { useEffect, useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  Save,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createUser } from '../lib/api';

const KELAS_OPTIONS = ['X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B'];

export default function KelolaSiswa({ onNavigate }) {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState(null);

  // Fetch data siswa
  async function fetchSiswa() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'siswa')
      .order('nama', { ascending: true });

    if (!error) setSiswaList(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchSiswa();
  }, []);

  // Filter by search
  const filteredSiswa = siswaList.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.nama?.toLowerCase().includes(q) ||
      s.nis_nip?.toLowerCase().includes(q) ||
      s.kelas?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q)
    );
  });

  // Hapus siswa
  async function handleDelete(siswa) {
    if (!confirm(`Yakin hapus siswa "${siswa.nama}"?`)) return;

    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', siswa.id);

    if (error) {
      alert('Gagal hapus: ' + error.message);
      return;
    }
    fetchSiswa();
  }

  // Buka modal tambah
  function handleTambah() {
    setEditingSiswa(null);
    setShowModal(true);
  }

  // Buka modal edit
  function handleEdit(siswa) {
    setEditingSiswa(siswa);
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs text-slate-500 hover:text-[#0F4C81] font-semibold flex items-center gap-1 mb-2 transition"
              >
                <ArrowLeft className="w-3 h-3" />
                Kembali ke Dashboard
              </button>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                <Users className="w-7 h-7 text-[#0F4C81]" />
                Kelola Siswa
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Total: {siswaList.length} siswa
              </p>
            </div>
            <button
              onClick={handleTambah}
              className="h-10 px-5 rounded-full bg-[#0F4C81] hover:bg-[#1E3A8A] text-white text-sm font-bold transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Siswa
            </button>
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, NIS, kelas, atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat data siswa...</p>
            </div>
          ) : filteredSiswa.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {search
                  ? 'Tidak ada siswa yang cocok dengan pencarian.'
                  : 'Belum ada data siswa. Klik "Tambah Siswa" untuk memulai.'}
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
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Kelas</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">JK</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Email</th>
                    <th className="text-right px-4 py-3 font-bold text-slate-700 text-xs">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.map((s, idx) => (
                    <tr
                      key={s.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition"
                    >
                      <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {s.nama || '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{s.nis_nip || '-'}</td>
                      <td className="px-4 py-3 text-slate-600">{s.kelas || '-'}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {s.jenis_kelamin === 'L'
                          ? 'Laki-laki'
                          : s.jenis_kelamin === 'P'
                          ? 'Perempuan'
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        {s.email || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleEdit(s)}
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(s)}
                            className="w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <SiswaModal
          siswa={editingSiswa}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchSiswa();
          }}
        />
      )}
    </div>
  );
}

/* ============================================================
   Modal Form: Tambah / Edit Siswa
   ============================================================ */
function SiswaModal({ siswa, onClose, onSuccess }) {
  const isEdit = !!siswa;
  const [form, setForm] = useState({
    nama: siswa?.nama || '',
    nis_nip: siswa?.nis_nip || '',
    kelas: siswa?.kelas || 'X-A',
    jenis_kelamin: siswa?.jenis_kelamin || 'L',
    email: siswa?.email || '',
    password: '',
    telepon: siswa?.telepon || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit) {
        // Edit: update profiles (tidak ubah auth)
        const { error: err } = await supabase
          .from('profiles')
          .update({
            nama: form.nama,
            nis_nip: form.nis_nip || null,
            kelas: form.kelas || null,
            jenis_kelamin: form.jenis_kelamin || null,
            telepon: form.telepon || null,
          })
          .eq('id', siswa.id);

        if (err) throw err;
      } else {
        // Tambah: panggil Edge Function
        await createUser({
          email: form.email,
          password: form.password,
          nama: form.nama,
          role: 'siswa',
          nis_nip: form.nis_nip,
          kelas: form.kelas,
          jenis_kelamin: form.jenis_kelamin,
          telepon: form.telepon,
        });
      }

      onSuccess();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            {isEdit ? 'Edit Siswa' : 'Tambah Siswa Baru'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Nama Lengkap *</label>
            <input
              required
              value={form.nama}
              onChange={(e) => update('nama', e.target.value)}
              placeholder="Ahmad Zulfikar"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">NIS *</label>
              <input
                required
                value={form.nis_nip}
                onChange={(e) => update('nis_nip', e.target.value)}
                placeholder="2024001"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Kelas *</label>
              <select
                required
                value={form.kelas}
                onChange={(e) => update('kelas', e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
              >
                {KELAS_OPTIONS.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Jenis Kelamin *</label>
            <div className="flex gap-2">
              {[
                { v: 'L', l: 'Laki-laki' },
                { v: 'P', l: 'Perempuan' },
              ].map((opt) => (
                <button
                  key={opt.v}
                  type="button"
                  onClick={() => update('jenis_kelamin', opt.v)}
                  className={`flex-1 h-10 rounded-xl border text-sm font-semibold transition ${
                    form.jenis_kelamin === opt.v
                      ? 'bg-[#0F4C81] text-white border-[#0F4C81]'
                      : 'bg-[#F8FAFC] text-slate-600 border-slate-200 hover:border-[#0F4C81]'
                  }`}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">
              Email {!isEdit && '*'}
            </label>
            <input
              type="email"
              required={!isEdit}
              disabled={isEdit}
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="siswa@mafathussalafi.sch.id"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition disabled:opacity-50"
            />
            {isEdit && (
              <p className="text-[10px] text-slate-400 mt-1">
                Email tidak bisa diubah. Untuk ganti email, hubungi developer.
              </p>
            )}
          </div>

          {!isEdit && (
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">
                Password *
              </label>
              <input
                type="text"
                required
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="Minimal 6 karakter"
                minLength={6}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Berikan password ini ke siswa. Sarankan segera ganti setelah login pertama.
              </p>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Telepon</label>
            <input
              value={form.telepon}
              onChange={(e) => update('telepon', e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-[#0F4C81] focus:bg-white transition"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 h-11 rounded-full border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-11 rounded-full bg-[#0F4C81] hover:bg-[#1E3A8A] disabled:bg-slate-300 text-white font-bold text-sm transition flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Memproses...' : isEdit ? 'Simpan' : 'Tambah'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}