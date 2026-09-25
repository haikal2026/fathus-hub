import { useEffect, useState } from 'react';
import {
  GraduationCap,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  ArrowLeft,
  Save,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../context/ToastContext';
import { createUser, deleteUser } from '../lib/api';

export default function KelolaGuru({ onNavigate }) {
  const { toast } = useToast();
  const [guruList, setGuruList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingGuru, setEditingGuru] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  async function fetchGuru() {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'guru')
      .order('nama', { ascending: true });

    if (!error) setGuruList(data || []);
    setLoading(false);
  }

  useEffect(() => {
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

  async function handleDelete(guru) {
    if (deleteLoading) return;

    const ok = window.confirm(
      `Yakin hapus guru "${guru.nama}"? Data akan dihapus permanen.`
    );
    if (!ok) return;

    setDeleteLoading(guru.id);
    try {
      await deleteUser(guru.id);
      await fetchGuru();
      toast.success(`Guru "${guru.nama}" berhasil dihapus!`);
    } catch (err) {
      console.error('❌ Error delete guru:', err);
      toast.error('Gagal hapus: ' + (err.message || 'Unknown error'));
    } finally {
      setDeleteLoading(null);
    }
  }

  function handleTambah() {
    setEditingGuru(null);
    setShowModal(true);
  }

  function handleEdit(guru) {
    setEditingGuru(guru);
    setShowModal(true);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4 lg:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs text-slate-500 hover:text-emerald-600 font-semibold flex items-center gap-1 mb-2 transition"
              >
                <ArrowLeft className="w-3 h-3" />
                Kembali ke Dashboard
              </button>
              <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
                <GraduationCap className="w-7 h-7 text-emerald-600" />
                Kelola Guru
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Total: {guruList.length} guru
              </p>
            </div>
            <button
              onClick={handleTambah}
              className="h-10 px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold transition flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tambah Guru
            </button>
          </div>

          <div className="mt-4 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, NIP, mapel, atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-slate-500 text-sm">Memuat data guru...</p>
            </div>
          ) : filteredGuru.length === 0 ? (
            <div className="p-12 text-center">
              <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                {search
                  ? 'Tidak ada guru yang cocok dengan pencarian.'
                  : 'Belum ada data guru. Klik "Tambah Guru" untuk memulai.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">No</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Nama</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">NIP</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Mapel</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">JK</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 text-xs">Email</th>
                    <th className="text-right px-4 py-3 font-bold text-slate-700 text-xs">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuru.map((g, idx) => (
                    <tr
                      key={g.id}
                      className="border-b border-slate-100 hover:bg-slate-50/50 transition"
                    >
                      <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {g.nama || '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{g.nis_nip || '-'}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {g.mapel ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold">
                            {g.mapel}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {g.jenis_kelamin === 'L'
                          ? 'Laki-laki'
                          : g.jenis_kelamin === 'P'
                          ? 'Perempuan'
                          : '-'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 text-xs">
                        {g.email || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => handleEdit(g)}
                            className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition flex items-center justify-center"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (deleteLoading !== g.id) handleDelete(g);
                            }}
                            disabled={deleteLoading === g.id}
                            className={`w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition flex items-center justify-center ${
                              deleteLoading === g.id ? 'opacity-50' : ''
                            }`}
                          >
                            {deleteLoading === g.id ? (
                              <span className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="w-3.5 h-3.5" />
                            )}
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

      {showModal && (
        <GuruModal
          guru={editingGuru}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false);
            fetchGuru();
          }}
        />
      )}
    </div>
  );
}

function GuruModal({ guru, onClose, onSuccess }) {
  const { toast } = useToast();
  const isEdit = !!guru;
  const [form, setForm] = useState({
    nama: guru?.nama || '',
    nis_nip: guru?.nis_nip || '',
    mapel: guru?.mapel || '',
    jenis_kelamin: guru?.jenis_kelamin || 'L',
    email: guru?.email || '',
    password: '',
    telepon: guru?.telepon || '',
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
        const { error: err } = await supabase
          .from('profiles')
          .update({
            nama: form.nama,
            nis_nip: form.nis_nip || null,
            mapel: form.mapel || null,
            jenis_kelamin: form.jenis_kelamin || null,
            telepon: form.telepon || null,
          })
          .eq('id', guru.id);

        if (err) throw err;
        toast.success('Data guru berhasil diupdate!');
      } else {
        await createUser({
          email: form.email,
          password: form.password,
          nama: form.nama,
          role: 'guru',
          nis_nip: form.nis_nip,
          kelas: null,
          jenis_kelamin: form.jenis_kelamin,
          telepon: form.telepon,
          mapel: form.mapel,
        });
        toast.success('Guru baru berhasil ditambahkan!');
      }

      onSuccess();
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
      toast.error(err.message || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg my-8">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900">
            {isEdit ? 'Edit Guru' : 'Tambah Guru Baru'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
              Error: {error}
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Nama Lengkap *</label>
            <input
              required
              value={form.nama}
              onChange={(e) => update('nama', e.target.value)}
              placeholder="Ustadz Ahmad Fauzi"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">NIP</label>
              <input
                value={form.nis_nip}
                onChange={(e) => update('nis_nip', e.target.value)}
                placeholder="198501012010"
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Jenis Kelamin *</label>
              <div className="flex gap-1">
                {[
                  { v: 'L', l: 'Laki-laki' },
                  { v: 'P', l: 'Perempuan' },
                ].map((opt) => (
                  <button
                    key={opt.v}
                    type="button"
                    onClick={() => update('jenis_kelamin', opt.v)}
                    className={`flex-1 h-10 rounded-xl border text-[11px] font-semibold transition ${
                      form.jenis_kelamin === opt.v
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-[#F8FAFC] text-slate-600 border-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    {opt.l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Mata Pelajaran *</label>
            <input
              required
              value={form.mapel}
              onChange={(e) => update('mapel', e.target.value)}
              placeholder="Contoh: Matematika, Bahasa Arab, Fiqih"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
            />
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
              placeholder="guru@mafathussalafi.sch.id"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition disabled:opacity-50"
            />
          </div>

          {!isEdit && (
            <div>
              <label className="text-xs font-bold text-slate-700 mb-1 block">Password *</label>
              <input
                type="text"
                required
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="Minimal 6 karakter"
                minLength={6}
                className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 mb-1 block">Telepon</label>
            <input
              value={form.telepon}
              onChange={(e) => update('telepon', e.target.value)}
              placeholder="08xxxxxxxxxx"
              className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-[#F8FAFC] text-sm outline-none focus:border-emerald-500 focus:bg-white transition"
            />
          </div>

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
              className="flex-1 h-11 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-bold text-sm transition flex items-center justify-center gap-2"
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